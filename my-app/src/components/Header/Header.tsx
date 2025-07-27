import { useAuth } from "../../context/authContext";
import gziraLogo from '../../assets/gzira_shield-removebg-preview.png'
import "./Header.scss"
import { APP_ROUTES } from "../../shared/constants/appRoutes";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const { player, isAdmin } = useAuth();

    const navigate = useNavigate();

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
                <div onClick={() => navigate(APP_ROUTES.home)}>Home</div>
                <div onClick={() => navigate(APP_ROUTES.resume)}>Resume</div>
                {isAdmin && <div onClick={() => console.log("Add Multa")}>Add multa</div>}
            </div>
        </>
    )
}

export default Header;