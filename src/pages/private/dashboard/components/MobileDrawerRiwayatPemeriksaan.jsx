import { useEffect } from 'react';

import { createColumnHelper } from '@tanstack/react-table';

import {
  MdArrowBackIosNew,
  MdOutlineFilterAlt,
  MdOutlineVisibility,
} from 'react-icons/md';

import { useGet } from '@/services/use-services';

import { convertLabel } from '@/utils/common';

import DrawerMobile from '@/components/shared/DrawerMobile';

import dayjs from 'dayjs';
import Button from '@/components/shared/Button';

const MobileDrawerRiwayatPemeriksaan = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  factoryId,
}) => {
  const { data, loading, meta, refetch, setQueryParams } = useGet(
    '/v1/inspection-data/by-factory/' + factoryId,
    {},
    false
  );

  useEffect(() => {
    if (factoryId) {
      refetch();
    }
  }, [factoryId]);

  const currentDate = dayjs().format('DD/MM/YYYY');

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
      cell: (info) => dayjs(info.getValue()).format('DD/MM/YYYY HH:mm'),
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

  console.log(data);

  return (
    <DrawerMobile
      idDrawer={idDrawer}
      isOpen={isDrawerOpen}
      closeDrawer={handleClose}
    >
      <div className='flex items-center justify-between text-color-1'>
        <div className='flex-none'>
          <MdArrowBackIosNew className='text-xl' onClick={handleClose} />
        </div>
        <h2 className='flex-1 !text-center mr-4 subheadline-s'>
          Riwayat Pemeriksaan
        </h2>
      </div>

      <div className='card mt-8 w-full bg-white'>
        <div className='flex items-center justify-between px-2'>
          <p>Tanggal {currentDate}</p>
          <Button className='!px-2'>
            <MdOutlineFilterAlt className='text-xl' />
          </Button>
        </div>
        {data?.map((item) => (
          <div className='mt-4 border border-[#E7E7E7] p-2'>
            <div className='grid grid-cols-2 gap-2 text-[#3B3B3B] overflow-auto '>
              <p className='tag-m'>WAKTU</p>
              <p className='body-s-r !text-right'>
                {dayjs(item.date).format('DD/MM/YYYY HH:mm')}
              </p>
              <p className='tag-m'>VENDOR</p>
              <p className='body-s-r !text-right'>{item.vendor_name}</p>
              <p className='tag-m'>SURAT JALAN</p>
              <p className='body-s-r !text-right'>{item.delivery_number}</p>
              <p className='tag-m'>PLAT KENDARAAN</p>
              <p className='body-s-r !text-right'>{item.vehicle_number}</p>
              <p className='tag-m'>TOTAL TANDAN</p>
              <p className='body-s-r !text-right'>
                {item.grading_result.total_tandan}
              </p>
              <p className='tag-m'>DITOLAK</p>
              <p className='body-s-r !text-right'>
                {item.grading_result.total_rejected}
              </p>
              <p className='tag-m'>DITERIMA</p>
              <p className='body-s-r !text-right'>
                {item.grading_result.total_accepted}
              </p>
              <p className='tag-m'>DIDENDA</p>
              <p className='body-s-r !text-right'>
                {item.grading_result.total_fined}
              </p>
            </div>
            <div className='divider my-1'></div>
            <Button
              className='flex items-center justify-center gap-2'
              size='lg'
              full
              onClick={() =>
                window.open(
                  `/dashboard/riwayat-pemeriksaan/${item._id}`,
                  '_blank'
                )
              }
            >
              <MdOutlineVisibility className='text-lg' />
              Detail
            </Button>
          </div>
        ))}
      </div>
    </DrawerMobile>
  );
};

export default MobileDrawerRiwayatPemeriksaan;
