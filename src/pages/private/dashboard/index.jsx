import { useState, useEffect } from 'react';
import DesktopViewDashboardPage from './DesktopView';
import MobileViewDashboardPage from './MobileView';

const DashboardPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? <MobileViewDashboardPage /> : <DesktopViewDashboardPage />}
    </div>
  );
};

export default DashboardPage;
