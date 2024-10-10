import { createColumnHelper } from '@tanstack/react-table';

import { MdArrowBackIosNew } from 'react-icons/md';

import { convertLabel } from '@/utils/common';

import CustomTable from '@/components/shared/CustomTable';
import DrawerMobile from '@/components/shared/DrawerMobile';

const MobileDrawerSenderBuah = ({
  idDrawer,
  isDrawerOpen,
  closeDrawer,
  data,
}) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('label', {
      header: <div className='text-color-2'>NAMA VENDOR</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('percent', {
      header: <div className='text-color-2'>PERSENTASE</div>,
      cell: (info) => (
        <div className='!body-m-b !text-color-1'>
          {info.getValue().toFixed(2)} <span className='body-s-r'>%</span>
        </div>
      ),
    }),
  ];

  const handleClose = () => {
    const drawerElement = document.getElementById(idDrawer);
    drawerElement.checked = false;
    closeDrawer();
  };

  return (
    <DrawerMobile
      idDrawer={idDrawer}
      isOpen={isDrawerOpen}
      closeDrawer={handleClose}
    >
      <div className='flex items-center justify-between text-color-1'>
        <div className='flex-none'>
          <MdArrowBackIosNew className='text-xl' onClick={handleClose} />
        </div>
        <h2 className='flex-1 !text-center mr-4 subheadline-s'>
          Vendor Pengirim Buah ({data && convertLabel(data?.label)})
        </h2>
      </div>

      <div
        className='card mt-8 w-full bg-white'
        style={{ boxShadow: '0px 0px 4px -1px #E0D6D6' }}
      >
        <div className='p-2 pb-8'>
          <CustomTable dataTable={data?.vendors || []} columns={columns} />
        </div>
      </div>
    </DrawerMobile>
  );
};

export default MobileDrawerSenderBuah;
