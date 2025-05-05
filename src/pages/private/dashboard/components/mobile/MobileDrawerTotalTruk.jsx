import React, { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';

import {
  MdArrowBackIosNew,
  MdOutlineFilterAlt,
  MdOutlineVisibility,
} from 'react-icons/md';

import { useGet } from '@/services/use-services';

import { convertLabel, formatPercentWithLeadingZeros } from '@/utils/common';

import DrawerMobile from '@/components/shared/DrawerMobile';

import dayjs from 'dayjs';
import Button from '@/components/shared/Button';

const MobileDrawerTotalTruk = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  data,
}) => {
  const [searchParams] = useSearchParams();

  const handleClose = () => {
    const drawerElement = document.getElementById(idDrawer);
    drawerElement.checked = false;
    closeDrawer();
  };

  return (
    <DrawerMobile
      idDrawer={idDrawer}
      isOpen={isDrawerOpen}
      classNameDrawer={'!p-0'}
      closeDrawer={handleClose}
    >
      <div className='flex items-center justify-between max-h-16 p-4 bg-white'>
        <div className='flex-none'>
          <MdArrowBackIosNew className='text-xl' onClick={handleClose} />
        </div>
        <h2 className='flex-1 !text-center mr-4 subheadline-s'>Riwayat Truk</h2>
      </div>

      <div className='w-full bg-[#F6F6F6] p-4 space-y-4'>
        {data?.map((item, index) => {
          const rows = [
            {
              label: 'TANGGAL',
              value: dayjs(item.date).format('DD/MM/YYYY, HH:mm'),
              bold: true,
            },
            { label: 'NOMOR MESIN', value: item.mesin, bg: true },
            { label: 'SURAT JALAN', value: item.delivery_number },
            { label: 'VENDOR', value: item.vendor_name, bg: true },
            { label: 'PLAT KENDARAAN', value: item.vehicle_number },
            { label: 'TBS TRUK', value: item.total_tandan, bg: true },
            {
              label: '%AVG DITERIMA',
              value:
                formatPercentWithLeadingZeros(item.percent_accepted) || '00.00',
            },
            {
              label: '%AVG MM',
              value:
                formatPercentWithLeadingZeros(item.percent_matang) || '00.00',
              bg: true,
              bold: true,
              color: '#299300',
            },
            {
              label: '%AVG LM',
              value:
                formatPercentWithLeadingZeros(item.percent_lewat_matang) ||
                '00.00',
              bold: true,
              color: '#299300',
            },
            {
              label: '%AVG TP',
              value:
                formatPercentWithLeadingZeros(item.percent_tangkai_panjang) ||
                '00.00',
              bg: true,
              bold: true,
              color: '#E07324',
            },
            {
              label: '%AVG M',
              value:
                formatPercentWithLeadingZeros(item.percent_mentah) || '00.00',
              bold: true,
              color: '#BD2828',
            },
            {
              label: '%AVG JK',
              value:
                formatPercentWithLeadingZeros(item.percent_janjang_kosong) ||
                '00.00',
              bg: true,
              bold: true,
              color: '#BD2828',
            },
            {
              label: '%AVG BK',
              value:
                formatPercentWithLeadingZeros(item.percent_buah_kecil) ||
                '00.00',
              bold: true,
              color: '#BD2828',
            },
          ];

          return (
            <div
              key={index}
              className='bg-white border border-[#E7E7E7] rounded-xl py-4'
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
                      <p className={`body-s-r ${classNames}`} style={style}>
                        {row.value}
                      </p>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </DrawerMobile>
  );
};

export default MobileDrawerTotalTruk;
