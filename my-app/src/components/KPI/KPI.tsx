import Loader from "../Loader/Loader";
import "./KPI.scss"

export type KPIProps = {
    title: string;
    value: string | number;
    subtitle?: any,
    loading: boolean
}

const KPI: React.FC<KPIProps> = ({ title, value, subtitle, loading }) => {
    return (
        <div className="kpi">
            <span className="kpi_title">{title}</span>
            {loading
                ? <div className="kpi_value-loader"> <Loader size="small" /> </div>
                : <span className="kpi_value">{value}</span>
            }
            {loading && subtitle
                ? <Loader size="extra-small" />
                : <span>{subtitle}</span>
            }
        </div>
    );
}

export default KPI;