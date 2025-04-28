import { createColumnHelper } from '@tanstack/react-table';

import { MdOutlineVisibility } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa6';

import CustomTable from '@/components/shared/CustomTable';
import Button from '@/components/shared/Button';
import dayjs from 'dayjs';
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

const TableRankingVendor = ({ data }) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('no', {
      header: <div className='text-center'>NO</div>,
      cell: (info) => <div className='text-center'>{info.row.index + 1}</div>,
    }),
    columnHelper.accessor('date', {
      header: <div className='w-32'>TANGGAL</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {dayjs(info.getValue()).format('DD/MM/YYYY HH:mm')}
        </div>
      ),
    }),
    columnHelper.accessor('vehicle_number', {
      header: <div>PLAT TRUK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('vendor_name', {
      header: <div>VENDOR</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('total_tandan', {
      header: <div>TBS <br /> TRUK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('percent_accepted', {
      header: <div>% <br /> DITERIMA</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue()) || '00.00'} %
        </div>
      ),
    }),
    columnHelper.accessor('percent_matang', {
      header: <div>% MM</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('percent_lewat_matang', {
      header: <div>% LM</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('percent_tangkai_panjang', {
      header: <div>% TP</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
        </div>
      ),
      meta: { className: 'bg-[#F8EDCB]' },
    }),
    columnHelper.accessor('percent_mentah', {
      header: <div>% M</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('percent_janjang_kosong', {
      header: <div>% JK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('percent_buah_kecil', {
      header: <div>% BK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
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
              className='bg-transparent text-transparent border border-transparent group-hover:bg-white group-hover:shadow group-hover:text-color-1 flex items-center gap-2'
              size='lg'
              onClick={() =>
                window.open(
                  `/dashboard/riwayat-pemeriksaan/${info.row.original._id}`,
                  '_blank'
                )
              }
            >
              <MdOutlineVisibility className='text-lg' />
              Detail
            </Button>
          </div>
        );
      },
      meta: { className: 'w-[1%]' },
    }),
  ];

  return (
    <CustomTable
      dataTable={data || []}
      columns={columns}
      showPagination={true}
      minHeight='max-content'
    />
  );
};

export default TableRankingVendor;
