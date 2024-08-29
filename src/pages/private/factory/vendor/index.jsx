import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import {
  MdOutlineFilterAlt,
  MdOutlineEdit,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

import { useGet } from '@/services/use-services';
import useDrawer from '@/hooks/useDrawer';

import Button from '@/components/shared/Button';
import DrawerFilterVendor from '../components/DrawerFilterVendor';
import CustomTable from '@/components/shared/CustomTable';

const VendorPage = () => {
  const { factoryId } = useParams();
  const factoryName = sessionStorage.getItem('factoryName');

  const { data, loading, refetch, setQueryParams } = useGet('/v1/vendor');

  const {
    idDrawer: idDrawerFilterVendor,
    isDrawerOpen: isDrawerFilterVendorOpen,
    toggleDrawer: toggleDrawerFilter,
    closeDrawer: closeDrawerFilter,
  } = useDrawer('DrawerFilterVendor');

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
      header: <div className='text-color-2'>Vendor</div>,
      cell: (info) => (
        <div className='!body-m-r !text-color-1'>{info.getValue()}</div>
      ),
      size: 800,
    }),
    // columnHelper.display({
    //   id: 'actions',
    //   cell: (info) => {
    //     return (
    //       <div className='flex justify-end'>
    //         <Button
    //           className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
    //           size='lg'
    //           onClick={() => toggleDrawerEdit(info.row.original)}
    //         >
    //           <MdOutlineEdit className='text-lg' />
    //           Edit
    //         </Button>
    //       </div>
    //     );
    //   },
    // }),
  ];

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <div className='flex items-center'>
            <Link to='/factory' className='font-semibold text-2xl text-color-3'>
              {factoryName}
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='headline-s'>Vendor</h2>
          </div>
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
            {/* <Button
              size='lg'
              className='flex items-center'
              onClick={toggleDrawerAdd}
            >
              <IoMdAdd className='text-2xl mr-2' />
              Add
            </Button> */}
          </div>
        </div>
      </header>
      <main>
        <div className='bg-white rounded-2xl p-4 h-[calc(100vh-218px)]'>
          {data && <CustomTable dataTable={data} columns={columns} />}
        </div>

        <DrawerFilterVendor
          idDrawer={idDrawerFilterVendor}
          isDrawerOpen={isDrawerFilterVendorOpen}
          closeDrawer={closeDrawerFilter}
          setQueryParams={setQueryParams}
          refetch={refetch}
        />
      </main>
    </div>
  );
};

export default VendorPage;
