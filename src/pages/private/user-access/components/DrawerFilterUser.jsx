import { IoMdClose } from 'react-icons/io';

import Button from '@/components/shared/Button';
import Drawer from '@/components/shared/Drawer';
import Input from '@/components/shared/Input';
import Checkbox from '@/components/shared/Checkbox';
import Select from '@/components/shared/Select';

import { useForm } from '@tanstack/react-form';

const DrawerFilterUser = ({ idDrawer, isDrawerOpen, closeDrawer }) => {
  const form = useForm({
    defaultValues: {
      nameCheckbox: false,
      name: '',
      emailCheckbox: false,
      email: '',
      statusCheckbox: false,
      status: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

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
        <div className='space-y-4 my-5'>
          <div className='px-5 flex'>
            <form.Field
              name='nameCheckbox'
              children={(field) => (
                <Checkbox
                  label='Nama'
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
                name='name'
                children={(field) => (
                  <Input
                    placeholder='Cari Nama'
                    size='lg'
                    full
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      form.handleSubmit();
                    }}
                    disabled={!form.state.values.nameCheckbox}
                  />
                )}
              />
            </div>
          </div>
          <div className='px-5 flex'>
            <form.Field
              name='emailCheckbox'
              children={(field) => (
                <Checkbox
                  label='Email'
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
                name='email'
                children={(field) => (
                  <Input
                    placeholder='Cari Email'
                    size='lg'
                    full
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      form.handleSubmit();
                    }}
                    disabled={!form.state.values.emailCheckbox}
                  />
                )}
              />
            </div>
          </div>
          <div className='px-5 flex'>
            <form.Field
              name='statusCheckbox'
              children={(field) => (
                <Checkbox
                  label='Status'
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
                name='status'
                children={(field) => (
                  <Select
                    placeholder='Status'
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
                    disabled={!form.state.values.statusCheckbox}
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
        <Button size='lg' className='!w-[120px]'>
          Cari
        </Button>
      </div>
    </Drawer>
  );
};

export default DrawerFilterUser;
