import React from 'react';

import { MdArrowBackIosNew, MdOutlineFilterAlt } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa6';

import { formatPercentWithLeadingZeros } from '@/utils/common';

import dayjs from 'dayjs';

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

const RankingTruk = ({
  data,
  toggleMobileDrawerFilter,
  currentPage,
  goBack,
}) => {
  return (
    <>
      <section className='sticky top-0 z-50 flex items-center justify-between max-h-16 p-4 bg-white'>
        <div className='flex-none'>
          <MdArrowBackIosNew className='text-xl' onClick={goBack} />
        </div>
        <h2 className='flex-1 !text-center subheadline-s'>{currentPage}</h2>
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
            {
              label: 'TANGGAL',
              value: dayjs(item.date).format('DD/MM/YYYY, HH:mm:ss'),
              bold: true,
            },
            {
              label: 'DURASI BONGKAR',
              value: '-',
              bg: true,
            },
            {
              label: 'PLAT TRUK',
              value: item.vehicle_number,
            },
            {
              label: 'VENDOR',
              value: item.vendor_name,
              bg: true,
            },
            { label: 'TBS TRUK', value: item.total_tandan },
            {
              label: '% DITERIMA',
              value:
                (formatPercentWithLeadingZeros(item.percent_accepted) ||
                  '00.00') + ' %',
              bold: true,
              color: '#299300',
              bg: true,
            },
            {
              label: '% DITOLAK',
              value: '-',
              bold: true,
              color: '#BD2828',
            },
            {
              label: '% DIDENDA',
              value: '-',
              bold: true,
              color: '#E07324',
              bg: true,
            },
          ];

          return (
            <div
              key={index}
              className='bg-white border border-[#E7E7E7] button-shadow rounded-xl py-4'
            >
              <div className='grid grid-cols-5 text-[#3B3B3B]'>
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
                      <p
                        className={`col-span-2 tag-m ${classNames}`}
                        style={style}
                      >
                        {row.label}
                      </p>
                      <p
                        className={`truncate min-w-0 col-span-3 body-s-r ${classNames}`}
                        style={style}
                      >
                        {row.value} {row.icon}
                      </p>
                      {/* )} */}
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

export default RankingTruk;
