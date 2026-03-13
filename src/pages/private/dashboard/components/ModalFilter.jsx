import { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';

import { useGet } from '@/services/use-services';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Select from '@/components/shared/Select';

const ModalFilter = ({ modalRef }) => {
  const { data: optionsFactory } = useGet('/v1/options/factory');

  const form = useForm({
    defaultValues: {
      date: '',
      factory: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const handleSave = () => {
    form.handleSubmit();
    modalRef.current.close();
  };

  return (
    <dialog id='RequestTradeModal' className='modal' ref={modalRef}>
      <div className='modal-box bg-primary-6 w-full max-w-[828px] p-10'>
        <div className='flex justify-between mb-4'>
          <h3 className='subheadline-m text-color-1'>Filter Dashboard</h3>
        </div>

        <div className='w-full p-4 space-y-4'>
          <div className='flex gap-4'>
            <label className='basis-1/4 body-m-b my-auto text-color-2'>
              Tanggal
            </label>
            <div className='basis-3/4'>
              <form.Field
                name='date'
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
                name='factory'
                children={(field) => (
                  <Select
                    placeholder='Pabrik'
                    className='body-m-r'
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
                    full
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className='modal-action'>
          <form method='dialog'>
            <Button
              size='lg'
              className='!px-10 button-shadow'
              onClick={handleSave}
            >
              Apply
            </Button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalFilter;
