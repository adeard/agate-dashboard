import { Link } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import { MdKeyboardArrowRight, MdOutlineVisibility } from 'react-icons/md';

import Button from '@/components/shared/Button';
import CustomTable from '@/components/shared/CustomTable';

const tempData = new Array(4).fill().map((_, index) => ({
  mesin: `Mesin ${index + 1}`,
}));

const LogsMesinPage = () => {
  const factoryName = sessionStorage.getItem('factoryName');

  // table column
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('no', {
      header: <div className='text-center'>NO</div>,
      cell: (info) => (
        <div className='text-center !body-m-r !text-color-1'>
          {info.row.index + 1}
        </div>
      ),
    }),
    columnHelper.accessor('mesin', {
      header: <div className='w-20'>PABRIK</div>,
      cell: (info) => (
        <div className='!body-m-r !text-color-1 !font-medium'>
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.display({
      header: <div className='end-column-content'></div>,
      id: 'actions',
      cell: (info) => (
        <Link
          to={String(info.row.index + 1)}
          onClick={() =>
            sessionStorage.setItem('mesinName', info.row.original.mesin)
          }
        >
          <Button
            className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
            size='lg'
          >
            <MdOutlineVisibility className='text-lg' />
            Detail Logs
          </Button>
        </Link>
      ),
    }),
  ];

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <div className='flex items-center'>
            <Link to='/factory' className='font-semibold text-2xl text-color-3'>
              {factoryName}
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='headline-s'>Logs Mesin</h2>
          </div>
        </div>
      </header>
      <main>
        <div
          className='bg-white rounded-2xl overflow-x-auto min-h-[calc(100vh-218px)] h-full'
          style={{ boxShadow: '0px 0px 4px -1px #E0D6D6' }}
        >
          <CustomTable
            dataTable={tempData}
            columns={columns}
            showPagination={true}
          />
        </div>
      </main>
    </div>
  );
};

export default LogsMesinPage;