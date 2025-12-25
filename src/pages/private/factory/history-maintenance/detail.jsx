import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { MdKeyboardArrowRight, MdFileDownload } from 'react-icons/md';

import { useGet } from '@/services/use-services';

import Button from '@/components/shared/Button';
import Checkbox from '@/components/shared/Checkbox';

import dayjs from 'dayjs';
import 'dayjs/locale/id';

import { BASE_URL } from '@/utils/axios';

const typeConfig = {
  daily_before: {
    label: 'Pemeriksaan harian awal',
  },
  daily_after: {
    label: 'Pemeriksaan harian akhir',
  },
  weekly: {
    label: 'Pemeriksaan mingguan',
  },
};

const itemsConfig = {
  daily_before: [
    { title: 'Area mesin bersih dari brondolan dan serabut' },
    {
      title: 'Conveyor brondolan bersih dari brondolan dan serabut',
    },
    {
      title: 'Roller pemutar bersih dari brondolan dan serabut',
    },
    {
      title: 'Hopper bersih dari brondolan dan serabut',
    },
    {
      title:
        'Setiap sisi rail sliding gate bersih dari brondolan, serabut, kerak dan pasir',
    },
    { title: 'Kondisi baut-baut sliding gate kencang' },
    {
      title:
        'Test sliding gate dan pastikan setiap scraper sliding gate dapat buka tutup',
    },
    {
      title:
        'Interlock system berjalan dengan baik (Surat Jalan, Lampu Grading, Kamera dan Cylinder)',
    },
    {
      title: 'Lampu akrilik keadaan bersih dan mata LED aktif semua',
    },
    {
      title:
        'Lensa kamera dan area capture kamera bersih tidak buram dan terhalang sarang serangga',
    },
  ],

  daily_after: [
    { title: 'Tutup semua aplikasi dan matikan komputer' },
    {
      title: 'Simpan handphone grading di dalam panel extension',
    },
    { title: 'Matikan UPS komputer dan UPS cylinder' },
    { title: 'Turunkan MCB stabilizer' },
    { title: 'MCB panel motor diturunkan' },
    { title: 'MCCB tetap dalam kondisi aktif' },
    { title: 'Panel ditutup rapat dan dikunci' },
    { title: 'Screw kompresor dalam keadaan mati' },
    { title: 'Screw kompresor dalam keadaan 0 BAR' },
    { title: 'Manhole sensor tertutup' },
    { title: 'Manhole grading box tertutup' },
    { title: 'Manhole Chute brondolan tertutup' },
  ],

  weekly: [
    { title: 'Screw baut cylinder terpasang dengan baik' },
    { title: 'Tirai grading box masih layak' },
    { title: 'Sensor grading box terpasang dengan baik' },
    { title: 'Kondisi roda sliding gate' },
    { title: 'Kondisi rantai conveyor' },
    { title: 'Kondisi roller pemutar' },
    { title: 'Kondisi bearing dan sprocket conveyor' },
    { title: 'Kondisi gearbox dan motoran' },
  ],
};

const ChecklistCard = ({ title, data, setData }) => {
  return (
    <div
      className='card w-full bg-white p-4 text-color-1'
      style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
    >
      <p className='subheadline-s'>{title}</p>

      <div className='bg-neutral-100 py-2 px-4 rounded-lg body-s-r mt-4'>
        {data.map((item, i) => {
          if (item.title === 'Notes') {
            return (
              <div key={i} className='flex items-center justify-between mt-2'>
                <p>{item.title}</p>
                <p className='body-s-r break-words'>{item.notesValue}</p>
              </div>
            );
          }

          return (
            <div key={i} className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <p>{item.title}</p>
                {item.example && (
                  <span className='text-neutral-500 text-xs italic'>
                    {item.example}
                  </span>
                )}
              </div>

              <Checkbox
                isChecked={item.isChecked}
                onChange={() => {
                  setData((prev) =>
                    prev.map((t, index) =>
                      index === i ? { ...t, isChecked: !t.isChecked } : t
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
  const { factoryId, mesinNumber, maintenanceDate } = useParams();

  const factoryName = sessionStorage.getItem('factoryName');
  const mesinName = sessionStorage.getItem('mesinName');

  const { data, loading } = useGet(`/v4/machine-check/`);

  const dateParam = maintenanceDate;
  const dateValue = dateParam || new Date();

  const formattedDate = dayjs(dateValue)
    .locale('id')
    .format('dddd, DD MMMM YYYY');

  const isSunday = dayjs(dateValue).day() === 0;

  const typesToShow = [
    'daily_before',
    'daily_after',
    ...(isSunday ? ['weekly'] : []),
  ];

  const getRecordByType = (type) =>
    data?.filter((r) => r.type === type).at(-1) || null;

  const getCheckboxStatus = (record) => {
    if (!record || !record._id) {
      return { checked: false, indeterminate: false };
    }

    const values = Object.values(record.questions || {});
    const allTrue = values.length > 0 && values.every((v) => v === true);

    return {
      checked: allTrue,
      indeterminate: !allTrue,
    };
  };

  const mapChecklist = (apiItems) => {
    const grouped = {
      daily_before: [],
      daily_after: [],
      weekly: [],
    };

    apiItems.forEach((item) => {
      const type = item.type;
      const { questions, notes } = item;
      const config = itemsConfig[type];

      if (!config) return;

      const mapped = config.map((cfg, idx) => ({
        title: cfg.title,
        example: cfg.example,
        isChecked: questions[String(idx + 1)] ?? false,
      }));

      if (notes) {
        mapped.push({ title: 'Notes', notesValue: notes });
      }

      grouped[type] = [...grouped[type], ...mapped];
    });

    return grouped;
  };

  const [checklists, setChecklists] = useState({
    daily_before: [],
    daily_after: [],
    weekly: [],
  });

  useEffect(() => {
    if (data) {
      const result = mapChecklist(data);
      setChecklists(result);
    }
  }, [data]);

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
            <h2 className='headline-s'>{formattedDate}</h2>
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
                  <p className='body-m-b text-color-1'>{mesinName}</p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      PABRIK
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>{factoryName}</p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TANGGAL MAINTENANCE
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>{formattedDate}</p>
                </div>
                <div className='bg-neutral-100 py-2 px-4 rounded-lg body-s-r'>
                  {typesToShow.map((type) => {
                    const record = getRecordByType(type);
                    const status = getCheckboxStatus(record);

                    return (
                      <span
                        key={type}
                        className='flex items-center justify-between gap-4'
                      >
                        <p>{typeConfig[type].label}</p>
                        <Checkbox
                          className='maintenance-checkbox'
                          isChecked={status.checked}
                          isIndeterminate={status.indeterminate}
                          disabled={status.indeterminate}
                          readOnly
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className='basis-2/3 space-y-6'>
            {loading || !data ? (
              <div className='min-h-[80vh] bg-white rounded-2xl flex items-center justify-center'>
                <span className='loading loading-spinner loading-lg'></span>
              </div>
            ) : (
              <>
                {Object.entries(checklists)
                  .filter(([, data]) => Array.isArray(data) && data.length > 0)
                  .map(([type, data]) => (
                    <ChecklistCard
                      key={type}
                      title={typeConfig[type].label}
                      data={data}
                      setData={(newData) =>
                        setChecklists((prev) => ({ ...prev, [type]: newData }))
                      }
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailMaintenancePage;
