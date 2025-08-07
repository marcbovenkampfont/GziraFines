import { useAuth } from '../../context/authContext'
import './resume.scss'
import { fetchResumeData } from '../../../backend/sheet/GoogleSheet.tsx'
import { useEffect, useState } from 'react'
import type { Multa } from '../../../backend/types/readSheet.types.ts'
import Loader from '../../components/Loader/Loader.tsx'
import { comparePlayers } from '../../utils/compare.ts'
import { getNameResume } from '../../utils/formats.ts'
import Page from '../../components/Page/Page.tsx'
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom.tsx'
import ResumeStructure from './resume-structure.tsx'
import FilterOption from '../../components/FilterOption/FilterOption.tsx'

export const ResumeView = {
  PAID: "paid",
  UNPAID: "unpaid",
  REJECTED: "rejected",
} as const

export type ResumeView = typeof ResumeView[keyof typeof ResumeView]


export default function Resume() {
  const { player } = useAuth()
  const [loading, setLoading] = useState(false)
  const [multas, setMultas] = useState<Multa[]>([])
  const [view, setView] = useState<ResumeView>(ResumeView.UNPAID)

  const RPE_url = "https://forms.gle/cSAsbadKXjPNyLDZ9"
  
  if (!player) {
    return <p>You are not logged in</p>
  }


  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await fetchResumeData();
        const multasList = data.filter((multa: Multa) => comparePlayers(multa.player, player) && multa.rejected === false)
        setMultas(multasList)
      } catch (err) {
        alert(`No se pudo cargar la hoja de cálculo ${err}`)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <Page permissions={["VIEW_DASHBOARD"]}>
      <div className='resume-view'>
        <FilterOption
          title='unpaid'
          onClick={() => setView(ResumeView.UNPAID)}
          selected={view === ResumeView.UNPAID}
          color='#ADD8E6'
        />
        <FilterOption
          title='paid'
          onClick={() => setView(ResumeView.PAID)}
          selected={view === ResumeView.PAID}
          color='#FFC107'
        />
      </div>

      <div className='resume-title' style={{display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <p style={{fontSize: '20px', textTransform: 'uppercase', padding: 0, margin: 0}}>{getNameResume(player)}</p>
        <ButtonCustom border={true} onClick={() => window.open(RPE_url, '_blank', 'noopener,noreferrer')}>
          RPE
        </ButtonCustom>
      </div>

      {loading
        ? <Loader/>
        :<div className='resume-multas'>
          <ResumeStructure view={view} multas={view === ResumeView.UNPAID ? multas.filter((m) => m.paid === false) : multas.filter((m) => m.paid === true)} />
        </div>
      }
    </Page>
  )
}
