import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import {
  MdOutlineFilterAlt,
  MdKeyboardArrowRight,
  MdOutlineTextSnippet,
  MdAddChart,
  MdOutlineVisibility,
} from 'react-icons/md';

import Button from '@/components/shared/Button';
import DrawerFilterRiwayat from '../components/DrawerFilterRiwayat';
import CustomTable from '@/components/shared/CustomTable';

const data = Array.from({ length: 50 }).map((_, index) => ({
  no: index + 1,
  waktu: '05/09/2024, 13:08:01',
  vendor: 'PT Abadi Jaya',
  suratJalan: 'AXX235',
  platKendaraan: 'B 1253 XXX',
  totalTandan: 600,
  ditolak: '15%',
  diterima: '15%',
  didenda: '15%',
}));

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('no', {
    header: 'NO',
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor('waktu', {
    header: 'WAKTU',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('vendor', {
    header: 'VENDOR',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('suratJalan', {
    header: 'SURAT JALAN',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('platKendaraan', {
    header: 'PLAT KENDARAAN',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('totalTandan', {
    header: 'TOTAL TANDAN',
    cell: (info) => <div className=''>{info.getValue()}</div>,
  }),
  columnHelper.accessor('ditolak', {
    header: 'DITOLAK',
    cell: (info) => <div className=''>{info.getValue()}</div>,
  }),
  columnHelper.accessor('diterima', {
    header: 'DITERIMA',
    cell: (info) => <div className=''>{info.getValue()}</div>,
  }),
  columnHelper.accessor('didenda', {
    header: 'DIDENDA',
    cell: (info) => <div className=''>{info.getValue()}</div>,
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => {
      const navigate = useNavigate();

      return (
        <div className='flex justify-end gap-4'>
          <Button
            className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
            size='lg'
            onClick={() => navigate('1')}
          >
            <MdOutlineVisibility className='text-lg' />
            Detail
          </Button>
        </div>
      );
    },
  }),
];

const RiwayatPemeriksaanPage = () => {
  const idDrawerFilter = 'DrawerFilter';
  const [isDrawerFilterOpen, setIsDrawerFilterOpen] = useState(false);

  const toggleDrawerFilter = () => {
    const drawerElement = document.getElementById(idDrawerFilter);
    drawerElement.checked = true;
    setIsDrawerFilterOpen(!isDrawerFilterOpen);
  };

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <div className='flex items-center'>
            <Link to='/factory' className='font-semibold text-2xl text-color-3'>
              Pabrik A
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='font-semibold text-3xl text-color-1'>
              Riwayat Pemeriksaan A
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
          <CustomTable
            dataTable={data}
            columns={columns}
            showPagination={true}
          />
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
