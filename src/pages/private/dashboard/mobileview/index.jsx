import { useNavigate } from 'react-router-dom';

import Button from '@/components/shared/Button';

import LogoWhite from '@/assets/images/logo-white.png';

const MobileViewDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <section className='flex min-h-screen login-bg'>
      <div className='w-full flex lg:hidden flex-col justify-center items-center gap-8 p-4'>
        <div className='text-white space-y-4'>
          <img
            src={LogoWhite}
            alt='Sinarmas Logo'
            width={167}
            height={42}
            className='mx-auto'
          />
          <h3 className='text-2xl'>Automatic Grading System</h3>
        </div>
        <div className='card w-full h-max bg-white px-4 py-6 space-y-4'>
          <Button
            variant='primary'
            size='lg'
            className='button-l'
            full
            onClick={() => navigate('monitoring-grading')}
          >
            Monitoring Grading
          </Button>
          <Button
            variant='primary'
            size='lg'
            className='button-l'
            full
            onClick={() => navigate('demografi-buah')}
          >
            Demografi Kualtias Buah
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MobileViewDashboardPage;
