import { Link, useNavigate, useParams } from 'react-router-dom';

import { MdKeyboardArrowRight, MdOutlineDoNotDisturbOn } from 'react-icons/md';

import { useGet } from '@/services/use-services';
import useDrawer from '@/hooks/useDrawer';

import DrawerFilterVendor from '../components/DrawerFilterVendor';

import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const ListLogPage = () => {
  const navigate = useNavigate();

  const { factoryId, mesinNumber } = useParams();

  const factoryName = sessionStorage.getItem('factoryName');
  const mesinName = sessionStorage.getItem('mesinName');

  const { data, loading, refetch, setQueryParams } = useGet(
    '/v4/machine-logs/file',
    { factory: factoryId, machine: mesinNumber }
  );

  const {
    idDrawer: idDrawerFilterVendor,
    isDrawerOpen: isDrawerFilterVendorOpen,
    toggleDrawer: toggleDrawerFilter,
    closeDrawer: closeDrawerFilter,
  } = useDrawer('DrawerFilterVendor');

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
              to={`/factory/${factoryId}/logs-mesin`}
              className='font-semibold text-2xl text-color-3'
            >
              Logs Mesin
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='headline-s'>{mesinName}</h2>
          </div>
        </div>
      </header>

      {loading || !data ? (
        <div className='min-h-[80vh] rounded-2xl w-full flex items-center justify-center'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      ) : (
        <main className='grid grid-cols-4 gap-4'>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => {
              const urlDate = dayjs(item.date, 'DD/MM/YYYY').format(
                'YYYY-MM-DD'
              );

              return (
                <div
                  key={item._id || item.filename}
                  className='card w-full bg-white p-6 hover:cursor-pointer hover:!shadow-xl'
                  style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
                  onClick={() =>
                    navigate(`${urlDate}?filename=${item.filename}`)
                  }
                >
                  <h3 className='subheadline-s text-color-1'>
                    Logs {item.date}
                  </h3>
                </div>
              );
            })
          ) : (
            <div className='w-full flex flex-col justify-center items-center gap-4 col-span-4'>
              <MdOutlineDoNotDisturbOn className='text-5xl' />
              <h3>No Data</h3>
            </div>
          )}
        </main>
      )}
      <DrawerFilterVendor
        idDrawer={idDrawerFilterVendor}
        isDrawerOpen={isDrawerFilterVendorOpen}
        closeDrawer={closeDrawerFilter}
        setQueryParams={setQueryParams}
        refetch={refetch}
      />
    </div>
  );
};

export default ListLogPage;
