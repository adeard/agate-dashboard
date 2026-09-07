import React from 'react';

import { MdArrowBackIosNew } from 'react-icons/md';

import Button from '@/components/shared/Button';

import {
  formatCurrency,
  formatPercentWithLeadingZeros,
  getDurationInMinutes,
} from '@/utils/common';
import { BASE_URL } from '@/utils/axios';

import dayjs from 'dayjs';

const TotalTruk = ({ data, goBack }) => {
  return (
    <>
      <section className='sticky top-0 z-50 flex items-center justify-between max-h-16 p-4 bg-white'>
        <div className='flex-none'>
          <MdArrowBackIosNew className='text-xl' onClick={goBack} />
        </div>
        <h2 className='flex-1 !text-center mr-4 subheadline-s'>Riwayat Truk</h2>
      </section>

      <section className='w-full bg-[#F8F9FB] p-4 space-y-4'>
        {data?.map((item, index) => {
          const duration = getDurationInMinutes(item.date, item.finish_date);

          const avgTbsPerMinute =
            duration > 0 ? Math.round(item.total_tandan / duration) : 0;

          const rows = [
            {
              label: 'TANGGAL',
              value: (
                <>
                  {dayjs(item.date).format('DD/MM/YYYY')}
                  <br />
                  {dayjs(item.date).format('HH:mm')} -{' '}
                  {dayjs(item.finish_date).format('HH:mm')}
                </>
              ),
              bold: true,
            },
            { label: 'DURASI BONGKAR', value: '-', bg: true },
            { label: 'WAKTU MENUNGGU', value: '-' },
            { label: 'VENDOR', value: item.vendor_name, bg: true },
            { label: 'MESIN', value: item.mesin },
            { label: 'SURAT JALAN', value: item.delivery_number, bg: true },
            { label: 'PLAT NOMOR', value: item.vehicle_number },
            {
              label: 'TOTAL TBS',
              value: formatCurrency(item.total_tandan),
              bg: true,
            },
            {
              label: 'TBS MULTIPLE',
              value: formatCurrency(item.total_multiple),
            },
            {
              label: '% DITERIMA',
              value:
                (formatPercentWithLeadingZeros(item.percent_accepted) ||
                  '00.00') + ' %',
              color: '#299300',
              bold: true,
              bg: true,
            },
            {
              label: '% DITOLAK',
              value: '-',
              color: '#BD2828',
              bold: true,
            },
            {
              label: '% DIDENDA',
              value: '-',
              color: '#E07324',
              bold: true,
              bg: true,
            },
          ];

          return (
            <div
              key={index}
              className='bg-white border border-[#E7E7E7] button-shadow rounded-xl pt-4'
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
              <div className='p-4'>
                <Button
                  variant='primary'
                  size='lg'
                  className='button-l'
                  full
                  onClick={() => {
                    window.open(
                      BASE_URL + '/v1/inspection-data/download-pdf/' + item._id,
                      '_blank',
                    );
                  }}
                >
                  Download PDF
                </Button>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default TotalTruk;
