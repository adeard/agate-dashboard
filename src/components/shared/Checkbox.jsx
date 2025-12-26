import { useEffect, useRef } from 'react';
import { joinClassnames } from '@/utils/common';

const Checkbox = ({
  name,
  label,
  isChecked = false,
  isIndeterminate = false,
  classNameDiv,
  classNameLabel,
  disabled = false,
  onChange,
  readOnly = false,
}) => {
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <div className={classNameDiv}>
      <label
        className={`label flex items-start justify-start ${
          disabled
            ? 'cursor-not-allowed'
            : readOnly
            ? 'cursor-not-allowed pointer-events-none'
            : 'cursor-pointer'
        }`}
      >
        <input
          ref={checkboxRef}
          id={name}
          name={name}
          type='checkbox'
          className='checkbox h-5 w-5 rounded-sm border-primary-3'
          checked={isChecked}
          disabled={disabled}
          readOnly={readOnly}
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
