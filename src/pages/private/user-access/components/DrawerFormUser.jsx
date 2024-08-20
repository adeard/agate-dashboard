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
import InputWithIcon from '@/components/shared/InputWithIcon';

import { statusOptions } from '@/utils/optionsKey';

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
      email: '',
      full_name: '',
      whatsapp_number: '',
      access_factory: [],
      status: '',
      subscribe_notification: '',
    },
    onSubmit: async ({ value }) => {
      // isEdit
      //   ? handlePut({
      //       email: value.email,
      //       full_name: value.full_name,
      //       status: value.status,
      //       access_factory: data?.access_factory,
      //     })
      //   : handlePost({
      //       email: value.email,
      //       full_name: value.full_name,
      //       status: value.status,
      //       access_factory: value.access_factory,
      //     });
      // openModalResponseSave();
      console.log({
        ...value,
        subscribe_notification: value.subscribe_notification ? 1 : 0,
      });
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
      form.setFieldValue('email', data?.email);
      form.setFieldValue('full_name', data?.full_name);
      form.setFieldValue('whatsapp_number', data?.whatsapp_number);
      form.setFieldValue('access_factory', [data?.access_factory]);
      form.setFieldValue('status', data?.status);
      form.setFieldValue(
        'subscribe_notification',
        data?.subscribe_notification
      );
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
        <div className='card-body'>
          <div className='flex gap-4'>
            <label className='basis-1/4 body-m-b my-auto text-color-2'>
              Email
            </label>
            <div className='basis-3/4'>
              <form.Field
                name='email'
                children={(field) => (
                  <Input
                    placeholder='Email'
                    full
                    size='lg'
                    name={field.name}
                    value={field.state.value || ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <label className='basis-1/4 body-m-b my-auto text-color-2'>
              Nama
            </label>
            <div className='basis-3/4'>
              <form.Field
                name='full_name'
                children={(field) => (
                  <Input
                    placeholder='Nama'
                    full
                    size='lg'
                    name={field.name}
                    value={field.state.value || ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <label className='basis-1/4 body-m-b my-auto text-color-2'>
              No Handphone
            </label>
            <div className='basis-3/4'>
              <form.Field
                name='whatsapp_number'
                children={(field) => (
                  <InputWithIcon
                    placeholder='Nomor'
                    full
                    size='lg'
                    name={field.name}
                    value={field.state.value || ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    iconLeft='+62'
                  />
                )}
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <label className='basis-1/4 body-m-b my-auto text-color-2'>
              Pabrik
            </label>
            <div className='basis-3/4'>
              <form.Field
                name='access_factory'
                children={(field) => (
                  <CustomSelect
                    placeholder='Pabrik'
                    className='body-m-r !h-full'
                    name={field.name}
                    value={field.state.value}
                    options={optionsFactory || []}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : [];
                      field.handleChange(selectedValues);
                    }}
                    size='lg'
                    full
                    multiple
                  />
                )}
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <label className='basis-1/4 body-m-b my-auto text-color-2'>
              Status
            </label>
            <div className='basis-3/4'>
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
                  />
                )}
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <label className='basis-1/4 body-m-b my-auto text-color-2'></label>
            <div className='basis-3/4'>
              <form.Field
                name='subscribe_notification'
                children={(field) => (
                  <Checkbox
                    label='Langganan Daily Report'
                    classNameDiv='basis-2/5 body-m-b my-auto text-color-2'
                    classNameLabel='ml-2'
                    name={field.name}
                    isChecked={field.state.value}
                    onChange={() => {
                      field.handleChange(!field.state.value);
                    }}
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
