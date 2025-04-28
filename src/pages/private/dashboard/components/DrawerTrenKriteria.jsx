import { createColumnHelper } from '@tanstack/react-table';

import { IoMdClose } from 'react-icons/io';

import CustomTable from '@/components/shared/CustomTable';
import Drawer from '@/components/shared/Drawer';
import Button from '@/components/shared/Button';
import {
  convertLabel,
  convertLabelUnderscore,
  formatPercentWithLeadingZeros,
} from '@/utils/common';
import dayjs from 'dayjs';

const DrawerTrenKriteria = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  data,
  criteria,
}) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('date', {
      header: <div className='text-color-2 w-32'>TANGGAL</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue() || '-'}</div>
      ),
    }),
    columnHelper.accessor('percent', {
      header: (
        <div className='text-color-2 uppercase'>
          % AVG {convertLabelUnderscore(criteria)}
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
        </div>
      ),
    }),
  ];

  const handleClose = () => {
    const drawerElement = document.getElementById(idDrawer);
    drawerElement.checked = false;
    closeDrawer();
  };

  return (
    <Drawer
      idDrawer={idDrawer}
      isOpen={isDrawerOpen}
      closeDrawer={handleClose}
      widthDrawer='494px'
    >
      <div className='flex items-center justify-between'>
        <h3 className='subheadline-m text-color-1'>Tren Kriteria</h3>
        <Button
          variant='primary-outline'
          className='border-none'
          onClick={handleClose}
        >
          <IoMdClose className='text-2xl' />
        </Button>
      </div>

      <div
        className='card mt-8 w-full bg-white'
        style={{ boxShadow: '0px 0px 4px -1px #E0D6D6' }}
      >
        <div className='p-2 pb-8'>
          <CustomTable dataTable={data || []} columns={columns} />
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerTrenKriteria;
