import { useEffect, useRef } from 'react';
import ModalFilter from '../components/ModalFilter';

const DashboardDemografiPage = () => {
  const dialogFilterRef = useRef(null);
  const handleOpenModalFilter = () => {
    dialogFilterRef.current.showModal();
  };

  useEffect(() => {
    handleOpenModalFilter();
  }, []);

  return (
    <div>
      <main>
        <ModalFilter modalRef={dialogFilterRef} />
      </main>
    </div>
  );
};

export default DashboardDemografiPage;
