import type { Multa } from "../../../backend/types/readSheet.types";
import { dateTableFormat, minutFormat, moneyFormat } from "../../utils/formats";
import './MultaLine.scss'

type MultaLineProps = {
    multa?: Multa;
    header?: boolean;
}

const MultaLine: React.FC<MultaLineProps> = ({ multa, header }) => {

    return (
        <div className={`multa-line${header ? ' headerTable' : ''}`}>
            <div className="multa-line__name">{header ? "Rule violation" : multa && multa.rule.shortName}</div>
            <div className="multa-line__cost">{header ? "Cost" : multa && moneyFormat(multa.rule.cost)}</div>
            <div className="multa-line__date">{header ? "Date" : multa && dateTableFormat(multa.date)}</div>
            <div className="multa-line__mins-late">{header ? "Late" : minutFormat(multa?.minsLate)}</div>
            <div className="multa-line__total">{header ? "Total" : multa && moneyFormat(multa.amount)}</div>
        </div>
    );
}

export default MultaLine;