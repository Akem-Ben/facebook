import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import Failure from './pages/Failure';
import { Privacy } from './pages/PrivacyPolicy';
import FacebookLogin from './pages/FacebookLogin';


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
  {
    path: '/facebook',
    element: <FacebookLogin />,
  }
])



function App() {

  return (
    <>
    <RouterProvider router={routes} />
    </>
  )
}

export default App



// FACEBOOK_APP_ID = 849666963647194

// FACEBOOK_APP_SECRET = "61ccbb7fef18affb6622b8296a2d0842"