import { createColumnHelper } from '@tanstack/react-table';

import CustomTable from '@/components/shared/CustomTable';
import {
  convertLabelUnderscore,
  formatPercentWithLeadingZeros,
} from '@/utils/common';

import { MdArrowBackIosNew } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa6';

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

const AnalisaVendor = ({ data, criteria, goBack }) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('vendor_name', {
      header: <div className='text-color-2'>VENDOR</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('supply', {
      header: <div className='text-color-2'>SUPPLY BUAH</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
          {getIcon(info.row.original.supply_rank)}
        </div>
      ),
    }),
    columnHelper.accessor('percent', {
      header: (
        <div className='text-color-2 uppercase'>
          % AVG {convertLabelUnderscore(criteria)}
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
          {getIcon(info.row.original.percent_rank)}
        </div>
      ),
    }),
  ];

  return (
    <>
      <section className='sticky top-0 z-50 flex items-center justify-between max-h-16 p-4 bg-white'>
        <div className='flex-none'>
          <MdArrowBackIosNew className='text-xl' onClick={goBack} />
        </div>
        <h2 className='flex-1 !text-center mr-4 subheadline-s'>
          Analisa Vendor
        </h2>
      </section>

      <section className='w-full bg-[#F8F9FB] p-4'>
        <div className='bg-white border border-[#E7E7E7] button-shadow rounded-xl py-4'>
          <CustomTable dataTable={data || []} columns={columns} />
        </div>
      </section>
    </>
  );
};

export default AnalisaVendor;
