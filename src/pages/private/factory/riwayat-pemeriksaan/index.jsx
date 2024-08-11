import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import {
  MdOutlineFilterAlt,
  MdKeyboardArrowRight,
  MdOutlineTextSnippet,
  MdAddChart,
  MdOutlineVisibility,
} from 'react-icons/md';

import { useGetWithPost } from '@/services/use-services';

import Button from '@/components/shared/Button';
import DrawerFilterRiwayat from '../components/DrawerFilterRiwayat';
import CustomTable from '@/components/shared/CustomTable';

import dayjs from 'dayjs';

const RiwayatPemeriksaanPage = () => {
  const [searchParams] = useSearchParams();
  const factoryId = searchParams.get('factory');

  const { data, loading, refetch } = useGetWithPost(
    '/v1/inspection-history',
    {},
    false
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
    columnHelper.accessor('updatedAt', {
      header: 'WAKTU',
      cell: (info) => dayjs(info.getValue()).format('DD/MM/YYYY, HH:MM:ss'),
    }),
    columnHelper.accessor('vendor', {
      header: 'VENDOR',
      cell: (info) => info.getValue().name,
    }),
    columnHelper.accessor('waybill_number', {
      header: 'SURAT JALAN',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('vehicle_number', {
      header: 'PLAT KENDARAAN',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('total_tandon', {
      header: 'TOTAL TANDAN',
      cell: (info) => <div className=''>{info.getValue()}</div>,
    }),
    columnHelper.accessor('total_rejected', {
      header: 'DITOLAK',
      cell: (info) => <div className=''>{info.getValue()}</div>,
    }),
    columnHelper.accessor('diterima', {
      header: 'DITERIMA',
      cell: (info) => <div className=''>{info.getValue() || '-'}</div>,
    }),
    columnHelper.accessor('didenda', {
      header: 'DIDENDA',
      cell: (info) => <div className=''>{info.getValue() || '-'}</div>,
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
                navigate(`${info.row.original._id}?factory=${factoryId}`)
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

  useEffect(() => {
    refetch({ factory: [factoryId] });
  }, []);

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <div className='flex items-center'>
            <Link to='/factory' className='font-semibold text-2xl text-color-3'>
              Pabrik {data && data[0]?.factory.name}
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='font-semibold text-3xl text-color-1'>
              Riwayat Pemeriksaan
            </h2>
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
            <p className='text-xl text-color-1'>1000 (80%)</p>
          </div>
          <div className='card rounded-xl bg-white font-semibold py-4 px-8 border border-[#EEEEEE]'>
            <label className='text-color-3'>TOTAL DITERIMA</label>
            <p className='text-xl text-color-1'>1000 (80%)</p>
          </div>
          <div className='card rounded-xl bg-white font-semibold py-4 px-8 border border-[#EEEEEE]'>
            <label className='text-color-3'>TOTAL DIDENDA</label>
            <p className='text-xl text-color-1'>1000 (80%)</p>
          </div>
        </div>
        <div className='bg-white rounded-2xl p-4 overflow-x-auto h-full'>
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
        />

        <DrawerFilterRiwayat />
      </main>
    </div>
  );
};

export default RiwayatPemeriksaanPage;
