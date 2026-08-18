import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MdOutlineFilterAlt } from 'react-icons/md';
import { IoMdArrowDropright } from 'react-icons/io';

import {
  convertLabelUnderscore,
  formatCurrency,
  formatPercentWithLeadingZeros,
  getDurationInMinutes,
  reorderDataAvgGrading,
} from '@/utils/common';

import NavbarMobile from '@/components/shared/NavbarMobile';
import { colorKriteriaGrading } from '@/utils/optionsKey';

const MonitoringGrading = ({
  data,
  toggleMobileDrawerFilter,
  setSelectedCriteriaGrading,
  setSelectedDiterimaVendor,
  toggleMobileDrawerAvgGrading,
  toggleMobileDrawerDiterimaVendor,
  goToPage,
}) => {
  const [searchParams] = useSearchParams();
  const [currentAvgCard, setCurrentAvgCard] = useState('Kriteria Grading');

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
      <NavbarMobile
        linkBack='/dashboard'
        title='Monitoring Grading'
        rightIcon={
          <MdOutlineFilterAlt
            className='text-xl'
            onClick={toggleMobileDrawerFilter}
          />
        }
      />
      <div className='p-4'>
        <section className='grid gap-2'>
          <div
            className='bg-white border border-primary-4 rounded-2xl p-4 inline-flex items-center justify-between hover:cursor-pointer hover:bg-primary-5'
            onClick={() => goToPage('Total Truk')}
          >
            <label>
              <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                TOTAL TRUK
                <IoMdArrowDropright className='inline text-lg text-primary-2' />
              </span>
            </label>
            <p>
              <span className='subheadline-s text-color-1'>
                {formatCurrency(data?.monitoring.total_grading)}
              </span>{' '}
              <span className='body-m-bold text-color-3 text-sm'>truk </span>
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
                {formatCurrency(data?.monitoring.total_tandan)}
              </span>{' '}
              <span className='body-m-bold text-color-3 text-sm'>Pcs</span>
            </p>
          </div>
          <div className='bg-white border border-color-1 rounded-xl p-4 inline-flex items-center justify-between'>
            <label>
              <span className='label-text tag-m text-color-1 flex items-center gap-2'>
                MULTIPLE
              </span>
            </label>
            <p className='text-color-1'>
              <span className='subheadline-s'>
                {formatCurrency(data?.monitoring.total_multiple)}
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
                {formatCurrency(data?.monitoring.total_passed)}
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
                {formatCurrency(data?.monitoring.total_rejected)}
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
                {formatCurrency(data?.monitoring.total_fined)}
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
        </section>
        <section className='mt-4'>
          <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
            <label>
              <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                KECEPATAN BONGKAR PER TRUK
              </span>
            </label>
            <div className='w-full bg-white border border-primary-4 rounded-xl p-4 inline-flex items-center justify-between'>
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
            <div className='w-full bg-white border border-primary-4 rounded-xl p-4 inline-flex items-center justify-between'>
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
            <div className='w-full bg-white border border-primary-4 rounded-xl p-4 inline-flex items-center justify-between'>
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
        <section className='mt-4'>
          <div className='w-full relative inline-block mb-2'>
            <input
              type='checkbox'
              id='toggle'
              className='sr-only'
              checked={currentAvgCard}
              onChange={() =>
                currentAvgCard === 'Kriteria Grading'
                  ? setCurrentAvgCard('Diterima Vendor')
                  : setCurrentAvgCard('Kriteria Grading')
              }
            />
            <label
              htmlFor='toggle'
              className='body-m-b block cursor-pointer overflow-hidden rounded-lg bg-primary-4 px-2'
            >
              <div className='flex w-full items-center justify-between py-3 transition-all duration-300 ease-in-out'>
                <span
                  className={`${
                    currentAvgCard === 'Kriteria Grading'
                      ? 'text-color-1'
                      : 'text-color-2'
                  } relative z-10 flex-1 text-center`}
                >
                  %Kriteria Grading
                </span>
                <span
                  className={`${
                    currentAvgCard === 'Kriteria Grading'
                      ? 'text-color-2'
                      : 'text-color-1'
                  } relative z-10 ml-2 flex-1 text-center`}
                >
                  %Diterima Vendor
                </span>
              </div>
              <span
                className={`z-1 absolute bottom-0 left-0 top-0 my-auto h-4/5 w-[50%] transform rounded-lg bg-white/80 px-8 transition-transform duration-300 ease-in-out ${
                  currentAvgCard === 'Kriteria Grading'
                    ? 'translate-x-2'
                    : 'w-[50%] translate-x-[95%]'
                }`}
              />
            </label>
          </div>
          {currentAvgCard === 'Kriteria Grading' ? (
            <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
              <label>
                <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                  RATA-RATA PERSENTASE KRITERIA GRADING
                </span>
              </label>

              <table className='table'>
                <tbody>
                  {Object.entries(
                    reorderDataAvgGrading(data?.average_grading) || {},
                  ).map(([key, value], index) => (
                    <tr
                      key={index}
                      className='body-m-r group hover text-color-2 hover:cursor-pointer'
                      onClick={() => {
                        setSelectedCriteriaGrading(key);
                        toggleMobileDrawerAvgGrading();
                      }}
                    >
                      <td className='!w-4 !p-0'>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            colorKriteriaGrading[key] || colorKriteriaGrading[key.replace('_diterima', '').replace('_ditolak', '')] || 'bg-gray-300'
                          }`}
                        ></div>
                      </td>
                      <td className='text-color-1 !pl-1'>
                        {convertLabelUnderscore(key)}
                      </td>
                      <td className='text-right !pr-2'>
                        <p className='inline-flex'>
                          <span className='text-color-1'>
                            {formatPercentWithLeadingZeros(value)}
                          </span>{' '}
                          <span className='body-s-r'>%</span>
                        </p>
                      </td>
                      <td className='!p-0'>
                        <span className='h-full w-2 border border-[#F2F2F2] mx-1'></span>
                        <IoMdArrowDropright className='inline text-lg text-primary-2' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='bg-white border border-primary-4 rounded-xl p-4 space-y-4'>
              <label>
                <span className='label-text tag-l text-color-3 flex items-center gap-2'>
                  RATA-RATA PERSENTASE DITERIMA VENDOR
                </span>
              </label>

              <table className='table table-fixed'>
                <tbody>
                  {Object.entries(data?.average_vendor_accepted || {}).map(
                    ([key, value], index) => (
                      <tr
                        key={index}
                        className='body-m-r group hover text-color-2 hover:cursor-pointer'
                        onClick={() => {
                          setSelectedDiterimaVendor(key);
                          toggleMobileDrawerDiterimaVendor();
                        }}
                      >
                        <td className='!w-4 !p-0'>{index + 1}.</td>
                        <td className='text-color-1 w-3/5'>
                          <p className='truncate'>{key}</p>
                        </td>
                        <td className='text-right !pr-2'>
                          <p className='inline-flex items-center'>
                            <span
                              className={`font-semibold ${
                                value >= 80
                                  ? 'text-[#006D33]'
                                  : 'text-secondary-2'
                              }`}
                            >
                              {formatPercentWithLeadingZeros(value)}
                            </span>
                            <span className='body-s-r ml-1'>%</span>
                          </p>
                        </td>
                        <td className='!p-0 !w-8'>
                          <span className='h-full w-2 border border-[#F2F2F2] mx-1'></span>
                          <IoMdArrowDropright className='inline text-lg text-primary-2' />
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MonitoringGrading;
