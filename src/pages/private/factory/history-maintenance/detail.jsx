import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { MdKeyboardArrowRight, MdFileDownload } from 'react-icons/md';

import { useGet } from '@/services/use-services';

import Button from '@/components/shared/Button';
import Checkbox from '@/components/shared/Checkbox';

import dayjs from 'dayjs';

import { BASE_URL } from '@/utils/axios';

const ChecklistCard = ({ title, data, setData }) => {
  return (
    <div
      className='card w-full bg-white p-4 text-color-1'
      style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
    >
      <p className='subheadline-s'>{title}</p>

      <div className='bg-neutral-100 py-2 px-4 rounded-lg body-s-r mt-4'>
        {data.map((item, i) => {
          if (item.label === 'Notes') {
            return (
              <div key={i} className='flex items-center justify-between mt-2'>
                <p>{item.label}</p>
                <p className='body-s-r'>lorem ipsum</p>
              </div>
            );
          }

          return (
            <div key={i} className='flex items-center justify-between'>
              <p>{item.label}</p>

              <Checkbox
                isChecked={item.isChecked}
                isIndeterminate={item.indeterminate}
                disabled={item.indeterminate}
                onChange={() => {
                  setData((prev) =>
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
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DetailMaintenancePage = () => {
  const { factoryId, mesinNumber, maintenanceId } = useParams();

  const factoryName = sessionStorage.getItem('factoryName');
  const mesinName = sessionStorage.getItem('mesinName');

  const { data, loading } = useGet(`/v4/machine-check/`);
  console.log(data);

  const [tasks, setTasks] = useState([
    { label: 'Pemeriksaan harian awal', isChecked: false },
    {
      label: 'Pemeriksaan harian akhir',
      isChecked: false,
      indeterminate: true,
    },
    { label: 'Pemeriksaan mingguan', isChecked: false },
  ]);

  const [cekAwal, setCekAwal] = useState([
    { label: 'Area mesin bersih', isChecked: true },
    { label: 'Screw conveyor bersih dari brondolan', isChecked: true },
    {
      label: 'Roller pemutar bersih dari brondolan',
      isChecked: false,
      indeterminate: true,
    },
    {
      label: 'Hopper bersih dari brondolan',
      isChecked: false,
      indeterminate: true,
    },
    {
      label: 'Rail sliding gate pemutar bersih dari brondolan',
      isChecked: false,
    },
    { label: 'Kondisi baut-baut sliding gate kencang', isChecked: false },
    { label: 'Kompresor angin diatas 6 BAR', isChecked: true },
    { label: 'Sliding gate berfungsi secara normal', isChecked: false },
    {
      label: 'Lampu akrilik keadaan bersih dan mata LED aktif semua',
      isChecked: false,
    },
    { label: 'Lensa kamera dan area capture kamera bersih', isChecked: false },
    { label: 'Notes' },
  ]);

  const [cekAkhir, setCekAkhir] = useState([
    { label: 'MBC panel motor diturunkan', isChecked: true },
    { label: 'Screw kompresor dalam keadaan mari dan 0 BAR', isChecked: false },
    {
      label: 'MCCB tetap dalam keadaan aktif',
      isChecked: false,
      indeterminate: true,
    },
    {
      label: 'Bersihkan area mesin dari sisa brondolan',
      isChecked: false,
      indeterminate: true,
    },
    { label: 'Panel ditutup rapat', isChecked: true },
    { label: 'Manhole sensor tertutup', isChecked: true },
    { label: 'Manhole grading box tertutup', isChecked: false },
    { label: 'Manhole chute brondolan tertutup', isChecked: false },
    { label: 'Notes' },
  ]);

  const [cekMingguan, setCekMingguan] = useState([
    { label: 'Kondisi screw dan baut cylinder', isChecked: true },
    { label: 'Kondisi tirai grading box', isChecked: false },
    {
      label: 'Kondisi screw dan baut sensor grading box',
      isChecked: false,
      indeterminate: true,
    },
    {
      label: 'Kondisi roda sliding gate',
      isChecked: false,
      indeterminate: true,
    },
    { label: 'Kondisi bearing roller', isChecked: true },
    { label: 'Kondisi bearing conveyor', isChecked: false },
    { label: 'Kompresor angin diatas 6 BAR', isChecked: true },
    { label: 'Sliding gate berfungsi secara normal', isChecked: false },
    {
      label: 'Lampu akrilik keadaan bersih dan mata LED aktif semua',
      isChecked: true,
    },
    { label: 'Lensa kamera dan area capture kamera bersih', isChecked: false },
    { label: 'Notes' },
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
              to={`/factory/${factoryId}/history-maintenance/${mesinNumber}`}
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
        <div className='flex gap-8 w-full max-w-[1280px] min-h-[calc(100vh-64px)] m-auto'>
          <div className='basis-1/3 pl-16'>
            <div
              className='card w-full bg-white p-6'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <h3 className='subheadline-s text-color-1'>
                Detail History Maintenance
              </h3>
              <div className='space-y-4 mt-4'>
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
                <div className='bg-neutral-100 py-2 px-4 rounded-lg body-s-r'>
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

          <div className='basis-2/3 space-y-6'>
            <ChecklistCard
              title='Pemeriksaan Harian Awal'
              data={cekAwal}
              setData={setCekAwal}
            />

            <ChecklistCard
              title='Pemeriksaan Harian Akhir'
              data={cekAkhir}
              setData={setCekAkhir}
            />

            <ChecklistCard
              title='Pemeriksaan Mingguan'
              data={cekMingguan}
              setData={setCekMingguan}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailMaintenancePage;
