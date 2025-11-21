import { Link, useParams } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import {
  MdKeyboardArrowRight,
  MdFileDownload,
  MdOutlineVisibility,
} from 'react-icons/md';

import { useGet } from '@/services/use-services';
import useDrawer from '@/hooks/useDrawer';

import Button from '@/components/shared/Button';
import DrawerFilterVendor from '../components/DrawerFilterVendor';
import CustomTable from '@/components/shared/CustomTable';
import Checkbox from '@/components/shared/Checkbox';

import dayjs from 'dayjs';

const tempData = Array.from({ length: 15 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);

  const dayName = date.toLocaleDateString('id-ID', { weekday: 'long' });

  return {
    date,
    cek_awal: true,
    cek_akhir: true,
    cek_mingguan: dayName === 'Minggu',
  };
});

const DetailMesinPage = () => {
  const { factoryId, mesinId } = useParams();

  const factoryName = sessionStorage.getItem('factoryName');
  const mesinName = sessionStorage.getItem('mesinName');

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
    columnHelper.accessor('date', {
      header: <div className='w-20'>PABRIK</div>,
      cell: (info) => {
        const date = dayjs(info.getValue());
        const isSunday = date.format('dddd') === 'Sunday';

        return (
          <div className='!body-m-r !text-color-1 !font-medium'>
            <span className={isSunday && 'text-secondary-2'}>
              {date.format('dddd')}
            </span>
            , {date.format('DD MMMM YYYY')}
          </div>
        );
      },
    }),
    columnHelper.accessor('cek_awal', {
      header: <div className='text-center'>PEMERIKSAAN HARIAN AWAL</div>,
      cell: (info) => (
        <div className='flex justify-center'>
          <Checkbox isChecked={info.getValue()} />
        </div>
      ),
    }),
    columnHelper.accessor('cek_akhir', {
      header: <div className='text-center'>PEMERIKSAAN HARIAN AKHIR</div>,
      cell: (info) => (
        <div className='flex justify-center'>
          <Checkbox isChecked={info.getValue()} />
        </div>
      ),
    }),
    columnHelper.accessor('cek_mingguan', {
      header: <div className='text-center'>PEMERIKSAAN MINGGUAN</div>,
      cell: (info) => (
        <div className='flex justify-center'>
          <Checkbox isChecked={info.getValue()} />
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
            Detail
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
            <Link
              to={`/factory/${factoryId}/history-maintenance`}
              className='font-semibold text-2xl text-color-3'
            >
              History Maintenance
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='headline-s'>{mesinName}</h2>
          </div>
          <div className='flex gap-4'>
            <Button
              size='lg'
              className='flex items-center'
              // onClick={() => {
              //   window.open(
              //     BASE_URL +
              //       '/v1/inspection-data/download-pdf/' +
              //       (historyId ? historyId : id),
              //     '_blank'
              //   );
              // }}
            >
              <MdFileDownload className='text-xl mr-2' />
              Unduh Laporan
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

export default DetailMesinPage;
