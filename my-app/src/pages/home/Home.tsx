import gziraLogo from '../../assets/gzira_shield-removebg-preview.png'
import './Home.css'
import { Login } from '../../components/Login/Login'
import { useAuth } from '../../context/authContext'
import { APP_ROUTES } from '../../shared/constants/appRoutes';
import { useNavigate } from 'react-router-dom';

function Home() {

  const { player, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <div>
        <img src={gziraLogo} className='logo' alt="gzira logo" />
      </div>
      <h1>Gzira Fines</h1>
      {player !== null ?
      <div style={{display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', margin: 'auto'}}>
        <h3>You are {player.name}</h3>
        <button style={{width: '150px', margin: 'auto'}} onClick={() => navigate(APP_ROUTES.resume)}>Go resume</button>
        <button style={{width: '150px', margin: 'auto'}} onClick={() => logout()}>Logout</button>
      </div>
      : <Login/>
      }
    </>
  )
}

export default Home
