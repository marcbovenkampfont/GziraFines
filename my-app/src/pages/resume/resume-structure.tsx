import { useEffect, useState } from "react"
import type { Multa } from "../../../backend/types/readSheet.types"
import MultaLine, { MultaType } from "../../components/MultaLine/MultaLine"
import MultaLineHeader from "../../components/MultaLine/MultaLineHeader"
import { ResumeView } from "./resume"
import { AnimatePresence, motion } from "motion/react"
import { FormattedMessage } from "react-intl"
import { useModal } from "../../utils/menuContext"
import { ModalType } from "../../shared/types/modalMulta.types"
import Loader from "../../components/Loader/Loader"

type ResumeStructureProps = {
    multas: Multa[],
    view: ResumeView,
    loading: boolean
}

const ResumeStructure: React.FC<ResumeStructureProps> = ({ view, multas, loading }) => {

    const { openRightMenu } = useModal()

    const [multasToShow, setMultasToShow] = useState<Multa[]>([])

    useEffect(() => {
        setMultasToShow(multas.filter((m) => view === ResumeView.PAID ? m.paid === true : m.paid === false))
    }, [view, multas])
      
    return (
        <AnimatePresence mode="wait" >
            <motion.div
                key={view}
                className="resume-multas"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: view === ResumeView.PAID ? 0 : 0 }}
                transition={{ duration: 0.2 }}
            >
                {loading
                    ? <Loader size="medium" />
                    :<>
                        {multasToShow.length > 0
                            ? <>
                                <MultaLineHeader type={MultaType.resume} />
                                {multasToShow.map((multa) => (
                                    <MultaLine key={'multa' + multa.id} onClick={() => openRightMenu(ModalType.MULTA_RESUME, multa )} multa={multa} type={MultaType.resume} />
                                ))}
                            </>
                            : view === ResumeView.UNPAID
                                ? <FormattedMessage id="resume.message.debt" />
                                : <FormattedMessage id="resume.message.paid" />
                            }
                    </>
                }
            </motion.div>
        </AnimatePresence>
    )
}

export default ResumeStructure;