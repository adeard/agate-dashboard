import MainRouter from './router';
import { AuthProvider } from './store/auth.context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from './utils/storages';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return (
    <AuthProvider>
      <ToastContainer />
      <MainRouter />
    </AuthProvider>
  );
}

export default App;
