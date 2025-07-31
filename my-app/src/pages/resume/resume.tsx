import { useAuth } from '../../context/authContext'
import './resume.scss'
import { fetchResumeData } from '../../../backend/sheet/GoogleSheet.tsx'
import { useEffect, useState } from 'react'
import type { Multa } from '../../../backend/types/readSheet.types.ts'
import Loader from '../../components/Loader/Loader.tsx'
import MultaLine, { MultaType } from '../../components/MultaLine/MultaLine.tsx'
import { comparePlayers } from '../../utils/compare.ts'
import { getMoneyFromMulta } from '../../utils/multaCalculation.ts'
import { getTitleName, moneyFormat } from '../../utils/formats.ts'
import {  Role } from '../../shared/types/players.types.ts'
import Page from '../../components/Page/Page.tsx'
import MultaLineHeader from '../../components/MultaLine/MultaLineHeader.tsx'
import { useRightMenu } from '../../utils/menuContext.tsx'
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom.tsx'

export default function Resume() {
  const { player } = useAuth()
  const [loading, setLoading] = useState(false)
  const [multas, setMultas] = useState<Multa[]>([])

  const { openRightMenu } = useRightMenu();

  const RPE_url = "https://forms.gle/cSAsbadKXjPNyLDZ9"
  
  if (!player) {
    return <p>You are not logged in</p>
  }

  const getTotalPending = (): number => {
    let total = 0;
    multas.filter((m) => m.paid === false).forEach((multa) => {
      total += getMoneyFromMulta(multa.rule, multa.minsLate);
    })
    return total
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await fetchResumeData();
        const multasList = data.filter((multa: Multa) => comparePlayers(multa.player, player))
        setMultas(multasList)
      } catch (err) {
        alert('No se pudo cargar la hoja de cálculo')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <Page permissions={[Role.user, Role.admin]}>
      <div className='resume'>
        <div className='resume-title' style={{display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', }}>
          <p style={{fontSize: '24px', padding: 0, margin: 0}}>{getTitleName(player)}</p>
          <ButtonCustom border={true} onClick={() => window.open(RPE_url, '_blank', 'noopener,noreferrer')}>
            RPE
          </ButtonCustom>
        </div>

        {loading
        ? <Loader/>
        :<div className='resume-multas'>
          <div className='resume-multas__total'>
            Debt: <a className='resume-multas__total-price'>{moneyFormat(getTotalPending())}</a>
          </div>
          {multas.length > 0
            ? <>
              <MultaLineHeader type={MultaType.resume} />
              {multas.map((multa) => (
                <MultaLine key={multa.player + '' + multa.rule + multa.date} onClick={() => openRightMenu(multa, "multa")} multa={multa} type={MultaType.resume} />
              ))}
            </>
            : <div>Lucky you, don't have any fine to pay right now</div>
          }
          {/* <div className='resume-multas__pending'>
            Comming soon ----&gt; Already paid fines
            </div> */}
        </div>
      }
      </div>
    </Page>
  )
}
