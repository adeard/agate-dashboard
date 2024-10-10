import DesktopViewDashboardPage from './DesktopView';
import MobileViewDashboardPage from './mobileview';

const DashboardPage = () => {
  return (
    <div>
      <div className='hidden lg:block'>
        <DesktopViewDashboardPage />
      </div>
      <div className='block lg:hidden'>
        <MobileViewDashboardPage />
      </div>
    </div>
  );
};

export default DashboardPage;
