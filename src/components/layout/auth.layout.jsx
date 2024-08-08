import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='!min-h-screen'>
      <Suspense
        fallback={
          <div className='h-semiFull flex w-full items-center justify-center'>
            <span className='loading loading-spinner loading-lg' />
          </div>
        }
      >
        <div className='bg-neutral-1 min-h-[calc(100vh-64px)] px-7 py-5'>
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
};

export default AuthLayout;
