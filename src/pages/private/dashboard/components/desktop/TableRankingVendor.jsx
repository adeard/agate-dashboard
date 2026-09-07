import { useSearchParams } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';

import { MdOutlineVisibility } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa6';

import Table from '@/components/shared/Table';
import Button from '@/components/shared/Button';
import dayjs from 'dayjs';
import { formatCurrency, formatPercentWithLeadingZeros } from '@/utils/common';

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
  const [searchParams] = useSearchParams();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.display({
      id: 'no',
      header: <div className='text-center'>NO</div>,
      enableSorting: false,
      cell: (info) => {
        const rowIndex = info.table
          .getRowModel()
          .rows.findIndex((row) => row.id === info.row.id);

        return <div className='text-center'>{rowIndex + 1}</div>;
      },
    }),
    columnHelper.accessor('date', {
      header: <div className='w-32'>TANGGAL</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {dayjs(info.getValue()).format('DD/MM/YYYY HH:mm')}
        </div>
      ),
    }),
    columnHelper.accessor('date', {
      header: <div>DURASI BONGKAR</div>,
      cell: (info) => <div className='!body-m-b !text-color-1'>- </div>,
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
    columnHelper.accessor((row) => row.total_tandan ?? 0, {
      id: 'total_tandan',
      enableSorting: true,
      header: <div>TBS TRUK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor((row) => row.percent_accepted ?? 0, {
      id: 'percent_accepted',
      enableSorting: true,
      header: <div>% DITERIMA</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatPercentWithLeadingZeros(info.getValue())} %
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('percent_accepted', {
      header: <div>% DITOLAK</div>,
      cell: (info) => <div className='!body-m-b !text-color-1'>-</div>,
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('percent_accepted', {
      header: <div>% DIDENDA</div>,
      cell: (info) => <div className='!body-m-b !text-color-1'>-</div>,
      meta: { className: 'bg-[#F8EDCB]' },
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => {
        return (
          <div className='flex justify-end gap-4'>
            <Button
              className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
              size='lg'
              onClick={() =>
                window.open(
                  `/dashboard/${searchParams.get('factory')}/riwayat-pemeriksaan/${info.row.original._id}`,
                  '_blank',
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
    <Table
      dataTable={data || []}
      columns={columns}
      showPagination={true}
      minHeight='max-content'
    />
  );
};

export default TableRankingVendor;
