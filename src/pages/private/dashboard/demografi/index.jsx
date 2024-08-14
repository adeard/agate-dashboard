import { useEffect, useRef, useState } from 'react';

import { useForm } from '@tanstack/react-form';

import { MdOutlineViewModule } from 'react-icons/md';

import { useGet, useGetWithPost } from '@/services/use-services';

import { convertLabel } from '@/utils/common';

import ModalFilter from '../components/ModalFilter';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Dropdown from '@/components/shared/Dropdown';
import DrawerDemografi from '../components/DrawerDemografi';
import DrawerSenderVendor from '../components/DrawerSenderVendor';
import Charts from '../components/Charts';

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

  const { data, loading } = useGetWithPost('/v2/dashboard');

  const [selectedFactory, setSelectedFactory] = useState('');

  const form = useForm({
    defaultValues: {
      date: '',
      access_factory: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
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

  // drawer
  const idDrawerSenderVendor = 'DrawerSenderVendor';
  const [isDrawerSenderVendorOpen, setIsDrawerSenderVendorOpen] =
    useState(false);
  const idDrawerDemografi = 'DrawerDemografi';
  const [isDrawerDemografiOpen, setIsDrawerDemografiOpen] = useState(false);

  const [selectedData, setSelectedData] = useState('');
  const toogleDrawerSender = (data) => {
    setSelectedData(data);
    const drawerElement = document.getElementById(idDrawerSenderVendor);
    drawerElement.checked = true;
    setIsDrawerSenderVendorOpen(!isDrawerSenderVendorOpen);
  };

  const toogleDrawerDemografi = (data) => {
    setSelectedData(data);
    const drawerElement = document.getElementById(idDrawerDemografi);
    drawerElement.checked = true;
    setIsDrawerDemografiOpen(!isDrawerDemografiOpen);
  };

  return (
    <div>
      <header>
        <div className='flex items-center justify-between  px-12 pt-6 py-0'>
          <h1 className='headline-s'>Dashboard Demografi Kualitas Buah</h1>
          <div className='flex gap-2'>
            <label className='tag-l my-auto text-color-2'>FILTER</label>
            <form.Field
              name='date'
              children={(field) => (
                <Input
                  type='date'
                  size='lg'
                  full
                  name={field.name}
                  value={field.state.value}
                  className='pr-12 bg-white '
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    form.handleSubmit();
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
          <label>
            <span className='label-text tag-l text-color-3 flex items-center gap-2'>
              %DITERIMA VENDOR INTI{' '}
              <span className='w-7 h-7 bg-[#EEECEA] text-center rounded-full'>
                {data?.by_inti_accepted.length}
              </span>
            </span>
          </label>
          <table className='table mt-4'>
            <tbody>
              {data &&
                data?.by_inti_accepted.map((item, index) => (
                  <tr
                    key={index}
                    className='body-m-r group hover text-color-2'
                    onClick={() => toogleDrawerDemografi(item)}
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

        {/* card buah inti */}
        <div className='bg-white border border-primary-4 rounded-xl p-4'>
          <div className='flex items-center justify-between'>
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
          <table className='table mt-4'>
            <tbody>
              {data &&
                data?.[selectedClassification['value']].map((item, index) => (
                  <tr
                    key={index}
                    className='body-m-r group hover text-color-2'
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

        {/* card vendor plasma */}
        <div className='bg-white border border-primary-4 rounded-xl p-4'>
          <label>
            <span className='label-text tag-l text-color-3 flex items-center gap-2'>
              %DITERIMA VENDOR PLASMA{' '}
              <span className='w-7 h-7 bg-[#EEECEA] text-center rounded-full'>
                {data?.by_plasma_accepted.length}
              </span>
            </span>
          </label>
          <table className='table mt-4'>
            <tbody>
              {data &&
                data?.by_plasma_accepted.map((item, index) => (
                  <tr
                    key={index}
                    className='body-m-r group hover text-color-2'
                    onClick={() => toogleDrawerDemografi(item)}
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

        {/* card buah plasma */}
        <div className='bg-white border border-primary-4 rounded-xl p-4'>
          <div className='flex items-center justify-between'>
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
          <table className='table mt-4'>
            <tbody>
              {data &&
                data?.[selectedClassificationPlasma['value']].map(
                  (item, index) => (
                    <tr
                      key={index}
                      className='body-m-r group hover text-color-2'
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

        {/* charts inti */}
        <div className='col-span-4 bg-white border border-primary-4 rounded-xl p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-16'>
              <label>
                <span className='label-text tag-l text-color-1 flex items-center gap-2'>
                  CHART DEMOGRAFI BUAH INTI
                </span>
              </label>
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
              <MdOutlineViewModule className='text-lg' />
              Table
            </div>
          </div>

          {data && (
            <Charts
              data={data?.by_demography_inti[demographyIntiChartType.value]}
              range={selectedRangeCharts}
              type={demographyIntiChartType.value}
              variant='inti'
            />
          )}
        </div>

        {/* charts plasma */}
        <div className='col-span-4 bg-white border border-primary-4 rounded-xl p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-16'>
              <label>
                <span className='label-text tag-l text-color-1 flex items-center gap-2'>
                  CHART DEMOGRAFI BUAH PLASMA
                </span>
              </label>
              <ul className='exchange-menu body-m-b menu menu-horizontal px-0 font-medium'>
                {listRangeCharts.map((item, index) => (
                  <li
                    key={index}
                    className={`${
                      selectedRangeCharts === item
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
              <MdOutlineViewModule className='text-lg' />
              Table
            </div>
          </div>

          {data && (
            <Charts
              data={data?.by_demography_plasma[demographyPlasmaChartType.value]}
              range={selectedRangeChartsPlasma}
              type={demographyPlasmaChartType.value}
              variant='plasma'
            />
          )}
        </div>
      </main>

      <DrawerDemografi
        idDrawer={idDrawerDemografi}
        isDrawerOpen={isDrawerDemografiOpen}
        closeDrawer={() => setIsDrawerDemografiOpen(false)}
        data={selectedData}
      />

      <DrawerSenderVendor
        idDrawer={idDrawerSenderVendor}
        isDrawerOpen={isDrawerSenderVendorOpen}
        closeDrawer={() => setIsDrawerSenderVendorOpen(false)}
        data={selectedData}
      />

      <ModalFilter modalRef={dialogFilterRef} />
    </div>
  );
};

export default DashboardDemografiPage;
