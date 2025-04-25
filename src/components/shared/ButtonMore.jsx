import { useState } from 'react';
import { IoMdMore } from 'react-icons/io';

const ButtonMore = ({ listMenu = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      tabIndex={0}
      onBlur={() => setTimeout(() => setIsOpen(false), 500)}
      className='dropdown dropdown-end'
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 rounded-lg border border-primary-4 bg-white text-color-1 hover:bg-gray-100 shadow'
      >
        <IoMdMore className='text-xl' />
      </button>

      {isOpen && (
        <ul className='dropdown-content menu bg-white rounded-box z-[1] w-max p-2 shadow body-s-r text-color-1'>
          {listMenu.map((item, i) => (
            <li key={i}>
              <span
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
              >
                {item.icon && <span className='text-lg'>{item.icon}</span>}
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ButtonMore;
