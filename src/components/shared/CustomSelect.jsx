import Select from 'react-select';

import { joinClassnames } from '@/utils/common';

const selectSizes = {
  md: 'body-s-r h-8',
  lg: 'body-m-r h-10',
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#E0D6D6' : provided.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px #E0D6D6' : provided.boxShadow,
    '&:hover': {
      borderColor: '#E0D6D6',
    },
    backgroundColor: state.isDisabled ? '#FBF8F8' : provided.backgroundColor,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? '#B9B2B2' : provided.color,
    paddingLeft: '7px',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '4px',
    overflow: 'hidden',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#FBF8F8' : 'white',
    color: state.isFocused ? '#6D6060' : 'black',
    padding: 10,
    ':active': {
      backgroundColor: '#FBF8F8',
      color: '#6D6060',
    },
  }),
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
  isSearchable = true,
}) => {
  const selectedValues = multiple
    ? options.filter((option) => value.includes(option.value))
    : options.filter((option) => option.value === value) || null;

  return (
    <Select
      id={name}
      name={name}
      value={selectedValues}
      placeholder={placeholder}
      options={options}
      className={joinClassnames([
        selectSizes[size],
        full ? 'w-full' : 'w-[fit]',
        className,
      ])}
      classNamePrefix='react-select'
      styles={customStyles}
      onChange={onChange}
      isMulti={multiple}
      isDisabled={disabled}
      isSearchable={isSearchable}
    />
  );
};

export default CustomSelect;
