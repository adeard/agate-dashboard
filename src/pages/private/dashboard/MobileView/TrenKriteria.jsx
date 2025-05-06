import { createColumnHelper } from '@tanstack/react-table';

import { IoMdClose } from 'react-icons/io';
import { MdArrowBackIosNew } from 'react-icons/md';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

import CustomTable from '@/components/shared/CustomTable';
import Drawer from '@/components/shared/Drawer';
import Button from '@/components/shared/Button';
import {
  convertLabel,
  convertLabelUnderscore,
  formatPercentWithLeadingZeros,
} from '@/utils/common';
import GetTrendIconTable from '../components/GetTrendIconTable';

const TrenKriteria = ({ data, criteria, goBack }) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('date', {
      header: <div className='text-color-2 w-24'>TANGGAL</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue() || '-'}</div>
      ),
    }),
    columnHelper.accessor('percent', {
      header: (
        <div className='text-color-2 uppercase'>
          % AVG {convertLabelUnderscore(criteria)}
        </div>
      ),
      cell: (info) => {
        return (
          <div className='!body-m-b !text-color-1 flex items-center'>
            {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %{' '}
            {GetTrendIconTable(info)}
          </div>
        );
      },
    }),
  ];

  return (
    <>
      <section className='sticky top-0 z-50 flex items-center justify-between max-h-16 p-4 bg-white'>
        <div className='flex-none'>
          <MdArrowBackIosNew className='text-xl' onClick={goBack} />
        </div>
        <h2 className='flex-1 !text-center mr-4 subheadline-s'>
          Tren Kriteria
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

export default TrenKriteria;
