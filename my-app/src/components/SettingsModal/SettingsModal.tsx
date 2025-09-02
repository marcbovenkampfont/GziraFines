import React from "react";
import './SettingsModal.scss'
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { useModal } from "../../utils/menuContext";
import { useAuth } from "../../context/authContext";
import { FormattedMessage } from "react-intl";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../shared/constants/appRoutes";

const SettingsModal: React.FC = () => {
  
  const { closeRightMenu } = useModal()
  const { player, logout } = useAuth();

  const navigate = useNavigate();

  const RPE_url = "https://forms.gle/cSAsbadKXjPNyLDZ9"

  const handleLogout = () => {
    closeRightMenu();
    logout();
    navigate(APP_ROUTES.home);
  }
  
  return (
    <div className="settings-modal">
      <div className="settings-modal-header">
        <h3 style={{fontWeight: 500}}><FormattedMessage id="modal.settings.title" /></h3>
        <ButtonCustom onClick={closeRightMenu}>
            X
        </ButtonCustom>
      </div>

      <div className="settings-modal-info">
        <span style={{fontSize: '24px'}}>{player?.name} #{player?.number}</span>
        <span>Role: {player?.personRole}</span>
      </div>

      <div className="settings-modal-links">
        <ButtonCustom border={true} onClick={() => window.open(RPE_url, '_blank', 'noopener,noreferrer')}>
          RPE
        </ButtonCustom>
      </div>

      <div className="settings-modal-language_selector">
        <LanguageSelector />
      </div>

      <div className="settings-modal-buttons">
        <ButtonCustom border={true} onClick={() => handleLogout()}>
          <FormattedMessage id="home.logout" />
        </ButtonCustom>
      </div>
    </div>
  );
};

export default SettingsModal;
