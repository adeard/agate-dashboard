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
import LineCharts from './components/LIneCharts';
import CustomSelect from '@/components/shared/CustomSelect';

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
    value: 'by_fruits',
  },
  {
    label: 'Ukuran Buah',
    value: 'by_fruits_size',
  },
  {
    label: 'Tangkai Panjang',
    value: 'by_fruits_tp',
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

const menuTypeDictionary = {
  by_fruits: 'main',
  by_fruits_size: 'size',
  by_fruits_tp: 'tp',
};

const chartTypeDictionary = {
  summary_performance: 'Summary Performance',
  durations: 'Waktu Grading',
  truck_gaps: 'Gap Antar Truck',
  truck_fines: 'Denda Truk',
  rejected: 'TBS Ditolak',
  demography: 'Demografi Klasifikasi',
  machine_utility: 'Utilitas Mesin',
};

const listOptionsMachine = [
  { label: 'Semua Mesin', value: 'All' },
  {
    label: 'Mesin 1',
    value: '1',
  },
  {
    label: 'Mesin 2',
    value: '2',
  },
  {
    label: 'Mesin 3',
    value: '3',
  },
  {
    label: 'Mesin 4',
    value: '4',
  },
];

const chartTypeListOptions = Object.entries(chartTypeDictionary).map(
  ([key, value]) => ({
    label: value,
    value: key,
  })
);

const DesktopViewDashboardPage = () => {
  const [searchParams] = useSearchParams();

  const { data: optionsFactory } = useGet('/v1/options/factory');

  const { data, loading, refetch, setQueryParams } = useGetWithPost(
    '/v3/dashboard',
    {},
    false
  );

  // untuk filter
  const [selectedFactory, setSelectedFactory] = useState({});
  const [selectedVendorType, setSelectedVendorType] = useState({
    label: 'Semua',
    value: 'all',
  });

  useEffect(() => {
    if (optionsFactory) {
      setSelectedFactory(optionsFactory[0]);

      setQueryParams({
        date_from: dayjs().startOf('month').format('YYYY-MM-DD'),
        date_to: dayjs().format('YYYY-MM-DD'),
        factory: optionsFactory[0].value,
      });
    }
  }, [optionsFactory]);

  useEffect(() => {
    if (searchParams.size > 0) {
      refetch();
    }
  }, [searchParams]);

  // form filter
  const form = useForm({
    defaultValues: {
      date_from: searchParams.get('date_from') || '',
      date_to: searchParams.get('date_to') || '',
      factory: searchParams.get('factory') || selectedFactory.value,
      vendor_type: searchParams.get('vendor_type') || selectedVendorType.value,
    },
    onSubmit: async ({ value }) => {
      setQueryParams({
        date_from: value.date_from,
        date_to: value.date_to,
        factory: value.factory,
        vendor_type:
          selectedVendorType.value === 'all' ? '' : selectedVendorType.value,
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
    useState('daily');
  const [selectedRangeChartsPlasma, setSelectedRangeChartsPlasma] =
    useState('daily');

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

  const [chartType, setChartType] = useState(chartTypeListOptions[0]);
  const [machineType, setMachineType] = useState(listOptionsMachine[0]);

  return (
    <div>
      <div className='min-h-screen flex flex-col items-center justify-center hidden-dashboard'>
        <h1 className='subheadline-m'>
          Halaman ini hanya tersedia untuk desktop
        </h1>
      </div>
      <div className='hidden display-dashboard'>
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
              <Dropdown
                selected={selectedVendorType}
                setSelected={setSelectedVendorType}
                options={[
                  {
                    label: 'Semua',
                    value: 'all',
                  },
                  {
                    label: 'Inti',
                    value: '1',
                  },
                  {
                    label: 'Plasma',
                    value: '2',
                  },
                ]}
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
            {/* card vendor supply */}
            <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
              <label>
                <span className='uppercase label-text tag-l text-color-3 flex items-center gap-2'>
                  %SUPPLY VENDOR
                </span>
              </label>

              <div className='h-[25vh] overflow-y-auto'>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.vendor_supply.map((item, index) => (
                        <tr
                          key={index}
                          className='body-m-r group hover text-color-2'
                          // onClick={() => {
                          //   setSelectedDataSenderVendor(item);
                          //   toggleDrawerSenderVendor();
                          // }}
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
            {/* card vendor inti */}
            <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
              <label>
                <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                  %DITERIMA VENDOR
                  <span className='w-7 h-7 bg-[#EEECEA] text-center rounded-full'>
                    {data?.by_vendor_accepted.length}
                  </span>
                </span>
              </label>
              <div className='h-[25vh] overflow-y-auto'>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.by_vendor_accepted.map((item, index) => (
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
                  KRITERIA GRADING
                </span>
              </label>

              <div className='h-[25vh] overflow-y-auto'>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.[selectedClassification['value']]?.sort((a,b) => b.percent - a.percent).map(
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

            {/* card utlitas mesin */}
            <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
              <label>
                <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                  UTILITAS MESIN
                </span>
              </label>

              <div className='h-[25vh] overflow-y-auto'>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.machine_utility.map((item, index) => (
                        <tr key={index} className='body-m-r text-color-2'>
                          <td width={20}>{index + 1}.</td>
                          <td className='text-color-1'>Mesin {item.machine}</td>
                          <td width={100} className='text-right'>
                            <p className='flex gap-1 items-center justify-end'>
                              <span>{item.value}x</span> |
                              <span className='text-color-1 text-xs'>
                                {item.percent.toFixed(2)}
                                <span className='body-s-r'>%</span>
                              </span>
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* card summary average */}
            {/* <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
              <label>
                <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                  REKAP RATA - RATA
                </span>
              </label>

              <div className='h-[25vh] overflow-y-auto'>
                <table className='table'>
                  <tbody>
                    {data && (
                      <>
                        <tr className='body-m-r group hover text-color-2'>
                          <td className='text-color-1'>Diterima</td>
                          <td width={70} className='text-right'>
                            <p className='inline-flex'>
                              <span className='text-color-1'>
                                {data?.average?.accepted || '-'}
                              </span>
                            </p>
                          </td>
                        </tr>
                        <tr className='body-m-r group hover text-color-2'>
                          <td className='text-color-1'>Ditolak</td>
                          <td width={70} className='text-right'>
                            <p className='inline-flex'>
                              <span className='text-color-1'>
                                {data?.average?.rejected || '-'}
                              </span>
                            </p>
                          </td>
                        </tr>
                        <tr className='body-m-r group hover text-color-2'>
                          <td className='text-color-1'>Didenda</td>
                          <td width={70} className='text-right'>
                            <p className='inline-flex'>
                              <span className='text-color-1'>
                                {data?.average?.fined || '-'}
                              </span>
                            </p>
                          </td>
                        </tr>
                        <tr className='body-m-r group hover text-color-2'>
                          <td className='text-color-1'>Durasi Grading</td>
                          <td width={70} className='text-right'>
                            <p className='inline-flex'>
                              <span className='text-color-1'>
                                {data?.average?.duration || '-'}
                              </span>
                            </p>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div> */}

            {/* card vendor plasma */}
            {/* <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
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
            </div> */}

            {/* card buah plasma */}
            {/* <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
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
            </div> */}

            <section className='col-span-4 grid grid-cols-2 gap-4'>
              {/* charts plasma */}
              <div className='col-span-2 bg-white border border-primary-4 rounded-xl p-4'>
                <div className='flex items-center justify-between mb-4 w-full'>
                  <div className='flex items-center gap-4'>
                    <span className='text-color-1 flex items-center gap-2 text-lg w-52'>
                      {chartType?.label}
                    </span>
                    <Dropdown
                      selected={chartType}
                      setSelected={setChartType}
                      options={chartTypeListOptions}
                      buttonClassname='body-s-r border-primary-3 border-2 w-fit'
                      arrowPosition='right'
                      noLabel
                    />
                  </div>
                  <div className='flex items-center gap-4'>
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
                    {chartType?.value === 'truck_gaps' ? (
                      <CustomSelect
                        placeholder='Pilih Mesin'
                        className='body-m-r'
                        options={listOptionsMachine}
                        onChange={(selected) => {
                          setMachineType(selected);
                        }}
                        isSearchable={false}
                        value={machineType.value}
                        // name={field.name}
                        // value={field.state.value}
                        // options={optionsFactory || []}
                        // onChange={(selectedOption) => {
                        //   const selectedValue = selectedOption
                        //     ? selectedOption.value
                        //     : null;
                        //   field.handleChange(selectedValue);
                        // }}
                        // size='lg'
                        // full
                      />
                    ) : null}
                  </div>
                </div>

                {data && (
                  <LineCharts
                    data={data?.charts_data?.[chartType.value]}
                    range={selectedRangeChartsPlasma}
                    type={selectedTypeChart.value}
                    // variant='plasma'
                    height={270}
                    // toggleDrawer={handleSelectDataChart}
                    dividerPercent={
                      chartType.value === 'demography'
                        ? data?.charts_data?.[chartType.value]['main']
                        : null
                    }
                    chartType={chartType.value}
                    machineType={machineType.value}
                    // range={menuTypeDictionary[selectedClassification.value]}
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
