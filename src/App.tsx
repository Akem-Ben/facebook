import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import Failure from './pages/Failure';
import { Privacy } from './pages/PrivacyPolicy';



const routes = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    // errorElement: <NotFound />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/failure',
    element: <Failure />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
])



function App() {

  return (
    <>
    <ToastContainer />
    <RouterProvider router={routes} />
    </>
  )
}

export default App