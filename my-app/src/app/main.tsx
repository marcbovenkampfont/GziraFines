import { createRoot } from 'react-dom/client'
import './index.scss'
import { AppRoutes } from './routes.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/authContext.tsx'
import Layout from '../layout/layout.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/gzira/fines'>
    <AuthProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthProvider>
  </BrowserRouter>,
)
