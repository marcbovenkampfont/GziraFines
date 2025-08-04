import { useAuth } from '../../context/authContext'
import './update-fine.scss'
import { fetchResumeData } from '../../../backend/sheet/GoogleSheet.tsx'
import { useEffect, useState } from 'react'
import type { Multa } from '../../../backend/types/readSheet.types.ts'
import Loader from '../../components/Loader/Loader.tsx'
import MultaLine, { MultaType } from '../../components/MultaLine/MultaLine.tsx'
import Page from '../../components/Page/Page.tsx'
import { useRightMenu } from '../../utils/menuContext.tsx'
import MultaLineHeader from '../../components/MultaLine/MultaLineHeader.tsx'
import FilterOption from '../../components/FilterOption/FilterOption.tsx'
import { ResumeView } from '../resume/resume.tsx'

export default function UpdateFine() {
  const { player } = useAuth()
  const [loading, setLoading] = useState(false)
  const [multas, setMultas] = useState<Multa[]>([])
  const [multasFiltered, setMultasFiltered] = useState<Multa[]>([])
  const [view, setView] = useState<ResumeView | null>(null)

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

        setMultas(multasList)
        setMultasFiltered(multasList)
        setView(null)
      } catch (err) {
        alert(`Error trying to get the fines ${err}`)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleOnClickMulta = (multa: Multa) => {
    openRightMenu(multa, "multa")
  }

  const handleChangeView = (newView: ResumeView) => {
    if (view === newView) {
      setView(null)
      setMultasFiltered(multas)
    } else {
      setView(newView)
      setMultasFiltered(
        newView === ResumeView.PAID
          ? multas.filter((m) => m.paid === true)
          : newView === ResumeView.UNPAID
            ? multas.filter((m) => m.paid === false)
            : multas.filter((m) => m.rejected === true)
      )
    }
  }

  return (
    <Page permissions={["UPDATE_PAID_FINE", "UPDATE_REJECT_FINE"]}>
      <div className='update-filters'>
        <FilterOption
          title='unpaid'
          onClick={() => handleChangeView(ResumeView.UNPAID)}
          selected={view === ResumeView.UNPAID}
          color='#ADD8E6'
        />
        <FilterOption
          title='paid'
          onClick={() => handleChangeView(ResumeView.PAID)}
          selected={view === ResumeView.PAID}
          color='#FFC107'
        />
        {/* <FilterOption
          title='rejected'
          onClick={() => handleChangeView(ResumeView.REJECTED)}
          selected={view === ResumeView.REJECTED}
          color='green'
        /> */}
      </div>
      {loading
      ? <Loader/>
      :<div className='update-multas'>
          {multasFiltered.length > 0
          ? <>
              <MultaLineHeader type={MultaType.update} />
              {multasFiltered.map((multa) => (
                  <MultaLine type={MultaType.update} onClick={(multa) => handleOnClickMulta(multa)} key={multa.player.name + multa.rule.shortName + multa.date.toString()} multa={multa}/>
              ))}
          </>
          : <div>No fines</div>
          }
      </div>
      }
    </Page>
  )
}
