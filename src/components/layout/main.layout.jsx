import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';

const MainLayout = () => {
  return (
    <div className='!min-h-screen'>
      <Suspense
        fallback={
          <div className='h-semiFull flex w-full items-center justify-center'>
            <span className='loading loading-spinner loading-lg' />
          </div>
        }
      >
        <Navbar />
        <div className='min-h-[calc(100vh-64px)] bg-[#F6F6F6]'>
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
};

export default MainLayout;
