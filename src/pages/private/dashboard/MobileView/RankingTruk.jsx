import React, { useState } from 'react';

import { MdOutlineFilterAlt } from 'react-icons/md';
import { IoMdArrowDropright } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa6';

import { formatPercentWithLeadingZeros } from '@/utils/common';
import NavbarMobile from '@/components/shared/NavbarMobile';

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
}) => {
  return (
    <div>
      <NavbarMobile
        linkBack='/dashboard'
        title={currentPage}
        rightIcon={
          <MdOutlineFilterAlt
            className='text-xl'
            onClick={toggleMobileDrawerFilter}
          />
        }
      />

      <div className='w-full bg-[#F8F9FB] p-4 space-y-4'>
        {data?.map((item, index) => {
          const rows = [
            {
              label: 'TANGGAL',
              value: dayjs(item.date).format('DD/MM/YYYY, HH:mm:ss'),
              bold: true,
            },
            {
              label: 'PLAT TRUK',
              value: item.vehicle_number,
              bg: true,
              bold: true,
            },
            {
              label: 'VENDOR',
              value: item.vendor_name,
            },
            { label: 'TBS TRUK', value: item.total_tandan, bg: true },
            {
              label: '%DITERIMA',
              value:
                formatPercentWithLeadingZeros(item.percent_accepted) || '00.00',
            },
            {
              label: '%MM',
              value:
                formatPercentWithLeadingZeros(item.percent_matang.percent) ||
                '00.00',
              bg: true,
              bold: true,
              color: '#299300',
            },
            {
              label: '%LM',
              value:
                formatPercentWithLeadingZeros(
                  item.percent_lewat_matang.percent
                ) || '00.00',
              bold: true,
              color: '#299300',
            },
            {
              label: '%TP',
              value:
                formatPercentWithLeadingZeros(
                  item.percent_tangkai_panjang.percent
                ) || '00.00',
              bg: true,
              bold: true,
              color: '#E07324',
            },
            {
              label: '%M',
              value:
                formatPercentWithLeadingZeros(item.percent_mentah.percent) ||
                '00.00',
              bold: true,
              color: '#BD2828',
            },
            {
              label: '%JK',
              value:
                formatPercentWithLeadingZeros(
                  item.percent_janjang_kosong.percent
                ) || '00.00',
              bg: true,
              bold: true,
              color: '#BD2828',
            },
            {
              label: '%BK',
              value:
                formatPercentWithLeadingZeros(
                  item.percent_buah_kecil.percent
                ) || '00.00',
              bold: true,
              color: '#BD2828',
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
                      {row.label === 'TANGGAL' ? (
                        <p
                          className={`col-span-3 body-s-r flex justify-between items-center ${classNames}`}
                          style={style}
                          onClick={() =>
                            window.open(
                              `/dashboard/riwayat-pemeriksaan/${item._id}`,
                              '_blank'
                            )
                          }
                        >
                          {row.value} <IoMdArrowDropright className='text-xl' />
                        </p>
                      ) : (
                        <p
                          className={`col-span-3 body-s-r ${classNames}`}
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
    </div>
  );
};

export default RankingTruk;
