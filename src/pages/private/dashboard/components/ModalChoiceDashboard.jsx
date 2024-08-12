import { FaChartBar } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';

import Button from '@/components/shared/Button';
import { useNavigate } from 'react-router-dom';

const ModalChoiceDashboard = ({ modalRef }) => {
  const navigate = useNavigate();

  return (
    <dialog id='RequestTradeModal' className='modal' ref={modalRef}>
      <div className='modal-box bg-primary-6 w-full p-10'>
        <div className='flex justify-between mb-4'>
          <h3 className='subheadline-m text-color-1'>Select Dashboard</h3>
        </div>

        <div className='flex justify-between'>
          <div className='w-48 border border-[#EEEEEE] bg-white hover:bg-primary-4 rounded-xl'>
            <MdOutlineDashboard className='text-5xl mx-auto mt-8' />
            <div className='p-5 space-y-4 '>
              <h2 className='text-xl text-center'>Monitoring</h2>
              <div className='w-full flex justify-center'>
                <Button
                  size='lg'
                  className='m-auto'
                  onClick={() => navigate('/dashboard/monitoring')}
                >
                  Open
                </Button>
              </div>
            </div>
          </div>
          <div className='w-48 border border-[#EEEEEE] bg-white hover:bg-primary-4 rounded-xl'>
            <FaChartBar className='text-5xl mx-auto mt-8' />
            <div className='p-5 space-y-4 '>
              <h2 className='text-xl text-center'>Demografi</h2>
              <div className='w-full flex justify-center'>
                <Button
                  size='lg'
                  className='m-auto'
                  onClick={() => navigate('/dashboard/demografi')}
                >
                  Open
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalChoiceDashboard;
