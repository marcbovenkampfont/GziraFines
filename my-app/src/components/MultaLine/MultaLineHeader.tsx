import { MultaType } from "./MultaLine";
import './MultaLine.scss'

type MultaLineHeaderProps = {
    type: MultaType,
}

const MultaLineHeader: React.FC<MultaLineHeaderProps> = ({type}) => {
    console.log("HEADER")
    return (
      <div className={`multa-line headerTable`}>
        <div className="multa-line__name">Rule violation</div>
        {type === MultaType.resume && <div className="multa-line__cost">Cost</div>}
        {type === MultaType.update && <div className="multa-line__cost">Player</div>}
        <div className="multa-line__date">Date</div>
        {type === MultaType.resume && <div className="multa-line__mins-late">Late</div>}
        <div className="multa-line__total">Total</div>
    </div>
        
    );
}

export default MultaLineHeader;