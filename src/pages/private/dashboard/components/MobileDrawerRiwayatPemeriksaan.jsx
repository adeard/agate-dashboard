import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();

  const { data, loading, meta, refetch, setQueryParams } = useGet(
    '/v1/inspection-data/by-factory/' + searchParams.get('factory'),
    {},
    false
  );

  useEffect(() => {
    if (searchParams.get('factory')) {
      refetch({ limit_minimum: 200 });
    }
  }, [searchParams]);

  const handleClose = () => {
    const drawerElement = document.getElementById(idDrawer);
    drawerElement.checked = false;
    closeDrawer();
  };

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
        <div className='px-2'>
          <p>
            Tanggal {dayjs(searchParams.get('date_from')).format('DD/MM/YYYY')}{' '}
            - {dayjs(searchParams.get('date_to')).format('DD/MM/YYYY')}
          </p>
        </div>
        {data?.map((item, index) => (
          <div key={index} className='mt-4 border border-[#E7E7E7] p-2'>
            <div className='grid grid-cols-3 gap-2 text-[#3B3B3B] overflow-auto'>
              <p className='tag-m'>WAKTU</p>
              <p className='col-span-2 body-s-r !text-right'>
                {dayjs(item.date).format('DD/MM/YYYY HH:mm')}
              </p>
              <p className='tag-m'>VENDOR</p>
              <p className='col-span-2 body-s-r !text-right'>
                {item.vendor_name}
              </p>
              <p className='tag-m'>SURAT JALAN</p>
              <p className='col-span-2 body-s-r !text-right text-ellipsis'>
                {item.delivery_number}
              </p>
              <p className='tag-m'>PLAT KENDARAAN</p>
              <p className='col-span-2 body-s-r !text-right'>
                {item.vehicle_number}
              </p>
              <p className='tag-m'>TOTAL TANDAN</p>
              <p className='col-span-2 body-s-r !text-right'>
                {item.grading_result.total_tandan}
              </p>
              <p className='tag-m'>DITOLAK</p>
              <p className='col-span-2 body-s-r !text-right'>
                {item.grading_result.total_rejected}
              </p>
              <p className='tag-m'>DITERIMA</p>
              <p className='col-span-2 body-s-r !text-right'>
                {item.grading_result.total_accepted}
              </p>
              <p className='tag-m'>DIDENDA</p>
              <p className='col-span-2 body-s-r !text-right'>
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
