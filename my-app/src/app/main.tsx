import { createRoot } from 'react-dom/client'
import './index.scss'
import { AppRoutes } from './routes.tsx'
import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/authContext.tsx'
import Layout from '../layout/layout.tsx'
import { GoogleAuthProvider } from '../auth/GoogleAuthProvider.tsx';
import { RightMenuProvider } from '../utils/menuContext.tsx';
import { LanguageProvider } from '../context/languageProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
      <Router>
        <GoogleAuthProvider>
          <LanguageProvider>
            <RightMenuProvider>
              <Layout>
                <AppRoutes />
              </Layout>
            </RightMenuProvider>
          </LanguageProvider>
        </GoogleAuthProvider>
      </Router>
  </AuthProvider>,
)
