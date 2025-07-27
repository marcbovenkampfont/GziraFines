import { useAuth } from '../../context/authContext'
import './resume.scss'
import { fetchResumeData } from '../../../backend/sheet/GoogleSheet.tsx'
import { useEffect, useState } from 'react'
import type { Multa } from '../../../backend/types/readSheet.types.ts'
import Loader from '../../components/Loader/Loader.tsx'
import MultaLine from '../../components/MultaLine/MultaLine.tsx'
import { comparePlayers } from '../../utils/compare.ts'
import { getMoneyFromMulta } from '../../utils/multaCalculation.ts'
import { moneyFormat } from '../../utils/formats.ts'

export default function Resume() {
  const { player } = useAuth()
  const [loading, setLoading] = useState(false)
  const [multas, setMultas] = useState<Multa[]>([])

  if (!player) {
    return <p>You are not logged in</p>
  }

  const getTotal = (): number => {
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
    <div className='resume'>
      <p style={{fontSize: '24px', padding: 0, margin: 0}}>{player.name} #{player.number}</p>

      {loading
      ? <Loader/>
      :<div className='resume-multas'>
        <div className='resume-multas__total'>
          Debt: <a className='resume-multas__total-price'>{moneyFormat(getTotal())}</a>
        </div>
        {multas.length > 0
          ? <>
            <MultaLine header={true} />
            {multas.map((multa) => (
              <MultaLine key={multa.player + '' + multa.rule + multa.date} multa={multa}/>
            ))}
          </>
          : <div>Lucky you, don't have any multa to pay right now</div>
      }
      </div>
    }
    </div>
  )
}
