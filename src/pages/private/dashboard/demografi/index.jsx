import { useEffect, useRef, useState } from 'react';

import { useForm } from '@tanstack/react-form';

import { MdOutlineViewModule, MdBarChart } from 'react-icons/md';

import { useGet, useGetWithPost } from '@/services/use-services';

import { convertLabel } from '@/utils/common';

import ModalFilter from '../components/ModalFilter';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Dropdown from '@/components/shared/Dropdown';
import DrawerDemografiVendor from '../components/DrawerDemografiVendor';
import DrawerSenderVendor from '../components/DrawerSenderVendor';
import Charts from '../components/Charts';
import DrawerDemografiChart from '../components/DrawerDemografiChart';
import SectionCard from '@/components/shared/SectionCard';
import TableDemografi from '../components/TableDemografi';

const listMenuType = [
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

const DashboardDemografiPage = () => {
  const { data: optionsFactory } = useGet('/v1/options/factory');

  const { data, loading, refetch, setQueryParams } =
    useGetWithPost('/v2/dashboard');

  const [selectedFactory, setSelectedFactory] = useState({
    label: 'Pilih Pabrik',
    value: 'tes',
  });

  const form = useForm({
    defaultValues: {
      date_from: '',
      date_to: '',
      factory: selectedFactory.value,
    },
    onSubmit: async ({ value }) => {
      setQueryParams({
        date_from: value.date_from,
        date_to: value.date_to,
        factory: selectedFactory.value,
      });
      refetch({
        date_from: value.date_from,
        date_to: value.date_to,
        factory: selectedFactory.value,
      });
    },
  });

  const dialogFilterRef = useRef(null);
  const handleOpenModalFilter = () => {
    dialogFilterRef.current.showModal();
  };

  useEffect(() => {
    // handleOpenModalFilter();
  }, []);

  // dropdown & menu
  const [selectedClassification, setSelectedClassification] = useState(
    listMenuTypeInti[0]
  );
  const [selectedClassificationPlasma, setSelectedClassificationPlasma] =
    useState(listMenuTypePlasma[0]);

  const [selectedRangeCharts, setSelectedRangeCharts] = useState('weekly');
  const [selectedRangeChartsPlasma, setSelectedRangeChartsPlasma] =
    useState('weekly');
  const listRangeCharts = ['monthly', 'weekly', 'daily'];

  const [demographyIntiChartType, setDemographyIntiChartType] = useState({
    label: 'Klasifikasi Utama',
    value: 'main',
  });
  const [demographyPlasmaChartType, setDemographyPlasmaChartType] = useState({
    label: 'Klasifikasi Utama',
    value: 'main',
  });

  const [chartModeInti, setChartModeInti] = useState('chart');
  const [chartModePlasma, setChartModePlasma] = useState('chart');

  // drawer
  const idDrawerSenderVendor = 'DrawerSenderVendor';
  const [isDrawerSenderVendorOpen, setIsDrawerSenderVendorOpen] =
    useState(false);
  const idDrawerDemografiVendor = 'DrawerDemografiVendor';
  const [isDrawerDemografiVendorOpen, setIsDrawerDemografiVendorOpen] =
    useState(false);
  const idDrawerDemografiChart = 'DrawerDemografiChart';
  const [isDrawerDemografiChartOpen, setIsDrawerDemografiChartOpen] =
    useState(false);

  const [selectedDataSender, setSelectedDataSender] = useState('');
  const [selectedDataVendor, setSelectedDataVendor] = useState('');
  const [selectedDataChart, setSelectedDataChart] = useState('');
  const toogleDrawerSender = (data) => {
    setSelectedDataSender(data);
    const drawerElement = document.getElementById(idDrawerSenderVendor);
    drawerElement.checked = true;
    setIsDrawerSenderVendorOpen(!isDrawerSenderVendorOpen);
  };

  const toogleDrawerDemografiVendor = (data) => {
    setSelectedDataVendor(data);
    const drawerElement = document.getElementById(idDrawerDemografiVendor);
    drawerElement.checked = true;
    setIsDrawerDemografiVendorOpen(!isDrawerDemografiVendorOpen);
  };

  const toogleDrawerDemografiChart = (data) => {
    setSelectedDataChart(data);
    const drawerElement = document.getElementById(idDrawerDemografiChart);
    drawerElement.checked = true;
    setIsDrawerDemografiChartOpen(!isDrawerDemografiChartOpen);
  };

  return (
    <div>
      <header>
        <div className='flex items-center justify-between  px-12 pt-6 py-0'>
          <h1 className='headline-s'>Dashboard Demografi Kualitas Buah</h1>
          <div className='flex gap-2'>
            <label className='tag-l my-auto text-color-2'>FILTER</label>
            <form.Field
              name='date_from'
              children={(field) => (
                <Input
                  type='date'
                  size='lg'
                  full
                  name={field.name}
                  value={field.state.value}
                  className='pr-12 bg-white'
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
                  full
                  name={field.name}
                  value={field.state.value}
                  className='pr-12 bg-white'
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
              buttonClassname='body-s-r border-primary-3 border-2 !h-10 w-max min-w-[170px]'
              arrowPosition='right'
              full
            />
            <Button size='lg' onClick={form.handleSubmit}>
              Apply
            </Button>
          </div>
        </div>
      </header>
      <main className='grid grid-cols-4 gap-4'>
        {/* card vendor inti */}
        <div className='bg-white border border-primary-4 rounded-xl p-4'>
          <div className='flex items-center justify-between pb-4'>
            <label>
              <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                %DITERIMA VENDOR INTI{' '}
                <span className='w-7 h-7 bg-[#EEECEA] text-center rounded-full'>
                  {data?.by_inti_accepted.length}
                </span>
              </span>
            </label>
            <div className='h-10'></div>
          </div>
          <div className='max-h-[30vh] overflow-y-auto'>
            <table className='table'>
              <tbody>
                {data &&
                  data?.by_inti_accepted.map((item, index) => (
                    <tr
                      key={index}
                      className='body-m-r group hover text-color-2 hover:cursor-pointer'
                      onClick={() => toogleDrawerDemografiVendor(item)}
                    >
                      <td width={20}>{index + 1}.</td>
                      <td className='text-color-1'>{item.label}</td>
                      <td width={70}>
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
        <div className='bg-white border border-primary-4 rounded-xl p-4'>
          <div className='flex items-center justify-between pb-4'>
            <label>
              <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                BUAH INTI
              </span>
            </label>
            <Dropdown
              selected={selectedClassification}
              setSelected={setSelectedClassification}
              options={listMenuTypeInti}
              buttonClassname='body-s-r border-primary-3 border-2 !h-10 !w-[169px]'
              arrowPosition='right'
              full
            />
          </div>

          <div className='max-h-[30vh] overflow-y-auto'>
            <table className='table'>
              <tbody>
                {data &&
                  data?.[selectedClassification['value']].map((item, index) => (
                    <tr
                      key={index}
                      className='body-m-r group hover text-color-2 hover:cursor-pointer'
                      onClick={() => toogleDrawerSender(item)}
                    >
                      <td width={20}>{index + 1}.</td>
                      <td className='text-color-1'>
                        {convertLabel(item.label)}
                      </td>
                      <td width={70}>
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

        {/* card vendor plasma */}
        <div className='bg-white border border-primary-4 rounded-xl p-4'>
          <div className='flex items-center justify-between pb-4'>
            <label>
              <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                %DITERIMA VENDOR PLASMA{' '}
                <span className='w-7 h-7 bg-[#EEECEA] text-center rounded-full'>
                  {data?.by_plasma_accepted.length}
                </span>
              </span>
            </label>
            <div className='h-10'></div>
          </div>

          <div className='max-h-[30vh] overflow-y-auto'>
            <table className='table'>
              <tbody>
                {data &&
                  data?.by_plasma_accepted.map((item, index) => (
                    <tr
                      key={index}
                      className='body-m-r group hover text-color-2 hover:cursor-pointer'
                      onClick={() => toogleDrawerDemografiVendor(item)}
                    >
                      <td width={20}>{index + 1}.</td>
                      <td className='text-color-1'>{item.label}</td>
                      <td width={70}>
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
        <div className='bg-white border border-primary-4 rounded-xl p-4'>
          <div className='flex items-center justify-between pb-4'>
            <label>
              <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                BUAH PLASMA
              </span>
            </label>
            <Dropdown
              selected={selectedClassificationPlasma}
              setSelected={setSelectedClassificationPlasma}
              options={listMenuTypePlasma}
              buttonClassname='body-s-r border-primary-3 border-2 !h-10 !w-[169px]'
              arrowPosition='right'
              full
            />
          </div>
          <div className='max-h-[30vh] overflow-y-auto'>
            <table className='table'>
              <tbody>
                {data &&
                  data?.[selectedClassificationPlasma['value']].map(
                    (item, index) => (
                      <tr
                        key={index}
                        className='body-m-r group hover text-color-2 hover:cursor-pointer'
                        onClick={() => toogleDrawerSender(item)}
                      >
                        <td width={20}>{index + 1}.</td>
                        <td className='text-color-1'>
                          {convertLabel(item.label)}
                        </td>
                        <td width={70}>
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
                          selectedRangeCharts === item
                            ? 'rounded-full bg-[#F2F7F3] text-[#006D33] font-bold'
                            : 'text-color-2 font-medium'
                        } `}
                        onClick={() => setSelectedRangeCharts(item)}
                      >
                        <button>{convertLabel(item)}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='flex items-center body-m-r text-neutrals-5 '>
                <Dropdown
                  selected={demographyIntiChartType}
                  setSelected={setDemographyIntiChartType}
                  options={listMenuType}
                  buttonClassname='body-s-r border-primary-3 border-2 !h-10 !w-[169px]'
                  arrowPosition='right'
                  full
                />
                <div className='divider divider-horizontal my-2 mx-0' />
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
                data={data?.by_demography_inti[demographyIntiChartType.value]}
                range={selectedRangeCharts}
                type={demographyIntiChartType.value}
                variant='inti'
                height={290}
                toogleDrawer={toogleDrawerDemografiChart}
              />
            )}

            {data && chartModeInti === 'table' && (
              <TableDemografi
                data={data?.by_demography_inti[demographyIntiChartType.value]}
                range={selectedRangeCharts}
                type={demographyIntiChartType.value}
                variant='inti'
                height={290}
                toogleDrawer={toogleDrawerDemografiChart}
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
                <Dropdown
                  selected={demographyPlasmaChartType}
                  setSelected={setDemographyPlasmaChartType}
                  options={listMenuType}
                  buttonClassname='body-s-r border-primary-3 border-2 !h-10 !w-[169px]'
                  arrowPosition='right'
                  full
                />
                <div className='divider divider-horizontal my-2 mx-0' />
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
                data={
                  data?.by_demography_plasma[demographyPlasmaChartType.value]
                }
                range={selectedRangeChartsPlasma}
                type={demographyPlasmaChartType.value}
                variant='plasma'
                height={290}
                toogleDrawer={toogleDrawerDemografiChart}
              />
            )}

            {data && chartModePlasma === 'table' && (
              <TableDemografi
                data={
                  data?.by_demography_plasma[demographyPlasmaChartType.value]
                }
                range={selectedRangeChartsPlasma}
                type={demographyPlasmaChartType.value}
                variant='plasma'
                height={290}
                toogleDrawer={toogleDrawerDemografiChart}
              />
            )}
          </div>
        </section>
      </main>

      <DrawerSenderVendor
        idDrawer={idDrawerSenderVendor}
        isDrawerOpen={isDrawerSenderVendorOpen}
        closeDrawer={() => setIsDrawerSenderVendorOpen(false)}
        data={selectedDataSender}
      />

      <DrawerDemografiVendor
        idDrawer={idDrawerDemografiVendor}
        isDrawerOpen={isDrawerDemografiVendorOpen}
        closeDrawer={() => setIsDrawerDemografiVendorOpen(false)}
        data={selectedDataVendor}
      />

      <DrawerDemografiChart
        idDrawer={idDrawerDemografiChart}
        isDrawerOpen={isDrawerDemografiChartOpen}
        closeDrawer={() => setIsDrawerDemografiChartOpen(false)}
        data={selectedDataChart}
        range={selectedRangeCharts}
      />

      <ModalFilter modalRef={dialogFilterRef} />
    </div>
  );
};

export default DashboardDemografiPage;
