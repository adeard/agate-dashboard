import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useForm } from '@tanstack/react-form';

import { MdOutlineViewModule, MdBarChart } from 'react-icons/md';

import { useGet, useGetWithPost } from '@/services/use-services';
import useDrawer from '@/hooks/useDrawer';

import { convertLabel } from '@/utils/common';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Dropdown from '@/components/shared/Dropdown';
import DrawerSenderVendor from './components/DrawerSenderVendor';
import DrawerSenderBuah from './components/DrawerSenderBuah';
import Charts from './components/Charts';
import DrawerDemografiChart from './components/DrawerDemografiChart';
import TableDemografi from './components/TableDemografi';
import DrawerRiwayatPemeriksaan from './components/DrawerRiwayatPemeriksaan';

import dayjs from 'dayjs';

const listMenuTypeChart = [
  {
    label: 'Klasifikasi Utama',
    value: 'main',
  },
  {
    label: 'Ukuran Buah',
    value: 'size',
  },
  {
    label: 'Tangkai Panjang',
    value: 'tp',
  },
];
const listMenuTypeInti = [
  {
    label: 'Klasifikasi Utama',
    value: 'by_inti_fruits',
  },
  {
    label: 'Ukuran Buah',
    value: 'by_inti_fruits_size',
  },
  {
    label: 'Tangkai Panjang',
    value: 'by_inti_fruits_tp',
  },
];
const listMenuTypePlasma = [
  {
    label: 'Klasifikasi Utama',
    value: 'by_plasma_fruits',
  },
  {
    label: 'Ukuran Buah',
    value: 'by_plasma_fruits_size',
  },
  {
    label: 'Tangkai Panjang',
    value: 'by_plasma_fruits_tp',
  },
];

