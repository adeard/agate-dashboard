import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useForm } from '@tanstack/react-form';

import { IoMdArrowDropright } from 'react-icons/io';
import { MdOutlineFilterAlt, MdFileDownload } from 'react-icons/md';

import {
  useGet,
  useGetWithoutObjectSearch,
  useGetWithPost,
} from '@/services/use-services';
import useDrawer from '@/hooks/useDrawer';

import {
  chunkArray,
  convertLabel,
  convertLabelUnderscore,
  formatPercentWithLeadingZeros,
  formattedDataDashboard,
  getDurationInMinutes,
  mappingOptions,
  reorderDataAvgGrading,
} from '@/utils/common';

import Button from '@/components/shared/Button';
import Dropdown from '@/components/shared/Dropdown';
import CustomSelect from '@/components/shared/CustomSelect';
import ButtonMore from '@/components/shared/ButtonMore';
import LineCharts from './components/desktop/LIneCharts';
import DrawerFilterDashboard from './components/desktop/DrawerFilterDashboard';
import DrawerTotalTruk from './components/desktop/DrawerTotalTruk';
import DrawerTrenKriteria from './components/desktop/DrawerTrenKriteria';
import DrawerAnalisaVendor from './components/desktop/DrawerAnalisaVendor';
import DrawerPerformaHarianVendor from './components/desktop/DrawerPerformaHarianVendor';
import DrawerRiwayatPemeriksaanTruk from './components/desktop/DrawerRiwayatPemeriksaanTruk';
import TableRankingVendor from './components/desktop/TableRankingVendor';
import TableAnalisaVendor from './components/desktop/TableAnalisaVendor';
import RocComponent from './components/desktop/RocComponent';

import dayjs from 'dayjs';
import { useAuthStore } from '@/store/auth.context';

import {
  chartTypeListOptions,
  colorKriteriaGrading,
  listOptionsMachine,
} from '@/utils/optionsKey';
import { BASE_URL } from '@/utils/axios';

