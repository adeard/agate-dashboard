import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from '@tanstack/react-form';

import {
  MdOutlineFilterAlt,
  MdOutlineLocalShipping,
  MdOutlineTableChart,
  MdPlaylistAddCheck,
  MdDoNotDisturb,
  MdOutlineFeedback,
} from 'react-icons/md';

import { useGet, useGetWithPost } from '@/services/use-services';
import useDrawer from '@/hooks/useDrawer';

import { convertLabel } from '@/utils/common';

import NavbarMobile from '@/components/shared/NavbarMobile';
import MobileDrawerFilter from '../components/MobileDrawerFilter';
import MobileDrawerSenderBuah from '../components/MobileDrawerSenderBuah';
import MobileDrawerRiwayatPemeriksaan from '../components/MobileDrawerRiwayatPemeriksaan';

const MonitoringGrading = () => {
  const navigate = useNavigate();

  const { data: optionsFactory } = useGet('/v1/options/factory');

  const { data, loading, refetch, setQueryParams } =
    useGetWithPost('/v2/dashboard');

  // untuk filter
  const [selectedFactory, setSelectedFactory] = useState({});
  const [isBuahInti, setIsBuahInti] = useState(true);

  useEffect(() => {
    if (optionsFactory) {
      setSelectedFactory(optionsFactory[0]);
    }
  }, [optionsFactory]);

  // form filter
  const form = useForm({
    defaultValues: {
      date_from: '',
      date_to: '',
      factory: selectedFactory.value,
    },
    onSubmit: async ({ value }) => {
      refetch(
        {
          date_from: value.date_from,
          date_to: value.date_to,
          factory: selectedFactory.value,
        },
        {
          date_from: value.date_from,
          date_to: value.date_to,
          factory: selectedFactory.value,
        }
      );
      setQueryParams({
        date_from: value.date_from,
        date_to: value.date_to,
        factory: selectedFactory.value,
      });
    },
  });

  const {
    idDrawer: idMobileDrawerRiwayatPemeriksaan,
    isDrawerOpen: isMobileDrawerRiwayatPemeriksaanOpen,
    toggleDrawer: toggleMobileDrawerRiwayatPemeriksaan,
    closeDrawer: closeMobileDrawerRiwayatPemeriksaan,
  } = useDrawer('MobileDrawerRiwayatPemeriksaan');

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
        title='Monitoring Grading'
        rightIcon={
          <MdOutlineFilterAlt
            className='text-xl'
            onClick={toggleMobileDrawerFilter}
          />
        }
      />
      {isMobile ? (
        <main className='bg-white p-4'>
          <section className='grid grid-cols-2 gap-2'>
            <div
              className='col-span-2 bg-white border border-primary-4 space-y-2 rounded-xl p-4 hover:cursor-pointer hover:bg-primary-5'
              onClick={toggleMobileDrawerRiwayatPemeriksaan}
            >
              <label className='flex items-center gap-2'>
                <MdOutlineLocalShipping className='bg-[#E8F8E4] text-primary-G600 w-5 h-5 p-1 rounded-sm' />
                <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                  TOTAL TRUK
                </span>
              </label>
              <p>
                <span className='subheadline-m text-color-1'>
                  {data?.monitoring.total_grading.toLocaleString()}
                </span>{' '}
                <span className='body-l-r text-color-3 text-sm'>truk</span>
              </p>
            </div>
            <div className='bg-white border border-primary-4 space-y-2 rounded-xl p-4 hover:cursor-pointer hover:bg-primary-5'>
              <label className='flex items-center gap-2'>
                <MdOutlineTableChart className='bg-[#E8F8E4] text-primary-G600 w-5 h-5 p-1 rounded-sm' />
                <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                  TOTAL JANJANG
                </span>
              </label>
              <p>
                <span className='subheadline-m text-color-1'>
                  {data?.monitoring.total_tandan.toLocaleString()}
                </span>{' '}
                <span className='body-s-r text-color-3 text-sm'>pcs</span>
              </p>
              <p className='!-mt-0'>
                <span className='body-m-b text-color-2 mr-1'>100</span>
                <span className='body-s-r text-color-3 text-sm'>%</span>
              </p>
            </div>
            <div className='bg-white border border-primary-4 space-y-2 rounded-xl p-4 hover:cursor-pointer hover:bg-primary-5'>
              <label className='flex items-center gap-2'>
                <MdPlaylistAddCheck className='bg-[#E8F8E4] text-primary-G600 w-5 h-5 p-1 rounded-sm' />
                <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                  TOTAL DITERIMA
                </span>
              </label>
              <p>
                <span className='subheadline-m text-color-1'>
                  {data?.monitoring.total_passed.toLocaleString()}
                </span>{' '}
                <span className='body-s-r text-color-3 text-sm'>pcs</span>
              </p>
              <p className='!-mt-0'>
                <span className='body-m-b text-color-2 mr-1'>
                  {Number(data?.monitoring.percent_passed).toFixed(2)}
                </span>
                <span className='body-s-r text-color-3 text-sm'>%</span>
              </p>
            </div>
            <div className='bg-white border border-primary-4 space-y-2 rounded-xl p-4 hover:cursor-pointer hover:bg-primary-5'>
              <label className='flex items-center gap-2'>
                <MdDoNotDisturb className='bg-secondary-5 text-secondary-1 w-5 h-5 p-1 rounded-sm' />
                <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                  TOTAL DITOLAK
                </span>
              </label>
              <p>
                <span className='subheadline-m text-color-1'>
                  {data?.monitoring.total_rejected.toLocaleString()}
                </span>{' '}
                <span className='body-s-r text-color-3 text-sm'>pcs</span>
              </p>
              <p className='!-mt-0'>
                <span className='body-m-b text-color-2 mr-1'>
                  {Number(data?.monitoring.percent_rejected).toFixed(2)}
                </span>
                <span className='body-s-r text-color-3 text-sm'>%</span>
              </p>
            </div>
            <div className='bg-white border border-primary-4 space-y-2 rounded-xl p-4 hover:cursor-pointer hover:bg-primary-5'>
              <label className='flex items-center gap-2'>
                <MdOutlineFeedback className='bg-secondary-5 text-secondary-1 w-5 h-5 p-1 rounded-sm' />
                <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                  TOTAL DIDENDA
                </span>
              </label>
              <p>
                <span className='subheadline-m text-color-1'>
                  {data?.monitoring.total_fined.toLocaleString()}
                </span>{' '}
                <span className='body-s-r text-color-3 text-sm'>pcs</span>
              </p>
              <p className='!-mt-0'>
                <span className='body-m-b text-color-2 mr-1'>
                  {Number(data?.monitoring.percent_fined).toFixed(2)}
                </span>
                <span className='body-s-r text-color-3 text-sm'>%</span>
              </p>
            </div>
          </section>
          <section className='space-y-4 mt-6'>
            <div className='relative inline-block w-60'>
              <input
                type='checkbox'
                id='toggle'
                className='sr-only'
                checked={isBuahInti}
                onChange={() => setIsBuahInti(!isBuahInti)}
              />
              <label
                htmlFor='toggle'
                className='body-m-b block cursor-pointer overflow-hidden rounded-full bg-primary-4 px-2'
              >
                <div className='flex w-full items-center justify-between py-3 transition-all duration-300 ease-in-out'>
                  <span
                    className={`${
                      isBuahInti ? 'text-color-1' : 'text-color-2'
                    } relative z-10 flex-1 text-center`}
                  >
                    Buah Inti
                  </span>
                  <span
                    className={`${
                      isBuahInti ? 'text-color-2' : 'text-color-1'
                    } relative z-10 ml-2 flex-1 text-center`}
                  >
                    Buah Plasma
                  </span>
                </div>
                <span
                  className={`z-1 absolute bottom-0 left-0 top-0 my-auto h-4/5 w-[45%] transform rounded-full bg-white/80 px-8 transition-transform duration-300 ease-in-out ${
                    isBuahInti ? 'translate-x-2' : 'w-[50%] translate-x-[95%]'
                  }`}
                />
              </label>
            </div>
            {isBuahInti ? (
              <>
                <div className='border border-primary-4 rounded-xl p-4'>
                  <label>
                    <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                      KLASIFIKASI UTAMA
                    </span>
                  </label>
                  <table className='table mt-4'>
                    <tbody>
                      {data &&
                        data?.by_inti_fruits.map((item, index) => (
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
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className='border border-primary-4 rounded-xl p-4'>
                  <label>
                    <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                      SUB KLASIFIKASI
                    </span>
                  </label>
                  <table className='table mt-4'>
                    <tbody>
                      {data &&
                        [
                          ...data.by_inti_fruits_size,
                          ...data.by_inti_fruits_tp,
                        ].map((item, index) => (
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
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className='border border-primary-4 rounded-xl p-4'>
                  <label>
                    <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                      KLASIFIKASI UTAMA
                    </span>
                  </label>
                  <table className='table mt-4'>
                    <tbody>
                      {data &&
                        data?.by_plasma_fruits.map((item, index) => (
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
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className='border border-primary-4 rounded-xl p-4'>
                  <label>
                    <span className='label-text tag-m text-color-3 flex items-center gap-2'>
                      SUB KLASIFIKASI
                    </span>
                  </label>
                  <table className='table mt-4'>
                    <tbody>
                      {data &&
                        [
                          ...data.by_plasma_fruits_size,
                          ...data.by_plasma_fruits_tp,
                        ].map((item, index) => (
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
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        </main>
      ) : (
        <div className='min-h-screen flex flex-col items-center justify-center lg:hidden'>
          <h1 className='subheadline-m'>
            Halaman ini hanya tersedia untuk mobile
          </h1>
        </div>
      )}

      <MobileDrawerRiwayatPemeriksaan
        idDrawer={idMobileDrawerRiwayatPemeriksaan}
        isDrawerOpen={isMobileDrawerRiwayatPemeriksaanOpen}
        closeDrawer={closeMobileDrawerRiwayatPemeriksaan}
        factoryId={selectedFactory.value}
      />

      <MobileDrawerFilter
        idDrawer={idMobileDrawerFilter}
        isDrawerOpen={isMobileDrawerFilterOpen}
        closeDrawer={closeMobileDrawerFilter}
        selectedFactory={selectedFactory}
        setSelectedFactory={setSelectedFactory}
        optionsFactory={optionsFactory}
        form={form}
      />

      <MobileDrawerSenderBuah
        idDrawer={idMobileDrawerSenderBuah}
        isDrawerOpen={isMobileDrawerSenderBuahOpen}
        closeDrawer={closeMobileDrawerSenderBuah}
        data={selectedDataSenderBuah}
      />
    </div>
  );
};

export default MonitoringGrading;
