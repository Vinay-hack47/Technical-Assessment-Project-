import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import OCRPage from './pages/OCRPage'
import ProtectedRoute from './components/ProtectedRoute'
import MyUploads from './pages/MyUploads'
import Profile from './pages/Profile'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />,
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/my-uploads',
    element: <MyUploads />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/upload',
    element: (
      <ProtectedRoute>
        <OCRPage />
      </ProtectedRoute>
    ),
  },
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      {/* <Toaster /> */}
    </>
  )
}

export default App




