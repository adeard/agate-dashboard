import { useEffect, useMemo, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { createColumnHelper } from '@tanstack/react-table';

import { IoMdClose } from 'react-icons/io';

import { useGet, usePut } from '@/services/use-services';

import Button from '@/components/shared/Button';
import Table from '@/components/shared/Table';
import Checkbox from '@/components/shared/Checkbox';

const ModalFactoryAccess = ({ modalRef, data }) => {
  const {
    data: listFactory,
    loading,
    refetch,
  } = useGet('/v1/factory', { filter: 'false' });

  const { handlePut, loadingPut } = usePut(`/v1/user/${data?._id}`);

  const [accessFactory, setAccessFactory] = useState(
    data?.access_factory || []
  );

  const form = useForm({
    defaultValues: {
      email: data?.email,
      full_name: data?.full_name,
      status: data?.status,
      access_factory: accessFactory,
    },
    onSubmit: async ({ value }) => {
      handlePut(value);
    },
  });

  useEffect(() => {
    setAccessFactory(data?.access_factory || []);
  }, [data?.access_factory]);

  const handleCheckedFactory = (id) => {
    if (accessFactory.includes(id)) {
      setAccessFactory(accessFactory.filter((factoryId) => factoryId !== id));
    } else {
      setAccessFactory([...accessFactory, id]);
    }
  };

  const handleSave = () => {
    form.handleSubmit();
    modalRef.current.close();
  };

  // table column
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('no', {
      header: <div className='text-center text-color-2'>NO</div>,
      cell: (info) => (
        <div className='text-center !body-m-r !text-color-1'>
          {info.row.index + 1}
        </div>
      ),
      size: 20,
    }),
    columnHelper.accessor('name', {
      header: <div className='text-color-2'>PABRIK</div>,
      cell: (info) => (
        <div className='!body-m-r !text-color-1'>{info.getValue()}</div>
      ),
      size: 300,
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <Checkbox
          classNameDiv='basis-2/5 body-m-b my-auto text-color-2'
          classNameLabel='ml-2'
          isChecked={accessFactory.includes(info.row.original._id)}
          onChange={() => handleCheckedFactory(info.row.original._id)}
        />
      ),
    }),
  ];

  return (
    <dialog id='RequestTradeModal' className='modal' ref={modalRef}>
      <div className='modal-box bg-primary-6 w-full max-w-[828px] p-10'>
        <div className='flex justify-between mb-4'>
          <h3 className='subheadline-m text-color-1'>Akses Pabrik</h3>
          <form method='dialog'>
            <Button
              type='submit'
              variant='primary-outline'
              className='flex-none border-none'
            >
              <IoMdClose className='text-2xl' />
            </Button>
          </form>
        </div>

        <div
          className='card w-full bg-white p-5 mb-4'
          style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
        >
          <div className='flex gap-4'>
            <div className='basis-1/2 flex gap-8'>
              <p className='body-m-b text-color-2'>Nama</p>
              <p className='body-m-b text-color-1'>{data?.full_name}</p>
            </div>
            <div className='basis-1/2 flex gap-8'>
              <p className='body-m-b text-color-2'>Email</p>
              <p className='body-m-b text-color-1'>{data?.email}</p>
            </div>
          </div>
        </div>

        <div
          className='card w-full bg-white max-h-[340px] overflow-y-auto'
          style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
        >
          {data && <Table dataTable={listFactory} columns={columns} />}
        </div>
        <div className='modal-action'>
          <form method='dialog'>
            <Button
              size='lg'
              className='!px-10 button-shadow'
              onClick={handleSave}
            >
              Simpan
            </Button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalFactoryAccess;
