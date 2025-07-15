import { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';

import { initializeResInterceptor } from './utils/axiosClient';
import { useAuthContext } from './contexts/AuthContext';
import PrivateRoutes from './hoc/PrivateRoutes';


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  const { removeSession } = useAuthContext();
  /** ---> Initializing Axios response interceptor. */
  initializeResInterceptor(removeSession);

  return (
    <>
      <Routes>
        <Route path="/auth/sign-in" element={<Signin />} />
        <Route path="/auth/sign-up" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<PrivateRoutes />} >
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
