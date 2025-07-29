import { createRoot } from 'react-dom/client'
import './index.scss'
import { AppRoutes } from './routes.tsx'
import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/authContext.tsx'
import Layout from '../layout/layout.tsx'
import { GoogleAuthProvider } from '../auth/GoogleAuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
      <Router>
        <GoogleAuthProvider>
            <Layout>
              <AppRoutes />
            </Layout>
        </GoogleAuthProvider>
      </Router>
  </AuthProvider>,
)
