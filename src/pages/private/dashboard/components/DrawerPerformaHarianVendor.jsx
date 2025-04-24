import { createColumnHelper } from '@tanstack/react-table';

import { IoMdClose } from 'react-icons/io';

import CustomTable from '@/components/shared/CustomTable';
import Drawer from '@/components/shared/Drawer';
import Button from '@/components/shared/Button';

const tempData = new Array(10).fill().map(() => ({
  tanggal: '01/01/2025, 19:10:10',
  totalTruk: '88',
  avgTbsTruk: '16,8',
  avgDiterima: '16,8',
  avgMM: '16,8',
  avgLM: '16,8',
  avgTP: '16,8',
  avgM: '16,8',
  avgJK: '16,8',
  avhBK: '16,8',
}));

const DrawerPerformaHarianVendor = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  data,
}) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('tanggal', {
      header: <div className='w-32'>TANGGAL</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('totalTruk', {
      header: <div>TOTAL TRUK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('avgTbsTruk', {
      header: (
        <div>
          AVG <br /> TBS TRUK
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('avgDiterima', {
      header: (
        <div>
          % AVG <br /> DITERIMA
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('avgMM', {
      header: (
        <div>
          % AVG <br /> MM
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('avgLM', {
      header: (
        <div>
          % AVG <br /> LM
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('avgTP', {
      header: (
        <div>
          % AVG <br /> TP
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
      meta: { className: 'bg-[#F8EDCB]' },
    }),
    columnHelper.accessor('avgM', {
      header: (
        <div>
          % AVG <br /> M
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('avgJK', {
      header: (
        <div>
          % AVG <br /> JK
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('avhBK', {
      header: (
        <div>
          % AVG <br /> BK
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
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
      widthDrawer='80vw'
    >
      <div className='flex items-center justify-between'>
        <h3 className='subheadline-m text-color-1'>Performa Harian Vendor</h3>
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
          <CustomTable dataTable={tempData} columns={columns} />
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerPerformaHarianVendor;
