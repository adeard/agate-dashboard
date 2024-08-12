import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { IoMdClose } from 'react-icons/io';

import CustomTable from '@/components/shared/CustomTable';
import Drawer from '@/components/shared/Drawer';
import Button from '@/components/shared/Button';

const data = [
  {
    vendor_name: 'Vendor A',
    percent: '90%',
  },
  {
    vendor_name: 'Vendor A',
    percent: '90%',
  },
  {
    vendor_name: 'Vendor A',
    percent: '90%',
  },
];

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor('vendor_name', {
    header: <div className='text-color-2'>NAMA VENDOR</div>,
    cell: (info) => (
      <div className='!body-m-r !text-color-1'>
        {info.row.index + 1}
      </div>
    ),
  }),
  columnHelper.accessor('percent', {
    header: <div className='text-color-2'>PERSENTASE</div>,
    cell: (info) => (
      <div className='!body-m-r !text-color-1'>{info.getValue()}</div>
    ),
  }),
];

const DrawerSenderVendor = ({ idDrawer, isDrawerOpen, closeDrawer }) => {
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
      widthDrawer='100px'
    >
      {/* header drawer */}
      <div className='flex items-center justify-between'>
        <h3 className='subheadline-m text-color-1'>Vendor Pengirim Buah -</h3>
        <Button
          variant='primary-outline'
          className='border-none'
          onClick={handleClose}
        >
          <IoMdClose className='text-2xl' />
        </Button>
      </div>

      {/* content drawer  */}
      <div
        className='card mt-8 w-full bg-white'
        style={{ boxShadow: '0px 0px 4px -1px #E0D6D6' }}
      >
        <div className='card-body'>
          <CustomTable dataTable={data} columns={columns} />
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerSenderVendor;
