import React from 'react';
import Select from 'react-select';

import { MdOutlineArrowDropDown } from 'react-icons/md';

import { joinClassnames } from '@/utils/common';

const selectSizes = {
  md: 'body-s-r h-8',
  lg: 'body-m-r h-10',
};

const CustomSelect = ({
  name,
  value,
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
    // <div className={`relative ${full ? 'w-full' : 'w-fit'}`}>
    //   <select
    //     id={name}
    //     name={name}
    //     value={value}
    //     className={joinClassnames([
    //       selectSizes[size],
    //       'w-full rounded-md border border-primary-3 bg-transparent pl-3 pr-14 appearance-none',
    //       value || value === 0 ? 'text-black' : 'text-color-3',
    //       full ? 'w-full' : 'w-[fit]',
    //       className,
    //       disabled && 'cursor-not-allowed !bg-primary-5',
    //     ])}
    //     onChange={onChange}
    //     disabled={disabled}
    //     multiple={multiple}
    //   >
    //     {placeholder && (
    //       <option value='' disabled>
    //         {placeholder}
    //       </option>
    //     )}
    //     {options.map((option) => (
    //       <option
    //         key={option.value}
    //         value={option.value}
    //         className='text-black'
    //       >
    //         {option.label}
    //       </option>
    //     ))}
    //   </select>
    //   <span className='absolute right-0 h-full pointer-events-none border-2 border-transparent border-l-primary-3 p-2'>
    //     <MdOutlineArrowDropDown className='text-xl' />
    //   </span>
    // </div>
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
