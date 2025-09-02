import { useMatch } from "react-router-dom";
import { APP_ROUTES } from "../shared/constants/appRoutes";
import './layout.scss'
import Header from "../components/Header/Header";
import ModalDrawer from "../components/ModalDrawer/ModalDrawer";
import ModalMulta, { ModalMultaType } from "../components/ModalMulta/ModalMulta";
import { useModal } from "../utils/menuContext";
import { ModalType } from "../shared/types/modalMulta.types";
import SettingsModal from "../components/SettingsModal/SettingsModal";


type Props = {
    children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {

    const { modalType, isRightMenuOpen } = useModal();

    const renderModal = () => {
        switch (modalType) {
        case ModalType.MULTA_RESUME:
            return <ModalMulta type={ModalMultaType.MULTA_RESUME} buttons={[]} />;
        case ModalType.MULTA_UPDATE:
            return <ModalMulta type={ModalMultaType.MULTA_UPDATE} buttons={[]} />;
        case ModalType.SETTINGS:
            return <SettingsModal />;
        default:
            return null;
        }
    };

    // const navigate = useNavigate();
    const homeMatch = useMatch(APP_ROUTES.home);
    // const resumeMatch = useMatch(APP_ROUTES.resume);
    // const addMultaMatch = useMatch(APP_ROUTES.addMulta);
    // const updateMultaMatch = useMatch(APP_ROUTES.updateMulta);

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
                {renderModal()}
            </ModalDrawer>
        </>
    )
}

export default Layout