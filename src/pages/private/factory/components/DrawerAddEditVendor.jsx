import { IoMdClose } from 'react-icons/io';

import Button from '@/components/shared/Button';
import Drawer from '@/components/shared/Drawer';
import Input from '@/components/shared/Input';

const DrawerAddEditVendor = ({ idDrawer, isDrawerOpen, closeDrawer }) => {
  const handleSelect = () => {
    const drawerElement = document.getElementById(idDrawer);
    drawerElement.checked = false;
    closeDrawer();
  };

  const handleClose = () => {
    const drawerElement = document.getElementById(idDrawer);
    drawerElement.checked = false;
    closeDrawer();
  };

  return (
    <Drawer idDrawer={idDrawer} isOpen={isDrawerOpen} closeDrawer={closeDrawer}>
      {/* header drawer */}
      <div className='flex items-center justify-between'>
        <h3 className='subheadline-m text-color-1'>Tambah/Edit Vendor</h3>
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
          <div className='flex gap-4'>
            <label className='basis-1/4 body-m-b my-auto text-color-2'>
              Vendor
            </label>
            <div className='basis-3/4'>
              <Input placeholder='Nama Vendor' size='lg' full />
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-2 mt-4'>
        <Button
          variant='primary-outline'
          size='lg'
          className='!w[79px] button-shadow'
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button size='lg' className='!w-[120px]'>
          Simpan
        </Button>
      </div>
    </Drawer>
  );
};

export default DrawerAddEditVendor;
