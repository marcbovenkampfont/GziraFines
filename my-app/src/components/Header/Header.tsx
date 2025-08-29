import { useAuth } from "../../context/authContext";
import gziraLogo from '../../assets/gzira_shield-removebg-preview.png'
import "./Header.scss"
import { APP_ROUTES } from "../../shared/constants/appRoutes";
import { useNavigate } from "react-router-dom";
import { useMatch } from "react-router-dom";
import Visible from "../Visible/Visible";
import { FormattedMessage } from "react-intl";

const Header = () => {

    const { player } = useAuth();

    const navigate = useNavigate();

    const resumeMatch = useMatch(APP_ROUTES.resume);
    const addMultaMatch = useMatch(APP_ROUTES.addMulta);
    const updateMultaMatch = useMatch(APP_ROUTES.updateMulta);

    const getIniciales = () => {
        const words = player?.name.trim().split(/\s+/)
        if (words) {

            const firstTwo = words.slice(0, 2)
            return firstTwo.map(word => word[0]?.toUpperCase() || '').join('') + player?.number
        }
        return "LG"
    }

    return (
        <>
            <div className="header">
                <div style={{margin: '0 3%', cursor: 'pointer'}} onClick={() => navigate(APP_ROUTES.home)}>
                    <img src={gziraLogo} className='header_logo' alt="gzira logo" />
                </div>
                <div style={{margin: '0 3%', border: '1px solid grey', borderRadius: '2px', padding: '10px'}}>{getIniciales()}</div>
            </div>

            <div className="header_menu">
                <div className="header_menu_list">
                    <div className={`header_menu_list_option${resumeMatch ? " located" : ""}`} onClick={() => navigate(APP_ROUTES.resume)}>
                        <FormattedMessage id="shared.menu.resume" />
                    </div>
                    <Visible whenPermission={["ADD_FINE"]}>
                        <div className={`header_menu_list_option${addMultaMatch ? " located" : ""}`} onClick={() => navigate(APP_ROUTES.addMulta)}>
                            <FormattedMessage id="shared.menu.add-fine" />
                        </div>
                    </Visible>
                    <Visible whenPermission={["UPDATE_PAID_FINE", "UPDATE_REJECT_FINE"]}>
                        <div className={`header_menu_list_option${updateMultaMatch ? " located" : ""}`} onClick={() => navigate(APP_ROUTES.updateMulta)}>
                            <FormattedMessage id="shared.menu.update-fine" />
                        </div>
                    </Visible>
                </div>
            </div>
        </>
    )
}

export default Header;