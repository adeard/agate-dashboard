import { joinClassnames } from '@/utils/common';

const Checkbox = ({
  name,
  label,
  isChecked = false,
  classNameDiv,
  classNameLabel,
  disabled = false,
  onChange,
}) => {
  return (
    <div className={classNameDiv}>
      <label
        className={`label flex cursor-pointer items-start justify-start ${
          disabled && 'hover:cursor-not-allowed'
        }`}
      >
        <input
          id={name}
          name={name}
          type='checkbox'
          className='checkbox h-5 w-5 rounded-sm border-primary-3'
          checked={isChecked}
          disabled={disabled}
          onChange={onChange}
        />
        <span className={joinClassnames(['label-text', classNameLabel])}>
          {label}
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
