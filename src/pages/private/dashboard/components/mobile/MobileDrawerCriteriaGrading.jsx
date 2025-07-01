import { MdArrowBackIosNew } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';

import Dropdown from '@/components/shared/Dropdown';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { convertLabelUnderscore } from '@/utils/common';
import { useState } from 'react';

const MobileDrawerCriteriaGrading = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  selectedCriteriaGrading,
  goToPage,
}) => {
  const [selectedTypeTable, setSelectedTypeTable] = useState(null);

  const handleSubmit = () => {
    goToPage(selectedTypeTable);
    setSelectedTypeTable(null);
    closeDrawer();
  };

  return (
    <div className='drawer z-20'>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
      ></div>

      <div
        id={idDrawer}
        className={`w-full h-max fixed bottom-0 left-0 right-0 bg-white p-4 pb-8 rounded-t-2xl shadow-lg transition-transform duration-300 transform ${
          isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='flex items-center justify-between text-color-1'>
          <div className='flex-none'>
            <MdArrowBackIosNew className='text-xl' onClick={closeDrawer} />
          </div>
          <h2 className='flex-1 !text-center mr-4 subheadline-s'>
            {convertLabelUnderscore(selectedCriteriaGrading)}
          </h2>
        </div>
        <div className='flex flex-col gap-2 mt-4'>
          <Button
            variant='primary-outline'
            size='lg'
            className={`border-none flex items-center justify-between ${
              selectedTypeTable === 'Tren Kriteria' && '!bg-[#F6F6F6]'
            }`}
            onClick={() => setSelectedTypeTable('Tren Kriteria')}
            full
          >
            Tren Kriteria
            {selectedTypeTable === 'Tren Kriteria' && (
              <IoMdCheckmark className='text-2xl' />
            )}
          </Button>
          <Button
            variant='primary-outline'
            size='lg'
            className={`border-none flex items-center justify-between ${
              selectedTypeTable === 'Analisa Vendor' && '!bg-[#F6F6F6]'
            }`}
            onClick={() => setSelectedTypeTable('Analisa Vendor')}
            full
          >
            Analisa Vendor
            {selectedTypeTable === 'Analisa Vendor' && (
              <IoMdCheckmark className='text-2xl' />
            )}
          </Button>
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

export default MobileDrawerCriteriaGrading;
