import { useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { MdArrowBackIosNew, MdOutlineVisibility } from 'react-icons/md';

import useDrawer from '@/hooks/useDrawer';

import { convertLabel } from '@/utils/common';

import DrawerMobile from '@/components/shared/DrawerMobile';
import CustomTable from '@/components/shared/CustomTable';
import Button from '@/components/shared/Button';
import MobileDrawerSenderBuah from './MobileDrawerSenderBuah';

const MobileDrawerDemografiChart = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  data,
  range,
}) => {
  const [selectedDataSenderBuah, setSelectedDataSenderBuah] = useState('');
  const {
    idDrawer: idDrawerSenderBuah,
    isDrawerOpen: isDrawerSenderBuahOpen,
    toggleDrawer: toggleDrawerSenderBuah,
    closeDrawer: closeDrawerSenderBuah,
  } = useDrawer('DrawerSenderBuahDemografi');

  // table
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('name', {
      header: <div className='text-color-2'>KLASIFIKASI BUAH</div>,
      cell: (info) => (
        <div
          className='!body-m-b !text-color-1'
          onClick={() => handleClickRowData(info)}
        >
          {convertLabel(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('total', {
      header: <div className='text-color-2'>TOTAL</div>,
      cell: (info) => (
        <div
          className='!body-m-b !text-color-1'
          onClick={() => handleClickRowData(info)}
        >
          {info.getValue().toLocaleString()}
        </div>
      ),
    }),
  ];

  const handleClickRowData = (info) => {
    setSelectedDataSenderBuah({
      label: `${info.row.original.name} ${range === 'weekly' ? 'Week ' : ''} ${
        data && convertLabel(data?.label)
      }`,
      vendors: info.row.original.vendors.map((vendor) => ({
        ...vendor,
        label: vendor.name,
        name: undefined,
      })),
    });
    toggleDrawerSenderBuah();
  };

  const handleClose = () => {
    const drawerElement = document.getElementById(idDrawer);
    drawerElement.checked = false;
    closeDrawer();
  };

  return (
    <>
      <DrawerMobile
        idDrawer={idDrawer}
        isOpen={isDrawerOpen}
        closeDrawer={handleClose}
      >
        <div className='flex items-center justify-between'>
          <div className='flex-none'>
            <MdArrowBackIosNew className='text-xl' onClick={handleClose} />
          </div>
          <h2 className='flex-1 !text-center mr-4 subheadline-s'>
            Vendor Pengirim Buah {data && convertLabel(data?.variant)} <br />
            {range === 'weekly' ? 'Week ' : ''}
            {data && convertLabel(data?.label)}
          </h2>
        </div>

        <div
          className='card mt-8 w-full bg-white'
          style={{ boxShadow: '0px 0px 4px -1px #E0D6D6' }}
        >
          <div className='p-2 pb-8'>
            <CustomTable dataTable={data?.demography || []} columns={columns} />
          </div>
        </div>
      </DrawerMobile>

      <MobileDrawerSenderBuah
        idDrawer={idDrawerSenderBuah}
        isDrawerOpen={isDrawerSenderBuahOpen}
        closeDrawer={closeDrawerSenderBuah}
        data={selectedDataSenderBuah}
      />
    </>
  );
};

export default MobileDrawerDemografiChart;