const DesktopViewDashboardPage = () => {
  const [searchParams] = useSearchParams();

  const { data: optionsFactory } = useGet('/v1/options/factory');

  const { data, loading, refetch, setQueryParams } = useGetWithPost(
    '/v2/dashboard',
    {},
    false
  );

  // untuk filter
  const [selectedFactory, setSelectedFactory] = useState({});

  useEffect(() => {
    if (optionsFactory) {
      setSelectedFactory(optionsFactory[0]);

      setQueryParams({
        date_from: dayjs().format('YYYY-MM-DD'),
        date_to: dayjs().format('YYYY-MM-DD'),
        factory: optionsFactory[0].value,
      });
    }
  }, [optionsFactory]);

  useEffect(() => {
    refetch();
  }, [searchParams]);

  // form filter
  const form = useForm({
    defaultValues: {
      date_from: searchParams.get('date_from') || '',
      date_to: searchParams.get('date_to') || '',
      factory: searchParams.get('factory') || selectedFactory.value,
    },
    onSubmit: async ({ value }) => {
      setQueryParams({
        date_from: value.date_from,
        date_to: value.date_to,
        factory: value.factory,
      });
    },
  });

  // type classficiation state
  const [activeMenuType, setActiveMenuType] = useState(0);
  const [selectedTypeChart, setSelectedTypeChart] = useState(
    listMenuTypeChart[0]
  );
  const [selectedClassification, setSelectedClassification] = useState(
    listMenuTypeInti[0]
  );
  const [selectedClassificationPlasma, setSelectedClassificationPlasma] =
    useState(listMenuTypePlasma[0]);

  // range chart state
  const listRangeCharts = ['monthly', 'weekly', 'daily'];
  const [selectedRangeChartsInti, setSelectedRangeChartsInti] =
    useState('weekly');
  const [selectedRangeChartsPlasma, setSelectedRangeChartsPlasma] =
    useState('weekly');

  // display data mode chart/table
  const [chartModeInti, setChartModeInti] = useState('chart');
  const [chartModePlasma, setChartModePlasma] = useState('chart');

  // drawer
  const {
    idDrawer: idDrawerRiwayatPemeriksaan,
    isDrawerOpen: isDrawerRiwayatPemeriksaanOpen,
    toggleDrawer: toggleDrawerRiwayatPemeriksaan,
    closeDrawer: closeDrawerRiwayatPemeriksaan,
  } = useDrawer('DrawerRiwayatPemeriksaan');

  const [selectedDataSenderBuah, setSelectedDataSenderBuah] = useState('');
  const {
    idDrawer: idDrawerSenderBuah,
    isDrawerOpen: isDrawerSenderBuahOpen,
    toggleDrawer: toggleDrawerSenderBuah,
    closeDrawer: closeDrawerSenderBuah,
  } = useDrawer('DrawerSenderBuah');

  const [selectedDataSenderVendor, setSelectedDataSenderVendor] = useState('');
  const {
    idDrawer: idDrawerSenderVendor,
    isDrawerOpen: isDrawerSenderVendorOpen,
    toggleDrawer: toggleDrawerSenderVendor,
    closeDrawer: closeDrawerSenderVendor,
  } = useDrawer('DrawerSenderVendor');

  const [selectedDataChart, setSelectedDataChart] = useState('');
  const {
    idDrawer: idDrawerDemografiChart,
    isDrawerOpen: isDrawerDemografiChartOpen,
    toggleDrawer: toggleDrawerDemografiChart,
    closeDrawer: closeDrawerDemografiChart,
  } = useDrawer('DrawerDemografiChart');

  const handleSelectDataChart = (data) => {
    setSelectedDataChart(data);
    toggleDrawerDemografiChart();
  };

  const handleClickMenuClassification = (index) => {
    setActiveMenuType(index);
    setSelectedTypeChart(listMenuTypeChart[index]);
    setSelectedClassification(listMenuTypeInti[index]);
    setSelectedClassificationPlasma(listMenuTypePlasma[index]);
  };

  return (
    <div>
      <div className='min-h-screen flex flex-col items-center justify-center lg:hidden'>
        <h1 className='subheadline-m'>
          Halaman ini hanya tersedia untuk desktop
        </h1>
      </div>
      <div className='hidden lg:block'>
        <header>
          <div className='flex items-center justify-between  px-12 pt-6 py-0'>
            <div className='flex items-center gap-2 mr-8'>
              <h1 className='headline-s'>Dashboard Monitoring</h1>{' '}
              <div className='flex flex-wrap gap-2'>
                {listMenuTypeChart.map((menu, index) => (
                  <button
                    key={index}
                    className={`border rounded-full p-2 ${
                      activeMenuType === index
                        ? 'bg-[#f2f7f3] text-[#006D33] border-[#006D33] font-bold'
                        : 'text-[#7E7E7E] border-primary-3'
                    }`}
                    onClick={() => handleClickMenuClassification(index)}
                  >
                    {menu.label}
                  </button>
                ))}
              </div>
            </div>
            <div className='flex gap-2'>
              <label className='tag-l my-auto text-color-2'>FILTER</label>
              <form.Field
                name='date_from'
                children={(field) => (
                  <Input
                    type='date'
                    size='lg'
                    name={field.name}
                    value={field.state.value}
                    className='bg-white pr-8'
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                  />
                )}
              />
              <span className='m-auto'>-</span>
              <form.Field
                name='date_to'
                children={(field) => (
                  <Input
                    type='date'
                    size='lg'
                    name={field.name}
                    value={field.state.value}
                    className='bg-white pr-8'
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                  />
                )}
              />
              <Dropdown
                selected={selectedFactory}
                setSelected={setSelectedFactory}
                options={optionsFactory}
                buttonClassname='body-s-r border-primary-3 border-2 !h-10'
                arrowPosition='right'
              />
              <Button size='lg' onClick={form.handleSubmit}>
                Apply
              </Button>
            </div>
          </div>
        </header>

        <main className='space-y-4'>
          <section className='grid grid-cols-5 gap-4'>
            <div
              className='bg-white border border-primary-4 rounded-xl p-4 inline-flex items-center justify-between hover:cursor-pointer hover:bg-primary-5'
              onClick={toggleDrawerRiwayatPemeriksaan}
            >
              <label>
                <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                  TOTAL TRUK
                </span>
              </label>
              <p>
                <span className='subheadline-s text-color-1'>
                  {data?.monitoring.total_grading.toLocaleString()}
                </span>{' '}
                <span className='body-m-bold text-color-3 text-sm'>truk</span>
              </p>
            </div>
            <div className='bg-white border border-primary-4 rounded-xl p-4 inline-flex items-center justify-between'>
              <label>
                <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                  TOTAL JANJANG
                </span>
              </label>
              <p>
                <span className='subheadline-s text-color-1'>
                  {data?.monitoring.total_tandan.toLocaleString()}
                </span>{' '}
                <span className='body-m-bold text-color-3 text-sm'>Pcs</span>
              </p>
            </div>
            <div className='bg-white border border-primary-4 rounded-xl p-4 inline-flex items-center justify-between'>
              <label>
                <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                  DITERIMA
                </span>
              </label>
              <div>
                <span className='subheadline-s text-color-1'>
                  {data?.monitoring.total_passed.toLocaleString()}
                </span>{' '}
                <span className='body-m-bold text-color-3 text-sm'>Pcs</span>
                <span className='h-full w-2 border border-[#F2F2F2] mx-1'></span>
                <span className='body-m-r mr-1'>
                  {Number(data?.monitoring.percent_passed).toFixed(2)}
                </span>
                <span className='body-s-r text-color-3 text-sm'>%</span>
              </div>
            </div>
            <div className='bg-white border border-primary-4 rounded-xl p-4 inline-flex items-center justify-between'>
              <label>
                <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                  DITOLAK
                </span>
              </label>
              <p>
                <span className='subheadline-s text-color-1'>
                  {data?.monitoring.total_rejected.toLocaleString()}
                </span>{' '}
                <span className='body-m-bold text-color-3 text-sm'>Pcs</span>
                <span className='h-full w-2 border border-[#F2F2F2] mx-1'></span>
                <span className='body-m-r mr-1'>
                  {Number(data?.monitoring.percent_rejected).toFixed(2)}
                </span>
                <span className='body-s-r text-color-3 text-sm'>%</span>
              </p>
            </div>
            <div className='bg-white border border-primary-4 rounded-xl p-4 inline-flex items-center justify-between'>
              <label>
                <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                  DIDENDA
                </span>
              </label>
              <p>
                <span className='subheadline-s text-color-1'>
                  {data?.monitoring.total_fined.toLocaleString()}
                </span>{' '}
                <span className='body-m-bold text-color-3 text-sm'>Pcs</span>
                <span className='h-full w-2 border border-[#F2F2F2] mx-1'></span>
                <span className='body-m-r mr-1'>
                  {Number(data?.monitoring.percent_fined).toFixed(2)}
                </span>
                <span className='body-s-r text-color-3 text-sm'>%</span>
              </p>
            </div>
          </section>
          <section className='grid grid-cols-4 gap-4'>
            {/* card vendor inti */}
            <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
              <label>
                <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                  %DITERIMA VENDOR INTI{' '}
                  <span className='w-7 h-7 bg-[#EEECEA] text-center rounded-full'>
                    {data?.by_inti_accepted.length}
                  </span>
                </span>
              </label>
              <div className='h-[25vh] overflow-y-auto'>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.by_inti_accepted.map((item, index) => (
                        <tr
                          key={index}
                          className='body-m-r group hover text-color-2 hover:cursor-pointer'
                          onClick={() => {
                            setSelectedDataSenderVendor(item);
                            toggleDrawerSenderVendor();
                          }}
                        >
                          <td width={20}>{index + 1}.</td>
                          <td className='text-color-1'>{item.label}</td>
                          <td width={70} className='text-right'>
                            <p className='inline-flex'>
                              <span className='text-color-1'>
                                {item.percent.toFixed(2)}
                              </span>{' '}
                              <span className='body-s-r'>%</span>
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* card buah inti */}
            <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
              <label>
                <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                  BUAH INTI
                </span>
              </label>

              <div className='h-[25vh] overflow-y-auto'>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.[selectedClassification['value']].map(
                        (item, index) => (
                          <tr
                            key={index}
                            className='body-m-r group hover text-color-2 hover:cursor-pointer'
                            onClick={() => {
                              setSelectedDataSenderBuah(item);
                              toggleDrawerSenderBuah();
                            }}
                          >
                            <td width={20}>{index + 1}.</td>
                            <td className='text-color-1'>
                              {convertLabel(item.label)}
                            </td>
                            <td width={70} className='text-right'>
                              <p className='inline-flex'>
                                <span className='text-color-1'>
                                  {item.percent.toFixed(2)}
                                </span>{' '}
                                <span className='body-s-r'>%</span>
                              </p>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* card vendor plasma */}
            <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
              <label>
                <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                  %DITERIMA VENDOR PLASMA{' '}
                  <span className='w-7 h-7 bg-[#EEECEA] text-center rounded-full'>
                    {data?.by_plasma_accepted.length}
                  </span>
                </span>
              </label>

              <div className='h-[25vh] overflow-y-auto'>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.by_plasma_accepted.map((item, index) => (
                        <tr
                          key={index}
                          className='body-m-r group hover text-color-2 hover:cursor-pointer'
                          onClick={() => {
                            setSelectedDataSenderVendor(item);
                            toggleDrawerSenderVendor();
                          }}
                        >
                          <td width={20}>{index + 1}.</td>
                          <td className='text-color-1'>{item.label}</td>
                          <td width={70} className='text-right'>
                            <p className='inline-flex'>
                              <span className='text-color-1'>
                                {item.percent.toFixed(2)}
                              </span>{' '}
                              <span className='body-s-r'>%</span>
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* card buah plasma */}
            <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
              <label>
                <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                  BUAH PLASMA
                </span>
              </label>
              <div className='h-[25vh] overflow-y-auto'>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.[selectedClassificationPlasma['value']].map(
                        (item, index) => (
                          <tr
                            key={index}
                            className='body-m-r group hover text-color-2 hover:cursor-pointer'
                            onClick={() => {
                              setSelectedDataSenderBuah(item);
                              toggleDrawerSenderBuah();
                            }}
                          >
                            <td width={20}>{index + 1}.</td>
                            <td className='text-color-1'>
                              {convertLabel(item.label)}
                            </td>
                            <td width={70} className='text-right'>
                              <p className='inline-flex'>
                                <span className='text-color-1'>
                                  {item.percent.toFixed(2)}
                                </span>{' '}
                                <span className='body-s-r'>%</span>
                              </p>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>

            <section className='col-span-4 grid grid-cols-2 gap-4'>
              {/* charts inti */}
              <div className='col-span-1 bg-white border border-primary-4 rounded-xl p-4'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-16'>
                    <div className='flex items-center gap-4'>
                      <span className='label-text tag-l text-color-1 flex items-center gap-2'>
                        CHART DEMOGRAFI BUAH INTI
                      </span>
                      <ul className='exchange-menu body-m-b menu menu-horizontal px-0 font-medium'>
                        {listRangeCharts.map((item, index) => (
                          <li
                            key={index}
                            className={`${
                              selectedRangeChartsInti === item
                                ? 'rounded-full bg-[#F2F7F3] text-[#006D33] font-bold'
                                : 'text-color-2 font-medium'
                            } `}
                            onClick={() => setSelectedRangeChartsInti(item)}
                          >
                            <button>{convertLabel(item)}</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className='flex items-center body-m-r text-neutrals-5 '>
                    {chartModeInti === 'table' ? (
                      <button
                        className='flex items-center'
                        onClick={() => setChartModeInti('chart')}
                      >
                        <MdBarChart className='text-lg' />
                        Chart
                      </button>
                    ) : (
                      <button
                        className='flex items-center'
                        onClick={() => setChartModeInti('table')}
                      >
                        <MdOutlineViewModule className='text-lg' />
                        Table
                      </button>
                    )}
                  </div>
                </div>

                {data && chartModeInti === 'chart' && (
                  <Charts
                    data={data?.by_demography_inti[selectedTypeChart.value]}
                    range={selectedRangeChartsInti}
                    type={selectedTypeChart.value}
                    variant='inti'
                    height={270}
                    toggleDrawer={handleSelectDataChart}
                    dividerPercent={data?.by_demography_inti['main']}
                  />
                )}

                {data && chartModeInti === 'table' && (
                  <TableDemografi
                    data={data?.by_demography_inti[selectedTypeChart.value]}
                    range={selectedRangeChartsInti}
                    type={selectedTypeChart.value}
                    variant='inti'
                    height={270}
                    toggleDrawer={handleSelectDataChart}
                  />
                )}
              </div>

              {/* charts plasma */}
              <div className='col-span-1 bg-white border border-primary-4 rounded-xl p-4'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-16'>
                    <div className='flex items-center gap-4'>
                      <span className='label-text tag-l text-color-1 flex items-center gap-2'>
                        CHART DEMOGRAFI BUAH PLASMA
                      </span>
                      <ul className='exchange-menu body-m-b menu menu-horizontal px-0 font-medium'>
                        {listRangeCharts.map((item, index) => (
                          <li
                            key={index}
                            className={`${
                              selectedRangeChartsPlasma === item
                                ? 'rounded-full bg-[#F2F7F3] text-[#006D33] font-bold'
                                : 'text-color-2 font-medium'
                            } `}
                            onClick={() => setSelectedRangeChartsPlasma(item)}
                          >
                            <button>{convertLabel(item)}</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className='flex items-center body-m-r text-neutrals-5 '>
                    {chartModePlasma === 'table' ? (
                      <button
                        className='flex items-center'
                        onClick={() => setChartModePlasma('chart')}
                      >
                        <MdBarChart className='text-lg' />
                        Chart
                      </button>
                    ) : (
                      <button
                        className='flex items-center'
                        onClick={() => setChartModePlasma('table')}
                      >
                        <MdOutlineViewModule className='text-lg' />
                        Table
                      </button>
                    )}
                  </div>
                </div>

                {data && chartModePlasma === 'chart' && (
                  <Charts
                    data={data?.by_demography_plasma[selectedTypeChart.value]}
                    range={selectedRangeChartsPlasma}
                    type={selectedTypeChart.value}
                    variant='plasma'
                    height={270}
                    toggleDrawer={handleSelectDataChart}
                    dividerPercent={data?.by_demography_plasma['main']}
                  />
                )}

                {data && chartModePlasma === 'table' && (
                  <TableDemografi
                    data={data?.by_demography_plasma[selectedTypeChart.value]}
                    range={selectedRangeChartsPlasma}
                    type={selectedTypeChart.value}
                    variant='plasma'
                    height={270}
                    toggleDrawer={handleSelectDataChart}
                  />
                )}
              </div>
            </section>
          </section>
        </main>
      </div>

      <DrawerRiwayatPemeriksaan
        idDrawer={idDrawerRiwayatPemeriksaan}
        isDrawerOpen={isDrawerRiwayatPemeriksaanOpen}
        closeDrawer={closeDrawerRiwayatPemeriksaan}
        factoryId={selectedFactory.value}
      />

      <DrawerSenderBuah
        idDrawer={idDrawerSenderBuah}
        isDrawerOpen={isDrawerSenderBuahOpen}
        closeDrawer={closeDrawerSenderBuah}
        data={selectedDataSenderBuah}
      />

      <DrawerSenderVendor
        idDrawer={idDrawerSenderVendor}
        isDrawerOpen={isDrawerSenderVendorOpen}
        closeDrawer={closeDrawerSenderVendor}
        data={selectedDataSenderVendor}
      />

      <DrawerDemografiChart
        idDrawer={idDrawerDemografiChart}
        isDrawerOpen={isDrawerDemografiChartOpen}
        closeDrawer={closeDrawerDemografiChart}
        data={selectedDataChart}
        range={
          selectedDataChart.variant === 'inti'
            ? selectedRangeChartsInti
            : selectedRangeChartsPlasma
        }
      />
    </div>
  );
};

export default DesktopViewDashboardPage;
