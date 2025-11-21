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

const countPercentage = (value = 0, divider = 0, fixed = null) => {
  let percent = (value / divider || 1) * 100;

  return divider === 0 ? 0 : fixed ? percent.toFixed(fixed) : percent;
};

const RiwayatPemeriksaanPage = () => {
  const { factoryId } = useParams();
  const factoryName = sessionStorage.getItem('factoryName');

  const { data, loading, meta, refetch, setQueryParams, objectSearch } = useGet(
    '/v1/inspection-data/by-factory/' + factoryId
  );
  const { data: dataExcel, refetch: refetchDownloadExcel } = useGet(
    '/v1/inspection-data/download-excel/' + factoryId,
    null,
    false
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
      header: 'TANGGAL',
      cell: (info) => dayjs(info.getValue()).format('DD/MM/YYYY'),
    }),
    columnHelper.accessor('finish_date', {
      header: 'WAKTU',
      cell: (info) =>
        `${dayjs(info.row.original.date).format('HH:mm')} - ${dayjs(
          info.getValue()
        ).format('HH:mm')}`,
    }),
    columnHelper.accessor('machine', {
      header: 'MESIN',
      cell: (info) => (info.getValue() ? info.getValue() : '-'),
    }),
    columnHelper.accessor('vendor_name', {
      header: 'VENDOR',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('vendor_type', {
      header: 'TIPE VENDOR',
      cell: (info) => {
        const type = info.getValue();
        const engine = info.row.original.engine_type;

        if (Number(type) === 2) {
          return `Plasma ${engine === 'V6' ? 'Normal' : '(KM)'}`;
        } else {
          return 'Inti';
        }
      },
    }),
    columnHelper.accessor('delivery_number', {
      header: 'SURAT JALAN',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('vehicle_number', {
      header: 'PLAT KENDARAAN',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('grading_result.total_tandan', {
      header: 'TOTAL TANDAN',
      cell: (info) => <div className=''>{info.getValue()}</div>,
    }),
    columnHelper.accessor('grading_result.total_rejected', {
      header: 'DITOLAK',
      cell: (info) => (
        <div className=''>
          {Number(info.getValue() || 0)} (
          {(
            (Number(info.getValue() || 0) /
              Number(info.row.original.grading_result.total_tandan || 1)) *
            100
          ).toLocaleString('en', { maximumFractionDigits: 2 })}
          %)
        </div>
      ),
    }),
    columnHelper.accessor('grading_result.total_accepted', {
      header: 'DITERIMA',
      cell: (info) => (
        <div className=''>
          {Number(info.getValue() || 0)} (
          {(
            (Number(info.getValue() || 0) /
              Number(info.row.original.grading_result.total_tandan || 1)) *
            100
          ).toLocaleString('en', { maximumFractionDigits: 2 })}
          %)
        </div>
      ),
    }),
    columnHelper.accessor('grading_result.total_fined', {
      header: 'DIDENDA',
      cell: (info) => (
        <div className=''>
          {Number(info.getValue() || 0)} (
          {(
            (Number(info.getValue() || 0) /
              Number(info.row.original.grading_result.total_accepted || 1)) *
            100
          ).toLocaleString('en', { maximumFractionDigits: 2 })}
          %)
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => {
        const navigate = useNavigate();

        return (
          <div className='flex justify-end gap-4'>
            <Button
              className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
              size='lg'
              onClick={() =>
                window.open(
                  `riwayat-pemeriksaan/${info.row.original._id}`,
                  '_blank'
                )
              }
            >
              <MdOutlineVisibility className='text-lg' />
              Detail
            </Button>
          </div>
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
            <h2 className='headline-s'>Riwayat Pemeriksaan</h2>
          </div>
          <div className='flex gap-4'>
            <Button
              size='lg'
              className='flex items-center'
              onClick={() => {
                const query = new URLSearchParams(objectSearch).toString();

                window.open(
                  `${BASE_URL}/v1/inspection-data/download-pdf/${factoryId}/summary?${query}`,
                  '_blank'
                );
              }}
            >
              <MdOutlineTextSnippet className='text-xl mr-2' />
              Download PDF
            </Button>
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
        <div className='grid grid-cols-3 gap-4 mb-8'>
          <div className='card rounded-xl bg-white font-semibold py-4 px-8 border border-[#EEEEEE]'>
            <label className='text-color-3'>TOTAL DITOLAK</label>
            <p className='text-xl text-color-1'>
              {(meta?.total_rejected || 0).toLocaleString()} (
              {countPercentage(
                meta?.total_rejected || 0,
                meta?.total_tandan,
                2
              )}
              % )
            </p>
          </div>
          <div className='card rounded-xl bg-white font-semibold py-4 px-8 border border-[#EEEEEE]'>
            <label className='text-color-3'>TOTAL DITERIMA</label>
            <p className='text-xl text-color-1'>
              {(meta?.total_accepted || 0).toLocaleString()} (
              {countPercentage(
                meta?.total_accepted || 0,
                meta?.total_tandan,
                2
              )}
              % )
            </p>
          </div>
          <div className='card rounded-xl bg-white font-semibold py-4 px-8 border border-[#EEEEEE]'>
            <label className='text-color-3'>TOTAL DIDENDA</label>
            <p className='text-xl text-color-1'>
              {(meta?.total_fined || 0).toLocaleString()} (
              {countPercentage(meta?.total_fined || 0, meta?.total_tandan, 2)}%
              )
            </p>
          </div>
        </div>
        <div
          className='bg-white rounded-2xl overflow-x-auto min-h-[calc(100vh-218px)] h-full'
          style={{ boxShadow: '0px 0px 4px -1px #E0D6D6' }}
        >
          <CustomTable
            dataTable={data || []}
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

export default RiwayatPemeriksaanPage;
