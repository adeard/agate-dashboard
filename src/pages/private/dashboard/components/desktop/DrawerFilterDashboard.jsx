import { useState, useEffect, useMemo } from 'react';
import { IoMdClose } from 'react-icons/io';

import Button from '@/components/shared/Button';
import Drawer from '@/components/shared/Drawer';
import Input from '@/components/shared/Input';
import Select from '@/components/shared/Select';

import {
  vendorTypeOptions,
  vendorKJGMTypeOptions,
  vendorLNGMTypeOptions,
  vendorBYLMTypeOptions,
} from '@/utils/optionsKey';

const DrawerFilterDashboard = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  form,
  optionsFactory,
  optionsVendor,
}) => {
  const [vendorTypeOptionList, setVendorTypeOptionList] =
    useState(vendorTypeOptions);

  const sortedOptionsFactory = useMemo(() => {
    if (!optionsFactory) return [];
    return [...optionsFactory].sort((a, b) => {
      if (a.label && a.label.toUpperCase().includes('LNGM')) return -1;
      if (b.label && b.label.toUpperCase().includes('LNGM')) return 1;
      return 0;
    });
  }, [optionsFactory]);

  useEffect(() => {
    const currentFactoryValue = form.state.values?.factory;
    if (currentFactoryValue && optionsFactory) {
      const selectedOption = optionsFactory.find(
        (opt) => opt.value === currentFactoryValue,
      );
      if (currentFactoryValue === '68fc9b419a7c87b51e2002b5') {
        setVendorTypeOptionList(vendorKJGMTypeOptions);
      } else if (currentFactoryValue === '699be68839fb2f1e96d62a01') {
        setVendorTypeOptionList(vendorBYLMTypeOptions);
      } else if (
        selectedOption &&
        selectedOption.label &&
        selectedOption.label.toUpperCase().includes('LNGM')
      ) {
        setVendorTypeOptionList(vendorLNGMTypeOptions);
      } else {
        setVendorTypeOptionList(vendorTypeOptions);
      }
    }
  }, [form.state.values?.factory, optionsFactory]);

  const handleClose = () => {
    const drawerElement = document.getElementById(idDrawer);
    drawerElement.checked = false;
    closeDrawer();
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
        <div className='space-y-4 my-5 p-5'>
          <div className='flex items-center gap-2'>
            <label className='basis-1/4'>
              <span className='label-text'>Tanggal</span>
            </label>
            <div className='basis-3/4 flex items-center justify-between gap-4'>
              <form.Field
                name='date_from'
                children={(field) => (
                  <Input
                    type='date'
                    size='lg'
                    name={field.name}
                    value={field.state.value}
                    className='bg-white pr-8'
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    full
                  />
                )}
              />
              <span>-</span>
              <form.Field
                name='date_to'
                children={(field) => (
                  <Input
                    type='date'
                    size='lg'
                    name={field.name}
                    value={field.state.value}
                    className='bg-white pr-8'
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    full
                  />
                )}
              />
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='basis-1/4'>
              <span className='label-text'>Pabrik</span>
            </label>
            <div className='basis-3/4'>
              <form.Field
                name='factory'
                children={(field) => (
                  <Select
                    placeholder='Pabrik'
                    className='body-m-r !h-full'
                    name={field.name}
                    value={field.state.value}
                    options={sortedOptionsFactory}
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption
                        ? selectedOption.value
                        : null;
                      field.handleChange(selectedValue);
                      if (selectedValue === '68fc9b419a7c87b51e2002b5') {
                        setVendorTypeOptionList(vendorKJGMTypeOptions);
                      } else if (
                        selectedOption &&
                        selectedOption.label &&
                        selectedOption.label.toUpperCase().includes('LNGM')
                      ) {
                        setVendorTypeOptionList(vendorLNGMTypeOptions);
                      } else {
                        setVendorTypeOptionList(vendorTypeOptions);
                      }
                    }}
                    size='lg'
                  />
                )}
              />
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <label className='basis-1/4'>
              <span className='label-text'>Vendor Type</span>
            </label>
            <div className='basis-3/4'>
              <form.Field
                name='vendor_type'
                children={(field) => (
                  <Select
                    placeholder='Vendor Type'
                    className='body-m-r !h-full'
                    name={field.name}
                    value={field.state.value}
                    options={vendorTypeOptionList || []}
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
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='basis-1/4'>
              <span className='label-text'>Vendor</span>
            </label>
            <div className='basis-3/4'>
              <form.Field
                name='ids'
                children={(field) => (
                  <Select
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
        <Button
          size='lg'
          className='!w-[120px]'
          onClick={() => {
            form.handleSubmit();
            handleClose();
          }}
        >
          Cari
        </Button>
      </div>
    </Drawer>
  );
};

export default DrawerFilterDashboard;
