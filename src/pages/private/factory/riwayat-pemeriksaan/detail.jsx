import { useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { createColumnHelper } from '@tanstack/react-table';

import { MdKeyboardArrowRight, MdFileDownload } from 'react-icons/md';

import { useGet } from '@/services/use-services';

import Button from '@/components/shared/Button';
import CustomTable from '@/components/shared/CustomTable';
import ModalPreviewImage from '../components/ModalPreviewImage';
import dayjs from 'dayjs';

const dataDiterima = [
  {
    id: 1,
    title: 'Kurang Matang',
    total: 1,
    normal: 5,
    pest: 5,
    longStash: 5,
    '3-5kg': 5,
  },
  {
    id: 2,
    title: 'Matang',
    total: 1,
    normal: 5,
    pest: 5,
    longStash: 5,
    '3-5kg': 5,
  },
  {
    id: 3,
    title: 'Lewat Matang',
    total: 1,
    normal: 5,
    pest: 5,
    longStash: 5,
    '3-5kg': 5,
  },
];

const dataDitolak = [
  {
    id: 1,
    title: 'Mentah',
    total: 1,
    normal: 5,
    '<3kg': 5,
  },
  {
    id: 2,
    title: 'Janjang Kosong',
    total: 1,
    normal: 5,
    '<3kg': 5,
  },
  {
    id: 3,
    title: 'Buah < 3kg',
    total: 1,
    normal: 5,
    '<3kg': 5,
  },
];

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

const totalRowDiterima = {
  title: <div className='text-left'>Total</div>,
  total: dataDiterima.reduce((acc, row) => acc + row.total, 0),
  normal: dataDiterima.reduce((acc, row) => acc + row.normal, 0),
  pest: dataDiterima.reduce((acc, row) => acc + row.pest, 0),
  longStash: dataDiterima.reduce((acc, row) => acc + row.longStash, 0),
  '3-5kg': dataDiterima.reduce((acc, row) => acc + row['3-5kg'], 0),
};

const totalRowDitolak = {
  title: <div className='text-left'>Total</div>,
  total: dataDitolak.reduce((acc, row) => acc + row.total, 0),
  normal: dataDitolak.reduce((acc, row) => acc + row.normal, 0),
  '<3kg': dataDitolak.reduce((acc, row) => acc + row['<3kg'], 0),
};

const DetailRiwayatPemeriksaanPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const factoryId = searchParams.get('factory');

  const { data, loading, refetch } = useGet(`/v1/inspection-history/${id}`);

  const dialogPreviewImageRef = useRef(null);
  const openModalPreviewImage = () => {
    dialogPreviewImageRef.current.showModal();
  };

  console.log(data);

  return (
    <div>
      <header>
        <div className='flex items-center justify-between bg-white px-12 py-6'>
          <div className='flex items-center'>
            <Link to='/factory' className='font-semibold text-2xl text-color-3'>
              Pabrik {data && data[0]?.factory.name}
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />
            <Link
              to={`/factory/riwayat-pemeriksaan?factory=${factoryId}`}
              className='font-semibold text-2xl text-color-3'
            >
              Riwayat Pemeriksaan
            </Link>
            <MdKeyboardArrowRight className='text-2xl text-color-3' />

            <h2 className='font-semibold text-3xl text-color-1'>Detail</h2>
          </div>
          <div className='flex gap-4'>
            <Button size='lg' className='flex items-center'>
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
                  <p className='body-m-b text-color-1'>{data?.vendor.name}</p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      NOMOR SURAT JALAN
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {data?.waybill_number}
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
                    {dayjs(data?.createdAt).format('YYYY-MM-DD; HH:MM:ss')}
                  </p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      WAKTU SELESAI
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>
                    {dayjs(data?.updatedAt).format('YYYY-MM-DD; HH:MM:ss')}
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
                  <p className='body-m-b text-color-1'>{data?.total_tandon}</p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL DITERIMA
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>{data?.total_received}</p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL DIREJECT
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>{data?.total_rejected}</p>
                </div>
                <div>
                  <label className='label !pl-0'>
                    <span className='label-text tag-m text-color-2'>
                      TOTAL DIDENDA
                    </span>
                  </label>
                  <p className='body-m-b text-color-1'>?</p>
                </div>
              </div>
            </div>
          </div>

          <div className='basis-2/3'>
            <div
              className='card w-full bg-white p-4'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <div>
                <CustomTable
                  dataTable={dataDiterima}
                  columns={columnsDiterima}
                  footerData={totalRowDiterima}
                  showPagination={false}
                />
              </div>
            </div>

            <div
              className='card w-full bg-white p-4 mt-5'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <div>
                <CustomTable
                  dataTable={dataDitolak}
                  columns={columnsDitolak}
                  footerData={totalRowDitolak}
                  showPagination={false}
                />
              </div>
            </div>

            <div
              className='card w-full bg-white p-4 mt-5'
              style={{ boxShadow: '0px 0px 4px -1px #aca4a4' }}
            >
              <div>
                <label className='label !pl-0'>
                  <span className='label-text tag-m text-color-2'>NOTES</span>
                </label>
                <p className='body-m-r text-color-1'>
                  lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus laoreet suscipit justo a hendrerit. Donec commodo
                  tellus sed nisl pellentesque, eu vestibulum ex convallis.
                </p>
              </div>
              <br />
              <div>
                <label className='label !pl-0'>
                  <span className='label-text tag-m text-color-2'>
                    ATTACHMENT
                  </span>
                </label>
                <ul className='flex flex-1 list-none gap-2 body-m-r text-color-1'>
                  <li
                    className='cursor-pointer hover:underline'
                    onClick={openModalPreviewImage}
                  >
                    Photo 1,
                  </li>
                  <li
                    className='cursor-pointer hover:underline'
                    onClick={openModalPreviewImage}
                  >
                    Photo 2,
                  </li>
                  <li
                    className='cursor-pointer hover:underline'
                    onClick={openModalPreviewImage}
                  >
                    Photo 3,
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <ModalPreviewImage modalRef={dialogPreviewImageRef} />
      </main>
    </div>
  );
};

export default DetailRiwayatPemeriksaanPage;
