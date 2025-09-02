import { useAuth } from '../../context/authContext'
import './update-fine.scss'
import { fetchResumeData } from '../../../backend/sheet/GoogleSheet.tsx'
import { useEffect, useState } from 'react'
import type { Multa } from '../../../backend/types/readSheet.types.ts'
import Loader from '../../components/Loader/Loader.tsx'
import MultaLine, { MultaType } from '../../components/MultaLine/MultaLine.tsx'
import Page from '../../components/Page/Page.tsx'
import { useModal } from '../../utils/menuContext.tsx'
import MultaLineHeader from '../../components/MultaLine/MultaLineHeader.tsx'
import FilterOption from '../../components/FilterOption/FilterOption.tsx'
import { ResumeView } from '../resume/resume.tsx'
import { ModalType } from '../../shared/types/modalMulta.types.ts'
import KPI, { type KPIProps } from '../../components/KPI/KPI.tsx'
import { moneyFormat } from '../../utils/formats.ts'
import { getKPI } from '../../utils/multaCalculation.ts'
import { Minus } from "lucide-react";
import { useIntl } from 'react-intl'

export default function UpdateFine() {
  const { player } = useAuth()
  const [loading, setLoading] = useState(false)
  const [multas, setMultas] = useState<Multa[]>([])
  const [multasFiltered, setMultasFiltered] = useState<Multa[]>([])

  const [filtersView, setFiltersView] = useState<ResumeView[]>([])

  const intl = useIntl()

  const { openRightMenu } = useModal();
  

  if (!player) {
    return <p>You are not logged in</p>
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await fetchResumeData();
        const multasList = data;

        setMultas(multasList)
        setMultasFiltered(multasList)
        setFiltersView([])
      } catch (err) {
        alert(`Error trying to get the fines ${err}`)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleOnClickMulta = (multa: Multa) => {
    openRightMenu(ModalType.MULTA_UPDATE,  multa)
  }

  const filtrarMultas = (multas: Multa[], views: ResumeView[]) => {
    if (views.length === 0) {
      return multas
    }

    let rejectedFines: Multa[] = []
    let paidFines: Multa[] = []
    let unpaidFines: Multa[] = []

    if (views.includes(ResumeView.REJECTED)) {
      rejectedFines = multas.filter((m) => m.rejected === true)
    }
    if (views.includes(ResumeView.PAID)) {
      paidFines = multas.filter((m) => m.rejected === false && m.paid === true)
    }
    if (views.includes(ResumeView.UNPAID)) {
      unpaidFines = multas.filter((m) => m.rejected === false && m.paid === false)
    }

    return [...rejectedFines, ...paidFines, ...unpaidFines].sort((a, b) => a.date.getTime() - b.date.getTime() )
  }

  const getKPIs = (): KPIProps[] => {
    const multasReal = multas.filter((m) => m.rejected === false)
    const unpaidMultas = multas.filter((m) => m.rejected === false && m.paid === false)
    const paidMultas = multas.filter((m) => m.rejected === false && m.paid === true)

    if (filtersView.length === 0 || filtersView.length === 3 || (filtersView.includes(ResumeView.PAID) && filtersView.includes(ResumeView.UNPAID)) || (filtersView.length === 1 && filtersView.includes(ResumeView.REJECTED))) {
      return [
        {
          title: intl.formatMessage({ id: "reports.kpi.total-fines" }),
          value: multasReal.length,
          subtitle: <div className='resume_kpi_subtitle wrong bold'><Minus size={13} /> {unpaidMultas.length}</div>,
          loading: loading
        },
        {
          title: intl.formatMessage({ id: "reports.kpi.amount-to-raise" }),
          value: moneyFormat(getKPI(multasReal)),
          subtitle: <div className='resume_kpi_subtitle wrong bold'><Minus size={13} /> {moneyFormat(getKPI(unpaidMultas))}</div>,
          loading: loading
        }
      ]
    } else if (filtersView.includes(ResumeView.UNPAID)) {
      return [
        {
          title: intl.formatMessage({ id: "reports.kpi.total-unpaid" }),
          value: unpaidMultas.length,
          loading: loading
        },
        {
          title: intl.formatMessage({ id: "reports.kpi.amount-to-pay" }),
          value: moneyFormat(getKPI(unpaidMultas)),
          loading: loading
        }
      ]
    } else if (filtersView.includes(ResumeView.PAID)) {
      return [
        {
          title: intl.formatMessage({ id: "reports.kpi.total-paid" }),
          value: paidMultas.length,
          loading: loading
        },
        {
          title: intl.formatMessage({ id: "reports.kpi.amount-paid" }),
          value: moneyFormat(getKPI(paidMultas)),
          loading: loading
        }
      ]
    }
    return []
  }

  const handleChangeView = (newView: ResumeView) => {
    console.log("newView", newView)
    const viewsLocal = [...filtersView]
    let updatedViews;
    if (viewsLocal.includes(newView)) {
      updatedViews = viewsLocal.filter((rv) => rv !== newView);
    } else {
      updatedViews = [...viewsLocal, newView];
    }

    setFiltersView(updatedViews)
    setMultasFiltered(filtrarMultas(multas, updatedViews))
  }

  return (
    <Page permissions={["UPDATE_PAID_FINE", "UPDATE_REJECT_FINE"]}>
      <div className='update-filters'>
        <FilterOption
          title='shared.filter.unpaid'
          onClick={() => handleChangeView(ResumeView.UNPAID)}
          selected={filtersView.includes(ResumeView.UNPAID)}
          color='#ADD8E6'
        />
        <FilterOption
          title='shared.filter.paid'
          onClick={() => handleChangeView(ResumeView.PAID)}
          selected={filtersView.includes(ResumeView.PAID)}
          color='#FFC107'
        />
        <FilterOption
          title='shared.filter.deleted'
          onClick={() => handleChangeView(ResumeView.REJECTED)}
          selected={filtersView.includes(ResumeView.REJECTED)}
          color='green'
        />
      </div>

      <div className="resume-all-kpis">
        {getKPIs().map((kpi) => (
          <KPI
            title={kpi.title}
            value={kpi.value}
            subtitle={kpi.subtitle}
            loading={kpi.loading}
          />
        ))}
      </div>

      {loading
      ? <Loader/>
      :<div className='update-multas' style={{paddingBottom: '40px'}}>
          {multasFiltered.length > 0
          ? <>
              <MultaLineHeader type={MultaType.update} />
              {multasFiltered.map((multa) => (
                  <MultaLine key={"multa-" + multa.id} type={MultaType.update} onClick={(multa) => handleOnClickMulta(multa)} multa={multa}/>
              ))}
          </>
          : <div>No fines</div>
          }
      </div>
      }
    </Page>
  )
}
