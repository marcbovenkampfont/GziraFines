import { useMatch } from "react-router-dom";
import { APP_ROUTES } from "../shared/constants/appRoutes";
import './layout.scss'
import Header from "../components/Header/Header";


type Props = {
    children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {

    // const navigate = useNavigate();
    const homeMatch = useMatch(APP_ROUTES.home);

    return (
        <div className="layout">
            {homeMatch ?
                <div style={{margin: 'auto', alignItems: 'center'}}>   
                    {children}
                </div>
            :
            <>
                <Header />
                <div className="main_content">
                    {children}
                </div>
            </>
            }
        </div>
    )
}

export default Layout