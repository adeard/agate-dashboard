import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useForm } from '@tanstack/react-form';

import {
  MdOutlineFilterAlt,
  MdOutlineViewModule,
  MdBarChart,
} from 'react-icons/md';

import { useGet, useGetWithPost } from '@/services/use-services';
import useDrawer from '@/hooks/useDrawer';

import { convertLabel } from '@/utils/common';

import NavbarMobile from '@/components/shared/NavbarMobile';
import MobileDrawerFilter from '../components/mobile/MobileDrawerFilter';
import MobileDrawerSenderBuah from '../components/MobileDrawerSenderBuah';
import MobileDrawerSenderVendor from '../components/MobileDrawerSenderVendor';

import Charts from '../components/Charts';
import TableDemografi from '../components/TableDemografi';
import MobileDrawerDemografiChart from '../components/MobileDrawerDemografiChart';

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

const DemografiBuah = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: optionsFactory } = useGet('/v1/options/factory');
  const { data: optionsVendor, refetch: refetchOptionsVendor } =
    useGet('/v2/vendor');

  const { data, loading, refetch, setQueryParams } = useGetWithPost(
    '/v4/dashboard',
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
    if (searchParams.size > 0) {
      refetch();
      refetchOptionsVendor();
    }
  }, [searchParams]);

  // form filter
  const form = useForm({
    defaultValues: {
      date_from: searchParams.get('date_from') || '',
      date_to: searchParams.get('date_to') || '',
      factory: searchParams.get('factory') || selectedFactory.value,
      vendor_type: searchParams.get('vendor_type') || selectedVendorType.value,
      ids: '',
    },
    onSubmit: async ({ value }) => {
      setQueryParams({
        date_from: value.date_from,
        date_to: value.date_to,
        factory: value.factory,
        vendor_type:
          selectedVendorType.value === 'all' ? '' : selectedVendorType.value,
        ids: value.ids,
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

  const {
    idDrawer: idMobileDrawerFilter,
    isDrawerOpen: isMobileDrawerFilterOpen,
    toggleDrawer: toggleMobileDrawerFilter,
    closeDrawer: closeMobileDrawerFilter,
  } = useDrawer('MobileDrawerFilter');

  const [selectedDataSenderBuah, setSelectedDataSenderBuah] = useState('');
  const {
    idDrawer: idMobileDrawerSenderBuah,
    isDrawerOpen: isMobileDrawerSenderBuahOpen,
    toggleDrawer: toggleMobileDrawerSenderBuah,
    closeDrawer: closeMobileDrawerSenderBuah,
  } = useDrawer('MobileDrawerSenderBuah');

  const [selectedDataSenderVendor, setSelectedDataSenderVendor] = useState('');
  const {
    idDrawer: idMobileDrawerSenderVendor,
    isDrawerOpen: isMobileDrawerSenderVendorOpen,
    toggleDrawer: toggleMobileDrawerSenderVendor,
    closeDrawer: closeMobileDrawerSenderVendor,
  } = useDrawer('MobileDrawerSenderVendor');

  const [selectedDataChart, setSelectedDataChart] = useState('');
  const {
    idDrawer: idMobileDrawerDemografiChart,
    isDrawerOpen: isMobileDrawerDemografiChartOpen,
    toggleDrawer: toggleMobileDrawerDemografiChart,
    closeDrawer: closeMobileDrawerDemografiChart,
  } = useDrawer('MobileDrawerDemografiChart');

  const handleSelectDataChart = (data) => {
    setSelectedDataChart(data);
    toggleMobileDrawerDemografiChart();
  };

  const handleClickMenuClassification = (index) => {
    setActiveMenuType(index);
    setSelectedTypeChart(listMenuTypeChart[index]);
    setSelectedClassification(listMenuTypeInti[index]);
    setSelectedClassificationPlasma(listMenuTypePlasma[index]);
  };

  // detect size width
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth >= 768) {
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <NavbarMobile
        linkBack='/dashboard'
        title='Demografi Kualitas Buah'
        rightIcon={
          <MdOutlineFilterAlt
            className='text-xl'
            onClick={toggleMobileDrawerFilter}
          />
        }
      />
      {isMobile ? (
        <main className='bg-white p-4'>
          <div className='flex flex-wrap gap-2 my-4'>
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
          <section className='space-y-4'>
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
              <div className='h-max max-h-[30vh] overflow-y-auto'>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.by_inti_accepted.map((item, index) => (
                        <tr
                          key={index}
                          className='body-m-r group hover text-color-2 hover:cursor-pointer'
                          onClick={() => {
                            setSelectedDataSenderVendor(item);
                            toggleMobileDrawerSenderVendor();
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
              <div className='h-max max-h-[30vh] overflow-y-auto'>
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
                              toggleMobileDrawerSenderBuah();
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
              <div className='h-max max-h-[30vh] overflow-y-auto'>
                <table className='table'>
                  <tbody>
                    {data &&
                      data?.by_plasma_accepted.map((item, index) => (
                        <tr
                          key={index}
                          className='body-m-r group hover text-color-2 hover:cursor-pointer'
                          onClick={() => {
                            setSelectedDataSenderVendor(item);
                            toggleMobileDrawerSenderVendor();
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
              <div className='h-max max-h-[30vh] overflow-y-auto'>
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
                              toggleMobileDrawerSenderBuah();
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
          </section>

          <section className='space-y-4'>
            {/* charts inti */}
            <div className='bg-white border border-primary-4 rounded-xl p-4'>
              <div className='flex items-center justify-between mb-4'>
                <span className='label-text tag-l text-color-1 flex items-center gap-2'>
                  CHART DEMOGRAFI BUAH INTI
                </span>
                <div className='flex items-center body-m-r text-neutrals-5 '>
                  <div className='divider divider-horizontal mx-0' />
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
              <div>
                <ul className='exchange-menu body-m-b menu menu-horizontal px-0 font-medium'>
                  {listRangeCharts.map((item, index) => (
                    <li
                      key={index}
                      className={`${
                        selectedRangeChartsInti === item
                          ? 'rounded-full bg-[#F2F7F3] text-[#006D33] font-bold'
                          : 'text-color-2 font-medium'
                      } `}
                      onClick={() => {
                        setSelectedRangeChartsInti(item);
                        document.activeElement.blur();
                      }}
                    >
                      <button>{convertLabel(item)}</button>
                    </li>
                  ))}
                </ul>
              </div>

              {data && chartModeInti === 'chart' && (
                <Charts
                  data={data?.by_demography_inti[selectedTypeChart.value]}
                  range={selectedRangeChartsInti}
                  type={selectedTypeChart.value}
                  variant='inti'
                  height={270}
                  toggleDrawer={handleSelectDataChart}
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
            <div className='bg-white border border-primary-4 rounded-xl p-4'>
              <div className='flex items-center justify-between mb-4'>
                <span className='label-text tag-l text-color-1 flex items-center gap-2'>
                  CHART DEMOGRAFI BUAH PLASMA
                </span>
                <div className='flex items-center body-m-r text-neutrals-5 '>
                  <div className='divider divider-horizontal mx-0' />
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
              <div>
                <ul className='exchange-menu body-m-b menu menu-horizontal px-0 font-medium'>
                  {listRangeCharts.map((item, index) => (
                    <li
                      key={index}
                      className={`${
                        selectedRangeChartsInti === item
                          ? 'rounded-full bg-[#F2F7F3] text-[#006D33] font-bold'
                          : 'text-color-2 font-medium'
                      } `}
                      onClick={() => {
                        setSelectedRangeChartsPlasma(item);
                        document.activeElement.blur();
                      }}
                    >
                      <button>{convertLabel(item)}</button>
                    </li>
                  ))}
                </ul>
              </div>

              {data && chartModePlasma === 'chart' && (
                <Charts
                  data={data?.by_demography_plasma[selectedTypeChart.value]}
                  range={selectedRangeChartsPlasma}
                  type={selectedTypeChart.value}
                  variant='plasma'
                  height={270}
                  toggleDrawer={handleSelectDataChart}
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
        </main>
      ) : (
        <div className='min-h-screen flex flex-col items-center justify-center lg:hidden'>
          <h1 className='subheadline-m'>
            Halaman ini hanya tersedia untuk mobile
          </h1>
        </div>
      )}

      <MobileDrawerFilter
        idDrawer={idMobileDrawerFilter}
        isDrawerOpen={isMobileDrawerFilterOpen}
        closeDrawer={closeMobileDrawerFilter}
        form={form}
        selectedFactory={selectedFactory}
        setSelectedFactory={setSelectedFactory}
        optionsFactory={optionsFactory}
        selectedVendorType={selectedVendorType}
        setSelectedVendorType={setSelectedVendorType}
        optionsVendor={optionsVendor}
      />

      <MobileDrawerSenderBuah
        idDrawer={idMobileDrawerSenderBuah}
        isDrawerOpen={isMobileDrawerSenderBuahOpen}
        closeDrawer={closeMobileDrawerSenderBuah}
        data={selectedDataSenderBuah}
      />

      <MobileDrawerSenderVendor
        idDrawer={idMobileDrawerSenderVendor}
        isDrawerOpen={isMobileDrawerSenderVendorOpen}
        closeDrawer={closeMobileDrawerSenderVendor}
        data={selectedDataSenderVendor}
      />

      <MobileDrawerDemografiChart
        idDrawer={idMobileDrawerDemografiChart}
        isDrawerOpen={isMobileDrawerDemografiChartOpen}
        closeDrawer={closeMobileDrawerDemografiChart}
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

export default DemografiBuah;
