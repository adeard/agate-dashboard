import React from 'react';
import { joinClassnames } from '@/utils/common';


const inputSizes = {
  md: 'body-s-r h-8',
  lg: 'body-m-r h-10',
};

const Input = ({
  type = 'text',
  size = 'md',
  name,
  value,
  placeholder,
  className,
  full = false,
  readOnly = false,
  disabled = false,
  loading = false,
  onChange,
}) => {
  return (
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      className={joinClassnames([
        inputSizes[size],
        'input rounded-md border-primary-3 bg-transparent !outline-primary-3 placeholder:text-color-3',
        full ? 'w-full' : 'w-[fit]',
        className,
        disabled && 'cursor-not-allowed !bg-primary-5',
      ])}
      readOnly={readOnly}
      disabled={disabled || loading}
      onChange={onChange}
    />
  );
};

export default Input;
