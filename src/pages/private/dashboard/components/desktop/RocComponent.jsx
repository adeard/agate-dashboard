import { joinClassnames } from '@/utils/common';
import { useMemo } from 'react';

const RocComponent = ({ type, roc }) => {
  const rocValue = useMemo(() => {
    return roc[type];
  }, [roc, type]);
  const isPositiveValue = rocValue > 0;
  const isPositive =
    rocValue === 0
      ? true
      : type === 'diterima'
      ? isPositiveValue
      : !isPositiveValue;

  return (
    <div
      className={joinClassnames([
        'bg-white border rounded-xl p-3 inline-flex items-center justify-between',
        isPositive ? 'border-[#006D33]' : 'border-secondary-2',
      ])}
    >
      <label>
        <span
          className={joinClassnames([
            'label-text body-m-b flex items-center gap-2 capitalize',
            isPositive ? 'text-[#006D33]' : 'text-secondary-2',
          ])}
        >
          ROC %{type}
        </span>
      </label>
      <p
        className={joinClassnames([
          isPositive ? 'text-[#006D33]' : 'text-secondary-2',
        ])}
      >
        <span
          className={joinClassnames([
            'h-full w-2 border mx-2',
            isPositive ? 'border-[#006D33]' : 'border-secondary-2',
          ])}
        ></span>
        <span className='body-m-r mr-1'>{`${rocValue < 0 ? '-' : '+'}${Math.abs(
          rocValue
        ).toLocaleString('en', {
          maximumFractionDigits: 2,
        })}`}</span>
      </p>
    </div>
  );
};

export default RocComponent;
