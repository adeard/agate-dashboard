import { BiMinus } from 'react-icons/bi';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';

const GetTrendIconSection = (currentValue, nextValue, className = 'ml-2 text-xl') => {
  if (nextValue === undefined) {
    return <BiMinus className={`text-[#827D72] ${className}`} />;
  }

  if (currentValue > nextValue) {
    return <IoMdArrowDropup className={`text-[#299300] ${className}`} />;
  }

  if (currentValue < nextValue) {
    return <IoMdArrowDropdown className={`text-[#F54040] ${className}`} />;
  }

  return <BiMinus className={`text-[#827D72] ${className}`} />;
};

export default GetTrendIconSection;
