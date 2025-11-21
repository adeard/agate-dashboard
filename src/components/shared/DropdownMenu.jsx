import { IoMdMore } from 'react-icons/io';

const DropdownMenu = ({ info, options = [] }) => {
  const pageIndex = info.table.getState().pagination.pageIndex + 1;
  const pageSize = info.table.getState().pagination.pageSize;
  const rowsLength = info.table.getCoreRowModel().rows.length;
  const rowIndex = info.row.index;

  const positionDropdown = () => {
    if (rowIndex >= pageIndex * pageSize - 3 || rowIndex >= rowsLength - 3) {
      if (rowIndex <= pageIndex * pageSize - 8) {
        return 'dropdown-bottom';
      } else {
        return 'dropdown-top';
      }
    } else {
      return 'dropdown-bottom';
    }
  };

  return (
    <div className='flex justify-center'>
      <div className={`dropdown dropdown-end z-1 ${positionDropdown()}`}>
        <div
          tabIndex='0'
          role='button'
          className='text-color-1 bg-white border border-primary-4 button-shadow hover:bg-gray-100 p-2 rounded-lg'
        >
          <IoMdMore className='text-xl' />
        </div>
        <ul
          tabIndex='0'
          className='dropdown-content menu bg-white rounded-box z-[1] min-w-52 w-max p-2 shadow body-s-r text-color-1'
        >
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
