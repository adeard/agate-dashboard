import { createColumnHelper } from '@tanstack/react-table';

import { IoMdClose } from 'react-icons/io';

import CustomTable from '@/components/shared/CustomTable';
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
  console.log('harian vendor', data);

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
      header: (
        <div>
          AVG <br /> TBS TRUK
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {Math.round(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('avg_accepted', {
      header: (
        <div>
          AVG <br /> DITERIMA
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {Math.round(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('avg_matang', {
      header: (
        <div>
          AVG <br /> MM
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('avg_lewat_matang', {
      header: (
        <div>
          AVG <br /> LM
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('avg_tangkai_panjang', {
      header: (
        <div>
          AVG <br /> TP
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
        </div>
      ),
      meta: { className: 'bg-[#F8EDCB]' },
    }),
    columnHelper.accessor('avg_mentah', {
      header: (
        <div>
          AVG <br /> M
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('avg_janjang_kosong', {
      header: (
        <div>
          AVG <br /> JK
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('avg_buah_kecil', {
      header: (
        <div>
          AVG <br /> BK
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
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
      widthDrawer='50vw'
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
          <CustomTable dataTable={data || []} columns={columns} />
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerPerformaHarianVendor;
