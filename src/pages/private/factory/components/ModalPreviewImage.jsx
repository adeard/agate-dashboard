import { IoMdClose } from 'react-icons/io';

import Button from '@/components/shared/Button';

const ModalPreviewImage = ({ modalRef }) => {
  const handleClose = () => {
    modalRef.current.close();
  };

  return (
    <dialog id='RequestTradeModal' className='modal' ref={modalRef}>
      <div className='modal-box bg-primary-6 w-full max-w-[728px] p-10'>
        <div className='flex justify-between mb-4'>
          <h3 className='subheadline-m text-color-1'>Photo</h3>
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

        <div>
          <img
            src='https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg'
            alt='image preview'
            className='border bg-primary-1 rounded-xl m-auto'
          />
          <p className='body-m-r text-[#363D4A] mt-4'>
            lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
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

export default ModalPreviewImage;
