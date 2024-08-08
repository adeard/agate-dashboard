import React from 'react';
import { joinClassnames } from '@/utils/global';

const buttonVariants = {
  primary: 'bg-primary-1 text-color-4 hover:bg-primary-2 px-3',
  'primary-outline':
    'text-color-1 bg-white border border-primary-4 hover:bg-primary-5 px-3',
};

const buttonSizes = {
  md: 'button-m h-8',
  lg: 'button-l h-10',
};

const Button = ({
  tabIndex = null,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className,
  full = false,
  disabled = false,
  loading = false,
  children,
  onClick,
}) => {
  return (
    <button
      tabIndex={tabIndex}
      type={type}
      className={joinClassnames([
        buttonSizes[size],
        'rounded-md',
        buttonVariants[variant],
        full ? 'w-full' : 'w-fit',
        className,
        (disabled || loading) && '!bg-primary-4 !text-color-3 cursor-not-allowed',
      ])}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {!loading ? (
        children
      ) : (
        <div className='flex items-center justify-center gap-2'>
          <span className='loading loading-spinner' /> Please wait...
        </div>
      )}
    </button>
  );
};

export default Button;
