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

export const vendorKJGMTypeOptions = [
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
    value: '3',
  },
  {
    label: 'Eksternal',
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
  janjang_kosong_diterima: 'bg-[#6BAB25]',
  mentah: 'bg-[#AC0F18]',
  janjang_kosong: 'bg-[#AC0F18]',
  buah_kecil_3: 'bg-[#AC0F18]',
  buah_kecil_5: 'bg-[#AC0F18]',
  matang_ditolak: 'bg-[#AC0F18]',
  lewat_matang_ditolak: 'bg-[#AC0F18]',
  tangkai_panjang: 'bg-[#F0CC00]',
  rusak_dimakan_tikus: 'bg-[#F0CC00]',
};

const chartTypeDictionary = {
  summary_performance: 'Summary Performance',
  grading_trucks: 'Grading Truk',
  kinerja_vendor: 'Analisa Kinerja Vendor',
  fruit_accepted: 'Tren Buah Diterima',
  fruit_tangkai_panjang: 'Tren Tangkai Panjang',
  fruit_rejected: 'Tren Buah Ditolak',
  highest_vendor: '10 Truk Terbaik',
  lowest_vendor: '10 Truk Terburuk',
};

export const chartTypeListOptions = Object.entries(chartTypeDictionary).map(
  ([key, value]) => ({
    label: value,
    value: key,
  })
);

export const orderedKeysAvgGrading = [
  'matang',
  'lewat_matang',
  'mentah_diterima',
  'janjang_kosong_diterima',
  'buah_kecil_5_diterima',
  'tangkai_panjang',
  'rusak_dimakan_tikus',
  'mentah',
  'janjang_kosong',
  'buah_kecil_3',
  'buah_kecil_5',
  'matang_ditolak',
  'lewat_matang_ditolak',
];