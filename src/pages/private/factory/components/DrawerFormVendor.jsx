import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';

import { IoMdClose } from 'react-icons/io';

import { usePost, usePut } from '@/services/use-services';

import Button from '@/components/shared/Button';
import Drawer from '@/components/shared/Drawer';
import Input from '@/components/shared/Input';

const DrawerFormVendor = ({
  isEdit = false,
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  refetch,
  data = null,
}) => {
  const { id } = useParams();

  const { handlePost, loadingPost } = usePost('/v1/vendor', () => {
    handleClose();
    refetch();
  });

  const { handlePut, loadingPut } = usePut(`/v1/vendor/${data?._id}`, () => {
    handleClose();
    refetch();
  });

  const form = useForm({
    defaultValues: {
      name: '',
    },
    onSubmit: async ({ value }) => {
      isEdit
        ? handlePut({ ...value, factory: id })
        : handlePost({ ...value, factory: id });
    },
  });

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
    if (data) form.setFieldValue('name', data?.name);
  }, [data]);

  return (
    <Drawer idDrawer={idDrawer} isOpen={isDrawerOpen} closeDrawer={closeDrawer}>
      {/* header drawer */}
      <div className='flex items-center justify-between'>
        <h3 className='subheadline-m text-color-1'>
          {isEdit ? 'Edit' : 'Tambah'} Vendor
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
              Vendor
            </label>
            <div className='basis-3/4'>
              <form.Field
                name='name'
                children={(field) => (
                  <Input
                    placeholder='Nama Vendor'
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
    </Drawer>
  );
};

export default DrawerFormVendor;
