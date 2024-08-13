import React from 'react';

import { TiArrowSortedDown } from 'react-icons/ti';
import Button from './Button';

const Dropdown = ({
  selected,
  setSelected,
  options,
  arrowPosition = 'left',
  full = false,
  buttonClassname,
}) => {
  return (
    <div className='body-m-r dropdown'>
      <Button
        tabIndex={0}
        variant='primary-outline'
        className={`flex items-center justify-between gap-2 ${buttonClassname} ${
          arrowPosition !== 'left' ? 'flex-row-reverse' : ''
        } `}
      >
        <TiArrowSortedDown /> {selected.label}
      </Button>
      <ul
        tabIndex={0}
        className={`dropdown-content z-[1] ${
          full ? 'w-full' : 'w-max'
        } rounded-box bg-base-100 p-2 shadow`}
      >
        {options?.map((option) => (
          <li key={option.value} className='text-left'>
            <Button
              variant='primary-outline'
              className='flex w-full items-center !border-none'
              onClick={() => setSelected(option)}
            >
              {option.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
