import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import Loading from './components/Loading.jsx'
import { AuthProvider } from './contexts/authContext'  // ← Add this import

createRoot(document.getElementById('root')).render(
  <Suspense fallback={<Loading />}>
    <AuthProvider>  {/* ← Wrap RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </Suspense>
)