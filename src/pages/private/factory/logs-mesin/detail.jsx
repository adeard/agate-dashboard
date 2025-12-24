import { Link, useParams, useSearchParams } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';

import { MdKeyboardArrowRight, MdAddChart } from 'react-icons/md';

import { HiOutlineRefresh } from 'react-icons/hi';

import Button from '@/components/shared/Button';
import DrawerFilterRiwayat from '../components/DrawerFilterRiwayat';
import CustomTable from '@/components/shared/CustomTable';

import dayjs from 'dayjs';

import useDrawer from '@/hooks/useDrawer';

import { useGet } from '@/services/use-services';

const DetailLogsMesinPage = () => {
  const { factoryId, mesinNumber, logDate } = useParams();
  const [searchParams] = useSearchParams();

  const factoryName = sessionStorage.getItem('factoryName');
  const mesinName = sessionStorage.getItem('mesinName');

  const { data, loading, refetch, setQueryParams } = useGet(
    `/v4/machine-logs/data`,
    {
      filename: searchParams.get('filename'),
    }
  );

  const {
    idDrawer: idDrawerFilter,
    isDrawerOpen: isDrawerFilterOpen,
    toggleDrawer: toggleDrawerFilter,
    closeDrawer: closeDrawerFilter,
  } = useDrawer('DrawerFilter');

  // table column
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('no', {
      header: <div className='text-center'>NO</div>,
      cell: (info) => <div className='text-center'>{info.row.index + 1}</div>,
    }),
    columnHelper.accessor('date', {
      header: 'WAKTU',
      cell: (info) => dayjs(info.getValue()).format('hh:mm DD/MM/YYYY'),
    }),
    columnHelper.accessor('status', {
      header: 'STATUS',
      cell: (info) => (
        <>
          {info.getValue() === 'info' ? (
            <div className='badge bg-[#E8F8E4] text-[#299300] rounded-md'>
              INFO
            </div>
          ) : (
            <div className='badge bg-[#FEECEA] text-[#C93532] rounded-md'>
              ERROR
            </div>
          )}
        </>
      ),
    }),
    columnHelper.accessor('subject', {
      header: 'SUBJECT',
      cell: (info) => (info.getValue() ? info.getValue() : '-'),
    }),
    columnHelper.accessor('notes', {
      header: 'KETERANGAN',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('code', {
      header: 'KODE',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('message', {
      header: 'PESAN',
      cell: (info) => info.getValue(),
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
            <Link
              to={`/factory/${factoryId}/logs-mesin/${mesinNumber}`}
              className='font-semibold text-2xl text-color-3'
            >
              {mesinName}
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='headline-s'>
              Logs {dayjs(logDate).format('DD/MM/YYYY')}
            </h2>
          </div>
          <div className='flex gap-4'>
            <Button
              size='lg'
              className='flex items-center'
              onClick={() => refetch()}
            >
              <HiOutlineRefresh className='text-xl mr-2' />
              Muat Ulang
            </Button>
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

        <DrawerFilterRiwayat
          idDrawer={idDrawerFilter}
          isDrawerOpen={isDrawerFilterOpen}
          closeDrawer={closeDrawerFilter}
          setQueryParams={setQueryParams}
          refetch={refetch}
        />
      </main>
    </div>
  );
};

export default DetailLogsMesinPage;
