import { useAuth } from '../../context/authContext'
import './resume.scss'
import { fetchResumeData } from '../../../backend/sheet/GoogleSheet.tsx'
import { useEffect, useState } from 'react'
import type { Multa } from '../../../backend/types/readSheet.types.ts'
import { comparePlayers } from '../../utils/compare.ts'
import Page from '../../components/Page/Page.tsx'
import ResumeStructure from './resume-structure.tsx'
import FilterOption from '../../components/FilterOption/FilterOption.tsx'
import { useIntl } from 'react-intl'
import { getKPI } from '../../utils/multaCalculation.ts'
import KPI from '../../components/KPI/KPI.tsx'
import { moneyFormat } from '../../utils/formats.ts'
import { Minus } from "lucide-react";

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

  const intl = useIntl()

  
  if (!player) {
    return <p>You are not logged in</p>
  }

  const getSubtitleKPI = (): React.ReactNode => {
    const totalMultas = getKPI(multas)
    const unpaidMultasTotal = getKPI(multas.filter((m) => m.paid === false))
    const percentage = totalMultas === 0 ? 0 : unpaidMultasTotal / totalMultas * 100;

    if (percentage === 0) {
      return <div className='resume_kpi_subtitle good'>0 €</div>
    }
    if (percentage <= 40) {
      return <div className='resume_kpi_subtitle medium'><Minus size={13} /> {moneyFormat(unpaidMultasTotal)}</div>
    }

    return <div className='resume_kpi_subtitle wrong'><Minus size={13} /> {moneyFormat(unpaidMultasTotal)}</div>;
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
          title='shared.filter.unpaid'
          onClick={() => setView(ResumeView.UNPAID)}
          selected={view === ResumeView.UNPAID}
          color='#ADD8E6'
        />
        <FilterOption
          title='shared.filter.paid'
          onClick={() => setView(ResumeView.PAID)}
          selected={view === ResumeView.PAID}
          color='#FFC107'
        />
      </div>

      <div className='resume_kpi' style={{textAlign: 'center', margin:'0 auto'}}>
        {view === ResumeView.UNPAID
          ? <KPI
            title={intl.formatMessage({ id: "resume.title.debt" })}
            value={moneyFormat(getKPI(multas.filter((m) => m.paid === false)))}
            loading={loading}
          />
          :<KPI
            title={intl.formatMessage({ id: "resume.title.paid" })}
            value={moneyFormat(getKPI(multas.filter((m) => m.paid === true)))}
            subtitle={getSubtitleKPI()}
            loading={loading}
          />
        }
      </div>

      <div className='resume-multas' style={{marginBottom: '30px'}}>
        <ResumeStructure view={view} multas={multas} loading={loading} />
      </div>
    </Page>
  )
}
