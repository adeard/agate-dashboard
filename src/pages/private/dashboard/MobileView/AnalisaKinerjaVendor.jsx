import React from 'react';

import { MdArrowBackIosNew, MdOutlineFilterAlt } from 'react-icons/md';
import { IoMdArrowDropright } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa6';

import { formatPercentWithLeadingZeros } from '@/utils/common';

const getStarColor = (rank) => {
  if (rank === 1) return '#FFD700';
  if (rank === 2) return '#DADADA';
  if (rank === 3) return '#DEA35A';
  return '#000000';
};

const getRankTextColor = (rank) => {
  return rank >= 4 ? '#FFFFFF' : '#000000';
};

const getIcon = (rank) => {
  return rank >= 4 ? (
    <span className='relative inline-block w-5 h-5'>
      <FaCircle
        className='absolute inset-0 w-full h-full'
        style={{ color: getStarColor(rank) }}
      />
      <span
        className='absolute inset-0 flex items-center justify-center text-[10px] font-bold'
        style={{ color: getRankTextColor(rank) }}
      >
        {rank}
      </span>
    </span>
  ) : (
    <span className='relative inline-block w-7 h-7 -top-0.5'>
      <FaStar
        className='absolute inset-0 w-full h-full'
        style={{ color: getStarColor(rank) }}
      />
      <span
        className='absolute inset-0 flex items-center justify-center text-xs font-bold top-1'
        style={{ color: getRankTextColor(rank) }}
      >
        {rank}
      </span>
    </span>
  );
};

const AnalisaKinerjaVendor = ({
  data,
  setSelectedDiterimaVendor,
  toggleMobileDrawerFilter,
  toggleMobileDrawerDiterimaVendor,
  goBack,
}) => {
  return (
    <>
      <section className='sticky top-0 z-50 flex items-center justify-between max-h-16 p-4 bg-white'>
        <div className='flex-none'>
          <MdArrowBackIosNew className='text-xl' onClick={goBack} />
        </div>
        <h2 className='flex-1 !text-center subheadline-s'>
          Analisa Kinerja Vendor
        </h2>
        <div className='flex-none'>
          <MdOutlineFilterAlt
            className='text-xl'
            onClick={toggleMobileDrawerFilter}
          />
        </div>
      </section>

      <div className='w-full bg-[#F8F9FB] p-4 space-y-4'>
        {data?.map((item, index) => {
          const rows = [
            { label: 'VENDOR', value: item.vendor_name, bold: true },
            { label: 'TOTAL TRUK', value: item.count.percent, bg: true },
            {
              label: '%SUPPLY TRUK',
              value:
                (formatPercentWithLeadingZeros(item.percent_supply.percent) ||
                  '00.00') + ' %',
              icon: getIcon(item.percent_supply.rank),
            },
            { label: 'AVG TBS TRUK', value: item.avg_tandan.percent, bg: true },
            {
              label: '% DITERIMA',
              value:
                (formatPercentWithLeadingZeros(item.avg_accepted.percent) ||
                  '00.00') + ' %',
              icon: getIcon(item.avg_accepted.rank),
              color: '#299300',
              bold: true,
            },
            {
              label: '% DITOLAK',
              value: '-',
              color: '#BD2828',
              bold: true,
              bg: true,
            },
            {
              label: '% DIDENDA',
              value: '-',
              color: '#E07324',
              bold: true,
            },
          ];

          return (
            <div
              key={index}
              className='bg-white border border-[#E7E7E7] button-shadow rounded-xl py-4'
            >
              <div className='grid grid-cols-2 text-[#3B3B3B]'>
                {rows.map((row, i) => {
                  const classNames = [
                    row.bg ? 'bg-[#F6F6F6]' : '',
                    'py-2 px-4',
                    row.bold ? '!font-bold' : '',
                    row.icon && 'flex items-center gap-2',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  const style = row.color ? { color: row.color } : {};

                  return (
                    <React.Fragment key={i}>
                      <p className={`tag-m ${classNames}`} style={style}>
                        {row.label}
                      </p>
                      {row.label === 'VENDOR' ? (
                        <p
                          className={`body-s-r flex justify-between items-center gap-2 ${classNames}`}
                          style={style}
                          onClick={() => {
                            setSelectedDiterimaVendor(row.value);
                            toggleMobileDrawerDiterimaVendor();
                          }}
                        >
                          <span className='truncate min-w-0'>{row.value}</span>
                          <IoMdArrowDropright className='text-xl flex-shrink-0' />
                        </p>
                      ) : (
                        <p
                          className={`body-s-r truncate ${classNames}`}
                          style={style}
                        >
                          {row.value} {row.icon}
                        </p>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AnalisaKinerjaVendor;
