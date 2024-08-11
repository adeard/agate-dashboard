import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import { MdOutlineFilterAlt, MdOutlineEdit } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

import { useGet } from '@/services/use-services';

import Button from '@/components/shared/Button';
import DrawerFormFactory from './components/DrawerFormFactory';
import DrawerFilterFactory from './components/DrawerFilterFactory';
import CustomTable from '@/components/shared/CustomTable';

const FactoryPage = () => {
  const navigate = useNavigate();

  const { data, loading, refetch } = useGet('/v1/factory');

  const idDrawerFilterFactory = 'DrawerFilterFactory';
  const [isDrawerFilterFactoryOpen, setIsDrawerFilterFactoryOpen] =
    useState(false);

  const idDrawerAddFactory = 'DrawerAddFactory';
  const [isDrawerAddFactoryOpen, setIsDrawerAddFactoryOpen] = useState(false);

  const [selectedData, setSelectedData] = useState(null);
  const idDrawerEditFactory = 'DrawerEditFactory';
  const [isDrawerEditFactoryOpen, setIsDrawerEditFactoryOpen] = useState(false);

  const toggleDrawerFilter = () => {
    const drawerElement = document.getElementById(idDrawerFilterFactory);
    drawerElement.checked = true;
    setIsDrawerFilterFactoryOpen(!isDrawerFilterFactoryOpen);
  };

  const toggleDrawerAdd = () => {
    const drawerElement = document.getElementById(idDrawerAddFactory);
    drawerElement.checked = true;
    setIsDrawerAddFactoryOpen(!isDrawerAddFactoryOpen);
  };

  const toggleDrawerEdit = (data) => {
    setSelectedData(data);
    const drawerElement = document.getElementById(idDrawerEditFactory);
    drawerElement.checked = true;
    setIsDrawerEditFactoryOpen(!isDrawerEditFactoryOpen);
  };

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
              onClick={() =>
                navigate(`riwayat-pemeriksaan?factory=${info.row.original._id}`)
              }
            >
              Riwayat Pemeriksaan
            </Button>
            <Button
              className='bg-transparent text-transparent group-hover:bg-white group-hover:text-color-1 group-hover:button-shadow'
              size='lg'
              onClick={() =>
                navigate(`vendor?factory=${info.row.original._id}`)
              }
            >
              Daftar Vendor
            </Button>
            <Button
              className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
              size='lg'
              onClick={() => toggleDrawerEdit(info.row.original)}
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
        <div className='bg-white rounded-2xl p-4 overflow-x-auto h-[calc(100vh-218px)]'>
          {data && <CustomTable dataTable={data} columns={columns} />}
        </div>

        <DrawerFilterFactory
          idDrawer={idDrawerFilterFactory}
          isDrawerOpen={isDrawerFilterFactoryOpen}
          closeDrawer={() => setIsDrawerFilterFactoryOpen(false)}
        />

        <DrawerFormFactory
          idDrawer={idDrawerAddFactory}
          isDrawerOpen={isDrawerAddFactoryOpen}
          closeDrawer={() => setIsDrawerAddFactoryOpen(false)}
          refetch={refetch}
        />

        <DrawerFormFactory
          isEdit={true}
          idDrawer={idDrawerEditFactory}
          isDrawerOpen={isDrawerEditFactoryOpen}
          closeDrawer={() => setIsDrawerEditFactoryOpen(false)}
          refetch={refetch}
          data={selectedData}
        />
      </main>
    </div>
  );
};

export default FactoryPage;
