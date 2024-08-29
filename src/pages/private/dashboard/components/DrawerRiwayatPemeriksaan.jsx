import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGet } from '@/services/use-services';

import { createColumnHelper } from '@tanstack/react-table';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineVisibility } from 'react-icons/md';

import CustomTable from '@/components/shared/CustomTable';
import Drawer from '@/components/shared/Drawer';
import Button from '@/components/shared/Button';

import dayjs from 'dayjs';

const DrawerRiwayatPemeriksaan = ({
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
        const navigate = useNavigate();

        return (
          <div className='flex justify-end gap-4'>
            <Button
              className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
              size='lg'
              onClick={() =>
                // navigate(`riwayat-pemeriksaan/${info.row.original._id}`, {})
                window.open(
                  `/dashboard/monitoring/riwayat-pemeriksaan/${info.row.original._id}`,
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
      closeDrawer={closeDrawer}
      widthDrawer='75vw'
    >
      <div className='flex items-center justify-between'>
        <h3 className='subheadline-m text-color-1'>
          Riwayat Pemeriksaan Tanggal {currentDate}
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
          {data && (
            <CustomTable
              dataTable={data}
              columns={columns}
              showPagination={true}
            />
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerRiwayatPemeriksaan;
