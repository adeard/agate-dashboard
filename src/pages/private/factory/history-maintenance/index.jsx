import { Link, useNavigate } from 'react-router-dom';

import { MdKeyboardArrowRight } from 'react-icons/md';

const listMesin = new Array(4).fill().map((_, index) => ({
  mesin: `Mesin ${index + 1}`,
}));

const HistoryMaintenancePage = () => {
  const navigate = useNavigate();

  const factoryName = sessionStorage.getItem('factoryName');

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <div className='flex items-center'>
            <Link to='/factory' className='font-semibold text-2xl text-color-3'>
              {factoryName}
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='headline-s'>History Maintenance</h2>
          </div>
        </div>
      </header>
      <main className='grid grid-cols-4 gap-4'>
        {listMesin?.map((item, index) => (
          <div
            className='card w-full bg-white p-6 hover:cursor-pointer hover:!shadow-xl'
            style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            onClick={() => {
              navigate(String(index + 1));
              sessionStorage.setItem('mesinName', item.mesin);
            }}
          >
            <h3 className='subheadline-s text-color-1'>{item.mesin}</h3>
          </div>
        ))}
      </main>
    </div>
  );
};

export default HistoryMaintenancePage;
