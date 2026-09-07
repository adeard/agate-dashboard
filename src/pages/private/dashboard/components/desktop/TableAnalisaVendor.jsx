import { createColumnHelper } from '@tanstack/react-table';

import { MdOutlineVisibility } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa6';

import Table from '@/components/shared/Table';
import Button from '@/components/shared/Button';
import dayjs from 'dayjs';
import ButtonMore from '@/components/shared/ButtonMore';
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

const TableAnalisaVendor = ({
  data,
  setSelectedVendor,
  togglePerformaHarian,
  toggleRiwayatPemeriksaan,
}) => {
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
    columnHelper.accessor('vendor_name', {
      header: <div className='w-32'>VENDOR</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue() || '-'}</div>
      ),
    }),
    columnHelper.accessor((row) => row.count?.percent ?? 0, {
      id: 'count',
      enableSorting: true,
      header: <div>TOTAL TRUK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor((row) => row.percent_supply?.percent ?? 0, {
      id: 'percent_supply',
      enableSorting: true,
      header: <div>% SUPPLY TRUK</div>,
      cell: (info) => {
        const data = info.row.original.percent_supply;
        return (
          <div className='!body-m-b !text-color-1 flex items-center justify-between'>
            {formatPercentWithLeadingZeros(data?.percent) || '00.00'} %
            {getIcon(data?.rank)}
          </div>
        );
      },
    }),
    columnHelper.accessor((row) => row.avg_tandan?.percent ?? 0, {
      id: 'avg_tandan',
      enableSorting: true,
      header: <div>AVG TBS PER TRUK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor((row) => row.avg_accepted?.percent ?? 0, {
      id: 'avg_accepted',
      enableSorting: true,
      header: <div className='w-24'>% DITERIMA</div>,
      cell: (info) => {
        const data = info.row.original.avg_accepted;
        return (
          <div className='!body-m-b !text-color-1 flex items-center justify-between'>
            {formatPercentWithLeadingZeros(data?.percent) || '00.00'} %
            {getIcon(data?.rank)}
          </div>
        );
      },
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('percent_accepted', {
      header: <div>% DITOLAK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center justify-between'>
          -
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('percent_accepted', {
      header: <div>% DIDENDA</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center justify-between'>
          -
        </div>
      ),
      meta: { className: 'bg-[#F8EDCB]' },
    }),
    columnHelper.display({
      id: 'actions',
      enableSorting: false,
      cell: (info) => (
        <div className='flex items-center'>
          <ButtonMore
            listMenu={[
              {
                label: 'Performa Harian Vendor',
                onClick: () => {
                  setSelectedVendor(info.row.original.vendor_name);
                  togglePerformaHarian();
                },
              },
              {
                label: 'Riwayat Pemeriksaan Truk',
                onClick: () => {
                  setSelectedVendor(info.row.original.vendor_name);
                  toggleRiwayatPemeriksaan();
                },
              },
            ]}
          />
        </div>
      ),
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

export default TableAnalisaVendor;
