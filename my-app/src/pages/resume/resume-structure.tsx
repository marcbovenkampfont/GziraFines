import { useEffect, useState } from "react"
import type { Multa } from "../../../backend/types/readSheet.types"
import MultaLine, { MultaType } from "../../components/MultaLine/MultaLine"
import MultaLineHeader from "../../components/MultaLine/MultaLineHeader"
import { moneyFormat } from "../../utils/formats"
import { getMoneyFromMulta } from "../../utils/multaCalculation"
import { useRightMenu } from "../../utils/menuContext"
import { ResumeView } from "./resume"
import { AnimatePresence, motion } from "motion/react"

type ResumeStructureProps = {
    multas: Multa[],
    view: ResumeView,
}

const ResumeStructure: React.FC<ResumeStructureProps> = ({ view, multas }) => {
    const [total, setTotal] = useState(0);

    const { openRightMenu } = useRightMenu();

    useEffect(() => {
        let total = 0;
        multas.filter((m) => m.paid === false).forEach((multa) => {
            total += getMoneyFromMulta(multa.rule, multa.minsLate);
        })
        setTotal(total)
    }, [multas])
      
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
                <div className='resume-multas__total'>
                    {view === ResumeView.UNPAID
                        ? 'DEPT: '
                        : 'PAID: '
                    }<a className='resume-multas__total-price'>{moneyFormat(total)}</a>
                </div>
                {multas.length > 0
                    ? <>
                        <MultaLineHeader type={MultaType.resume} />
                        {multas.map((multa) => (
                            <MultaLine key={multa.player + '' + multa.rule + multa.date} onClick={() => openRightMenu(multa, "multa")} multa={multa} type={MultaType.resume} />
                        ))}
                    </>
                    : view === ResumeView.UNPAID
                        ? <div>Lucky you, don't have any fine to pay right now</div>
                        : <div>You didn't pay any fine for now</div>
                    }
            </motion.div>
        </AnimatePresence>
    )
}

export default ResumeStructure;