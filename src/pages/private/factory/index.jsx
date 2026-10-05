import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import { MdOutlineFilterAlt, MdEdit } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

import { useGet } from '@/services/use-services';

import useDrawer from '@/hooks/useDrawer';

import Button from '@/components/shared/Button';
import DrawerFormFactory from './components/DrawerFormFactory';
import DrawerFilterFactory from './components/DrawerFilterFactory';
import Table from '@/components/shared/Table';
import DropdownMenu from '@/components/shared/DropdownMenu';

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
      header: <div className='text-center'>NO</div>,
      cell: (info) => (
        <div className='text-center !body-m-r !text-color-1'>
          {info.row.index + 1}
        </div>
      ),
    }),
    columnHelper.accessor('name', {
      header: <div className='w-20'>PABRIK</div>,
      cell: (info) => (
        <div className='!body-m-r !text-color-1 !font-medium'>
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('total_vendor', {
      header: <div className='w-80'>JUMLAH VENDOR</div>,
      cell: (info) => <div className='!body-m-r'>{info.getValue()}</div>,
    }),
    columnHelper.display({
      header: <div className='end-column-content'></div>,
      id: 'actions',
      cell: (info) => {
        const handleStoreFactoryName = () =>
          sessionStorage.setItem('factoryName', data.name);

        const options = [
          <span
            className='flex items-center gap-2'
            onClick={() => {
              setSelectedData(data);
              toggleDrawerEdit();
            }}
          >
            <MdEdit className='text-lg text-color-2' />
            Edit
          </span>,

          <Link
            to={`${data._id}/riwayat-pemeriksaan`}
            onClick={handleStoreFactoryName}
          >
            Riwayat Pemeriksaan
          </Link>,

          <Link to={`${data._id}/vendor`} onClick={handleStoreFactoryName}>
            Daftar Vendor
          </Link>,

          <Link
            to={`${data._id}/history-maintenance`}
            onClick={handleStoreFactoryName}
          >
            History Maintenance
          </Link>,

          <Link to={`${data._id}/logs-mesin`} onClick={handleStoreFactoryName}>
            Logs Mesin
          </Link>,
        ];

        return <DropdownMenu info={info} options={options} />;
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
          <Table
            dataTable={data || []}
            loading={loading}
            columns={columns}
            showPagination={true}
          />
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
