import { IoMdClose } from 'react-icons/io';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { IoCloseCircleOutline } from 'react-icons/io5';

import Button from '@/components/shared/Button';

const ModalResponseSave = ({ modalRef }) => {
  const handleClose = () => {
    modalRef.current.close();
  };

  return (
    <dialog id='RequestTradeModal' className='modal' ref={modalRef}>
      <div className='modal-box bg-primary-6 w-full max-w-[600px] p-10'>
        <div className='flex justify-between mb-4'>
          <h3 className='subheadline-m text-color-1'>Success</h3>
          <form method='dialog'>
            <Button
              type='submit'
              variant='primary-outline'
              className='flex-none border-none'
            >
              <IoMdClose className='text-2xl' />
            </Button>
          </form>
        </div>

        <div className='flex gap-2'>
          <IoIosCheckmarkCircleOutline className='text-2xl text-[#52C41A]' />
          {/* <IoCloseCircleOutline className='text-2xl text-[#BD2828]' /> */}
          <div className='text-[#000000D9]'>
            <p className='body-l-b'>User baru berhasil ditambahkan</p>
            <p className='body-m-r'>Periksa Email untuk konfimasi</p>
          </div>
        </div>
        <div className='modal-action'>
          <form method='dialog'>
            <Button
              size='lg'
              className='!px-10 button-shadow'
              onClick={handleClose}
            >
              Tutup
            </Button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalResponseSave;
