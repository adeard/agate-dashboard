import { MdArrowBackIosNew } from 'react-icons/md';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import CustomSelect from '@/components/shared/CustomSelect';
import { vendorTypeOptions } from '@/utils/optionsKey';

const MobileDrawerFilter = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  form,
  optionsFactory,
  optionsVendor,
}) => {
  const handleSubmit = () => {
    form.handleSubmit();
    closeDrawer();
  };

  return (
    <div className='drawer z-20'>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
      ></div>

      <div
        id={idDrawer}
        className={`w-full h-max fixed bottom-0 left-0 right-0 bg-white p-4 pb-8 rounded-t-2xl shadow-lg transition-transform duration-300 transform ${
          isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='flex items-center justify-between text-color-1'>
          <div className='flex-none'>
            <MdArrowBackIosNew className='text-xl' onClick={closeDrawer} />
          </div>
          <h2 className='flex-1 !text-center mr-4 subheadline-s'>Filter</h2>
        </div>
        <div className='flex flex-col gap-2 mt-4'>
          <label className='body-s-b text-color-1'>Waktu Dari</label>
          <form.Field
            name='date_from'
            children={(field) => (
              <Input
                type='date'
                size='lg'
                name={field.name}
                value={field.state.value}
                className='bg-white'
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
                full
              />
            )}
          />
          <label className='body-s-b text-color-1'>Waktu Hingga</label>
          <form.Field
            name='date_to'
            children={(field) => (
              <Input
                type='date'
                size='lg'
                name={field.name}
                placeholder='tanggal'
                value={field.state.value}
                className='bg-white'
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
                full
              />
            )}
          />
          <label className='body-s-b text-color-1'>Pabrik</label>
          <form.Field
            name='factory'
            children={(field) => (
              <CustomSelect
                placeholder='Pabrik'
                className='body-m-r !h-full'
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
              />
            )}
          />
          <label className='body-s-b text-color-1'>Jenis</label>
          <form.Field
            name='vendor_type'
            children={(field) => (
              <CustomSelect
                placeholder='Vendor Type'
                className='body-m-r !h-full'
                name={field.name}
                value={field.state.value}
                options={vendorTypeOptions || []}
                onChange={(selectedOption) => {
                  const selectedValue = selectedOption
                    ? selectedOption.value
                    : null;
                  field.handleChange(selectedValue);
                }}
                size='lg'
              />
            )}
          />
          <label className='body-s-b text-color-1'>Vendor</label>
          <form.Field
            name='ids'
            children={(field) => (
              <CustomSelect
                placeholder='Vendor'
                className='body-m-r !h-full'
                name={field.name}
                value={field.state.value}
                options={optionsVendor || []}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : [];
                  field.handleChange(selectedValues);
                }}
                size='lg'
                multiple
              />
            )}
          />
          <Button size='lg' className='mt-4' onClick={handleSubmit} full>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawerFilter;
