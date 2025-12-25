import { Link, useParams } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import {
  MdKeyboardArrowRight,
  MdFileDownload,
  MdOutlineVisibility,
} from 'react-icons/md';

import { useGet } from '@/services/use-services';
import useDrawer from '@/hooks/useDrawer';

import Button from '@/components/shared/Button';
import DrawerFilterVendor from '../components/DrawerFilterVendor';
import CustomTable from '@/components/shared/CustomTable';
import Checkbox from '@/components/shared/Checkbox';

import dayjs from 'dayjs';

const ListMaintenancePage = () => {
  const { factoryId, mesinNumber } = useParams();

  const factoryName = sessionStorage.getItem('factoryName');
  const mesinName = sessionStorage.getItem('mesinName');

  const { data, loading, refetch, setQueryParams } = useGet(
    '/v4/machine-check',
    { factory: factoryId, machine: mesinNumber }
  );

  const groupDataByDate = () => {
    if (!Array.isArray(data) || data.length === 0) return [];

    const grouped = data.reduce((acc, item) => {
      if (!item) return acc;

      const dateKey = item.date ? dayjs(item.date).format('YYYY-MM-DD') : null;

      if (!dateKey) return acc;

      if (!acc[dateKey]) acc[dateKey] = {};
      if (item.type) acc[dateKey][item.type] = item;

      return acc;
    }, {});

    return Object.entries(grouped).map(([date, types]) => ({
      date,
      ...types,
    }));
  };

  const filteredData = groupDataByDate();

  const getCheckboxStatus = (record) => {
    if (!record || !record._id) {
      return { checked: false, indeterminate: false };
    }

    const values = Object.values(record.questions || {});
    const allTrue = values.length > 0 && values.every((v) => v === true);

    return {
      checked: allTrue,
      indeterminate: !allTrue,
    };
  };

  const getRecordAny = (row) => {
    return row.daily_before || row.daily_after || row.weekly || null;
  };

  const {
    idDrawer: idDrawerFilterVendor,
    isDrawerOpen: isDrawerFilterVendorOpen,
    toggleDrawer: toggleDrawerFilter,
    closeDrawer: closeDrawerFilter,
  } = useDrawer('DrawerFilterVendor');

  // table column
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('no', {
      header: <div className='text-center'>NO</div>,
      cell: (info) => (
        <div className='text-center !body-m-r !text-color-1'>
          {info.row.index + 1}
        </div>
      ),
    }),
    columnHelper.accessor('date', {
      header: <div className='w-20'>PABRIK</div>,
      cell: (info) => {
        const date = dayjs(info.getValue());
        const isSunday = date.format('dddd') === 'Sunday';

        return (
          <div className='!body-m-r !text-color-1 !font-medium'>
            <span className={isSunday ? 'text-secondary-2' : ''}>
              {date.format('dddd')}
            </span>
            , {date.format('DD MMMM YYYY')}
          </div>
        );
      },
    }),
    columnHelper.accessor('daily_before', {
      header: <div className='text-center'>PEMERIKSAAN HARIAN AWAL</div>,
      cell: (info) => {
        const record = info.row.original.daily_before;
        const status = getCheckboxStatus(record);

        return (
          <span className='flex justify-center'>
            <Checkbox
              className='maintenance-checkbox'
              isChecked={status.checked}
              isIndeterminate={status.indeterminate}
              disabled={status.indeterminate}
              readOnly
            />
          </span>
        );
      },
    }),
    columnHelper.accessor('daily_after', {
      header: <div className='text-center'>PEMERIKSAAN HARIAN AKHIR</div>,
      cell: (info) => {
        const record = info.row.original.daily_after;
        const status = getCheckboxStatus(record);

        return (
          <span className='flex justify-center'>
            <Checkbox
              className='maintenance-checkbox'
              isChecked={status.checked}
              isIndeterminate={status.indeterminate}
              disabled={status.indeterminate}
              readOnly
            />
          </span>
        );
      },
    }),
    columnHelper.accessor('weekly', {
      header: <div className='text-center'>PEMERIKSAAN MINGGUAN</div>,
      cell: (info) => {
        const record = info.row.original.weekly;
        const status = getCheckboxStatus(record);

        return (
          <span className='flex justify-center'>
            <Checkbox
              className='maintenance-checkbox'
              isChecked={status.checked}
              isIndeterminate={status.indeterminate}
              disabled={status.indeterminate}
              readOnly
            />
          </span>
        );
      },
    }),
    columnHelper.display({
      header: <div className='end-column-content'></div>,
      id: 'actions',
      cell: (info) => {
        const row = info.row.original;
        const record = row.daily_before || row.daily_after || row.weekly;

        if (!record) return null;

        const urlDate = row.date;
        const factoryId = record.factory._id;
        const machine = record.machine;

        return (
          <Link
            to={`${urlDate}?machine=${machine}&factory=${factoryId}&date=${urlDate}`}
          >
            <Button
              className='bg-transparent text-transparent group-hover:bg-primary-1 group-hover:text-color-4 flex items-center gap-2'
              size='lg'
            >
              <MdOutlineVisibility className='text-lg' />
              Detail
            </Button>
          </Link>
        );
      },
    }),
  ];

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <div className='flex items-center'>
            <Link to='/factory' className='font-semibold text-2xl text-color-3'>
              {factoryName}
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <Link
              to={`/factory/${factoryId}/history-maintenance`}
              className='font-semibold text-2xl text-color-3'
            >
              History Maintenance
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='headline-s'>{mesinName}</h2>
          </div>
          <div className='flex gap-4'>
            <Button
              size='lg'
              className='flex items-center'
              // onClick={() => {
              //   window.open(
              //     BASE_URL +
              //       '/v1/inspection-data/download-pdf/' +
              //       (historyId ? historyId : id),
              //     '_blank'
              //   );
              // }}
            >
              <MdFileDownload className='text-xl mr-2' />
              Unduh Laporan
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div
          className='bg-white rounded-2xl overflow-x-auto min-h-[calc(100vh-218px)] h-full'
          style={{ boxShadow: '0px 0px 4px -1px #E0D6D6' }}
        >
          <CustomTable
            dataTable={filteredData}
            columns={columns}
            showPagination={true}
            loading={loading}
          />
        </div>

        <DrawerFilterVendor
          idDrawer={idDrawerFilterVendor}
          isDrawerOpen={isDrawerFilterVendorOpen}
          closeDrawer={closeDrawerFilter}
          setQueryParams={setQueryParams}
          refetch={refetch}
        />
      </main>
    </div>
  );
};

export default ListMaintenancePage;
