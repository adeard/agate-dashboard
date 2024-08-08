import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import { MdOutlineFilterAlt, MdOutlineEdit } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

import Button from '@/components/shared/Button';
import DrawerAddEditFactory from './components/DrawerAddEditFactory';
import DrawerFilterFactory from './components/DrawerFilterFactory';
import CustomTable from '@/components/shared/CustomTable';

const data = Array.from({ length: 50 }).map((_, index) => ({
  no: index + 1,
  name: 'Aditya Ferry',
  email: 'Adityaferry@gmail.com',
  status: index,
  factoryAccess: <p className='underline hover:cursor-pointer'>Akses Pabrik</p>,
}));

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('no', {
    header: <div className='text-center'>NO</div>,
    cell: (info) => <div className='text-center'>{info.getValue()}</div>,
    size: 20,
  }),
  columnHelper.accessor('name', {
    header: 'NAMA',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'EMAIL',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'STATUS',
    cell: (info) => (
      <div>
        {info.getValue() % 2 === 0 ? (
          <span className='badge bg-[#E8F8E4] text-[#299300] rounded-md'>
            AKTIF
          </span>
        ) : (
          <span className='badge bg-[#FEECEA] text-[#C93532] rounded-md'>
            TIDAK AKTIF
          </span>
        )}
      </div>
    ),
  }),
  columnHelper.accessor('factoryAccess', {
    header: 'AKSES PABRIK',
    cell: (info) => info.getValue(),
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
            <MdOutlineEdit className='text-lg' />
            Edit
          </Button>
        </div>
      );
    },
  }),
];

const UserAccessPage = () => {
  const navigate = useNavigate();

  const idDrawerFilterFactory = 'DrawerFilterFactory';
  const [isDrawerFilterFactoryOpen, setIsDrawerFilterFactoryOpen] =
    useState(false);
  const idDrawerAddEditFactory = 'DrawerAddEditFactory';
  const [isDrawerAddEditFactoryOpen, setIsDrawerAddEditFactoryOpen] =
    useState(false);

  const toggleDrawerFilter = () => {
    const drawerElement = document.getElementById(idDrawerFilterFactory);
    drawerElement.checked = true;
    setIsDrawerFilterFactoryOpen(!isDrawerFilterFactoryOpen);
  };

  const toggleDrawerAddEdit = () => {
    const drawerElement = document.getElementById(idDrawerAddEditFactory);
    drawerElement.checked = true;
    setIsDrawerAddEditFactoryOpen(!isDrawerAddEditFactoryOpen);
  };

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <h1 className='headline-s'>User Access</h1>
          <div className='flex gap-4'>
            <Button
              variant='primary-outline'
              size='lg'
              className='flex items-center button-shadow'
              onClick={toggleDrawerFilter}
            >
              <MdOutlineFilterAlt className='text-2xl mr-2' />
              Filter
            </Button>
            <Button
              size='lg'
              className='flex items-center '
              onClick={toggleDrawerAddEdit}
            >
              <IoMdAdd className='text-2xl mr-2' />
              Add
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className='bg-white rounded-2xl p-4 overflow-x-auto h-full'>
          <CustomTable
            dataTable={data}
            columns={columns}
            showPagination={true}
          />
        </div>

        <DrawerFilterFactory
          idDrawer={idDrawerFilterFactory}
          isDrawerOpen={isDrawerFilterFactoryOpen}
          closeDrawer={() => setIsDrawerFilterFactoryOpen(false)}
        />

        <DrawerAddEditFactory
          idDrawer={idDrawerAddEditFactory}
          isDrawerOpen={isDrawerAddEditFactoryOpen}
          closeDrawer={() => setIsDrawerAddEditFactoryOpen(false)}
        />
      </main>
    </div>
  );
};

export default UserAccessPage;
