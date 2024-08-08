import MainRouter from './router';
import { AuthProvider } from './store/auth.context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from './utils/storages';

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
      <MainRouter />
    </AuthProvider>
  );
}

export default App;
