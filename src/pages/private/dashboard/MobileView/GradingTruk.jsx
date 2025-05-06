import React, { useState } from 'react';

import { MdArrowBackIosNew, MdOutlineFilterAlt } from 'react-icons/md';

import GetTrendIconSection from '../components/GetTrendIconSection';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const GradingTruk = ({ data, toggleMobileDrawerFilter, goBack }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('daily');

  const options = ['monthly', 'weekly', 'daily'];
  const getTranslateClass = () => {
    const index = options.indexOf(selectedTimeFrame);
    if (index === 0) return 'translate-x-1';
    if (index === 1) return 'translate-x-[102%]';
    if (index === 2) return 'translate-x-[204%] !w-[32.3%]';
  };

  const reversedData = data[selectedTimeFrame]
    .filter((item) => {
      const truk = item.data.find((d) => d.name === 'Truk');
      return truk && truk.machines && truk.machines.length > 0;
    })
    .slice()
    .reverse();

  return (
    <>
      <section className='sticky top-0 z-50 flex items-center justify-between max-h-16 p-4 bg-white'>
        <div className='flex-none'>
          <MdArrowBackIosNew className='text-xl' onClick={goBack} />
        </div>
        <h2 className='flex-1 !text-center subheadline-s'>Grading Truk</h2>
        <div className='flex-none'>
          <MdOutlineFilterAlt
            className='text-xl'
            onClick={toggleMobileDrawerFilter}
          />
        </div>
      </section>

      <div className='w-full bg-[#F8F9FB] p-4 space-y-4'>
        <div className='w-full relative inline-block mb-2'>
          <div className='relative flex rounded-lg bg-[#EEEEEE] overflow-hidden'>
            <span
              className={`absolute bottom-0 left-0 top-0 my-auto h-4/5 w-1/3 transform rounded-lg bg-white/80 transition-transform duration-300 ease-in-out ${getTranslateClass()}`}
            />
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedTimeFrame(option)}
                className={`relative z-10 flex-1 py-3 px-2 text-center transition-all duration-300 ease-in-out ${
                  selectedTimeFrame === option ? 'text-color-1' : 'text-color-2'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <section className='space-y-2'>
          {reversedData.map((item, index) => {
            const truk = item.data.find((d) => d.name === 'Truk');
            const currentMachineMap = Object.fromEntries(
              truk.machines.map((machine) => [
                machine.name.toLowerCase(),
                machine.total,
              ])
            );

            const prevItem =
              index < reversedData.length - 1 ? reversedData[index + 1] : null;
            const prevTruk = prevItem?.data.find((d) => d.name === 'Truk');
            const prevMachineMap = prevTruk
              ? Object.fromEntries(
                  prevTruk.machines.map((machine) => [
                    machine.name.toLowerCase(),
                    machine.total,
                  ])
                )
              : {};

            const getTrendIcon = (key) => {
              const currentValue = currentMachineMap[key.toLowerCase()] ?? 0;
              const prevValue = prevMachineMap[key.toLowerCase()];
              return GetTrendIconSection(currentValue, prevValue);
            };

            const formattedTitle =
              selectedTimeFrame === 'weekly'
                ? `Week ${item.title}`
                : selectedTimeFrame === 'daily'
                ? dayjs(item.title, 'DD/MM/YY').format('DD/MM/YYYY')
                : item.title;

            const rows = [
              {
                label: 'TANGGAL',
                value: formattedTitle,
                bold: true,
              },
              {
                label: 'TOTAL TRUK',
                value: truk.total,
                bg: true,
              },
              ...truk.machines.map((machine, i) => ({
                label: machine.name.toUpperCase(),
                value: machine.total,
                bg: i % 2 === 0 ? false : true,
                iconKey: machine.name.toLowerCase(),
              })),
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
                          className={`body-s-r ${classNames} flex items-center`}
                          style={style}
                        >
                          {row.value}
                          {row.iconKey && getTrendIcon(row.iconKey)}
                        </p>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default GradingTruk;
