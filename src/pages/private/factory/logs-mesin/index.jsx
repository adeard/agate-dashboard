import { Link, useNavigate, useParams } from 'react-router-dom';

import { MdKeyboardArrowRight, MdOutlineDoNotDisturbOn } from 'react-icons/md';

const factory = {
  '699be68839fb2f1e96d62a01': 2,
  '66c3114ba342ddbf9eae83c1': 4,
  '686a5645bf73aa13b489ad36': 1,
  '68fc9b419a7c87b51e2002b3': 4,
  '68fc9b419a7c87b51e2002b5': 4,
  '6959fd4584e3955ce63dac95': 2,
  '6a058067eead79aa42c659bd': 1,
  '6a449b3997ad166780382f0b': 2,
};

const LogsMesinPage = () => {
  const navigate = useNavigate();
  const { factoryId } = useParams();

  const factoryName = sessionStorage.getItem('factoryName');

  const totalMesin = factory[factoryId] ?? 0;

  const listMesin = Array.from({ length: totalMesin }, (_, index) => ({
    mesin: `Mesin ${index + 1}`,
  }));

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <div className='flex items-center'>
            <Link to='/factory' className='font-semibold text-2xl text-color-3'>
              {factoryName}
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='headline-s'>Logs Mesin</h2>
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

export default LogsMesinPage;
