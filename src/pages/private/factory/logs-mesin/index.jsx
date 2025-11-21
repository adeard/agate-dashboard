import { Link, useParams } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import {
  MdOutlineFilterAlt,
  MdKeyboardArrowRight,
  MdOutlineVisibility,
} from 'react-icons/md';

import { useGet } from '@/services/use-services';
import useDrawer from '@/hooks/useDrawer';

import Button from '@/components/shared/Button';
import DrawerFilterVendor from '../components/DrawerFilterVendor';
import CustomTable from '@/components/shared/CustomTable';
import dayjs from 'dayjs';

const tempData = new Array(10).fill().map(() => ({
  logs: new Date(),
}));

const LogsMesinPage = () => {
  const { factoryId } = useParams();
  const factoryName = sessionStorage.getItem('factoryName');

  const { data, loading, refetch, setQueryParams } = useGet('');

  const {
    idDrawer: idDrawerFilterVendor,
    isDrawerOpen: isDrawerFilterVendorOpen,
    toggleDrawer: toggleDrawerFilter,
    closeDrawer: closeDrawerFilter,
  } = useDrawer('DrawerFilterVendor');

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
    columnHelper.accessor('logs', {
      header: <div className='w-20'>PABRIK</div>,
      cell: (info) => (
        <div className='!body-m-r !text-color-1 !font-medium'>
          {dayjs(info.getValue()).format('DD/MM/YYYY')}
        </div>
      ),
    }),
    columnHelper.display({
      header: <div className='end-column-content'></div>,
      id: 'actions',
      cell: (info) => (
        <Link to='1'>
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
          <div className='flex gap-4'>
            <Button
              variant='primary-outline'
              size='lg'
              className='flex items-center button-shadow'
              onClick={toggleDrawerFilter}
            >
              <MdOutlineFilterAlt className='text-2xl mr-2' />
              Filter
            </Button>
            {/* <Button
              size='lg'
              className='flex items-center'
              onClick={toggleDrawerAdd}
            >
              <IoMdAdd className='text-2xl mr-2' />
              Add
            </Button> */}
          </div>
        </div>
      </header>
      <main>
        <div
          className='bg-white rounded-2xl overflow-x-auto min-h-[calc(100vh-218px)] h-full'
          style={{ boxShadow: '0px 0px 4px -1px #E0D6D6' }}
        >
          <CustomTable
            dataTable={tempData || []}
            columns={columns}
            showPagination={true}
            loading={loading}
          />
        </div>

        <DrawerFilterVendor
          idDrawer={idDrawerFilterVendor}
          isDrawerOpen={isDrawerFilterVendorOpen}
          closeDrawer={closeDrawerFilter}
          setQueryParams={setQueryParams}
          refetch={refetch}
        />
      </main>
    </div>
  );
};

export default LogsMesinPage;
