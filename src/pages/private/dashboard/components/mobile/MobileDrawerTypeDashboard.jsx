import { useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';

import Button from '@/components/shared/Button';

const listTypeDashboard = [
  'Monitoring Grading',
  'Summary Performance',
  'Grading Truk',
  'Analisa Kinerja Vendor',
  'Tren Buah Diterima',
  'Tren Buah Didenda',
  'Tren Buah Ditolak',
  '10 Truk Terbaik',
  '10 Truk Terburuk',
];

const MobileDrawerTypeDashboard = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  currentPage,
  setCurrentPage,
}) => {
  const [selectedTypeTable, setSelectedTypeTable] = useState(null);

  const handleClose = () => {
    setSelectedTypeTable(null);
    closeDrawer();
  };

  const handleSubmit = () => {
    setCurrentPage(selectedTypeTable);
    setSelectedTypeTable(null);
    closeDrawer();
  };

  return (
    <div className='drawer z-20'>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      ></div>

      <div
        id={idDrawer}
        className={`w-full h-max fixed bottom-0 left-0 right-0 bg-white p-4 pb-8 rounded-t-2xl shadow-lg transition-transform duration-300 transform ${
          isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='flex items-center justify-between text-color-1'>
          <div className='flex-none'>
            <MdArrowBackIosNew className='text-xl' onClick={handleClose} />
          </div>
          <h2 className='flex-1 !text-center mr-4 subheadline-s'>Dashboard</h2>
        </div>
        <div className='flex flex-col gap-2 mt-4'>
          {listTypeDashboard.map((option) => (
            <Button
              key={option}
              variant='primary-outline'
              size='lg'
              className={`border-none flex items-center justify-between ${
                selectedTypeTable === option && '!bg-[#F6F6F6]'
              }`}
              onClick={() => setSelectedTypeTable(option)}
              full
            >
              {option}
              {selectedTypeTable === option && (
                <IoMdCheckmark className='text-2xl' />
              )}
            </Button>
          ))}

          <Button
            size='lg'
            className='mt-4'
            onClick={handleSubmit}
            disabled={!selectedTypeTable}
            full
          >
            Lihat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawerTypeDashboard;
