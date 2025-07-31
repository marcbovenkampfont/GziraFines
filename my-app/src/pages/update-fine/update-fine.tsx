import { useAuth } from '../../context/authContext'
import './update-fine.scss'
import { fetchResumeData } from '../../../backend/sheet/GoogleSheet.tsx'
import { useEffect, useState } from 'react'
import type { Multa } from '../../../backend/types/readSheet.types.ts'
import Loader from '../../components/Loader/Loader.tsx'
import MultaLine, { MultaType } from '../../components/MultaLine/MultaLine.tsx'
import Page from '../../components/Page/Page.tsx'
import { Role } from '../../shared/types/players.types.ts'
import { useRightMenu } from '../../utils/menuContext.tsx'
import MultaLineHeader from '../../components/MultaLine/MultaLineHeader.tsx'

export default function UpdateFine() {
  const { player } = useAuth()
  const [loading, setLoading] = useState(false)
  const [multas, setMultas] = useState<Multa[]>([])

  const { openRightMenu } = useRightMenu();
  

  if (!player) {
    return <p>You are not logged in</p>
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await fetchResumeData();
        const multasList = data;
        console.log("multas", multasList)
        setMultas(multasList)
      } catch (err) {
        alert('No se pudo cargar la hoja de cálculo')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleOnClickMulta = (multa: Multa) => {
    console.log("ABRIR MULTA", multa)
    openRightMenu(multa, "multa")
  }

  return (
    <Page permissions={[Role.admin]}>
        <div className='update'>
        {loading
        ? <Loader/>
        :<div className='update-multas'>
            {multas.length > 0
            ? <>
                <MultaLineHeader type={MultaType.update} />
                {multas.map((multa) => (
                    <MultaLine type={MultaType.update} onClick={(multa) => handleOnClickMulta(multa)} key={multa.player.name + multa.rule.shortName + multa.date.toString()} multa={multa}/>
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
