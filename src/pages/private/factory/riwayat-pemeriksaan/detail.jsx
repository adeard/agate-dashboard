import { Link, useLocation, useParams } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import { MdKeyboardArrowRight, MdFileDownload } from 'react-icons/md';

import { useGet } from '@/services/use-services';

import Button from '@/components/shared/Button';
import Table from '@/components/shared/Table';
import dayjs from 'dayjs';
import { convertLabel, formatCurrency } from '@/utils/common';
import { BASE_URL } from '@/utils/axios';

const formatDecimal = (value, maxDecimals = 2) => {
  const num = Number(value) || 0;
  return num.toLocaleString('id-ID', { maximumFractionDigits: maxDecimals });
};

const DetailRiwayatPemeriksaanPage = () => {
  const { id, factoryId, historyId } = useParams();
  const location = useLocation();

  const factoryName = sessionStorage.getItem('factoryName');

  const COMBINED_FACTORIES = [
    '68fc9b419a7c87b51e2002b5',
    '68fc9b419a7c87b51e2002b3',
  ];

  const isCombinedFactory = COMBINED_FACTORIES.includes(factoryId);

  const BYMLFactory = '699be68839fb2f1e96d62a01';
  const isBYLMFactory = factoryId === BYMLFactory;

  const { data, loading, refetch } = useGet(
    `/v1/inspection-data/${historyId || id}`,
  );

  const columnHelper = createColumnHelper();

  const weightColumns = isCombinedFactory
    ? [
        columnHelper.accessor('below5kg', {
          header: () => <div className='text-center'>{'<5KG'}</div>,
          cell: (info) => (
            <div className='!body-m-r text-[#000000DE] text-center'>
              {formatCurrency(info.getValue())}
            </div>
          ),
        }),
      ]
    : [
        ...(factoryId === '66c3114ba342ddbf9eae83c1'
          ? [
              columnHelper.accessor('<2kg', {
                header: () => <div className='text-center'>{'<2KG'}</div>,
                cell: (info) => (
                  <div className='!body-m-r text-[#000000DE] text-center'>
                    {formatCurrency(info.getValue())}
                  </div>
                ),
              }),
            ]
          : []),
        columnHelper.accessor('<3kg', {
          header: () => <div className='text-center'>{'<3KG'}</div>,
          cell: (info) => (
            <div className='!body-m-r text-[#000000DE] text-center'>
              {formatCurrency(info.getValue())}
            </div>
          ),
        }),
        columnHelper.accessor('3-5kg', {
          header: () => <div className='text-center'>3-5KG</div>,
          cell: (info) => (
            <div className='!body-m-r text-[#000000DE] text-center'>
              {formatCurrency(info.getValue())}
            </div>
          ),
        }),
      ];

  const detailedColumns = [
    columnHelper.accessor('below3kg', {
      header: () => <div className='text-center'>&lt; 3kg</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('between3And5kg', {
      header: () => <div className='text-center'>3-5kg</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('above5kg', {
      header: () => <div className='text-center'>&gt; 5kg</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('largeFruit', {
      header: () => <div className='text-center'>BB</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('longStash', {
      header: () => <div className='text-center'>TP</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('longStashExtreme', {
      header: () => (
        <div className='text-center'>
          TP <br /> Extreme
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('longStashMax', {
      header: () => (
        <div className='text-center'>
          TP <br /> Max
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('notLongStash', {
      header: () => (
        <div className='text-center'>
          Not <br /> TP
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('pest', {
      header: () => (
        <div className='text-center'>
          Pest <br /> &lt; 50%
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('pestExtreme', {
      header: () => (
        <div className='text-center'>
          Pest <br /> &gt; 50%
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('notPest', {
      header: () => (
        <div className='text-center'>
          Not <br /> Pest
        </div>
      ),
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
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
    ...(isBYLMFactory
      ? detailedColumns
      : [
          columnHelper.accessor('normal', {
            header: () => <div className='text-center'>NORMAL</div>,
            cell: (info) => (
              <div className='!body-m-r text-[#000000DE] text-center'>
                {formatCurrency(info.getValue())}
              </div>
            ),
          }),
          columnHelper.accessor('pest', {
            header: () => <div className='text-center'>PEST</div>,
            cell: (info) => (
              <div className='!body-m-r text-[#000000DE] text-center'>
                {formatCurrency(info.getValue())}
              </div>
            ),
          }),
          columnHelper.accessor('largeFruit', {
            header: () => <div className='text-center'>BB</div>,
            cell: (info) => (
              <div className='!body-m-r text-[#000000DE] text-center'>
                {formatCurrency(info.getValue())}
              </div>
            ),
          }),
          columnHelper.accessor('longStash', {
            header: () => <div className='text-center'>TP</div>,
            cell: (info) => (
              <div className='!body-m-r text-[#000000DE] text-center'>
                {formatCurrency(info.getValue())}
              </div>
            ),
          }),
          ...weightColumns,
        ]),
    columnHelper.accessor('total', {
      header: () => <div className='text-center'>TOTAL</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
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
    ...(isBYLMFactory
      ? detailedColumns
      : [
          columnHelper.accessor('normal', {
            header: () => <div className='text-center'>NORMAL</div>,
            cell: (info) => (
              <div className='!body-m-r text-[#000000DE] text-center'>
                {formatCurrency(info.getValue())}
              </div>
            ),
          }),
          columnHelper.accessor('pest', {
            header: () => <div className='text-center'>PEST</div>,
            cell: (info) => (
              <div className='!body-m-r text-[#000000DE] text-center'>
                {formatCurrency(info.getValue())}
              </div>
            ),
          }),
          columnHelper.accessor('largeFruit', {
            header: () => <div className='text-center'>BB</div>,
            cell: (info) => (
              <div className='!body-m-r text-[#000000DE] text-center'>
                {formatCurrency(info.getValue())}
              </div>
            ),
          }),
          columnHelper.accessor('longStash', {
            header: () => <div className='text-center'>TP</div>,
            cell: (info) => (
              <div className='!body-m-r text-[#000000DE] text-center'>
                {formatCurrency(info.getValue())}
              </div>
            ),
          }),
          ...weightColumns,
        ]),
    columnHelper.accessor('total', {
      header: () => <div className='text-center'>TOTAL</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] !text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
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
    columnHelper.accessor('total', {
      header: () => <div className='text-center'>TOTAL</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] !text-center'>
          {formatCurrency(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('fined', {
      header: () => <div className='text-center'>DENDA</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] !text-center'>
          {formatDecimal(info.getValue())}
          <span className='!body-s-r ml-1'>
            {info.row.original.hasBjr
              ? `% x ${info.row.original.bjr} kg`
              : 'kg'}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor('total_kg', {
      header: () => <div className='text-center'>TOTAL KG</div>,
      cell: (info) => (
        <div className='!body-m-r text-[#000000DE] text-center'>
          {formatDecimal(info.getValue())}
        </div>
      ),
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

          ...(isBYLMFactory
            ? {
                below3kg: summary['BUAH KECIL DIBAWAH 3KG'],
                between3And5kg: summary['BUAH KECIL DIBAWAH 5KG'],
                above5kg: summary['BUAH UKURAN NORMAL'],
                longStashExtreme: summary['TANGKAI PANJANG EKSTRIM'],
                longStashMax: summary['TANGKAI PANJANG MAX'],
                notLongStash: summary['TANGKAI NORMAL'],
                pestExtreme: summary['RUSAK DIMAKAN TIKUS EKSTRIM'],
                notPest: summary['TIDAK RUSAK DIMAKAN TIKUS'],
              }
            : isCombinedFactory
              ? {
                  below5kg:
                    (summary['BUAH KECIL DIBAWAH 2KG'] || 0) +
                    (summary['BUAH KECIL DIBAWAH 3KG'] || 0) +
                    (summary['BUAH KECIL DIBAWAH 5KG'] || 0),
                }
              : {
                  '<2kg': summary['BUAH KECIL DIBAWAH 2KG'],
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

        ...(isBYLMFactory
          ? {
              below3kg: summary['BUAH KECIL DIBAWAH 3KG'],
              between3And5kg: summary['BUAH KECIL DIBAWAH 5KG'],
              above5kg: summary['BUAH UKURAN NORMAL'],
              longStashExtreme: summary['TANGKAI PANJANG EKSTRIM'],
              longStashMax: summary['TANGKAI PANJANG MAX'],
              notLongStash: summary['TANGKAI NORMAL'],
              pestExtreme: summary['RUSAK DIMAKAN TIKUS EKSTRIM'],
              notPest: summary['TIDAK RUSAK DIMAKAN TIKUS'],
            }
          : isCombinedFactory
            ? {
                below5kg:
                  (summary['BUAH KECIL DIBAWAH 2KG'] || 0) +
                  (summary['BUAH KECIL DIBAWAH 3KG'] || 0) +
                  (summary['BUAH KECIL DIBAWAH 5KG'] || 0),
              }
            : {
                '<2kg': summary['BUAH KECIL DIBAWAH 2KG'],
                '<3kg': summary['BUAH KECIL DIBAWAH 3KG'],
                '3-5kg': summary['BUAH KECIL DIBAWAH 5KG'],
              }),
      };
    });

  const dataDidenda =
    data &&
    Object.keys(data?.grading_result.fined_summary).map((key, index) => {
      const fined = data?.grading_result.fined_summary[key].DENDA || 0;
      const total = data?.grading_result.fined_summary[key].TOTAL || 0;
      const bjr = data?.bjr ? parseFloat(data.bjr) : null;

      let total_kg = 0;
      if (bjr && !isNaN(bjr)) {
        total_kg = total * (fined / 100) * bjr;
      } else {
        total_kg = total * fined;
      }

      return {
        id: index + 1,
        title: key,
        fined,
        total,
        total_kg,
        hasBjr: !!(bjr && !isNaN(bjr)),
        bjr,
      };
    });

  const totalRowDiterima = {
    title: <div className='text-left'>Total</div>,
    total: (
      dataDiterima?.reduce((a, b) => a + (b.total || 0), 0) || 0
    ).toLocaleString(),
    normal: dataDiterima?.reduce((a, b) => a + (b.normal || 0), 0) || 0,
    pest: dataDiterima?.reduce((a, b) => a + (b.pest || 0), 0) || 0,
    largeFruit: dataDiterima?.reduce((a, b) => a + (b.largeFruit || 0), 0) || 0,
    longStash: dataDiterima?.reduce((a, b) => a + (b.longStash || 0), 0) || 0,

    ...(isBYLMFactory
      ? {
          below3kg:
            dataDiterima?.reduce((a, b) => a + (b.below3kg || 0), 0) || 0,
          between3And5kg:
            dataDiterima?.reduce((a, b) => a + (b.between3And5kg || 0), 0) || 0,
          above5kg:
            dataDiterima?.reduce((a, b) => a + (b.above5kg || 0), 0) || 0,
          longStashExtreme:
            dataDiterima?.reduce((a, b) => a + (b.longStashExtreme || 0), 0) ||
            0,
          longStashMax:
            dataDiterima?.reduce((a, b) => a + (b.longStashMax || 0), 0) || 0,
          notLongStash:
            dataDiterima?.reduce((a, b) => a + (b.notLongStash || 0), 0) || 0,
          pestExtreme:
            dataDiterima?.reduce((a, b) => a + (b.pestExtreme || 0), 0) || 0,
          notPest: dataDiterima?.reduce((a, b) => a + (b.notPest || 0), 0) || 0,
        }
      : isCombinedFactory
        ? {
            below5kg:
              dataDiterima?.reduce((a, b) => a + (b.below5kg || 0), 0) || 0,
          }
        : {
            '<2kg':
              dataDiterima?.reduce((a, b) => a + (b['<2kg'] || 0), 0) || 0,
            '<3kg':
              dataDiterima?.reduce((a, b) => a + (b['<3kg'] || 0), 0) || 0,
            '3-5kg':
              dataDiterima?.reduce((a, b) => a + (b['3-5kg'] || 0), 0) || 0,
          }),
  };

  const totalRowDitolak = {
    title: <div className='text-left'>Total</div>,
    total: (
      dataDitolak?.reduce((acc, row) => acc + (row.total || 0), 0) || 0
    ).toLocaleString(),
    normal: dataDitolak?.reduce((acc, row) => acc + (row.normal || 0), 0) || 0,
    pest: dataDitolak?.reduce((acc, row) => acc + (row.pest || 0), 0) || 0,
    largeFruit:
      dataDitolak?.reduce((acc, row) => acc + (row.largeFruit || 0), 0) || 0,
    longStash:
      dataDitolak?.reduce((acc, row) => acc + (row.longStash || 0), 0) || 0,
    ...(isBYLMFactory
      ? {
          below3kg:
            dataDitolak?.reduce((acc, row) => acc + (row.below3kg || 0), 0) ||
            0,
          between3And5kg:
            dataDitolak?.reduce(
              (acc, row) => acc + (row.between3And5kg || 0),
              0,
            ) || 0,
          above5kg:
            dataDitolak?.reduce((acc, row) => acc + (row.above5kg || 0), 0) ||
            0,
          longStashExtreme:
            dataDitolak?.reduce(
              (acc, row) => acc + (row.longStashExtreme || 0),
              0,
            ) || 0,
          longStashMax:
            dataDitolak?.reduce(
              (acc, row) => acc + (row.longStashMax || 0),
              0,
            ) || 0,
          notLongStash:
            dataDitolak?.reduce(
              (acc, row) => acc + (row.notLongStash || 0),
              0,
            ) || 0,
          pestExtreme:
            dataDitolak?.reduce(
              (acc, row) => acc + (row.pestExtreme || 0),
              0,
            ) || 0,
          notPest:
            dataDitolak?.reduce((acc, row) => acc + (row.notPest || 0), 0) || 0,
        }
      : isCombinedFactory
        ? {
            below5kg:
              dataDitolak?.reduce((acc, row) => acc + (row.below5kg || 0), 0) ||
              0,
          }
        : {
            '<2kg':
              dataDitolak?.reduce((acc, row) => acc + (row['<2kg'] || 0), 0) ||
              0,
            '<3kg':
              dataDitolak?.reduce((acc, row) => acc + (row['<3kg'] || 0), 0) ||
              0,
            '3-5kg':
              dataDitolak?.reduce((acc, row) => acc + (row['3-5kg'] || 0), 0) ||
              0,
          }),
  };

  const totalRowDidenda = {
    title: <div className='text-left'>Total</div>,
    total: (
      dataDidenda?.reduce((acc, row) => acc + (row.total || 0), 0) || 0
    ).toLocaleString(),
    total_kg: formatDecimal(
      dataDidenda?.reduce((acc, row) => acc + (row.total_kg || 0), 0) || 0,
    ),
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
                  '_blank',
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
          <div className='basis-1/4 pl-16 space-y-6'>
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
                    {formatCurrency(data?.grading_result.total_tandan)}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL MULTIPLE
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {formatCurrency(data?.grading_result.total_multiple)}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL DITERIMA
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {formatCurrency(data?.grading_result.total_accepted)}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL DITOLAK
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {formatCurrency(data?.grading_result.total_rejected)}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL DIDENDA
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {formatDecimal(
                      dataDidenda?.reduce(
                        (acc, row) => acc + (row.total_kg || 0),
                        0,
                      ) || 0,
                    )}{' '}
                    kg
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='basis-3/4 space-y-6'>
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
