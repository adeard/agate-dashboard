import { useEffect, useRef, useState } from 'react';

import { useForm } from '@tanstack/react-form';

import {
  MdOutlineLocalShipping,
  MdOutlineTableChart,
  MdNotInterested,
  MdPlaylistAddCheck,
  MdOutlineFeedback,
  MdInfoOutline,
} from 'react-icons/md';
import { MdOutlineViewModule } from 'react-icons/md';

import { useGet, useGetWithPost } from '@/services/use-services';

import ModalFilter from '../components/ModalFilter';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import CustomSelect from '@/components/shared/CustomSelect';
import DrawerSenderVendor from '../components/DrawerSenderVendor';
import Dropdown from '@/components/shared/Dropdown';
import Charts from '../components/Charts';
import { fixingCapitalizeWord } from '@/utils/common';
import ChartsTemp from '../components/ChartsTemp';

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

  const [selectedClassification, setSelectedClassification] = useState(
    listMenuTypeInti[0]
  );
  const [selectedClassificationPlasma, setSelectedClassificationPlasma] =
    useState(listMenuTypePlasma[0]);

  const [selectedRangeCharts, setSelectedRangeCharts] = useState('monthly');
  const listRangeCharts = ['monthly', 'weekly', 'daily'];

  const [demographyIntiChartType, setDemographyIntiChartType] = useState({
    label: 'Klasifikasi Utama',
    value: 'main',
  });

  return (
    <div>
      <header>
        <div className='flex items-center justify-between  px-12 py-6'>
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
            <form.Field
              name='access_factory'
              children={(field) => (
                <CustomSelect
                  placeholder='Pabrik'
                  className='body-m-r !h-full'
                  name={field.name}
                  options={optionsFactory || []}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : [];
                    field.handleChange(selectedValues);
                  }}
                  size='lg'
                  full
                  multiple
                />
              )}
            />
            <Button size='lg' onClick={form.handleSubmit}>
              Apply
            </Button>
          </div>
        </div>
      </header>
      <main className='grid grid-cols-4 gap-4'>
        <div className='bg-white border border-primary-4 rounded-xl p-4'>
          <label>
            <span className='label-text tag-l text-color-3 flex items-center gap-2'>
              %DITERIMA VENDOR INTI{' '}
              <span className='w-7 h-7 bg-[#EEECEA] text-center rounded-full'>
                {data?.by_inti_accepted.length}
              </span>
            </span>
          </label>
          <table className='table'>
            <tbody>
              {data &&
                data?.by_inti_accepted.map((item, index) => (
                  <tr key={index} className='body-m-r group hover text-color-2'>
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
          <table className='table'>
            <tbody>
              {data &&
                data?.[selectedClassification['value']].map((item, index) => (
                  <tr key={index} className='body-m-r group hover text-color-2'>
                    <td width={20}>{index + 1}.</td>
                    <td className='text-color-1'>
                      {fixingCapitalizeWord(item.label)}
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
        <div className='bg-white border border-primary-4 rounded-xl p-4'>
          <label>
            <span className='label-text tag-l text-color-3 flex items-center gap-2'>
              %DITERIMA VENDOR PLASMA{' '}
              <span className='w-7 h-7 bg-[#EEECEA] text-center rounded-full'>
                {data?.by_plasma_accepted.length}
              </span>
            </span>
          </label>
          <table className='table'>
            <tbody>
              {data &&
                data?.by_plasma_accepted.map((item, index) => (
                  <tr key={index} className='body-m-r group hover text-color-2'>
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
          <table className='table'>
            <tbody>
              {data &&
                data?.[selectedClassificationPlasma["value"]].map((item, index) => (
                  <tr key={index} className='body-m-r group hover text-color-2'>
                    <td width={20}>{index + 1}.</td>
                    <td className='text-color-1'>
                      {fixingCapitalizeWord(item.label)}
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

        {/* charts */}
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
                    <button>{fixingCapitalizeWord(item)}</button>
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
            />
          )}

          {/* <ChartsTemp /> */}
        </div>
      </main>
      <ModalFilter modalRef={dialogFilterRef} />
    </div>
  );
};

export default DashboardDemografiPage;
