import { createColumnHelper } from '@tanstack/react-table';

import { MdOutlineVisibility } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa6';

import CustomTable from '@/components/shared/CustomTable';
import Button from '@/components/shared/Button';
import dayjs from 'dayjs';
import ButtonMore from '@/components/shared/ButtonMore';
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

const TableAnalisaVendor = ({
  data,
  setSelectedVendor,
  togglePerformaHarian,
  toggleRiwayatPemeriksaan,
}) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('no', {
      header: <div className='text-center'>NO</div>,
      cell: (info) => <div className='text-center'>{info.row.index + 1}</div>,
    }),
    columnHelper.accessor('vendor_name', {
      header: <div className='w-32'>VENDOR</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue() || '-'}</div>
      ),
    }),
    columnHelper.accessor('count', {
      header: (
        <div>
          TOTAL <br /> TRUK
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {info.getValue()?.percent || 0}
        </div>
      ),
    }),
    columnHelper.accessor('percent_supply', {
      header: <div>% SUPPLY</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
        </div>
      ),
    }),
    columnHelper.accessor('avg_tandan', {
      header: (
        <div>
          AVG TBS <br /> PER TRUK
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          <div className='!body-m-b !text-color-1'>
            {info.getValue()?.percent || 0}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('avg_accepted', {
      header: (
        <div>
          AVG <br /> DITERIMA
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
        </div>
      ),
    }),
    columnHelper.accessor('avg_matang', {
      header: (
        <div>
          AVG <br /> MM
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('avg_lewat_matang', {
      header: (
        <div>
          AVG <br /> LM
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
        </div>
      ),
      meta: { className: 'bg-[#E8F8E4]' },
    }),
    columnHelper.accessor('avg_tangkai_panjang', {
      header: (
        <div>
          AVG <br /> TP
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
        </div>
      ),
      meta: { className: 'bg-[#F8EDCB]' },
    }),
    columnHelper.accessor('avg_mentah', {
      header: <div>AVG M</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('avg_janjang_kosong', {
      header: <div>AVG JK</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1 flex items-center gap-2'>
          {formatPercentWithLeadingZeros(info.getValue()?.percent) || '00.00'} %
          {getIcon(info.getValue()?.rank)}
        </div>
      ),
      meta: { className: 'bg-[#F6D8D6]' },
    }),
    columnHelper.accessor('avg_buah_kecil', {
      header: <div>AVG BK</div>,
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

export default TableAnalisaVendor;
