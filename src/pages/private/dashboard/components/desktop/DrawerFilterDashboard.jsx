import { IoMdClose } from 'react-icons/io';

import { vendorTypeOptions } from '@/utils/optionsKey';

import Button from '@/components/shared/Button';
import Drawer from '@/components/shared/Drawer';
import Input from '@/components/shared/Input';
import CustomSelect from '@/components/shared/CustomSelect';

const DrawerFilterDashboard = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  form,
  optionsFactory,
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
            <div className='basis-3/4 flex items-center justify-between gap-4'>
              <form.Field
                name='date_from'
                children={(field) => (
                  <Input
                    type='date'
                    size='lg'
                    name={field.name}
                    value={field.state.value}
                    className='bg-white pr-8'
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    full
                  />
                )}
              />
              <span>-</span>
              <form.Field
                name='date_to'
                children={(field) => (
                  <Input
                    type='date'
                    size='lg'
                    name={field.name}
                    value={field.state.value}
                    className='bg-white pr-8'
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    full
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
              <form.Field
                name='factory'
                children={(field) => (
                  <CustomSelect
                    placeholder='Pabrik'
                    className='body-m-r !h-full'
                    name={field.name}
                    value={field.state.value}
                    options={optionsFactory || []}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption
                        ? selectedOption.value
                        : null;
                      field.handleChange(selectedValue);
                    }}
                    size='lg'
                  />
                )}
              />
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <label className='basis-1/4'>
              <span className='label-text'>Vendor Type</span>
            </label>
            <div className='basis-3/4'>
              <form.Field
                name='vendor_type'
                children={(field) => (
                  <CustomSelect
                    placeholder='Vendor Type'
                    className='body-m-r !h-full'
                    name={field.name}
                    value={field.state.value}
                    options={vendorTypeOptions || []}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption
                        ? selectedOption.value
                        : null;
                      field.handleChange(selectedValue);
                    }}
                    size='lg'
                  />
                )}
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
