import { useSearchParams } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';

import { IoMdClose } from 'react-icons/io';

import { statusOptions } from '@/utils/optionsKey';
import { getFilteredValues } from '@/utils/common';

import Button from '@/components/shared/Button';
import Drawer from '@/components/shared/Drawer';
import Input from '@/components/shared/Input';
import Checkbox from '@/components/shared/Checkbox';
import CustomSelect from '@/components/shared/CustomSelect';

const DrawerFilterUser = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  setQueryParams,
  refetch,
}) => {
  const [searchParams] = useSearchParams();

  const form = useForm({
    defaultValues: {
      nameCheckbox: searchParams.get('full_name') ? true : false,
      full_name: searchParams.get('full_name') || '',
      emailCheckbox: searchParams.get('email') ? true : false,
      email: searchParams.get('email') || '',
      statusCheckbox: searchParams.get('status') ? true : false,
      status: searchParams.get('status') || '',
    },
    onSubmit: async ({ value }) => {
      const filteredValues = getFilteredValues(value);

      setQueryParams({ ...filteredValues });
      refetch({ ...filteredValues });

      handleClose();
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
                    form.validateField('full_name', null);
                    form.setFieldValue('full_name', '');
                  }}
                />
              )}
            />
            <div className='basis-3/5'>
              <form.Field
                name='full_name'
                children={(field) => (
                  <Input
                    placeholder='Cari Nama'
                    size='lg'
                    full
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
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
                    form.validateField('email', null);
                    form.setFieldValue('email', '');
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
                    form.validateField('status', null);
                    form.setFieldValue('status', '');
                  }}
                />
              )}
            />
            <div className='basis-3/5'>
              <form.Field
                name='status'
                children={(field) => (
                  <CustomSelect
                    placeholder='Status'
                    className='body-m-r'
                    name={field.name}
                    value={field.state.value}
                    options={statusOptions}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption
                        ? selectedOption.value
                        : null;
                      field.handleChange(selectedValue);
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

export default DrawerFilterUser;
