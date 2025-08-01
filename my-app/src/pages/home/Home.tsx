import gziraLogo from '../../assets/gzira_shield-removebg-preview.png'
import './Home.css'
import { Login } from '../../components/Login/Login'
import { useAuth } from '../../context/authContext'
import { APP_ROUTES } from '../../shared/constants/appRoutes';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page/Page';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';

function Home() {

  const { player, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <Page>
      <div style={{textAlign: 'center'}}>
        <img src={gziraLogo} className='logo' alt="gzira logo" />
        <h1>Gzira Fines</h1>
      </div>
      {player !== null ?
      <div style={{display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center'}}>
        <h3>You are {player.name}</h3>
        <ButtonCustom border={true} onClick={() => navigate(APP_ROUTES.resume)}>
          GO RESUME
        </ButtonCustom>
        <ButtonCustom border={true} onClick={() => logout()}>
          LOGOUT
        </ButtonCustom>
      </div>
      : <Login/>
      }
    </Page>
  )
}

export default Home
