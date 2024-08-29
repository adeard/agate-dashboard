import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();

  const { data: optionsVendor } = useGet('/v1/options/vendor');

  const form = useForm({
    defaultValues: {
      dateFromCheckBox: searchParams.get('date_from') ? true : false,
      date_from: searchParams.get('date_from') || '',
      dateEndCheckBox: searchParams.get('date_from') ? true : false,
      date_to: searchParams.get('date_to') || '',
      vendorCheckbox: searchParams.get('vendor_id') ? true : false,
      vendor_id: searchParams.get('vendor_id') || '',
      deliverNumberCheckbox: searchParams.get('delivery_number') ? true : false,
      delivery_number: searchParams.get('delivery_number') || '',
      vehicleNumberCheckbox: searchParams.get('vehicle_number') ? true : false,
      vehicle_number: searchParams.get('vehicle_number') || '',
    },
    onSubmit: async ({ value }) => {
      setQueryParams({
        date_from: value.date_from,
        date_to: value.date_to,
        delivery_number: value.delivery_number,
        vehicle_number: value.vehicle_number,
        vendor_id: value.vendor_id,
      });
      refetch({
        date_from: value.date_from,
        date_to: value.date_to,
        delivery_number: value.delivery_number,
        vehicle_number: value.vehicle_number,
        vendor_id: value.vendor_id,
      });
      handleClose();
      console.log(value);
    },
  });

  const handleCancel = () => {
    setQueryParams({});
    refetch({});
    handleClose();
  };

  const handleClose = () => {
    const drawerElement = document.getElementById(idDrawer);
    drawerElement.checked = false;
    closeDrawer();
    form.reset();
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
                      form.validateField('date_from', null);
                      form.setFieldValue('date_from', '');
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='date_from'
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
                      form.validateField('date_to', null);
                      form.setFieldValue('date_to', '');
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='date_to'
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
                      form.validateField('vendor_id', null);
                      form.setFieldValue('vendor_id', '');
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='vendor_id'
                  children={(field) => (
                    <CustomSelect
                      placeholder='Vendor'
                      className='body-m-r'
                      name={field.name}
                      value={field.state.value}
                      options={optionsVendor || []}
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
                      form.validateField('delivery_number', null);
                      form.setFieldValue('delivery_number', '');
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='delivery_number'
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
                name='vehicleNumberCheckbox'
                children={(field) => (
                  <Checkbox
                    label='Nomor Plat Kendaraan'
                    classNameDiv='basis-2/5 body-m-b my-auto text-color-2'
                    classNameLabel='ml-2'
                    name={field.name}
                    isChecked={field.state.value}
                    onChange={() => {
                      field.handleChange(!field.state.value);
                      form.validateField('vehicle_number', null);
                      form.setFieldValue('vehicle_number', '');
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='vehicle_number'
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
                      disabled={!form.state.values.vehicleNumberCheckbox}
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
