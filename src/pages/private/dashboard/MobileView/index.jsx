import { useNavigate } from 'react-router-dom';

import Button from '@/components/shared/Button';

import { logoutUser } from '@/services/auth';

const MobileViewDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <section className='flex min-h-screen login-bg'>
      <div className='w-full flex lg:hidden flex-col justify-center items-center gap-8 p-4'>
        <div className='text-white space-y-4'>
          <h3 className='text-2xl'>Automatic Grading System</h3>
        </div>
        <div className='card w-full h-max bg-white px-4 py-6 space-y-4'>
          <Button
            variant='primary'
            size='lg'
            className='button-l'
            full
            onClick={() => navigate('monitoring')}
          >
            Dashboard Monitoring
          </Button>
          <Button
            variant='primary'
            size='lg'
            className='button-l'
            full
            onClick={() => navigate('/profile')}
          >
            Profile
          </Button>
          <Button
            variant='primary'
            size='lg'
            className='button-l'
            full
            onClick={() => navigate('/profile/change-password')}
          >
            Change Password
          </Button>
          <Button
            variant='primary'
            size='lg'
            className='button-l'
            full
            onClick={logoutUser}
          >
            Log Out
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MobileViewDashboardPage;
