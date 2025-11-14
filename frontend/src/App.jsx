import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import OCRPage from './pages/OCRPage'
import ProtectedRoute from './components/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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




