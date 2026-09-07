import React from 'react';

import { MdArrowBackIosNew } from 'react-icons/md';

import { formatPercentWithLeadingZeros } from '@/utils/common';

import dayjs from 'dayjs';

const RiwayatPemeriksaanTruk = ({ data, vendor, goBack }) => {
  return (
    <>
      <section className='sticky top-0 z-50 flex items-center justify-between max-h-16 p-4 bg-white'>
        <div className='flex-none'>
          <MdArrowBackIosNew className='text-xl' onClick={goBack} />
        </div>
        <h2 className='flex-1 !text-center mr-4 subheadline-s'>
          Riwayat Pemeriksaan Truk
        </h2>
      </section>

      <section className='w-full bg-[#F8F9FB] p-4 space-y-4'>
        <p className='ml-2'>{vendor}</p>
        {data?.map((item, index) => {
          const rows = [
            {
              label: 'TANGGAL',
              value: dayjs(item.date).format('DD/MM/YYYY, HH:mm:ss'),
              bold: true,
            },
            { label: 'DURASI BONGKAR', value: '-', bg: true },
            { label: 'NOMOR MESIN', value: item.mesin },
            { label: 'SURAT JALAN', value: item.delivery_number, bg: true },
            { label: 'PLAT NOMOR', value: item.vehicle_number },
            { label: 'TOTAL TBS', value: item.total_tandan, bg: true },
            {
              label: '% DITERIMA',
              value:
                (formatPercentWithLeadingZeros(item.percent_accepted) ||
                  '00.00') + ' %',
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
                  ]
                    .filter(Boolean)
                    .join(' ');

                  const style = row.color ? { color: row.color } : {};

                  return (
                    <React.Fragment key={i}>
                      <p className={`tag-m ${classNames}`} style={style}>
                        {row.label}
                      </p>
                      <p
                        className={`body-s-r truncate ${classNames}`}
                        style={style}
                      >
                        {row.value}
                      </p>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default RiwayatPemeriksaanTruk;
