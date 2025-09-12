import { useState, useRef, useEffect } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import Button from './Button';

const Dropdown = ({
  selected,
  setSelected,
  options,
  arrowPosition = 'left',
  full = false,
  buttonClassname,
  noLabel = false,
  position = 'bottom',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className='relative inline-block'>
      <Button
        type='button'
        variant='primary-outline'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        className={`flex items-center justify-between gap-2 ${buttonClassname} ${
          arrowPosition !== 'left' ? 'flex-row-reverse' : ''
        }`}
        onClick={toggleDropdown}
      >
        <TiArrowSortedDown /> {!noLabel ? selected.label : null}
      </Button>

      {isOpen && (
        <ul
          role='listbox'
          className={`absolute z-20 mt-2 max-h-60 overflow-auto rounded-box bg-base-100 p-2 shadow 
            ${full ? 'w-full' : 'w-max'}
            ${position === 'top' ? 'bottom-full mb-2' : ''}
            ${position === 'right' ? 'left-full ml-2 top-0' : ''}
            ${position === 'left' ? 'right-full mr-2 top-0' : ''}
          `}
        >
          {options?.map((option) => (
            <li key={option.value} role='option'>
              <Button
                variant='primary-outline'
                className='flex w-full items-center !border-none'
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
