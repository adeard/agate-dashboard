import { createColumnHelper } from '@tanstack/react-table';

import { IoMdClose } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa6';

import CustomTable from '@/components/shared/CustomTable';
import Drawer from '@/components/shared/Drawer';
import Button from '@/components/shared/Button';
import {
  convertLabelUnderscore,
  formatPercentWithLeadingZeros,
} from '@/utils/common';

const getStarColor = (rank) => {
  if (rank === 1) return '#FFD700';
  if (rank === 2) return '#DADADA';
  if (rank === 3) return '#DEA35A';
  return '#000000';
};

const getRankTextColor = (rank) => {
  return rank >= 4 ? '#FFFFFF' : '#000000';
};

const getIcon = (rank) => {
  return rank >= 4 ? (
    <span className='relative inline-block w-5 h-5'>
      <FaCircle
        className='absolute inset-0 w-full h-full'
        style={{ color: getStarColor(rank) }}
      />
      <span
        className='absolute inset-0 flex items-center justify-center text-[10px] font-bold'
        style={{ color: getRankTextColor(rank) }}
      >
        {rank}
      </span>
    </span>
  ) : (
    <span className='relative inline-block w-7 h-7 -top-0.5'>
      <FaStar
        className='absolute inset-0 w-full h-full'
        style={{ color: getStarColor(rank) }}
      />
      <span
        className='absolute inset-0 flex items-center justify-center text-xs font-bold top-1'
        style={{ color: getRankTextColor(rank) }}
      >
        {rank}
      </span>
    </span>
  );
};

const DrawerAnalisaVendor = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  data,
  criteria,
}) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('no', {
      header: <div className='text-center'>NO</div>,
      cell: (info) => <div className='text-center'>{info.row.index + 1}</div>,
    }),
    columnHelper.accessor('vendor_name', {
      header: <div className='text-color-2'>VENDOR</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('supply', {
      header: <div className='text-color-2'>SUPPLY BUAH</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
          {getIcon(info.row.original.supply_rank)}
        </div>
      ),
    }),
    columnHelper.accessor('percent', {
      header: (
        <div className='text-color-2 uppercase'>
          % AVG {convertLabelUnderscore(criteria)}
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
          {getIcon(info.row.original.percent_rank)}
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
      widthDrawer='728px'
    >
      <div className='flex items-center justify-between'>
        <h3 className='subheadline-m text-color-1'>Analisa Vendor</h3>
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

export default DrawerAnalisaVendor;
