import { useEffect, useRef } from 'react';
import { useForm } from '@tanstack/react-form';

import { IoMdClose } from 'react-icons/io';

import { useGet, usePost, usePut } from '@/services/use-services';

import Button from '@/components/shared/Button';
import Drawer from '@/components/shared/Drawer';
import Input from '@/components/shared/Input';
import Checkbox from '@/components/shared/Checkbox';
import CustomSelect from '@/components/shared/CustomSelect';
import ModalResponseSave from './ModalResponseSave';

const DrawerFormUser = ({
  isEdit = false,
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  refetch,
  data = null,
}) => {
  const { data: optionsFactory } = useGet('/v1/options/factory');

  const {
    handlePost,
    loadingPost,
    responseData: responsePost,
  } = usePost('/v1/user', () => {
    handleClose();
    refetch();
  });

  const {
    handlePut,
    loadingPut,
    responseData: responsePut,
  } = usePut(`/v1/user/${data?._id}`, () => {
    handleClose();
    refetch();
  });

  const form = useForm({
    defaultValues: {
      emailCheckbox: false,
      email: '',
      nameCheckbox: false,
      full_name: '',
      factoryCheckbox: false,
      access_factory: [],
      statusCheckbox: false,
      status: '',
    },
    onSubmit: async ({ value }) => {
      isEdit
        ? handlePut({
            email: value.email,
            full_name: value.full_name,
            status: value.status,
            access_factory: data?.access_factory,
          })
        : handlePost({
            email: value.email,
            full_name: value.full_name,
            status: value.status,
            access_factory: value.access_factory,
          });
      // openModalResponseSave();
    },
  });

  const dialogResponseSaveRef = useRef(null);
  const openModalResponseSave = () => {
    dialogResponseSaveRef.current.showModal();
  };

  const handleCancel = () => {
    form.reset();
    handleClose();
  };

  const handleClose = () => {
    const drawerElement = document.getElementById(idDrawer);
    drawerElement.checked = false;
    closeDrawer();
  };

  useEffect(() => {
    if (data) {
      form.setFieldValue('emailCheckbox', true);
      form.setFieldValue('email', data?.email);
      form.setFieldValue('nameCheckbox', true);
      form.setFieldValue('full_name', data?.full_name);
      form.setFieldValue('statusCheckbox', true);
      form.setFieldValue('status', data?.status);
    }
  }, [data]);

  return (
    <Drawer idDrawer={idDrawer} isOpen={isDrawerOpen} closeDrawer={closeDrawer}>
      {/* header drawer */}
      <div className='flex items-center justify-between'>
        <h3 className='subheadline-m text-color-1'>
          {isEdit ? 'Edit' : 'Tambah'} User
        </h3>
        <Button
          variant='primary-outline'
          className='border-none'
          onClick={handleCancel}
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
          {!isEdit && (
            <div className='px-5 flex'>
              <form.Field
                name='factoryCheckbox'
                children={(field) => (
                  <Checkbox
                    label='Pabrik'
                    classNameDiv='basis-2/5 body-m-b my-auto text-color-2'
                    classNameLabel='ml-2'
                    name={field.name}
                    isChecked={field.state.value}
                    onChange={() => {
                      field.handleChange(!field.state.value);
                      form.validateField('access_factory', null);
                    }}
                  />
                )}
              />
              <div className='basis-3/5'>
                <form.Field
                  name='access_factory'
                  children={(field) => (
                    <CustomSelect
                      placeholder='Pabrik'
                      className='body-m-r !h-full'
                      name={field.name}
                      options={optionsFactory || []}
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : [];
                        field.handleChange(selectedValues);
                      }}
                      size='lg'
                      full
                      disabled={!form.state.values.factoryCheckbox}
                      multiple
                    />
                  )}
                />
              </div>
            </div>
          )}
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
                    options={[
                      {
                        label: 'Tidak Aktif',
                        value: 0,
                      },
                      {
                        label: 'Aktif',
                        value: 1,
                      },
                    ]}
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
          Simpan
        </Button>
      </div>

      <ModalResponseSave modalRef={dialogResponseSaveRef} />
    </Drawer>
  );
};

export default DrawerFormUser;
