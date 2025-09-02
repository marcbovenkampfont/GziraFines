import { useAuth } from "../../context/authContext";
import gziraLogo from '../../assets/gzira_shield-removebg-preview.png'
import "./Header.scss"
import { APP_ROUTES } from "../../shared/constants/appRoutes";
import { useNavigate } from "react-router-dom";
import { useMatch } from "react-router-dom";
import Visible from "../Visible/Visible";
import { FormattedMessage } from "react-intl";
import { useModal } from "../../utils/menuContext";
import { ModalType } from "../../shared/types/modalMulta.types";

const Header = () => {

    const { player } = useAuth();

    const { openRightMenu } = useModal()

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
                <div className="header_logo_container" onClick={() => navigate(APP_ROUTES.home)}>
                    <img src={gziraLogo} className='header_logo_container_logo' alt="gzira logo" />
                </div>
                <div className="header_settings" onClick={() => openRightMenu(ModalType.SETTINGS)}>{getIniciales()}</div>
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
                            <FormattedMessage id="shared.menu.reports" />
                        </div>
                    </Visible>
                </div>
            </div>
        </>
    )
}

export default Header;