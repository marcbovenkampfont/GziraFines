import { FormattedMessage } from "react-intl";
import { MultaType } from "./MultaLine";
import './MultaLine.scss'

type MultaLineHeaderProps = {
    type: MultaType,
}

const MultaLineHeader: React.FC<MultaLineHeaderProps> = ({type}) => {
    return (
      <div className={`multa-line headerTable`}>
        <div className="multa-line__name"><FormattedMessage id="table.header.rule" /></div>
        {type === MultaType.resume && <div className="multa-line__cost"><FormattedMessage id="table.header.cost" /></div>}
        {type === MultaType.update && <div className="multa-line__cost"><FormattedMessage id="table.header.player" /></div>}
        {type === MultaType.resume && <div className="multa-line__date"><FormattedMessage id="table.header.date" /></div>}
        {type === MultaType.resume && <div className="multa-line__mins-late"><FormattedMessage id="table.header.late" /></div>}
        {type === MultaType.update && <div className="multa-line__status"><FormattedMessage id="table.header.status" /></div>}
        <div className="multa-line__total"><FormattedMessage id="table.header.total" /></div>
    </div>
        
    );
}

export default MultaLineHeader;