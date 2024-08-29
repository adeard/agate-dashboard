import React, { useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { IoMdClose } from 'react-icons/io';
import { MdOutlineVisibility } from 'react-icons/md';

import useDrawer from '@/hooks/useDrawer';

import { convertLabel } from '@/utils/common';

import CustomTable from '@/components/shared/CustomTable';
import Drawer from '@/components/shared/Drawer';
import Button from '@/components/shared/Button';
import DrawerSenderBuah from './DrawerSenderBuah';

const DrawerDemografiChart = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  data,
  range,
}) => {
  const [selectedDataSenderBuah, setSelectedDataSenderBuah] = useState('');
  const {
    idDrawer: idDrawerSenderBuah,
    isDrawerOpen: isDrawerSenderBuahOpen,
    toggleDrawer: toggleDrawerSenderBuah,
    closeDrawer: closeDrawerSenderBuah,
  } = useDrawer('DrawerSenderBuahDemografi');

  // table
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('name', {
      header: <div className='text-color-2'>KLASIFIKASI BUAH</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {convertLabel(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('total', {
      header: <div className='text-color-2'>TOTAL</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {info.getValue().toLocaleString()}
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => {
        return (
          <div className='flex justify-end gap-4'>
            <Button
              className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
              size='lg'
              onClick={() => {
                setSelectedDataSenderBuah({
                  label: `${info.row.original.name} ${
                    range === 'weekly' ? 'Week ' : ''
                  } ${data && convertLabel(data?.label)}`,
                  vendors: info.row.original.vendors.map((vendor) => ({
                    ...vendor,
                    label: vendor.name,
                    name: undefined,
                  })),
                });
                toggleDrawerSenderBuah();
              }}
            >
              <MdOutlineVisibility className='text-lg' />
              Lihat Vendor
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
    <>
      <Drawer
        idDrawer={idDrawer}
        isOpen={isDrawerOpen}
        closeDrawer={handleClose}
        widthDrawer='654px'
      >
        <div className='flex items-center justify-between'>
          <h3 className='subheadline-m text-color-1'>
            Vendor Pengirim Buah {data && convertLabel(data?.variant)}{' '}
            {range === 'weekly' ? 'Week ' : ''}
            {data && convertLabel(data?.label)}
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
            <CustomTable dataTable={data?.demography || []} columns={columns} />
          </div>
        </div>
      </Drawer>

      <DrawerSenderBuah
        idDrawer={idDrawerSenderBuah}
        isDrawerOpen={isDrawerSenderBuahOpen}
        closeDrawer={closeDrawerSenderBuah}
        data={selectedDataSenderBuah}
      />
    </>
  );
};

export default DrawerDemografiChart;
