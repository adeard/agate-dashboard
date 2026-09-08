import React from 'react';

import { MdArrowBackIosNew } from 'react-icons/md';

import {
  formatCurrency,
  formatDuration,
  formatPercentWithLeadingZeros,
} from "@/utils/common";

import dayjs from "dayjs";

const RiwayatPemeriksaanTruk = ({ data, vendor, goBack }) => {
  return (
    <>
      <section className="sticky top-0 z-50 flex items-center justify-between max-h-16 p-4 bg-white">
        <div className="flex-none">
          <MdArrowBackIosNew className="text-xl" onClick={goBack} />
        </div>
        <h2 className="flex-1 !text-center mr-4 subheadline-s">
          Riwayat Pemeriksaan Truk
        </h2>
      </section>

      <section className="w-full bg-[#F8F9FB] p-4 space-y-4">
        <p className="ml-2">{vendor}</p>
        {data?.map((item, index) => {
          const rows = [
            {
              label: "TANGGAL",
              value: (
                <>
                  {dayjs(item.date).format("DD/MM/YYYY")}
                  <br />
                  {dayjs(item.date).format("HH:mm")} -{" "}
                  {dayjs(item.finish_date).format("HH:mm")}
                </>
              ),
              bold: true,
            },
            {
              label: "DURASI BONGKAR",
              value: formatDuration(item.duration),
              bg: true,
            },
            {
              label: "WAKTU MENUNGGU",
              value: formatDuration(item.duration_gap),
            },
            { label: "NOMOR MESIN", value: item.mesin, bg: true },
            { label: "SURAT JALAN", value: item.delivery_number },
            { label: "PLAT NOMOR", value: item.vehicle_number, bg: true },
            {
              label: "TOTAL TBS",
              value: formatCurrency(item.total_tandan),
            },
            {
              label: "TBS MULTIPLE",
              value: formatCurrency(item.total_multiple),
              bg: true,
            },
            {
              label: "% DITERIMA",
              value:
                (formatPercentWithLeadingZeros(item.percent_accepted) ||
                  "00.00") + " %",
              color: "#299300",
              bold: true,
            },
            {
              label: "% DITOLAK",
              value:
                (formatPercentWithLeadingZeros(item.percent_rejected) ||
                  "00.00") + " %",
              color: "#BD2828",
              bold: true,
              bg: true,
            },
            {
              label: "% DIDENDA",
              value:
                (formatPercentWithLeadingZeros(item.percent_fined) || "00.00") +
                " %",
              color: "#E07324",
              bold: true,
            },
          ];

          return (
            <div
              key={index}
              className='bg-white border border-[#E7E7E7] button-shadow rounded-xl py-4'
            >
              <div className='grid grid-cols-2 text-[#3B3B3B]'>
                {rows.map((row, i) => {
                  const classNames = [
                    row.bg ? 'bg-[#F6F6F6]' : '',
                    'py-2 px-4',
                    row.bold ? '!font-bold' : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  const style = row.color ? { color: row.color } : {};

                  return (
                    <React.Fragment key={i}>
                      <p className={`tag-m ${classNames}`} style={style}>
                        {row.label}
                      </p>
                      <p
                        className={`body-s-r truncate ${classNames}`}
                        style={style}
                      >
                        {row.value}
                      </p>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default RiwayatPemeriksaanTruk;
