import { IoMdClose } from 'react-icons/io';

import Button from '@/components/shared/Button';
import Drawer from '@/components/shared/Drawer';
import Input from '@/components/shared/Input';
import Select from '@/components/shared/Select';
import Checkbox from '@/components/shared/Checkbox';

import { useForm } from '@tanstack/react-form';

const DrawerFilterRiwayat = ({ idDrawer, isDrawerOpen, closeDrawer }) => {
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
      console.log(value);
    },
  });

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
                      form.handleSubmit();
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
                        form.handleSubmit();
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
                      form.handleSubmit();
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
                        form.handleSubmit();
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
                      form.handleSubmit();
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='vendor'
                  children={(field) => (
                    <Select
                      placeholder='Vendor'
                      className='body-m-r'
                      name={field.name}
                      value={field.state.value}
                      options={[]}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        form.handleSubmit();
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
                      form.handleSubmit();
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
                        form.handleSubmit();
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
                    label='Nomor Surat Jalan'
                    classNameDiv='basis-2/5 body-m-b my-auto text-color-2'
                    classNameLabel='ml-2'
                    name={field.name}
                    isChecked={field.state.value}
                    onChange={() => {
                      field.handleChange(!field.state.value);
                      form.handleSubmit();
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='vehicle'
                  children={(field) => (
                    <Input
                      placeholder='Customer'
                      size='lg'
                      full
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        form.handleSubmit();
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
    </Drawer>
  );
};

export default DrawerFilterRiwayat;
