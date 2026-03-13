import  { useEffect, useMemo, useState } from 'react';
import { MdOutlineVisibility } from 'react-icons/md';
import Table from '@/components/shared/Table';
import Button from '@/components/shared/Button';
import DrawerDemografiChart from './DrawerDemografiChart';
import { convertLabel } from '@/utils/common';

const TableDemografi = ({
  data,
  range,
  type,
  variant = 'inti',
  height,
  width,
  toggleDrawer,
}) => {
  const categories = Array.from(
    new Set(data[range].flatMap((month) => month.data.map((item) => item.name)))
  );

  return (
    <div className='overflow-auto' style={{ height: height }}>
      <table className='table'>
        <thead className='sticky top-0 z-1 bg-white'>
          <tr>
            <th className='tag-l font-bold text-color-1'>
              {range === 'monthly' && 'MONTH'}
              {range === 'weekly' && 'WEEK'}
              {range === 'daily' && 'DATE'}
            </th>
            {categories.map((category) => (
              <th key={category} className='tag-l text-color-2'>
                {convertLabel(category).toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data[range].map((data) => {
            const totalRow = data.data.reduce(
              (sum, item) => sum + item.total,
              0
            );

            return (
              <>
                {data.data.length > 0 ? (
                  <tr key={data.title}>
                    <td
                      className='body-m-r !text-sm text-color-1 hover:underline hover:cursor-pointer'
                      onClick={() =>
                        toggleDrawer({
                          variant: variant,
                          label: data.title,
                          demography: data.data,
                        })
                      }
                    >
                      {range === 'weekly' ? 'Week ' + data.title : data.title}
                    </td>
                    {categories.map((category) => {
                      const item = data.data.find((d) => d.name === category);
                      const percentage = item
                        ? ((item.total / totalRow) * 100).toFixed(2)
                        : '-';

                      return (
                        <td key={category}>
                          {item && percentage != 'NaN' ? (
                            <p className='inline-flex body-s-r'>
                              <span className='text-color-1'>{percentage}</span>{' '}
                              <span className='text-color-2'>%</span>
                            </p>
                          ) : (
                            '-'
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ) : null}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableDemografi;
