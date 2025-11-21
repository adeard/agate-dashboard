import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { MdKeyboardArrowRight, MdFileDownload } from 'react-icons/md';

import { useGet } from '@/services/use-services';

import Button from '@/components/shared/Button';

import dayjs from 'dayjs';

import { BASE_URL } from '@/utils/axios';
import Checkbox from '@/components/shared/Checkbox';

const DetailMaintenancePage = () => {
  const { factoryId, mesinId, maintenanceId } = useParams();

  const factoryName = sessionStorage.getItem('factoryName');
  const mesinName = sessionStorage.getItem('mesinName');

  const [tasks, setTasks] = useState([
    { label: 'Pemeriksaan harian awal', isChecked: false },
    {
      label: 'Pemeriksaan harian akhir',
      isChecked: false,
      indeterminate: true,
    },
    { label: 'Pemeriksaan mingguan', isChecked: false },
  ]);

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
            <Link
              to={`/factory/${factoryId}/history-maintenance/${mesinId}`}
              className='font-semibold text-2xl text-color-3'
            >
              {mesinName}
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='headline-s'>Minggu, 9 November 2025</h2>
          </div>
          <div className='flex gap-4'>
            <Button
              size='lg'
              className='flex items-center'
              onClick={() => {
                window.open(
                  BASE_URL +
                    '/v1/inspection-data/download-pdf/' +
                    (historyId ? historyId : id),
                  '_blank'
                );
              }}
            >
              <MdFileDownload className='text-xl mr-2' />
              Unduh Laporan
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className='flex gap-5 w-full max-w-[1280px] min-h-[calc(100vh-64px)] m-auto'>
          <div className='basis-1/3 pl-16'>
            <div
              className='card w-full bg-white p-6'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <h3 className='subheadline-s text-color-1'>
                Detail History Maintenance
              </h3>

              <div className='space-y-4 mt-8'>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      NAMA MESIN
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>Mesin A</p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      PABRIK
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>Pabrik A</p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TANGGAL MAINTENANCE
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    Minggu, 9 November 2025
                  </p>
                </div>
                <div className='bg-neutral-100 p-4 space-y-2 rounded-lg body-s-r'>
                  {tasks.map((item, i) => (
                    <div key={i} className='flex items-center justify-between'>
                      <p>{item.label}</p>

                      <Checkbox
                        isChecked={item.isChecked}
                        isIndeterminate={item.indeterminate}
                        onChange={() => {
                          setTasks((prev) =>
                            prev.map((t, index) =>
                              index === i
                                ? {
                                    ...t,
                                    isChecked: !t.isChecked,
                                    indeterminate: false,
                                  }
                                : t
                            )
                          );
                        }}
                        disabled={item.indeterminate}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='basis-2/3'>
            <div
              className='card w-full bg-white p-4 text-color-1'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <p className='subheadline-s'>Pemeriksaan Awal</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailMaintenancePage;
