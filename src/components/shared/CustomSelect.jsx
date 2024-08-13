import React from 'react';
import Select from 'react-select';

import { joinClassnames } from '@/utils/common';

const selectSizes = {
  md: 'body-s-r h-8',
  lg: 'body-m-r h-10',
};

const CustomSelect = ({
  name,
  options,
  placeholder,
  className,
  size = 'md',
  full = false,
  disabled = false,
  onChange,
  multiple = false,
}) => {
  return (
    <Select
      id={name}
      name={name}
      placeholder={placeholder}
      options={options}
      className={joinClassnames([
        selectSizes[size],
        full ? 'w-full' : 'w-[fit]',
        className,
        disabled && 'cursor-not-allowed !bg-primary-5',
      ])}
      classNamePrefix='select'
      onChange={onChange}
      isMulti={multiple}
      isDisabled={disabled}
    />
  );
};

export default CustomSelect;
