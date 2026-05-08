import { Link, useLocation, useParams } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import { MdKeyboardArrowRight, MdFileDownload } from 'react-icons/md';

import { useGet } from '@/services/use-services';

import Button from '@/components/shared/Button';
import Table from '@/components/shared/Table';
import dayjs from 'dayjs';
import { convertLabel } from '@/utils/common';
import { BASE_URL } from '@/utils/axios';

const DetailRiwayatPemeriksaanPage = () => {
  const { id, factoryId, historyId } = useParams();
  const location = useLocation();

  const factoryName = sessionStorage.getItem('factoryName');

  const COMBINED_FACTORIES = [
    '68fc9b419a7c87b51e2002b5',
    '68fc9b419a7c87b51e2002b3',
  ];

  const isCombinedFactory = COMBINED_FACTORIES.includes(factoryId);

  const { data, loading, refetch } = useGet(
    `/v1/inspection-data/${historyId || id}`
  );

  const columnHelper = createColumnHelper();

  const weightColumns = isCombinedFactory
    ? [
        columnHelper.accessor('below5kg', {
          header: () => <div className='text-center'>{'<5KG'}</div>,
          cell: (info) => (
            <div className='!body-m-r text-[#000000DE] text-center'>
              {info.getValue()?.toLocaleString() || 0}
            </div>
          ),
          size: 20,
        }),
      ]
    : [
        columnHelper.accessor('<3kg', {
          header: () => <div className='text-center'>{'<3KG'}</div>,
          cell: (info) => (
            <div className='!body-m-r text-[#000000DE] text-center'>
              {info.getValue()?.toLocaleString() || 0}
            </div>
          ),
          size: 20,
        }),
        columnHelper.accessor('3-5kg', {
          header: () => <div className='text-center'>3-5KG</div>,
          cell: (info) => (
            <div className='!body-m-r text-[#000000DE] text-center'>
              {info.getValue()?.toLocaleString() || 0}
            </div>
          ),
          size: 20,
        }),
      ];

  const columnsDiterima = [
    columnHelper.accessor('title', {
      header: () => (
        <div className='font-bold text-color-1'>Tandan Diterima</div>
      ),
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE]'>
          {convertLabel(info.getValue())}
        </div>
      ),
      size: 400,
    }),
    columnHelper.accessor('normal', {
      header: () => <div className='text-center'>NORMAL</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {info.getValue()?.toLocaleString() || 0}
        </div>
      ),
      size: 20,
    }),
    columnHelper.accessor('pest', {
      header: () => <div className='text-center'>PEST</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {info.getValue()?.toLocaleString() || 0}
        </div>
      ),
      size: 20,
    }),
    columnHelper.accessor('largeFruit', {
      header: () => <div className='text-center'>BB</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {info.getValue()?.toLocaleString() || 0}
        </div>
      ),
      size: 20,
    }),
    columnHelper.accessor('longStash', {
      header: () => <div className='text-center'>TP</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {info.getValue()?.toLocaleString() || 0}
        </div>
      ),
      size: 20,
    }),
    ...weightColumns,
    columnHelper.accessor('total', {
      header: () => <div className='text-center'>TOTAL</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {info.getValue()?.toLocaleString() || 0}
        </div>
      ),
      size: 20,
    }),
  ];

  const columnsDitolak = [
    columnHelper.accessor('title', {
      header: () => (
        <div className='font-bold text-color-1'>Tandan Ditolak</div>
      ),
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE]'>
          {convertLabel(info.getValue())}
        </div>
      ),
      size: 400,
    }),
    columnHelper.accessor('normal', {
      header: () => <div className='text-center'>NORMAL</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {info.getValue()?.toLocaleString() || 0}
        </div>
      ),
      size: 20,
    }),
    columnHelper.accessor('pest', {
      header: () => <div className='text-center'>PEST</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {info.getValue()?.toLocaleString() || 0}
        </div>
      ),
      size: 20,
    }),
    columnHelper.accessor('largeFruit', {
      header: () => <div className='text-center'>BB</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {info.getValue()?.toLocaleString() || 0}
        </div>
      ),
      size: 20,
    }),
    columnHelper.accessor('longStash', {
      header: () => <div className='text-center'>TP</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {info.getValue()?.toLocaleString() || 0}
        </div>
      ),
      size: 20,
    }),
    ...weightColumns,
    columnHelper.accessor('total', {
      header: () => <div className='text-center'>TOTAL</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] !text-center'>
          {info.getValue()?.toLocaleString() || 0}
        </div>
      ),
      size: 20,
    }),
  ];

  const columnsDidenda = [
    columnHelper.accessor('title', {
      header: () => (
        <div className='font-bold text-color-1'>Tandan Didenda</div>
      ),
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE]'>
          {convertLabel(info.getValue())}
        </div>
      ),
      size: 400,
    }),
    columnHelper.accessor('fined', {
      header: () => <div className='text-center'>DENDA</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] !text-center'>
          {info.getValue()?.toLocaleString() || 0}
          <span className='!body-s-r text-color-2'>kg</span>
        </div>
      ),
      size: 20,
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
    columnHelper.accessor('total_kg', {
      header: () => <div className='text-center'>TOTAL KG</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {info.getValue()}
        </div>
      ),
      size: 20,
    }),
  ];

  const dataDiterima =
    data &&
    Object.keys(data.grading_result.accepted_summary)
      .filter((key) => key !== 'MENTAH')
      .map((key, index) => {
        const summary = data.grading_result.accepted_summary[key];

        return {
          id: index + 1,
          title: key,
          total: summary.TOTAL,
          normal: summary.NORMAL,
          pest: summary['RUSAK DIMAKAN TIKUS'],
          largeFruit: summary['BUAH BESAR'],
          longStash: summary['TANGKAI PANJANG'],

          ...(isCombinedFactory
            ? {
                below5kg:
                  (summary['BUAH KECIL DIBAWAH 3KG'] || 0) +
                  (summary['BUAH KECIL DIBAWAH 5KG'] || 0),
              }
            : {
                '<3kg': summary['BUAH KECIL DIBAWAH 3KG'],
                '3-5kg': summary['BUAH KECIL DIBAWAH 5KG'],
              }),
        };
      });

  const dataDitolak =
    data &&
    Object.keys(data.grading_result.rejected_summary).map((key, index) => {
      const summary = data.grading_result.rejected_summary[key];

      return {
        id: index + 1,
        title: key,
        total: summary.TOTAL,
        normal: summary.NORMAL,
        pest: summary['RUSAK DIMAKAN TIKUS'],
        largeFruit: summary['BUAH BESAR'],
        longStash: summary['TANGKAI PANJANG'],

        ...(isCombinedFactory
          ? {
              below5kg:
                (summary['BUAH KECIL DIBAWAH 3KG'] || 0) +
                (summary['BUAH KECIL DIBAWAH 5KG'] || 0),
            }
          : {
              '<3kg': summary['BUAH KECIL DIBAWAH 3KG'],
              '3-5kg': summary['BUAH KECIL DIBAWAH 5KG'],
            }),
      };
    });

  const dataDidenda =
    data &&
    Object.keys(data?.grading_result.fined_summary).map((key, index) => ({
      id: index + 1,
      title: key,
      fined: data?.grading_result.fined_summary[key].DENDA,
      total: data?.grading_result.fined_summary[key].TOTAL,
      total_kg:
        (data?.grading_result.fined_summary[key].TOTAL || 0) *
        (data?.grading_result.fined_summary[key].DENDA || 0),
    }));

  const totalRowDiterima = {
    title: <div className='text-left'>Total</div>,
    total: dataDiterima?.reduce((a, b) => a + b.total, 0)?.toLocaleString(),
    normal: dataDiterima?.reduce((a, b) => a + b.normal, 0),
    pest: dataDiterima?.reduce((a, b) => a + b.pest, 0),
    largeFruit: dataDiterima?.reduce((a, b) => a + b.largeFruit, 0),
    longStash: dataDiterima?.reduce((a, b) => a + b.longStash, 0),

    ...(isCombinedFactory
      ? { below5kg: dataDiterima?.reduce((a, b) => a + b.below5kg, 0) }
      : {
          '<3kg': dataDiterima?.reduce((a, b) => a + b['<3kg'], 0),
          '3-5kg': dataDiterima?.reduce((a, b) => a + b['3-5kg'], 0),
        }),
  };

  const totalRowDitolak = {
    title: <div className='text-left'>Total</div>,
    total: dataDitolak?.reduce((acc, row) => acc + row.total, 0)?.toLocaleString(),
    normal: dataDitolak?.reduce((acc, row) => acc + row.normal, 0),
    pest: dataDitolak?.reduce((acc, row) => acc + row.pest, 0),
    largeFruit: dataDitolak?.reduce((acc, row) => acc + row.largeFruit || 0, 0),
    longStash: dataDitolak?.reduce((acc, row) => acc + row.longStash, 0),
    ...(isCombinedFactory
      ? {
          below5kg: dataDitolak?.reduce((acc, row) => acc + row.below5kg, 0),
        }
      : {
          '<3kg': dataDitolak?.reduce((acc, row) => acc + row['<3kg'], 0),
          '3-5kg': dataDitolak?.reduce((acc, row) => acc + row['3-5kg'], 0),
        }),
  };

  const totalRowDidenda = {
    title: <div className='text-left'>Total</div>,
    // fined: dataDidenda?.reduce((acc, row) => acc + row.fined, 0),
    total: dataDidenda?.reduce((acc, row) => acc + row.total, 0)?.toLocaleString(),
    total_kg: dataDidenda?.reduce((acc, row) => acc + row.total_kg, 0),
  };

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <div className='flex items-center'>
            {location?.pathname.includes('/factory') ? (
              <>
                <Link
                  to='/factory'
                  className='font-semibold text-2xl text-color-3'
                >
                  {factoryName}
                </Link>
                <MdKeyboardArrowRight className='text-2xl text-color-3' />
                <Link
                  to={`/factory/${factoryId}/riwayat-pemeriksaan`}
                  className='font-semibold text-2xl text-color-3'
                >
                  Riwayat Pemeriksaan
                </Link>
              </>
            ) : (
              <>
                <Link
                  to='/dashboard'
                  className='font-semibold text-2xl text-color-3'
                >
                  Dashboard
                </Link>
                <MdKeyboardArrowRight className='text-2xl text-color-3' />
                <Link
                  to='/dashboard'
                  className='font-semibold text-2xl text-color-3'
                >
                  Riwayat Truk
                </Link>
              </>
            )}

            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <h2 className='headline-s'>Detail</h2>
          </div>
          <div className='flex gap-4'>
            <Button
              size='lg'
              className='flex items-center'
              onClick={() => {
                window.open(
                  BASE_URL +
                    '/v1/inspection-data/download-pdf/' +
                    (historyId ? historyId : id),
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
        <div className='flex gap-8 w-full max-w-[1280px] min-h-[calc(100vh-64px)] m-auto'>
          <div className='basis-1/3 pl-16 space-y-6'>
            <div
              className='card w-full bg-white p-6'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <h3 className='subheadline-s text-color-1'>Detail Grading</h3>
              <div className='space-y-4 mt-4'>
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
              className='card w-full bg-white p-6'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <h3 className='subheadline-s text-color-1'>Hasil Grading</h3>
              <div className='space-y-4 mt-4'>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL TANDAN
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {Number(data?.grading_result.total_tandan).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL MULTIPLE
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {Number(
                      data?.grading_result.total_multiple
                    ).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL DITERIMA
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {Number(
                      data?.grading_result.total_accepted
                    ).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL DITOLAK
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {Number(
                      data?.grading_result.total_rejected
                    ).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL DIDENDA
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {Number(
                      dataDidenda?.reduce((acc, row) => acc + row.total_kg, 0)
                    ).toLocaleString()}{' '}
                    kg
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='basis-2/3 space-y-6'>
            <div
              className='card w-full bg-white p-4'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <Table
                dataTable={dataDiterima || []}
                columns={columnsDiterima}
                footerData={totalRowDiterima}
                minHeight='10vh'
                loading={loading}
              />
            </div>

            <div
              className='card w-full bg-white p-4'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <Table
                dataTable={dataDitolak || []}
                columns={columnsDitolak}
                footerData={totalRowDitolak}
                minHeight='10vh'
                loading={loading}
              />
            </div>

            <div
              className='card w-full bg-white p-4'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <Table
                dataTable={dataDidenda || []}
                columns={columnsDidenda}
                footerData={totalRowDidenda}
                minHeight='10vh'
                loading={loading}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailRiwayatPemeriksaanPage;
