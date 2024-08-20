import React from 'react';
import { joinClassnames } from '@/utils/common';

const inputSizes = {
  md: 'body-s-r h-8',
  lg: 'body-m-r h-10',
};

const InputWithIcon = ({
  type = 'text',
  size = 'md',
  placeholder,
  name,
  value,
  className,
  disabled = false,
  readOnly = false,
  loading = false,
  iconLeft,
  iconRight,
  onChange,
  onClickIcon,
}) => {
  return (
    <>
      <div
        className={joinClassnames([
          inputSizes[size],
          'input input-bordered flex w-full justify-between border-primary-3 bg-transparent !outline-primary-3',
          className,
          (disabled || loading) && 'cursor-not-allowed',
        ])}
      >
        {iconLeft && (
          <button
            className='-ml-4 w-max body-m-r rounded-none rounded-l-lg border border-transparent border-r-primary-3 px-[10px] bg-primary-6 hover:bg-primary-5 text-color-2'
            onClick={onClickIcon}
          >
            {iconLeft}
          </button>
        )}
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          className={`w-full placeholder:text-color-3 ${
            iconLeft ? 'placeholder:pl-2 body-m-r pl-2' : ''
          }`}
          disabled={disabled || loading}
          readOnly={readOnly}
          onChange={onChange}
        />
        {iconRight && (
          <label
            htmlFor={name}
            className='-mr-4 w-max body-m-r flex items-center rounded-none rounded-r-lg border border-transparent border-l-primary-3 px-[10px] bg-primary-6 hover:bg-primary-5 text-color-2'
            onClick={onClickIcon}
          >
            {iconRight}
          </label>
        )}
      </div>
    </>
  );
};

export default InputWithIcon;
