import { createColumnHelper } from '@tanstack/react-table';

import { MdOutlineVisibility } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';

import CustomTable from '@/components/shared/CustomTable';
import Button from '@/components/shared/Button';

import Vector1 from '@/assets/images/Vector1.png';
import Vector2 from '@/assets/images/Vector2.png';
import Vector3 from '@/assets/images/Vector3.png';
import Vector4 from '@/assets/images/Vector4.png';

const tempData = new Array(10).fill().map(() => ({
  tanggal: '01/01/2025, 19:10:10',
  totalTruk: '88',
  supply: '2,9',
  avgTbsTruk: '16,8',
  avgDiterima: '16,8',
  avgMM: '16,8',
  avgLM: '16,8',
  avgTP: '16,8',
  avgM: '16,8',
  avgJK: '16,8',
  avhBK: '16,8',
}));

const SampleTable = () => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('tanggal', {
      header: <div className='w-32'>TANGGAL</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('totalTruk', {
      header: (
        <div>
          TOTAL <br /> TRUK
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('supply', {
      header: <div>% SUPPLY</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-1'>
          {info.getValue()}
          <img src={Vector1} alt='Star 1' />
        </div>
      ),
    }),
    columnHelper.accessor('avgTbsTruk', {
      header: (
        <div>
          AVG <br /> TBS TRUK
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('avgDiterima', {
      header: (
        <div>
          % AVG <br /> DITERIMA
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-1'>
          {info.getValue()}
          <img src={Vector2} alt='Star 2' />
        </div>
      ),
    }),
    columnHelper.accessor('avgMM', {
      header: (
        <div>
          % AVG <br /> MM
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-1'>
          {info.getValue()}
          <img src={Vector3} alt='Star 3' />
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('avgLM', {
      header: (
        <div>
          % AVG <br /> LM
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-1'>
          {info.getValue()}
          <img src={Vector4} alt='Star 4' />
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('avgTP', {
      header: (
        <div>
          % AVG <br /> TP
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-1'>
          {info.getValue()}
          <img src={Vector2} alt='Star 2' />
        </div>
      ),
      meta: { className: 'bg-[#F8EDCB]' },
    }),
    columnHelper.accessor('avgM', {
      header: (
        <div>
          % AVG <br /> M
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-1'>
          {info.getValue()}
          <img src={Vector3} alt='Star 3' />
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('avgJK', {
      header: (
        <div>
          % AVG <br /> JK
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-1'>
          {info.getValue()}
          <img src={Vector4} alt='Star 4' />
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => {
        return (
          <div className='flex justify-end gap-4'>
            <Button
              className='bg-transparent text-transparent border border-transparent group-hover:bg-white group-hover:text-color-1 group-hover:border-primary-2 flex items-center gap-2'
              size='lg'
              onClick={() => null}
            >
              <MdOutlineVisibility className='text-lg' />
              Detail
            </Button>
          </div>
        );
      },
    }),
  ];

  return (
    <CustomTable
      dataTable={tempData || []}
      columns={columns}
      showPagination={true}
    />
  );
};

export default SampleTable;
