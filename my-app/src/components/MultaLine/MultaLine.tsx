import type { Multa } from "../../../backend/types/readSheet.types";
import { dateTableFormat, minutFormat, moneyFormat } from "../../utils/formats";
import './MultaLine.scss'

export const MultaType = {
  resume: 'resume',
  update: 'update',
} as const

export type MultaType = typeof MultaType[keyof typeof MultaType]

type MultaLineProps = {
    multa: Multa;
    onClick: (multa: Multa) => void | undefined,
    type: MultaType,
}

const MultaLine: React.FC<MultaLineProps> = ({ multa, onClick, type }) => {

    return (
        <div onClick={() => onClick(multa)} className={`multa-line`}>
            <div className="multa-line__name">{multa && multa.rule.shortName}</div>
            {type === MultaType.resume && <div className="multa-line__cost">{multa && moneyFormat(multa.rule.cost)}</div>}
            {type === MultaType.update && <div className="multa-line__cost">{multa && multa.player.name.split(" ")[0]}</div>}
            <div className="multa-line__date">{multa && dateTableFormat(multa.date)}</div>
            {type === MultaType.resume && <div className="multa-line__mins-late">{minutFormat(multa?.minsLate)}</div>}
            <div className="multa-line__total">{multa && moneyFormat(multa.amount)}</div>
        </div>
    );
}

export default MultaLine;