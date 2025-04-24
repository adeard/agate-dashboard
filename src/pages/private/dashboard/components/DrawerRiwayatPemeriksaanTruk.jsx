import { createColumnHelper } from '@tanstack/react-table';

import { IoMdClose } from 'react-icons/io';
import { MdOutlineVisibility } from 'react-icons/md';

import CustomTable from '@/components/shared/CustomTable';
import Drawer from '@/components/shared/Drawer';
import Button from '@/components/shared/Button';
import dayjs from 'dayjs';

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
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('date', {
      header: <div className='w-32'>TANGGAL</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {dayjs(info.getValue()).format('DD/MM/YYYY HH:mm')}
        </div>
      ),
    }),
    columnHelper.accessor('mesin', {
      header: (
        <div>
          NOMOR <br /> MESIN
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('delivery_number', {
      header: (
        <div>
          SURAT <br /> JALAN
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('vehicle_number', {
      header: (
        <div>
          PLAT <br /> KENDARAAN
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('total_tandan', {
      header: <div>TBS TRUK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('percent_accepted', {
      header: <div>% DITERIMA</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {Number(info.getValue()).toLocaleString('en', {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    }),
    columnHelper.accessor('percent_matang', {
      header: <div>% MM</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {Number(info.getValue()).toLocaleString('en', {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('percent_lewat_matang', {
      header: <div>% LM</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {Number(info.getValue()).toLocaleString('en', {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('percent_tangkai_panjang', {
      header: <div>% TP</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {Number(info.getValue()).toLocaleString('en', {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
      meta: { className: 'bg-[#F8EDCB]' },
    }),
    columnHelper.accessor('percent_mentah', {
      header: <div>% M</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {Number(info.getValue()).toLocaleString('en', {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('percent_janjang_kosong', {
      header: <div>% JK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {Number(info.getValue()).toLocaleString('en', {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('percent_buah_kecil', {
      header: <div>% BK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {Number(info.getValue()).toLocaleString('en', {
            maximumFractionDigits: 2,
          })}
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
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
                  `/dashboard/riwayat-pemeriksaan/${info.row.original._id}`,
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
      widthDrawer='85vw'
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
          <CustomTable dataTable={data || []} columns={columns} />
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerRiwayatPemeriksaanTruk;
