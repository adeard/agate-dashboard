import { Link, useNavigate, useParams } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import {
  MdOutlineFilterAlt,
  MdKeyboardArrowRight,
  MdOutlineTextSnippet,
  MdAddChart,
  MdOutlineVisibility,
} from 'react-icons/md';

import { useGet } from '@/services/use-services';
import useDrawer from '@/hooks/useDrawer';

import Button from '@/components/shared/Button';
import DrawerFilterRiwayat from '../components/DrawerFilterRiwayat';
import CustomTable from '@/components/shared/CustomTable';

import dayjs from 'dayjs';
import exportExcel from '@/utils/xlsx';
import { BASE_URL } from '@/utils/axios';
import { getObjectSearch } from '@/utils/common';

const tempData = new Array(10).fill().map(() => ({
  date: new Date(),
  status: 'info',
  subject: 'sensor',
  keterangan: 's2_normal',
  kode: 'SNS02-04',
  pesan: 'Sensor S2 berfungsi normal',
}));

const DetailLogsMesinPage = () => {
  const { factoryId } = useParams();
  const factoryName = sessionStorage.getItem('factoryName');

  const { data, loading, refetch, setQueryParams } = useGet('');

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
    columnHelper.accessor('keterangan', {
      header: 'KETERANGAN',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('kode', {
      header: 'KODE',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('pesan', {
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
            <h2 className='headline-s'>Logs 18/11/2025</h2>
          </div>
          <div className='flex gap-4'>
            <Button
              size='lg'
              className='flex items-center'
              onClick={() => {
                refetchDownloadExcel().then((res) => {
                  exportExcel(res, 'Laporan Excel Grading All');
                });
              }}
            >
              <MdAddChart className='text-xl mr-2' />
              Download Excel
            </Button>
            <Button
              variant='primary-outline'
              size='lg'
              className='flex items-center button-shadow'
              onClick={toggleDrawerFilter}
            >
              <MdOutlineFilterAlt className='text-2xl mr-2' />
              Filter
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