const DesktopViewDashboardPage = () => {
  const { state } = useAuthStore();
  const { userData } = state;

  const [searchParams] = useSearchParams();

  const { data: optionsFactory } = useGet('/v1/options/factory');
  const { data: optionsVendor, refetch: refetchOptionsVendor } =
    useGetWithoutObjectSearch('/v2/vendor', {}, false, false);

  const { data, loading, refetch, setQueryParams, objectSearch } =
    useGetWithPost('/v4/dashboard', {}, false);

  useEffect(() => {
    if (optionsFactory) {
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
      if (searchParams.get('factory')) {
        refetchOptionsVendor({ factory: searchParams.get('factory') });
      }
    }
  }, [searchParams]);

  // form filter
  const form = useForm({
    defaultValues: {
      date_from: searchParams.get('date_from') || '',
      date_to: searchParams.get('date_to') || '',
      factory: searchParams.get('factory') || '',
      vendor_type: searchParams.get('vendor_type') || 'all',
      ids: searchParams.getAll('ids') || '',
    },
    onSubmit: async ({ value }) => {
      setQueryParams({
        date_from: value.date_from,
        date_to: value.date_to,
        factory: value.factory,
        vendor_type: value.vendor_type || 'all',
        ids: value.ids,
      });
    },
  });

  // range chart state
  const listRangeCharts = ['monthly', 'weekly', 'daily'];

  const [selectedRangeChartsPlasma, setSelectedRangeChartsPlasma] =
    useState('daily');

  // drawer
  const {
    idDrawer: idDrawerFilterDashboard,
    isDrawerOpen: isDrawerFilterDashboardOpen,
    toggleDrawer: toggleDrawerFilterDashboard,
    closeDrawer: closeDrawerFilterDashboard,
  } = useDrawer('DrawerFilterDashboard');

  const {
    idDrawer: idDrawerRiwayatPemeriksaan,
    isDrawerOpen: isDrawerRiwayatPemeriksaanOpen,
    toggleDrawer: toggleDrawerRiwayatPemeriksaan,
    closeDrawer: closeDrawerRiwayatPemeriksaan,
  } = useDrawer('DrawerRiwayatPemeriksaan');

  const {
    idDrawer: idDrawerTrenKriteria,
    isDrawerOpen: isDrawerTrenKriteriaOpen,
    toggleDrawer: toggleDrawerTrenKriteria,
    closeDrawer: closeDrawerTrenKriteria,
  } = useDrawer('DrawerTrenKriteria');

  const {
    idDrawer: idDrawerAnalisaVendor,
    isDrawerOpen: isDrawerAnalisaVendorOpen,
    toggleDrawer: toggleDrawerAnalisaVendor,
    closeDrawer: closeDrawerAnalisaVendor,
  } = useDrawer('DrawerAnalisaVendor');

  const {
    idDrawer: idDrawerPerformaHarianVendor,
    isDrawerOpen: isDrawerPerformaHarianVendorOpen,
    toggleDrawer: toggleDrawerPerformaHarianVendor,
    closeDrawer: closeDrawerPerformaHarianVendor,
  } = useDrawer('DrawerPerformaHarianVendor');

  const {
    idDrawer: idDrawerRiwayatPemeriksaanTruk,
    isDrawerOpen: isDrawerRiwayatPemeriksaanTrukOpen,
    toggleDrawer: toggleDrawerRiwayatPemeriksaanTruk,
    closeDrawer: closeDrawerRiwayatPemeriksaanTruk,
  } = useDrawer('DrawerRiwayatPemeriksaanTruk');

  const [chartType, setChartType] = useState(chartTypeListOptions[0]);
  const [machineType, setMachineType] = useState(listOptionsMachine[0]);
  const [selectedCriteria, setSelectedCriteria] = useState('matang');
  const [selectedVendor, setSelectedVendor] = useState('');

  const statsPerMinute = useMemo(() => {
    if (!data?.inspections?.length) {
      return {
        avgGlobal: 0,
        maxAvg: 0,
        minAvg: 0,
      };
    }

    const result = data.inspections.reduce(
      (acc, item) => {
        const duration = getDurationInMinutes(item.date, item.finish_date);

        if (duration <= 0) return acc;

        const avgPerMinute = item.total_tandan / duration;

        acc.totalTandan += item.total_tandan;
        acc.totalDuration += duration;

        acc.maxAvg = Math.max(acc.maxAvg, avgPerMinute);
        acc.minAvg = Math.min(acc.minAvg, avgPerMinute);

        return acc;
      },
      {
        totalTandan: 0,
        totalDuration: 0,
        maxAvg: 0,
        minAvg: Infinity,
      },
    );

    return {
      avgGlobal: result.totalDuration
        ? result.totalTandan / result.totalDuration
        : 0,
      maxAvg: result.maxAvg,
      minAvg: result.minAvg === Infinity ? 0 : result.minAvg,
    };
  }, [data]);

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
            <h1 className='headline-s'>Dashboard Monitoring</h1>
            <div className='flex gap-2'>
              <Button
                variant='primary-outline'
                size='lg'
                className='flex items-center'
                onClick={toggleDrawerFilterDashboard}
              >
                <MdOutlineFilterAlt className='text-2xl mr-2' />
                Filter
              </Button>
              <Button
                size='lg'
                className='flex items-center'
                onClick={() => {
                  window.open(
                    BASE_URL +
                      '/v4/dashboard/download-report' +
                      `?targetDate=${searchParams.get(
                        'date_from',
                      )}&targetEnd=${searchParams.get('date_to')}&company=${
                        userData?.company
                      }&factory=${searchParams.get('factory')}`,
                    '_blank',
                  );
                }}
              >
                <MdFileDownload className='text-xl mr-2' />
                Download Report
              </Button>
            </div>
          </div>
        </header>

        <main className='space-y-4'>
          {loading || !data ? (
            <div className='min-h-[80vh] bg-white rounded-2xl flex items-center justify-center'>
              <span className='loading loading-spinner loading-lg'></span>
            </div>
          ) : (
            <>
              <section className='grid grid-cols-2 gap-4'>
                <div className='grid grid-rows-2 gap-4'>
                  <div
                    className='bg-white border border-primary-4 rounded-2xl p-4 inline-flex items-center justify-between hover:cursor-pointer hover:bg-primary-5'
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
                      <span className='body-m-bold text-color-3 text-sm'>
                        truk{' '}
                        <IoMdArrowDropright className='inline text-lg text-primary-2' />
                      </span>
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
                      <span className='body-m-bold text-color-3 text-sm'>
                        Pcs
                      </span>
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className=' bg-white border border-color-1 rounded-xl p-4 inline-flex items-center justify-between'>
                    <label>
                      <span className='label-text tag-m text-color-1 flex items-center gap-2'>
                        MULTIPLE
                      </span>
                    </label>
                    <p className='text-color-1'>
                      <span className='subheadline-s'>
                        {data?.monitoring.total_multiple.toLocaleString()}
                      </span>{' '}
                      <span className='body-m-bold text-sm'>Pcs</span>
                      <span className='h-full w-2 border border-[#F2F2F2] mx-1'></span>
                      <span className='body-m-r mr-1'>
                        {formatPercentWithLeadingZeros(
                          Number(data?.monitoring.percent_multiple),
                        )}
                      </span>
                      <span className='body-s-r text-sm'>%</span>
                    </p>
                  </div>
                  <div className='bg-white border border-[#006D33] rounded-xl p-4 inline-flex items-center justify-between'>
                    <label>
                      <span className='label-text tag-m text-[#006D33] flex items-center gap-2'>
                        DITERIMA
                      </span>
                    </label>
                    <p className='text-[#006D33]'>
                      <span className='subheadline-s'>
                        {data?.monitoring.total_passed.toLocaleString()}
                      </span>{' '}
                      <span className='body-m-bold text-sm'>Pcs</span>
                      <span className='h-full w-2 border border-[#F2F2F2] mx-1'></span>
                      <span className='body-m-r mr-1'>
                        {formatPercentWithLeadingZeros(
                          Number(data?.monitoring.percent_passed),
                        )}
                      </span>
                      <span className='body-s-r text-sm'>%</span>
                    </p>
                  </div>
                  <div className='bg-white border border-secondary-2 rounded-xl p-4 inline-flex items-center justify-between'>
                    <label>
                      <span className='label-text tag-m text-secondary-2 flex items-center gap-2'>
                        DITOLAK
                      </span>
                    </label>
                    <p className='text-secondary-2'>
                      <span className='subheadline-s'>
                        {data?.monitoring.total_rejected.toLocaleString()}
                      </span>{' '}
                      <span className='body-m-bold text-sm'>Pcs</span>
                      <span className='h-full w-2 border border-[#F2F2F2] mx-1'></span>
                      <span className='body-m-r mr-1'>
                        {formatPercentWithLeadingZeros(
                          Number(data?.monitoring.percent_rejected),
                        )}
                      </span>
                      <span className='body-s-r text-sm'>%</span>
                    </p>
                  </div>
                  <div className='bg-white border border-[#E07324] rounded-xl p-4 inline-flex items-center justify-between'>
                    <label>
                      <span className='label-text tag-m text-[#E07324] flex items-center gap-2'>
                        DIDENDA
                      </span>
                    </label>
                    <p className='text-[#E07324]'>
                      <span className='subheadline-s'>
                        {data?.monitoring.total_fined.toLocaleString()}
                      </span>{' '}
                      <span className='body-m-bold text-sm'>Pcs</span>
                      <span className='h-full w-2 border border-[#F2F2F2] mx-1'></span>
                      <span className='body-m-r mr-1'>
                        {formatPercentWithLeadingZeros(
                          Number(data?.monitoring.percent_fined),
                        )}
                      </span>
                      <span className='body-s-r text-sm'>%</span>
                    </p>
                  </div>
                </div>
              </section>
              <section className='bg-white border border-primary-4 rounded-xl p-4'>
                <label>
                  <span className='label-text tag-l text-color-3'>
                    KECEPATAN BONGKAR PER TRUK
                  </span>
                </label>
                <div className='grid grid-cols-3 gap-4 mt-4'>
                  <div className='bg-white border border-primary-4 rounded-xl p-4 inline-flex items-center justify-between'>
                    <label>
                      <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                        TERTINGGI
                      </span>
                    </label>
                    <p>
                      <span className='subheadline-s text-color-1'>
                        {Math.round(statsPerMinute.maxAvg)}
                      </span>{' '}
                      <span className='body-m-bold text-color-3 text-sm'>
                        TBS/menit
                      </span>
                    </p>
                  </div>
                  <div className='bg-white border border-primary-4 rounded-xl p-4 inline-flex items-center justify-between'>
                    <label>
                      <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                        RATA-RATA
                      </span>
                    </label>
                    <p>
                      <span className='subheadline-s text-color-1'>
                        {Math.round(statsPerMinute.avgGlobal)}
                      </span>{' '}
                      <span className='body-m-bold text-color-3 text-sm'>
                        TBS/menit
                      </span>
                    </p>
                  </div>
                  <div className='bg-white border border-primary-4 rounded-xl p-4 inline-flex items-center justify-between'>
                    <label>
                      <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                        TERENDAH
                      </span>
                    </label>
                    <p>
                      <span className='subheadline-s text-color-1'>
                        {Math.round(statsPerMinute.minAvg)}
                      </span>{' '}
                      <span className='body-m-bold text-color-3 text-sm'>
                        TBS/menit
                      </span>
                    </p>
                  </div>
                </div>
              </section>
              <section className='grid grid-cols-3 gap-4 h-[550px]'>
                <div className='col-span-2 h-full bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
                  <label>
                    <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                      RATA-RATA PERSENTASE KRITERIA GRADING
                    </span>
                  </label>

                  <div className='grid grid-cols-2 gap-2'>
                    {chunkArray(
                      formattedDataDashboard(
                        reorderDataAvgGrading(data?.average_grading) || {},
                      ),
                      7,
                    ).map((chunk, colIndex) => (
                      <div key={colIndex}>
                        <table className='table'>
                          <tbody>
                            {chunk.map((item, index) => (
                              <tr
                                key={index}
                                className='body-m-r group hover text-color-2 hover:cursor-pointer'
                              >
                                <td className='!w-4'>
                                  <div
                                    className={`w-3 h-3 rounded-full ${
                                      colorKriteriaGrading[item.label] ||
                                      'bg-gray-300'
                                    }`}
                                  ></div>
                                </td>
                                <td className='text-color-1 !pl-1'>
                                  {convertLabelUnderscore(item.label)}
                                </td>
                                <td className='text-right'>
                                  <p className='inline-flex'>
                                    <span className='text-color-1'>
                                      {formatPercentWithLeadingZeros(
                                        item.percent,
                                      )}
                                    </span>{' '}
                                    <span className='body-s-r'>%</span>
                                  </p>
                                </td>
                                <td className='flex items-center justify-end'>
                                  <ButtonMore
                                    listMenu={[
                                      {
                                        label: 'Tren Kriteria',
                                        onClick: () => {
                                          setSelectedCriteria(item.label);
                                          toggleDrawerTrenKriteria();
                                        },
                                      },
                                      {
                                        label: 'Analisa Vendor',
                                        onClick: () => {
                                          setSelectedCriteria(item.label);
                                          toggleDrawerAnalisaVendor();
                                        },
                                      },
                                    ]}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='col-span-1 h-full bg-white border border-primary-4 rounded-xl p-4 space-y-4 overflow-auto'>
                  <label>
                    <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                      RATA-RATA PERSENTASE DITERIMA VENDOR
                    </span>
                  </label>

                  <table className='table table-fixed w-full'>
                    <tbody>
                      {formattedDataDashboard(
                        data?.average_vendor_accepted || {},
                      ).map((item, index) => (
                        <tr
                          key={item.label}
                          className='body-m-r group hover text-color-2 hover:cursor-pointer'
                        >
                          <td className='!w-4'>{index + 1}.</td>

                          <td className='text-color-1 w-[200px]'>
                            <p className='truncate' title={item.label}>
                              {item.label}
                            </p>
                          </td>

                          <td className='flex gap-4 items-center justify-end'>
                            <p className='inline-flex items-center'>
                              <span
                                className={`font-semibold ${
                                  item.percent >= 80
                                    ? 'text-[#006D33]'
                                    : 'text-secondary-2'
                                }`}
                              >
                                {formatPercentWithLeadingZeros(item.percent)}
                              </span>
                              <span className='body-s-r ml-1'>%</span>
                            </p>
                            <ButtonMore
                              listMenu={[
                                {
                                  label: 'Performa Harian Vendor',
                                  onClick: () => {
                                    setSelectedVendor(item.label);
                                    toggleDrawerPerformaHarianVendor();
                                  },
                                },
                                {
                                  label: 'Riwayat Pemeriksaan Truk',
                                  onClick: () => {
                                    setSelectedVendor(item.label);
                                    toggleDrawerRiwayatPemeriksaanTruk();
                                  },
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              <section className='grid grid-cols-4 gap-4'>
                <section className='col-span-4 grid grid-cols-2 gap-4'>
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
                        {chartType.label !== '10 Truk Terbaik' &&
                          chartType.label !== '10 Truk Terburuk' &&
                          chartType.label !== 'Analisa Kinerja Vendor' && (
                            <ul className='exchange-menu body-m-b menu menu-horizontal px-0 font-medium'>
                              {listRangeCharts.map((item, index) => (
                                <li
                                  key={index}
                                  className={`${
                                    selectedRangeChartsPlasma === item
                                      ? 'rounded-full bg-[#F2F7F3] text-[#006D33] font-bold'
                                      : 'text-color-2 font-medium'
                                  } `}
                                  onClick={() =>
                                    setSelectedRangeChartsPlasma(item)
                                  }
                                >
                                  <button>{convertLabel(item)}</button>
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                      {chartType?.label === 'Summary Performance' &&
                        data?.rocs && (
                          <div className='flex items-center gap-4'>
                            <RocComponent
                              type='diterima'
                              roc={data?.rocs?.[selectedRangeChartsPlasma]}
                            />

                            <RocComponent
                              type='ditolak'
                              roc={data?.rocs?.[selectedRangeChartsPlasma]}
                            />
                            <RocComponent
                              type='didenda'
                              roc={data?.rocs?.[selectedRangeChartsPlasma]}
                            />
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
                              />
                            ) : null}
                          </div>
                        )}
                    </div>

                    {data &&
                      (chartType?.label === 'Analisa Kinerja Vendor' ? (
                        <TableAnalisaVendor
                          data={data?.charts_data?.vendor}
                          setSelectedVendor={setSelectedVendor}
                          togglePerformaHarian={
                            toggleDrawerPerformaHarianVendor
                          }
                          toggleRiwayatPemeriksaan={
                            toggleDrawerRiwayatPemeriksaanTruk
                          }
                        />
                      ) : chartType?.label === '10 Truk Terbaik' ? (
                        <TableRankingVendor
                          data={data?.charts_data?.highest_vendor}
                        />
                      ) : chartType?.label === '10 Truk Terburuk' ? (
                        <TableRankingVendor
                          data={data?.charts_data?.lowest_vendor}
                        />
                      ) : (
                        <LineCharts
                          data={data?.charts_data?.[chartType.value]}
                          range={selectedRangeChartsPlasma}
                          // type={selectedTypeChart.value}
                          type={null}
                          height={270}
                          dividerPercent={
                            chartType.value === 'demography'
                              ? data?.charts_data?.[chartType.value]['main']
                              : null
                          }
                          chartType={chartType.value}
                          machineType={machineType.value}
                        />
                      ))}
                  </div>
                </section>
              </section>
            </>
          )}
        </main>
      </div>

      <DrawerFilterDashboard
        idDrawer={idDrawerFilterDashboard}
        isDrawerOpen={isDrawerFilterDashboardOpen}
        closeDrawer={closeDrawerFilterDashboard}
        form={form}
        optionsFactory={optionsFactory}
        optionsVendor={mappingOptions(optionsVendor)}
      />
      <DrawerTotalTruk
        idDrawer={idDrawerRiwayatPemeriksaan}
        isDrawerOpen={isDrawerRiwayatPemeriksaanOpen}
        closeDrawer={closeDrawerRiwayatPemeriksaan}
        data={data?.inspections}
      />
      <DrawerTrenKriteria
        idDrawer={idDrawerTrenKriteria}
        isDrawerOpen={isDrawerTrenKriteriaOpen}
        closeDrawer={closeDrawerTrenKriteria}
        data={data?.['average_grading_trend']?.[selectedCriteria]}
        criteria={selectedCriteria}
      />
      <DrawerAnalisaVendor
        idDrawer={idDrawerAnalisaVendor}
        isDrawerOpen={isDrawerAnalisaVendorOpen}
        closeDrawer={closeDrawerAnalisaVendor}
        data={data?.['average_grading_vendor']?.[selectedCriteria]}
        criteria={selectedCriteria}
      />
      <DrawerPerformaHarianVendor
        idDrawer={idDrawerPerformaHarianVendor}
        isDrawerOpen={isDrawerPerformaHarianVendorOpen}
        closeDrawer={closeDrawerPerformaHarianVendor}
        vendor={selectedVendor}
        data={data?.['average_vendor_accepted_daily']?.[selectedVendor]}
      />
      <DrawerRiwayatPemeriksaanTruk
        idDrawer={idDrawerRiwayatPemeriksaanTruk}
        isDrawerOpen={isDrawerRiwayatPemeriksaanTrukOpen}
        closeDrawer={closeDrawerRiwayatPemeriksaanTruk}
        vendor={selectedVendor}
        data={
          data?.['average_vendor_accepted_trucks_history']?.[selectedVendor]
        }
      />
    </div>
  );
};

export default DesktopViewDashboardPage;
