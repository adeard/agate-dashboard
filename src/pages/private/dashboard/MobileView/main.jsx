import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useForm } from '@tanstack/react-form';

import { MdOutlineViewHeadline } from 'react-icons/md';

import {
  useGet,
  useGetWithoutObjectSearch,
  useGetWithPost,
} from '@/services/use-services';
import useDrawer from '@/hooks/useDrawer';

import MobileDrawerFilter from '../components/mobile/MobileDrawerFilter';
import MobileDrawerCriteriaGrading from '../components/mobile/MobileDrawerCriteriaGrading';
import TotalTruk from './TotalTruk';
import TrenKriteria from './TrenKriteria';
import AnalisaVendor from './AnalisaVendor';
import MobileDrawerDiterimaVendor from '../components/mobile/MobileDrawerDiterimaVendor';
import PerformaHarianVendor from './PerformaHarianVendor';
import RiwayatPemeriksaanTruk from './RiwayatPemeriksaanTruk';

import dayjs from 'dayjs';
import MobileDrawerTypeDashboard from '../components/mobile/MobileDrawerTypeDashboard';
import MonitoringGrading from './MonitoringGrading';
import SummaryPerformance from './SummaryPerformance';
import GradingTruk from './GradingTruk';
import AnalisaKinerjaVendor from './AnalisaKinerjaVendor';
import TrenBuahDiterima from './TrenBuahDiterima';
import TrenBuahDidenda from './TrenBuahDidenda';
import TrenBuahDitolak from './TrenBuahDitolak';
import RankingTruk from './RankingTruk';
import { mappingOptions } from '@/utils/common';

const MainPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: optionsFactory } = useGet('/v1/options/factory');
  const { data: optionsVendor, refetch: refetchOptionsVendor } =
    useGetWithoutObjectSearch('/v2/vendor', {}, false, false);

  const { data, loading, refetch, setQueryParams } = useGetWithPost(
    '/v4/dashboard',
    {},
    false
  );

  // dashboard page
  const [pageHistory, setPageHistory] = useState(['Monitoring Grading']);
  const currentPage = pageHistory[pageHistory.length - 1]; // halaman terakhir

  const [selectedCriteriaGrading, setSelectedCriteriaGrading] = useState('');
  const [selectedDiterimaVendor, setSelectedDiterimaVendor] = useState('');

  const goToPage = (page) => {
    setPageHistory((prev) => [...prev, page]);
  };

  const goBack = () => {
    setPageHistory((prev) => {
      if (prev.length > 1) {
        const newHistory = [...prev];
        newHistory.pop(); // hapus halaman terakhir
        return newHistory;
      }
      return prev; // jika cuma satu, jangan diubah
    });
  };

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

  const {
    idDrawer: idMobileDrawerFilter,
    isDrawerOpen: isMobileDrawerFilterOpen,
    toggleDrawer: toggleMobileDrawerFilter,
    closeDrawer: closeMobileDrawerFilter,
  } = useDrawer('MobileDrawerFilter');

  const {
    idDrawer: idMobileDrawerTypeDashboard,
    isDrawerOpen: isMobileDrawerTypeDashboardOpen,
    toggleDrawer: toggleMobileDrawerTypeDashboard,
    closeDrawer: closeMobileDrawerTypeDashboard,
  } = useDrawer('MobileDrawerTypeDashboard');

  const {
    idDrawer: idMobileDrawerAvgGrading,
    isDrawerOpen: isMobileDrawerAvgGradingOpen,
    toggleDrawer: toggleMobileDrawerAvgGrading,
    closeDrawer: closeMobileDrawerAvgGrading,
  } = useDrawer('MobileDrawerCriteriaGrading');

  const {
    idDrawer: idMobileDrawerDiterimaVendor,
    isDrawerOpen: isMobileDrawerDiterimaVendorOpen,
    toggleDrawer: toggleMobileDrawerDiterimaVendor,
    closeDrawer: closeMobileDrawerDiterimaVendor,
  } = useDrawer('MobileDrawerDiterimaVendor');

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
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div>
      {isMobile && (
        <div>
          {loading || !data ? (
            <div className='min-h-[calc(100vh-64px)] rounded-2xl flex items-center justify-center'>
              <span className='loading loading-spinner loading-lg'></span>
            </div>
          ) : (
            <>
              {currentPage === 'Monitoring Grading' && (
                <MonitoringGrading
                  data={data}
                  setSelectedCriteriaGrading={setSelectedCriteriaGrading}
                  setSelectedDiterimaVendor={setSelectedDiterimaVendor}
                  toggleMobileDrawerFilter={toggleMobileDrawerFilter}
                  toggleMobileDrawerAvgGrading={toggleMobileDrawerAvgGrading}
                  toggleMobileDrawerDiterimaVendor={
                    toggleMobileDrawerDiterimaVendor
                  }
                  goToPage={goToPage}
                />
              )}
              {currentPage === 'Summary Performance' && (
                <SummaryPerformance
                  data={data?.charts_data?.summary_performance}
                  roc={data?.rocs}
                  toggleMobileDrawerFilter={toggleMobileDrawerFilter}
                  goBack={goBack}
                />
              )}
              {currentPage === 'Grading Truk' && (
                <GradingTruk
                  data={data?.charts_data?.grading_trucks}
                  toggleMobileDrawerFilter={toggleMobileDrawerFilter}
                  goBack={goBack}
                />
              )}
              {currentPage === 'Analisa Kinerja Vendor' && (
                <AnalisaKinerjaVendor
                  data={data?.charts_data?.vendor}
                  setSelectedDiterimaVendor={setSelectedDiterimaVendor}
                  toggleMobileDrawerFilter={toggleMobileDrawerFilter}
                  toggleMobileDrawerDiterimaVendor={
                    toggleMobileDrawerDiterimaVendor
                  }
                  goBack={goBack}
                />
              )}
              {currentPage === 'Tren Buah Diterima' && (
                <TrenBuahDiterima
                  data={data?.charts_data?.fruit_accepted}
                  toggleMobileDrawerFilter={toggleMobileDrawerFilter}
                  goBack={goBack}
                />
              )}
              {currentPage === 'Tren Buah Didenda' && (
                <TrenBuahDidenda
                  data={data?.charts_data?.fruit_tangkai_panjang}
                  toggleMobileDrawerFilter={toggleMobileDrawerFilter}
                  goBack={goBack}
                />
              )}
              {currentPage === 'Tren Buah Ditolak' && (
                <TrenBuahDitolak
                  data={data?.charts_data?.fruit_rejected}
                  toggleMobileDrawerFilter={toggleMobileDrawerFilter}
                  goBack={goBack}
                />
              )}
              {currentPage === '10 Truk Terbaik' && (
                <RankingTruk
                  data={data?.charts_data?.highest_vendor}
                  toggleMobileDrawerFilter={toggleMobileDrawerFilter}
                  currentPage={currentPage}
                  goBack={goBack}
                />
              )}
              {currentPage === '10 Truk Terburuk' && (
                <RankingTruk
                  data={data?.charts_data?.lowest_vendor}
                  toggleMobileDrawerFilter={toggleMobileDrawerFilter}
                  currentPage={currentPage}
                  goBack={goBack}
                />
              )}
              {currentPage === 'Total Truk' && (
                <TotalTruk data={data?.inspections} goBack={goBack} />
              )}
              {currentPage === 'Tren Kriteria' && (
                <TrenKriteria
                  data={
                    data?.['average_grading_trend']?.[selectedCriteriaGrading]
                  }
                  criteria={selectedCriteriaGrading}
                  goBack={goBack}
                />
              )}
              {currentPage === 'Analisa Vendor' && (
                <AnalisaVendor
                  data={
                    data?.['average_grading_vendor']?.[selectedCriteriaGrading]
                  }
                  criteria={selectedCriteriaGrading}
                  goBack={goBack}
                />
              )}
              {currentPage === 'Performa Harian Vendor' && (
                <PerformaHarianVendor
                  data={
                    data?.['average_vendor_accepted_daily']?.[
                      selectedDiterimaVendor
                    ]
                  }
                  vendor={selectedDiterimaVendor}
                  currentPage={currentPage}
                  goBack={goBack}
                />
              )}
              {currentPage === 'Riwayat Pemeriksaan Truk' && (
                <RiwayatPemeriksaanTruk
                  data={
                    data?.['average_vendor_accepted_trucks_history']?.[
                      selectedDiterimaVendor
                    ]
                  }
                  vendor={selectedDiterimaVendor}
                  currentPage={currentPage}
                  goBack={goBack}
                />
              )}

              {![
                'Total Truk',
                'Tren Kriteria',
                'Analisa Vendor',
                'Performa Harian Vendor',
                'Riwayat Pemeriksaan Truk',
              ].includes(currentPage) && (
                <div
                  className='fixed bottom-5 right-5 bg-primary-G700 rounded-full p-3'
                  onClick={toggleMobileDrawerTypeDashboard}
                >
                  <MdOutlineViewHeadline className='text-3xl text-white' />
                </div>
              )}
            </>
          )}
        </div>
      )}

      <MobileDrawerFilter
        idDrawer={idMobileDrawerFilter}
        isDrawerOpen={isMobileDrawerFilterOpen}
        closeDrawer={closeMobileDrawerFilter}
        form={form}
        optionsFactory={optionsFactory}
        optionsVendor={mappingOptions(optionsVendor)}
      />

      <MobileDrawerTypeDashboard
        idDrawer={idMobileDrawerTypeDashboard}
        isDrawerOpen={isMobileDrawerTypeDashboardOpen}
        closeDrawer={closeMobileDrawerTypeDashboard}
        currentPage={currentPage}
        goToPage={goToPage}
      />

      <MobileDrawerCriteriaGrading
        idDrawer={idMobileDrawerAvgGrading}
        isDrawerOpen={isMobileDrawerAvgGradingOpen}
        closeDrawer={closeMobileDrawerAvgGrading}
        selectedCriteriaGrading={selectedCriteriaGrading}
        goToPage={goToPage}
      />

      <MobileDrawerDiterimaVendor
        idDrawer={idMobileDrawerDiterimaVendor}
        isDrawerOpen={isMobileDrawerDiterimaVendorOpen}
        closeDrawer={closeMobileDrawerDiterimaVendor}
        selectedDiterimaVendor={selectedDiterimaVendor}
        goToPage={goToPage}
      />
    </div>
  );
};

export default MainPage;
