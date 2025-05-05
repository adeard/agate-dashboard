import { BiMinus } from 'react-icons/bi';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';

const GetTrendIconTable = (info, className = 'ml-2 text-xl') => {
  const rowIndex = info?.row?.index;
  const table = info?.table;
  const currentValue = info?.getValue();

  const rows = table?.getRowModel()?.rows || [];
  const nextValue =
    rowIndex < rows.length - 1
      ? rows[rowIndex + 1]?.getValue('percent')
      : undefined;

  if (nextValue === undefined) {
    return <BiMinus className={`text-[#827D72] ${className}`} />;
  }

  if (currentValue > nextValue) {
    return <IoMdArrowDropup className={`text-[#299300] ${className}`} />;
  }

  if (currentValue < nextValue) {
    return <IoMdArrowDropdown className={`text-[#F54040] ${className}`} />;
  }

  return <FaMinus className={`text-[#827D72] ${className}`} />;
};

export default GetTrendIconTable;
