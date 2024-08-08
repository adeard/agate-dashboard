import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MdOutlineFilterAlt, MdOutlineEdit } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

import Button from '@/components/shared/Button';
import DrawerAddEditFactory from './components/DrawerAddEditFactory';
import DrawerFilterFactory from './components/DrawerFilterFactory';

const FactoryPage = () => {
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
          <h1 className='headline-s'>Daftar Pabrik (21)</h1>
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
        <div className='bg-white rounded-2xl p-4 overflow-x-auto h-[calc(100vh-218px)]'>
          <table className='table'>
            <thead>
              <tr className='text-color-3'>
                <th className='tag-l w-12'>NO</th>
                <th className='tag-l w-64'>PABRIK</th>
                <th className='tag-l w-64'>JUMLAH VENDOR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 25 }).map((_, index) => (
                <tr key={index} className='body-s-r group hover text-color-2'>
                  <td className='text-center'>{index + 1}</td>
                  <td className='body-s-b text-color-1'>Pabrik A</td>
                  <td>12</td>
                  <td className='flex justify-end gap-4'>
                    <Button
                      className='bg-transparent text-transparent group-hover:bg-white group-hover:text-color-1 group-hover:button-shadow'
                      size='lg'
                      onClick={() => navigate('riwayat-pemeriksaan')}
                    >
                      Riwayat Pemeriksaan
                    </Button>
                    <Button
                      className='bg-transparent text-transparent group-hover:bg-white group-hover:text-color-1 group-hover:button-shadow'
                      size='lg'
                      onClick={() => navigate('vendor')}
                    >
                      Dafta Vendor
                    </Button>
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

export default FactoryPage;
