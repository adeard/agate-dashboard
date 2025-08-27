import { useSearchParams } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';

import { IoMdClose } from 'react-icons/io';

import { statusOptions, vendorTypeOptions } from '@/utils/optionsKey';
import { getFilteredValues } from '@/utils/common';

import Button from '@/components/shared/Button';
import Drawer from '@/components/shared/Drawer';
import Input from '@/components/shared/Input';
import Checkbox from '@/components/shared/Checkbox';
import CustomSelect from '@/components/shared/CustomSelect';
import Dropdown from '@/components/shared/Dropdown';

const DrawerFilterDashboard = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  form,
  selectedFactory,
  setSelectedFactory,
  optionsFactory,
  selectedVendorType,
  setSelectedVendorType,
  optionsVendor,
}) => {
  const handleClose = () => {
    const drawerElement = document.getElementById(idDrawer);
    drawerElement.checked = false;
    closeDrawer();
  };

  return (
    <Drawer idDrawer={idDrawer} isOpen={isDrawerOpen} closeDrawer={handleClose}>
      {/* header drawer */}
      <div className='flex items-center justify-between'>
        <h3 className='subheadline-m text-color-1'>Filter</h3>
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
        <div className='space-y-4 my-5 p-5'>
          <div className='flex items-center gap-2'>
            <label className='basis-1/4'>
              <span className='label-text'>Tanggal</span>
            </label>
            <div className='basis-3/4'>
              <form.Field
                name='date_from'
                children={(field) => (
                  <Input
                    type='date'
                    size='lg'
                    name={field.name}
                    value={field.state.value}
                    className='bg-white pr-8 w-40'
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                  />
                )}
              />
              <span className='mx-4'>-</span>
              <form.Field
                name='date_to'
                children={(field) => (
                  <Input
                    type='date'
                    size='lg'
                    name={field.name}
                    value={field.state.value}
                    className='bg-white pr-8 w-40'
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='basis-1/4'>
              <span className='label-text'>Pabrik</span>
            </label>
            <div className='basis-3/4'>
              <Dropdown
                selected={selectedFactory}
                setSelected={setSelectedFactory}
                options={optionsFactory}
                buttonClassname='!w-40 !h-10 body-s-r border-primary-3 border-2'
                arrowPosition='right'
                full
              />
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <label className='basis-1/4'>
              <span className='label-text'>Vendor Type</span>
            </label>
            <div className='basis-3/4'>
              <Dropdown
                selected={selectedVendorType}
                setSelected={setSelectedVendorType}
                options={vendorTypeOptions}
                buttonClassname='!w-40 !h-10 body-s-r border-primary-3 border-2'
                arrowPosition='right'
                full
              />
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='basis-1/4'>
              <span className='label-text'>Vendor</span>
            </label>
            <div className='basis-3/4'>
              <form.Field
                name='ids'
                children={(field) => (
                  <CustomSelect
                    placeholder='Vendor'
                    className='body-m-r !h-full'
                    name={field.name}
                    value={field.state.value}
                    options={optionsVendor || []}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : [];
                      field.handleChange(selectedValues);
                    }}
                    size='lg'
                    multiple
                  />
                )}
              />
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
        <Button
          size='lg'
          className='!w-[120px]'
          onClick={() => {
            form.handleSubmit();
            handleClose();
          }}
        >
          Cari
        </Button>
      </div>
    </Drawer>
  );
};

export default DrawerFilterDashboard;
