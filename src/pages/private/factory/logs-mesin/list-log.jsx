import { Link, useParams } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import { MdKeyboardArrowRight, MdOutlineVisibility } from 'react-icons/md';

import { useGet } from '@/services/use-services';
import useDrawer from '@/hooks/useDrawer';

import Button from '@/components/shared/Button';
import DrawerFilterVendor from '../components/DrawerFilterVendor';
import CustomTable from '@/components/shared/CustomTable';

import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const ListLogPage = () => {
  const { factoryId, mesinNumber } = useParams();

  const factoryName = sessionStorage.getItem('factoryName');
  const mesinName = sessionStorage.getItem('mesinName');

  const { data, loading, refetch, setQueryParams } = useGet(
    '/v4/machine-logs/file',
    { factory: factoryId, machine: mesinNumber }
  );

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
    columnHelper.accessor('date', {
      header: <div className='w-20'>TANGGAL</div>,
      cell: (info) => (
        <div className='!body-m-r !text-color-1 !font-medium'>
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.display({
      header: <div className='end-column-content'></div>,
      id: 'actions',
      cell: (info) => {
        const raw = info.row.original.date;

        const urlDate = dayjs(raw, 'DD/MM/YYYY').format('YYYY-MM-DD');

        console.log(raw, urlDate);
        return (
          <Link to={`${urlDate}?filename=${info.row.original.filename}`}>
            <Button
              className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
              size='lg'
            >
              <MdOutlineVisibility className='text-lg' />
              Detail Logs
            </Button>
          </Link>
        );
      },
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
            <Link
              to={`/factory/${factoryId}/logs-mesin`}
              className='font-semibold text-2xl text-color-3'
            >
              Logs Mesin
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='headline-s'>{mesinName}</h2>
          </div>
        </div>
      </header>
      <main>
        <div
          className='bg-white rounded-2xl overflow-x-auto min-h-[calc(100vh-218px)] h-full'
          style={{ boxShadow: '0px 0px 4px -1px #E0D6D6' }}
        >
          <CustomTable
            dataTable={data}
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

export default ListLogPage;
