import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import {
  MdOutlineFilterAlt,
  MdKeyboardArrowRight,
  MdOutlineTextSnippet,
  MdAddChart,
  MdOutlineVisibility,
} from 'react-icons/md';

import { useGet, useGetWithPost } from '@/services/use-services';

import Button from '@/components/shared/Button';
import DrawerFilterRiwayat from '../components/DrawerFilterRiwayat';
import CustomTable from '@/components/shared/CustomTable';

import dayjs from 'dayjs';

const countPercentage = (value = 0, divider = 0, fixed = null) => {
  let percent = (value / divider || 1) * 100;

  return divider === 0 ? 0 : fixed ? percent.toFixed(fixed) : percent;
};

const RiwayatPemeriksaanPage = () => {
  const { factoryId } = useParams();
  const factoryName = sessionStorage.getItem('factoryName');

  const { data, loading, meta, refetch, setQueryParams } = useGet(
    '/v1/inspection-data/by-factory/' + factoryId
  );
  const idDrawerFilter = 'DrawerFilter';
  const [isDrawerFilterOpen, setIsDrawerFilterOpen] = useState(false);

  const toggleDrawerFilter = () => {
    const drawerElement = document.getElementById(idDrawerFilter);
    drawerElement.checked = true;
    setIsDrawerFilterOpen(!isDrawerFilterOpen);
  };

  // table column
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('no', {
      header: <div className='text-center'>NO</div>,
      cell: (info) => <div className='text-center'>{info.row.index + 1}</div>,
      size: 20,
    }),
    columnHelper.accessor('date', {
      header: 'WAKTU',
      cell: (info) => dayjs(info.getValue()).format('DD/MM/YYYY, HH:MM:ss'),
    }),
    columnHelper.accessor('vendor_name', {
      header: 'VENDOR',
      cell: (info) => info.getValue(),
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
      cell: (info) => <div className=''>{info.getValue()}</div>,
    }),
    columnHelper.accessor('grading_result.total_accepted', {
      header: 'DITERIMA',
      cell: (info) => <div className=''>{info.getValue()}</div>,
    }),
    columnHelper.accessor('grading_result.total_fined', {
      header: 'DIDENDA',
      cell: (info) => <div className=''>{info.getValue()}</div>,
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
              onClick={() => navigate(`${info.row.original._id}`)}
            >
              <MdOutlineVisibility className='text-lg' />
              Detail
            </Button>
          </div>
        );
      },
    }),
  ];

  console.log(data);

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
            <Button size='lg' className='flex items-center'>
              <MdOutlineTextSnippet className='text-xl mr-2' />
              Download PDF
            </Button>
            <Button size='lg' className='flex items-center'>
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
              {(meta?.total_fined || 0).toLocaleString()}(
              {countPercentage(meta?.total_fined || 0, meta?.total_tandan, 2)}%
              )
            </p>
          </div>
        </div>
        <div className='bg-white rounded-2xl p-4 h-full'>
          {data && (
            <CustomTable
              dataTable={data}
              columns={columns}
              showPagination={true}
            />
          )}
        </div>

        <DrawerFilterRiwayat
          idDrawer={idDrawerFilter}
          isDrawerOpen={isDrawerFilterOpen}
          closeDrawer={() => setIsDrawerFilterOpen(false)}
          setQueryParams={setQueryParams}
          refetch={refetch}
        />
      </main>
    </div>
  );
};

export default RiwayatPemeriksaanPage;
