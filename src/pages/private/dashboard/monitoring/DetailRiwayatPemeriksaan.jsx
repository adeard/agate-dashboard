import { useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import { MdKeyboardArrowRight, MdFileDownload } from 'react-icons/md';

import { useGet } from '@/services/use-services';

import Button from '@/components/shared/Button';
import CustomTable from '@/components/shared/CustomTable';
import dayjs from 'dayjs';
import { BASE_URL } from '@/utils/axios';

const columnHelper = createColumnHelper();

const columnsDiterima = [
  columnHelper.accessor('title', {
    header: () => <div className='font-bold text-color-1'>Tandan Diterima</div>,
    cell: (info) => (
      <div className='!body-m-r text-[#000000DE]'>{info.getValue()}</div>
    ),
    size: 400,
  }),
  columnHelper.accessor('total', {
    header: () => <div className='text-center'>TOTAL</div>,
    cell: (info) => (
      <div className='!body-m-r text-[#000000DE] text-center'>
        {info.getValue()}
      </div>
    ),
    size: 20,
  }),
  columnHelper.accessor('normal', {
    header: () => <div className='text-center'>NORMAL</div>,
    cell: (info) => (
      <div className='!body-m-r text-[#000000DE] text-center'>
        {info.getValue()}
      </div>
    ),
    size: 20,
  }),
  columnHelper.accessor('pest', {
    header: () => <div className='text-center'>PEST</div>,
    cell: (info) => (
      <div className='!body-m-r text-[#000000DE] text-center'>
        {info.getValue()}
      </div>
    ),
    size: 20,
  }),
  columnHelper.accessor('longStash', {
    header: () => <div className='text-center'>LONG STASH</div>,
    cell: (info) => (
      <div className='!body-m-r text-[#000000DE] text-center'>
        {info.getValue()}
      </div>
    ),
    size: 20,
  }),
  columnHelper.accessor('3-5kg', {
    header: () => <div className='text-center'>3-5KG</div>,
    cell: (info) => (
      <div className='!body-m-r text-[#000000DE] text-center'>
        {info.getValue()}
      </div>
    ),
    size: 20,
  }),
];

const columnsDitolak = [
  columnHelper.accessor('title', {
    header: () => <div className='font-bold text-color-1'>Tandan Ditolak</div>,
    cell: (info) => (
      <div className='!body-m-r text-[#000000DE]'>{info.getValue()}</div>
    ),
    size: 400,
  }),
  columnHelper.accessor('total', {
    header: () => <div className='text-center'>TOTAL</div>,
    cell: (info) => (
      <div className='body-m-r text-[#000000DE] !text-center'>
        {info.getValue()}
      </div>
    ),
    size: 20,
  }),
  columnHelper.accessor('normal', {
    header: () => <div className='text-center'>NORMAL</div>,
    cell: (info) => (
      <div className='!body-m-r text-[#000000DE] text-center'>
        {info.getValue()}
      </div>
    ),
    size: 20,
  }),
  columnHelper.accessor('<3kg', {
    header: () => <div className='text-center'>{`<3KG`}</div>,
    cell: (info) => (
      <div className='!body-m-r text-[#000000DE] text-center'>
        {info.getValue()}
      </div>
    ),
    size: 20,
  }),
];

const columnsDidenda = [
  columnHelper.accessor('title', {
    header: () => <div className='font-bold text-color-1'>Tandan Ditolak</div>,
    cell: (info) => (
      <div className='!body-m-r text-[#000000DE]'>{info.getValue()}</div>
    ),
    size: 400,
  }),
  columnHelper.accessor('fined', {
    header: () => <div className='text-center'>DENDA</div>,
    cell: (info) => (
      <div className='body-m-r text-[#000000DE] !text-center'>
        {info.getValue()}
      </div>
    ),
    size: 20,
  }),
  columnHelper.accessor('total', {
    header: () => <div className='text-center'>TOTAL KG</div>,
    cell: (info) => (
      <div className='!body-m-r text-[#000000DE] text-center'>
        {info.getValue()}
      </div>
    ),
    size: 20,
  }),
];

const DetailRiwayatPemeriksaanPage = () => {
  const { id } = useParams();

  const { data, loading, refetch } = useGet(`/v1/inspection-data/${id}`);

  const dataDiterima =
    data &&
    Object.keys(data?.grading_result.accepted_summary).map((key, index) => ({
      id: index + 1,
      title: key,
      total: data?.grading_result.accepted_summary[key].TOTAL,
      normal: data?.grading_result.accepted_summary[key].NORMAL,
      pest: data?.grading_result.accepted_summary[key]['RUSAK DIMAKAN TIKUS'],
      longStash: data?.grading_result.accepted_summary[key]['TANGKAI PANJANG'],
      '3-5kg':
        data?.grading_result.accepted_summary[key]['BUAH KECIL DIBAWAH 5KG'],
    }));

  const dataDitolak =
    data &&
    Object.keys(data?.grading_result.rejected_summary).map((key, index) => ({
      id: index + 1,
      title: key,
      total: data?.grading_result.rejected_summary[key].TOTAL,
      normal: data?.grading_result.rejected_summary[key].NORMAL,
      '<3kg':
        data?.grading_result.rejected_summary[key]['BUAH KECIL DIBAWAH 3KG'],
    }));

  const dataDidenda =
    data &&
    Object.keys(data?.grading_result.fined_summary).map((key, index) => ({
      id: index + 1,
      title: key,
      fined: data?.grading_result.fined_summary[key].DENDA,
      total: data?.grading_result.fined_summary[key].TOTAL,
    }));

  const totalRowDiterima = {
    title: <div className='text-left'>Total</div>,
    total: dataDiterima?.reduce((acc, row) => acc + row.total, 0),
    normal: dataDiterima?.reduce((acc, row) => acc + row.normal, 0),
    pest: dataDiterima?.reduce((acc, row) => acc + row.pest, 0),
    longStash: dataDiterima?.reduce((acc, row) => acc + row.longStash, 0),
    '3-5kg': dataDiterima?.reduce((acc, row) => acc + row['3-5kg'], 0),
  };

  const totalRowDitolak = {
    title: <div className='text-left'>Total</div>,
    total: dataDitolak?.reduce((acc, row) => acc + row.total, 0),
    normal: dataDitolak?.reduce((acc, row) => acc + row.normal, 0),
    '<3kg': dataDitolak?.reduce((acc, row) => acc + row['<3kg'], 0),
  };

  const totalRowDidenda = {
    title: <div className='text-left'>Total</div>,
    fined: dataDidenda?.reduce((acc, row) => acc + row.fined, 0),
    total: dataDidenda?.reduce((acc, row) => acc + row.total, 0),
  };

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <div className='flex items-center'>
            <Link
              to='/dashboard/monitoring'
              className='font-semibold text-2xl text-color-3'
            >
              Dashboard Monitoring
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='headline-s'>Detail Riwayat Pemeriksaan</h2>
          </div>
          <div className='flex gap-4'>
            <Button
              size='lg'
              className='flex items-center'
              onClick={() => {
                // refetchDownloadPdf().then((res) => {
                //   console.log({ res });
                // });
                window.open(
                  BASE_URL + '/v1/inspection-data/download-pdf/' + id,
                  '_blank'
                );
              }}
            >
              <MdFileDownload className='text-xl mr-2' />
              Unduh Laporan
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className='flex gap-5 w-full max-w-[1280px] min-h-[calc(100vh-64px)] m-auto'>
          <div className='basis-1/3 pl-16'>
            <div
              className='card w-full bg-white p-6'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <h3 className='subheadline-s text-color-1'>Detail Grading</h3>

              <div className='space-y-4 mt-8'>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      NAMA VENDOR
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>{data?.vendor_name}</p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      NOMOR SURAT JALAN
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {data?.delivery_number}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      NOMOR PLAT KENDARAAN
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {data?.vehicle_number}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      WAKTU MULAI
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {dayjs(data?.date).format('YYYY-MM-DD; HH:mm:ss')}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      WAKTU SELESAI
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {dayjs(data?.finish_date).format('YYYY-MM-DD; HH:mm:ss')}
                  </p>
                </div>
              </div>
            </div>
            <div
              className='card w-full bg-white p-6 mt-5'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <h3 className='subheadline-s text-color-1'>Hasil Grading</h3>

              <div className='space-y-4 mt-8'>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL TANDAN
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {data?.grading_result.total_tandan}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL DITERIMA
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {data?.grading_result.total_accepted}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL DIREJECT
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {data?.grading_result.total_rejected}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL DIDENDA
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {data?.grading_result.total_fined}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='basis-2/3'>
            {dataDiterima?.length > 0 && (
              <div
                className='card w-full bg-white p-4'
                style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
              >
                <CustomTable
                  dataTable={dataDiterima}
                  columns={columnsDiterima}
                  footerData={totalRowDiterima}
                />
              </div>
            )}

            {dataDitolak?.length > 0 && (
              <div
                className='card w-full bg-white p-4 mt-5'
                style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
              >
                <CustomTable
                  dataTable={dataDitolak}
                  columns={columnsDitolak}
                  footerData={totalRowDitolak}
                />
              </div>
            )}

            {dataDidenda?.length > 0 && (
              <div
                className='card w-full bg-white p-4 mt-5'
                style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
              >
                <CustomTable
                  dataTable={dataDidenda}
                  columns={columnsDidenda}
                  footerData={totalRowDidenda}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailRiwayatPemeriksaanPage;
