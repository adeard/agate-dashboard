import { useEffect, useRef } from 'react';

import ModalChoiceDashboard from './components/ModalChoiceDashboard';

const DashboardPage = () => {
  const dialogChoiceDashboardRef = useRef(null);
  const handleOpenModalChoiceDashboard = () => {
    dialogChoiceDashboardRef.current.showModal();
  };

  useEffect(() => {
    handleOpenModalChoiceDashboard();
  }, []);

  return <ModalChoiceDashboard modalRef={dialogChoiceDashboardRef} />;
};

export default DashboardPage;
