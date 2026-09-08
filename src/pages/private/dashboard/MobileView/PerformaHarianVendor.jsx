import React from "react";

import { MdArrowBackIosNew } from "react-icons/md";

import { formatPercentWithLeadingZeros } from "@/utils/common";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const PerformaHarianVendor = ({ data, vendor, goBack }) => {
  return (
    <>
      <section className="sticky top-0 z-50 flex items-center justify-between max-h-16 p-4 bg-white">
        <div className="flex-none">
          <MdArrowBackIosNew className="text-xl" onClick={goBack} />
        </div>
        <h2 className="flex-1 !text-center mr-4 subheadline-s">
          Performa Harian Vendor
        </h2>
      </section>

      <section className="w-full bg-[#F8F9FB] p-4 space-y-4">
        <p className="ml-2">{vendor}</p>
        {data?.map((item, index) => {
          const rows = [
            {
              label: "TANGGAL",
              value: dayjs(item.date, "DD/MM/YY").format("DD/MM/YYYY"),
              bold: true,
            },
            { label: "TOTAL TRUK", value: item.trucks, bg: true },
            { label: "AVG TBS TRUK", value: Math.round(item.avg_tandan) },
            {
              label: "% DITERIMA",
              value:
                (formatPercentWithLeadingZeros(item.avg_accepted) || "00.00") +
                " %",
              bg: true,
              color: "#299300",
            },
            {
              label: "% DITOLAK",
              value:
                (formatPercentWithLeadingZeros(item.avg_rejected) || "00.00") +
                " %",
              color: "#BD2828",
            },
            {
              label: "% DIDENDA",
              value:
                (formatPercentWithLeadingZeros(item.avg_fined) || "00.00") +
                " %",
              bg: true,
              color: "#E07324",
            },
          ];

          return (
            <div
              key={index}
              className="bg-white border border-[#E7E7E7] button-shadow rounded-xl py-4"
            >
              <div className="grid grid-cols-2 text-[#3B3B3B]">
                {rows.map((row, i) => {
                  const classNames = [
                    row.bg ? "bg-[#F6F6F6]" : "",
                    "py-2 px-4",
                    row.bold ? "!font-bold" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

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

export default PerformaHarianVendor;
