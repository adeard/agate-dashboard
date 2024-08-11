import { useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import MainLayout from '@/components/layout/main.layout';

import { useAuthStore } from '@/store/auth.context';
import { getToken } from '@/utils/storages';
import { getDecodeToken } from '@/services/auth';

import pageList from './page-list';

const PrivateLayout = () => {
  const {
    handleSignIn,
    handleSignOut,
    state: { userData },
  } = useAuthStore();

  const token = useMemo(() => {
    return getToken();
  }, []);

  useEffect(() => {
    if (token) {
      _checkDecodeToken();
    } else {
      handleSignOut();
    }
  }, [token]);

  const _checkDecodeToken = () => {
    getDecodeToken()
      .then((res) => {
        handleSignIn(res.data);
      })
      .catch((err) => {
        console.error('error', err);
        handleSignOut();
      });
  };

  return token ? (
    <Outlet context={{ userData }} />
  ) : (
    <Navigate to='login' replace={true} />
  );
};

const AuthLayout = () => {
  const token = getToken();

  return !token ? <Outlet /> : <Navigate to='/dashboard' replace={true} />;
};

const MainRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route path='/' element={<MainLayout />}>
          {pageList.privates.map((li) => {
            const Element = li.component;
            return <Route key={li.path} path={li.path} element={<Element />} />;
          })}
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        {pageList.auth.map((li) => {
          const Element = li.component;
          return <Route key={li.path} path={li.path} element={<Element />} />;
        })}
      </Route>
    </Routes>
  );
};

export default MainRouter;
