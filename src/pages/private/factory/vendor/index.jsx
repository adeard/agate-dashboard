import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  MdOutlineFilterAlt,
  MdOutlineEdit,
  MdKeyboardArrowRight,
} from 'react-icons/md';

import { IoMdAdd } from 'react-icons/io';

import Button from '@/components/shared/Button';
import DrawerAddEditVendor from '../components/DrawerAddEditVendor';
import DrawerFilterVendor from '../components/DrawerFilterVendor';

const VendorPage = () => {
  const idDrawerFilterVendor = 'DrawerFilterVendor';
  const [isDrawerFilterVendorOpen, setIsDrawerFilterVendorOpen] =
    useState(false);
  const idDrawerAddEditVendor = 'DrawerAddEditVendor';
  const [isDrawerAddEditVendorOpen, setIsDrawerAddEditVendorOpen] =
    useState(false);

  const toggleDrawerFilter = () => {
    const drawerElement = document.getElementById(idDrawerFilterVendor);
    drawerElement.checked = true;
    setIsDrawerFilterVendorOpen(!isDrawerFilterVendorOpen);
  };

  const toggleDrawerAddEdit = () => {
    const drawerElement = document.getElementById(idDrawerAddEditVendor);
    drawerElement.checked = true;
    setIsDrawerAddEditVendorOpen(!isDrawerAddEditVendorOpen);
  };

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <div className='flex items-center'>
            <Link to='/factory' className='font-semibold text-2xl text-color-3'>
              Pabrik A
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='font-semibold text-3xl text-color-1'>Vendor A</h2>
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
            <Button
              size='lg'
              className='flex items-center'
              onClick={toggleDrawerAddEdit}
            >
              <IoMdAdd className='text-2xl mr-2' />
              Add
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className='bg-white rounded-2xl p-4 overflow-x-auto h-[calc(100vh-218px)]'>
          <table className='table'>
            <thead>
              <tr className='text-color-3'>
                <th className='tag-l w-12'>NO</th>
                <th className='tag-l w-64'>VENDOR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 25 }).map((_, index) => (
                <tr key={index} className='body-s-r group hover text-color-2'>
                  <td className='text-center'>{index + 1}</td>
                  <td className='body-s-b text-color-1'>Vendor A</td>
                  <td className='flex justify-end gap-4'>
                    <Button
                      className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
                      size='lg'
                      onClick={toggleDrawerAddEdit}
                    >
                      <MdOutlineEdit className='text-lg' />
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DrawerFilterVendor
          idDrawer={idDrawerFilterVendor}
          isDrawerOpen={isDrawerFilterVendorOpen}
          closeDrawer={() => setIsDrawerFilterVendorOpen(false)}
        />

        <DrawerAddEditVendor
          idDrawer={idDrawerAddEditVendor}
          isDrawerOpen={isDrawerAddEditVendorOpen}
          closeDrawer={() => setIsDrawerAddEditVendorOpen(false)}
        />
      </main>
    </div>
  );
};

export default VendorPage;
