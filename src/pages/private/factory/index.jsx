import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import { MdOutlineFilterAlt, MdOutlineEdit } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

import { useGet } from '@/services/use-services';

import useDrawer from '@/hooks/useDrawer';

import Button from '@/components/shared/Button';
import DrawerFormFactory from './components/DrawerFormFactory';
import DrawerFilterFactory from './components/DrawerFilterFactory';
import CustomTable from '@/components/shared/CustomTable';

const FactoryPage = () => {
  const navigate = useNavigate();

  const { data, loading, refetch, setQueryParams } = useGet('/v1/factory');

  const {
    idDrawer: idDrawerFilterFactory,
    isDrawerOpen: isDrawerFilterFactoryOpen,
    toggleDrawer: toggleDrawerFilter,
    closeDrawer: closeDrawerFilter,
  } = useDrawer('DrawerFilterFactory');

  const {
    idDrawer: idDrawerAddFactory,
    isDrawerOpen: isDrawerAddFactoryOpen,
    toggleDrawer: toggleDrawerAdd,
    closeDrawer: closeDrawerAdd,
  } = useDrawer('DrawerAddFactory');

  const [selectedData, setSelectedData] = useState(null);
  const {
    idDrawer: idDrawerEditFactory,
    isDrawerOpen: isDrawerEditFactoryOpen,
    toggleDrawer: toggleDrawerEdit,
    closeDrawer: closeDrawerEdit,
  } = useDrawer('DrawerEditFactory');

  // table column
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('no', {
      header: <div className='text-center text-color-2'>NO</div>,
      cell: (info) => (
        <div className='text-center !body-m-r !text-color-1'>
          {info.row.index + 1}
        </div>
      ),
      size: 20,
    }),
    columnHelper.accessor('name', {
      header: <div className='text-color-2'>PABRIK</div>,
      cell: (info) => (
        <div className='!body-m-r !text-color-1'>{info.getValue()}</div>
      ),
      size: 500,
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => {
        return (
          <div className='flex justify-end gap-4'>
            <Button
              className='bg-transparent text-transparent group-hover:bg-white group-hover:text-color-1 group-hover:button-shadow'
              size='lg'
              onClick={() => {
                navigate(`${info.row.original._id}/riwayat-pemeriksaan`);
                sessionStorage.setItem('factoryName', info.row.original.name);
              }}
            >
              Riwayat Pemeriksaan
            </Button>
            <Button
              className='bg-transparent text-transparent group-hover:bg-white group-hover:text-color-1 group-hover:button-shadow'
              size='lg'
              onClick={() => {
                navigate(`${info.row.original._id}/vendor`);
                sessionStorage.setItem('factoryName', info.row.original.name);
              }}
            >
              Daftar Vendor
            </Button>
            <Button
              className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
              size='lg'
              onClick={() => {
                setSelectedData(info.row.original);
                toggleDrawerEdit();
              }}
            >
              <MdOutlineEdit className='text-lg' />
              Edit
            </Button>
          </div>
        );
      },
    }),
  ];

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <h1 className='headline-s'>Daftar Pabrik</h1>
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
              onClick={toggleDrawerAdd}
            >
              <IoMdAdd className='text-2xl mr-2' />
              Add
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className='bg-white rounded-2xl p-4 h-[calc(100vh-218px)]'>
          {data && (
            <CustomTable
              dataTable={data}
              loading={loading}
              columns={columns}
              showPagination={true}
            />
          )}
        </div>

        <DrawerFilterFactory
          idDrawer={idDrawerFilterFactory}
          isDrawerOpen={isDrawerFilterFactoryOpen}
          closeDrawer={closeDrawerFilter}
          setQueryParams={setQueryParams}
          refetch={refetch}
        />

        <DrawerFormFactory
          idDrawer={idDrawerAddFactory}
          isDrawerOpen={isDrawerAddFactoryOpen}
          closeDrawer={closeDrawerAdd}
          refetch={refetch}
        />

        <DrawerFormFactory
          isEdit={true}
          idDrawer={idDrawerEditFactory}
          isDrawerOpen={isDrawerEditFactoryOpen}
          closeDrawer={closeDrawerEdit}
          refetch={refetch}
          data={selectedData}
        />
      </main>
    </div>
  );
};

export default FactoryPage;
