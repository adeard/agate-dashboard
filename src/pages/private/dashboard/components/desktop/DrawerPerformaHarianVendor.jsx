import { createColumnHelper } from '@tanstack/react-table';

import { IoMdClose } from 'react-icons/io';

import Table from '@/components/shared/Table';
import Drawer from '@/components/shared/Drawer';
import Button from '@/components/shared/Button';
import { formatPercentWithLeadingZeros } from '@/utils/common';

const DrawerPerformaHarianVendor = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  data,
  vendor,
}) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('date', {
      header: <div>TANGGAL</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('trucks', {
      header: <div>TOTAL TRUK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('avg_tandan', {
      header: <div>AVG TBS TRUK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {Math.round(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('avg_accepted', {
      header: <div>% DITERIMA</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('percent_accepted', {
      header: <div>% DITOLAK</div>,
      cell: (info) => <div className='!body-m-b !text-color-1'>-</div>,
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('percent_accepted', {
      header: <div>% DIDENDA</div>,
      cell: (info) => <div className='!body-m-b !text-color-1'>-</div>,
      meta: { className: 'bg-[#F8EDCB]' },
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
      widthDrawer='70vw'
    >
      <div className='flex items-center justify-between'>
        <h3 className='subheadline-m text-color-1'>
          Performa Harian Vendor {vendor}
        </h3>
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
          <Table dataTable={data || []} columns={columns} />
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerPerformaHarianVendor;
