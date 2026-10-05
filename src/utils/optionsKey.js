export const statusOptions = [
  {
    label: 'Tidak Aktif',
    value: '0',
  },
  {
    label: 'Aktif',
    value: '1',
  },
];

export const vendorTypeOptions = [
  {
    label: 'Semua',
    value: 'all',
  },
  {
    label: 'Inti',
    value: '1',
  },
  {
    label: 'Plasma',
    value: '2',
  },
];


export const listOptionsMachine = [
  { label: 'Semua Mesin', value: 'All' },
  {
    label: 'Mesin 1',
    value: '1',
  },
  {
    label: 'Mesin 2',
    value: '2',
  },
  {
    label: 'Mesin 3',
    value: '3',
  },
  {
    label: 'Mesin 4',
    value: '4',
  },
];

export const colorKriteriaGrading = {
  matang: 'bg-[#6BAB25]',
  lewat_matang: 'bg-[#6BAB25]',
  mentah_diterima: 'bg-[#6BAB25]',
  buah_kecil_5_diterima: 'bg-[#6BAB25]',
  buah_kecil_3_diterima: 'bg-[#6BAB25]',
  buah_kecil_2_diterima: 'bg-[#6BAB25]',
  janjang_kosong_diterima: 'bg-[#6BAB25]',
  mentah: 'bg-[#AC0F18]',
  janjang_kosong: 'bg-[#AC0F18]',
  buah_kecil_2: 'bg-[#AC0F18]',
  buah_kecil_2_ditolak: 'bg-[#AC0F18]',
  buah_kecil_3: 'bg-[#AC0F18]',
  buah_kecil_3_ditolak: 'bg-[#AC0F18]',
  buah_kecil_5: 'bg-[#AC0F18]',
  buah_kecil_5_ditolak: 'bg-[#AC0F18]',
  matang_ditolak: 'bg-[#AC0F18]',
  lewat_matang_ditolak: 'bg-[#AC0F18]',
  tangkai_panjang: 'bg-[#F0CC00]',
  rusak_dimakan_tikus: 'bg-[#F0CC00]',
  tangkai_panjang_didenda: 'bg-[#F0CC00]',
  tangkai_panjang_ditolak: 'bg-[#AC0F18]',
  rusak_dimakan_tikus_didenda: 'bg-[#F0CC00]',
  rusak_dimakan_tikus_ditolak: 'bg-[#AC0F18]',
};

const chartTypeDictionary = {
  monitoring_grading: 'Monitoring Grading',
  summary_performance: 'Summary Performance',
  grading_trucks: 'Grading Truk',
  kinerja_vendor: 'Analisa Kinerja Vendor',
  highest_vendor: '10 Truk Terbaik',
  lowest_vendor: '10 Truk Terburuk',
};

export const chartTypeListOptions = Object.entries(chartTypeDictionary).map(
  ([key, value]) => ({
    label: value,
    value: key,
  }),
);

export const categorizedKeysAvgGrading = {
  diterima: {
    main: ['matang_diterima', 'lewat_matang_diterima', 'mentah_diterima', 'janjang_kosong_diterima'],
    sub: ['buah_kecil_5_diterima', 'buah_kecil_3_diterima', 'buah_kecil_2_diterima', 'tangkai_panjang_diterima', 'rusak_dimakan_tikus_diterima', 'partenokarpi_diterima'],
  },
  ditolak: {
    main: ['mentah_ditolak', 'janjang_kosong_ditolak', 'lewat_matang_ditolak', 'matang_ditolak'],
    sub: ['buah_kecil_5_ditolak', 'buah_kecil_3_ditolak', 'buah_kecil_2_ditolak', 'tangkai_panjang_ditolak', 'rusak_dimakan_tikus_ditolak', 'partenokarpi_ditolak'],
  },
};