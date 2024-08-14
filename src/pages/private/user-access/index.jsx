import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import { MdOutlineFilterAlt, MdOutlineEdit } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

import { useGet } from '@/services/use-services';

import Button from '@/components/shared/Button';
import DrawerFilterUser from './components/DrawerFilterUser';
import DrawerFormUser from './components/DrawerFormUser';
import CustomTable from '@/components/shared/CustomTable';
import ModalFactoryAccess from './components/ModalFactoryAccess';

const UserAccessPage = () => {
  const navigate = useNavigate();

  const { data, loading, refetch, setQueryParams } = useGet('/v1/user');

  const idDrawerFilterUserAccess = 'DrawerFilterUserAccess';
  const [isDrawerFilterUserAccessOpen, setIsDrawerFilterUserAccessOpen] =
    useState(false);

  const idDrawerAddUserAccess = 'DrawerAddUserAccess';
  const [isDrawerAddUserAccessOpen, setIsDrawerAddUserAccessOpen] =
    useState(false);

  const [selectedData, setSelectedData] = useState(null);

  const idDrawerEditUserAccess = 'DrawerEditAccess';
  const [isDrawerEditAccessOpen, setIsDrawerEditAccessOpen] = useState(false);

  const toggleDrawerFilter = () => {
    const drawerElement = document.getElementById(idDrawerFilterUserAccess);
    drawerElement.checked = true;
    setIsDrawerFilterUserAccessOpen(!isDrawerFilterUserAccessOpen);
  };

  const toggleDrawerAdd = () => {
    const drawerElement = document.getElementById(idDrawerAddUserAccess);
    drawerElement.checked = true;
    setIsDrawerAddUserAccessOpen(!isDrawerAddUserAccessOpen);
  };

  const toggleDrawerEdit = (data) => {
    setSelectedData(data);
    const drawerElement = document.getElementById(idDrawerEditUserAccess);
    drawerElement.checked = true;
    setIsDrawerEditAccessOpen(!isDrawerEditAccessOpen);
  };

  const dialogFactoryAccessRef = useRef(null);
  const handleOpenModalFactoryAccess = (data) => {
    setSelectedData(data);
    dialogFactoryAccessRef.current.showModal();
  };

  // table column
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('no', {
      header: <div className='text-center'>NO</div>,
      cell: (info) => <div className='text-center'>{info.row.index + 1}</div>,
      size: 20,
    }),
    columnHelper.accessor('full_name', {
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
        <>
          {info.getValue() === 0 ? (
            <div className='badge bg-[#FEECEA] text-[#C93532] rounded-md'>
              TIDAK AKTIF
            </div>
          ) : (
            <div className='badge bg-[#E8F8E4] text-[#299300] rounded-md'>
              AKTIF
            </div>
          )}
        </>
      ),
    }),
    columnHelper.accessor('factoryAccess', {
      header: 'AKSES PABRIK',
      cell: (info) => (
        <p
          className='underline hover:cursor-pointer'
          onClick={() => handleOpenModalFactoryAccess(info.row.original)}
        >
          Akses Pabrik
        </p>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <div className='flex justify-end gap-4'>
          <Button
            className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
            size='lg'
            onClick={() => toggleDrawerEdit(info.row.original)}
          >
            <MdOutlineEdit className='text-lg' />
            Edit
          </Button>
        </div>
      ),
    }),
  ];

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
              onClick={toggleDrawerAdd}
            >
              <IoMdAdd className='text-2xl mr-2' />
              Add
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className='bg-white rounded-2xl p-4 overflow-x-auto h-full'>
          {data && (
            <CustomTable
              dataTable={data}
              columns={columns}
              showPagination={true}
            />
          )}
        </div>

        <DrawerFilterUser
          idDrawer={idDrawerFilterUserAccess}
          isDrawerOpen={isDrawerFilterUserAccessOpen}
          closeDrawer={() => setIsDrawerFilterUserAccessOpen(false)}
          setQueryParams={setQueryParams}
          refetch={refetch}
        />

        <DrawerFormUser
          idDrawer={idDrawerAddUserAccess}
          isDrawerOpen={isDrawerAddUserAccessOpen}
          closeDrawer={() => setIsDrawerAddUserAccessOpen(false)}
          refetch={refetch}
        />

        <DrawerFormUser
          isEdit={true}
          idDrawer={idDrawerEditUserAccess}
          isDrawerOpen={isDrawerEditAccessOpen}
          closeDrawer={() => setIsDrawerEditAccessOpen(false)}
          refetch={refetch}
          data={selectedData}
        />

        <ModalFactoryAccess
          modalRef={dialogFactoryAccessRef}
          data={selectedData}
        />
      </main>
    </div>
  );
};

export default UserAccessPage;
