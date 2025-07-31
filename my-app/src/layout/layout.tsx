import { useMatch } from "react-router-dom";
import { APP_ROUTES } from "../shared/constants/appRoutes";
import './layout.scss'
import Header from "../components/Header/Header";
import { useRightMenu } from "../utils/menuContext";
import ModalDrawer from "../components/ModalDrawer/ModalDrawer";
import ModalMulta, { ModalMultaType } from "../components/ModalMulta/ModalMulta";


type Props = {
    children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {

    const { isRightMenuOpen } = useRightMenu();


    // const navigate = useNavigate();
    const homeMatch = useMatch(APP_ROUTES.home);
    const resumeMatch = useMatch(APP_ROUTES.resume);
    // const addMultaMatch = useMatch(APP_ROUTES.addMulta);
    const updateMultaMatch = useMatch(APP_ROUTES.updateMulta);


    const getModalMultaType = () => {
        if (resumeMatch) {
            return ModalMultaType.MULTA_RESUME
        } else if (updateMultaMatch) {
            return ModalMultaType.MULTA_UPDATE
        }
    }

    return (
        <>
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

            <ModalDrawer
                placement="right"
                visible={isRightMenuOpen}
            >
                <ModalMulta buttons={[]} type={getModalMultaType()}/>
                {/* <p>HOLA HOLA</p> */}
            </ModalDrawer>
        </>
    )
}

export default Layout