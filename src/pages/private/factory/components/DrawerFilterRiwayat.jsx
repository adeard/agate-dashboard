import { useForm } from '@tanstack/react-form';

import { IoMdClose } from 'react-icons/io';

import { useGet } from '@/services/use-services';

import Button from '@/components/shared/Button';
import Drawer from '@/components/shared/Drawer';
import Input from '@/components/shared/Input';
import Checkbox from '@/components/shared/Checkbox';

import CustomSelect from '@/components/shared/CustomSelect';

const DrawerFilterRiwayat = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  setQueryParams,
  refetch,
}) => {
  const { data: optionsVendor } = useGet('/v1/options/vendor');

  const form = useForm({
    defaultValues: {
      dateFromCheckBox: false,
      dateFrom: '',
      dateEndCheckBox: false,
      dateEnd: '',
      vendorCheckbox: false,
      vendor: '',
      deliverNumberCheckbox: false,
      deliverNumber: '',
      vehicleCheckbox: false,
      vehicle: '',
    },
    onSubmit: async ({ value }) => {
      // setQueryParams(value);
      // refetch(value);
      // handleClose();
      console.log(value)
    },
  });

  const handleCancel = () => {
    form.reset();
    setQueryParams({});
    refetch({});
    handleClose();
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
        <h3 className='subheadline-m text-color-1'>Filter</h3>
        <Button
          variant='primary-outline'
          className='border-none'
          onClick={() => {
            const drawerElement = document.getElementById(idDrawer);
            drawerElement.checked = false;
            closeDrawer();
          }}
        >
          <IoMdClose className='text-2xl' />
        </Button>
      </div>

      {/* content drawer  */}
      <div className='space-y-4 mt-8'>
        <div
          className='card h-max w-full bg-white'
          style={{ boxShadow: '0px 0px 4px -1px #E0D6D6' }}
        >
          <div className='space-y-4 my-5'>
            <div className='px-5 flex'>
              <form.Field
                name='dateFromCheckBox'
                children={(field) => (
                  <Checkbox
                    label='Waktu Dari'
                    classNameDiv='basis-2/5 body-m-b my-auto text-color-2'
                    classNameLabel='ml-2'
                    name={field.name}
                    isChecked={field.state.value}
                    onChange={() => {
                      field.handleChange(!field.state.value);
                      form.validateField('dateFrom', null);
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='dateFrom'
                  children={(field) => (
                    <Input
                      type='date'
                      size='lg'
                      full
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                      disabled={!form.state.values.dateFromCheckBox}
                    />
                  )}
                />
              </div>
            </div>
            <div className='px-5 flex'>
              <form.Field
                name='dateEndCheckBox'
                children={(field) => (
                  <Checkbox
                    label='Waktu Hingga'
                    classNameDiv='basis-2/5 body-m-b my-auto text-color-2'
                    classNameLabel='ml-2'
                    name={field.name}
                    isChecked={field.state.value}
                    onChange={() => {
                      field.handleChange(!field.state.value);
                      form.validateField('dateEnd', null);
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='dateEnd'
                  children={(field) => (
                    <Input
                      type='date'
                      size='lg'
                      full
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                      disabled={!form.state.values.dateEndCheckBox}
                    />
                  )}
                />
              </div>
            </div>
            <div className='px-5 flex'>
              <form.Field
                name='vendorCheckbox'
                children={(field) => (
                  <Checkbox
                    label='Vendor'
                    classNameDiv='basis-2/5 body-m-b my-auto text-color-2'
                    classNameLabel='ml-2'
                    name={field.name}
                    isChecked={field.state.value}
                    onChange={() => {
                      field.handleChange(!field.state.value);
                      form.validateField('vendor', null);
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='vendor'
                  children={(field) => (
                    <CustomSelect
                      placeholder='Vendor'
                      className='body-m-r'
                      name={field.name}
                      value={field.state.value}
                      options={optionsVendor}
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption
                          ? selectedOption.value
                          : null;
                        field.handleChange(selectedValue);
                      }}
                      size='lg'
                      full
                      disabled={!form.state.values.vendorCheckbox}
                    />
                  )}
                />
              </div>
            </div>
            <div className='px-5 flex'>
              <form.Field
                name='deliverNumberCheckbox'
                children={(field) => (
                  <Checkbox
                    label='Nomor Surat Jalan'
                    classNameDiv='basis-2/5 body-m-b my-auto text-color-2'
                    classNameLabel='ml-2'
                    name={field.name}
                    isChecked={field.state.value}
                    onChange={() => {
                      field.handleChange(!field.state.value);
                      form.validateField('deliverNumber', null);
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='deliverNumber'
                  children={(field) => (
                    <Input
                      placeholder='Enter Ticket ID'
                      size='lg'
                      full
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                      disabled={!form.state.values.deliverNumberCheckbox}
                    />
                  )}
                />
              </div>
            </div>
            <div className='px-5 flex'>
              <form.Field
                name='vehicleCheckbox'
                children={(field) => (
                  <Checkbox
                    label='Nomor Plat Kendaraan'
                    classNameDiv='basis-2/5 body-m-b my-auto text-color-2'
                    classNameLabel='ml-2'
                    name={field.name}
                    isChecked={field.state.value}
                    onChange={() => {
                      field.handleChange(!field.state.value);
                      form.validateField('vehicle', null);
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='vehicle'
                  children={(field) => (
                    <Input
                      placeholder='Nomor Plat Kendaraan'
                      size='lg'
                      full
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                      disabled={!form.state.values.vehicleCheckbox}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-2 mt-4'>
        <Button
          variant='primary-outline'
          size='lg'
          className='!w[79px] button-shadow'
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button size='lg' className='!w-[120px]' onClick={form.handleSubmit}>
          Cari
        </Button>
      </div>
    </Drawer>
  );
};

export default DrawerFilterRiwayat;
