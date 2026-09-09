import { useSearchParams } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';

import { IoMdClose } from 'react-icons/io';
import { MdOutlineVisibility } from 'react-icons/md';

import Table from '@/components/shared/Table';
import Drawer from '@/components/shared/Drawer';
import Button from '@/components/shared/Button';
import dayjs from 'dayjs';
import {
  formatCurrency,
  formatDuration,
  formatPercentWithLeadingZeros,
} from '@/utils/common';

// const tempData = new Array(10).fill().map(() => ({
//   tanggal: '01/01/2025, 19:10:10',
//   nomorMesin: '3',
//   suratJalan: '00000000',
//   platKendaraan: 'BM 8888 AB',
//   tbsTruk: '88',
//   diterima: '16,8',
//   MM: '16,8',
//   LM: '16,8',
//   TP: '16,8',
//   M: '16,8',
//   BK: '16,8',
// }));

const DrawerRiwayatPemeriksaanTruk = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  data,
  vendor,
}) => {
  const [searchParams] = useSearchParams();

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('date', {
      header: <div>TANGGAL</div>,
      cell: (info) => (
        <div className='w-24 !body-m-b !text-color-1'>
          {dayjs(info.getValue()).format('DD/MM/YYYY')} <br />
          {dayjs(info.getValue()).format('HH:mm')} -{' '}
          {dayjs(info.row.original.finish_date).format('HH:mm')}
        </div>
      ),
    }),
    columnHelper.accessor('duration', {
      header: (
        <div className='w-24'>
          DURASI <br />
          BONGKAR
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatDuration(info.row.original.duration)}
        </div>
      ),
    }),
    columnHelper.accessor('mesin', {
      header: <div>NOMOR MESIN</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('vehicle_number', {
      header: <div>PLAT NOMOR</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('total_tandan', {
      header: <div>TOTAL TBS</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('total_multiple', {
      header: (
        <div>
          TBS <br /> MULTIPLE
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('percent_accepted', {
      header: <div>% DITERIMA</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('percent_rejected', {
      header: <div>% DITOLAK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('percent_fined', {
      header: <div>% DIDENDA</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
        </div>
      ),
      meta: { className: 'bg-[#F8EDCB]' },
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => {
        return (
          <div className='flex justify-end gap-4'>
            <Button
              className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
              size='lg'
              onClick={() =>
                window.open(
                  `/dashboard/${searchParams.get('factory')}/riwayat-pemeriksaan/${info.row.original._id}`,
                  '_blank',
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

  const handleClose = () => {
    const drawerElement = document.getElementById(idDrawer);
    drawerElement.checked = false;
    closeDrawer();
  };

  return (
    <Drawer
      idDrawer={idDrawer}
      isOpen={isDrawerOpen}
      closeDrawer={handleClose}
      widthDrawer='95vw'
    >
      <div className='flex items-center justify-between'>
        <h3 className='subheadline-m text-color-1'>
          Riwayat Pemeriksaan Truk ({vendor})
        </h3>
        <Button
          variant='primary-outline'
          className='border-none'
          onClick={handleClose}
        >
          <IoMdClose className='text-2xl' />
        </Button>
      </div>

      <div
        className='card mt-8 w-full bg-white'
        style={{ boxShadow: '0px 0px 4px -1px #E0D6D6' }}
      >
        <div className='p-2 pb-8'>
          <Table
            dataTable={data || []}
            columns={columns}
            showPagination={true}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerRiwayatPemeriksaanTruk;
