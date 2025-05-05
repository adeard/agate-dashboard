import React, { useState } from 'react';

import { MdOutlineFilterAlt } from 'react-icons/md';

import { formatPercentWithLeadingZeros } from '@/utils/common';

import NavbarMobile from '@/components/shared/NavbarMobile';
import GetTrendIconSection from '../components/GetTrendIconSection';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const TrenBuahDidenda = ({ data, toggleMobileDrawerFilter }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('daily');

  const options = ['monthly', 'weekly', 'daily'];
  const getTranslateClass = () => {
    const index = options.indexOf(selectedTimeFrame);
    if (index === 0) return 'translate-x-1';
    if (index === 1) return 'translate-x-[102%]';
    if (index === 2) return 'translate-x-[204%] !w-[32.3%]';
  };

  const reversedData = data[selectedTimeFrame]
    .filter((item) => item.data && item.data.length > 0)
    .slice()
    .reverse();

  return (
    <div>
      <NavbarMobile
        linkBack='/dashboard'
        title='Tren Buah Didenda'
        rightIcon={
          <MdOutlineFilterAlt
            className='text-xl'
            onClick={toggleMobileDrawerFilter}
          />
        }
      />
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
            const dataMap = Object.fromEntries(
              item.data.map((entry) => [entry.name.toLowerCase(), entry.total])
            );

            const prevItem =
              index < reversedData.length - 1 ? reversedData[index + 1] : null;
            const prevDataMap = prevItem
              ? Object.fromEntries(
                  prevItem.data.map((entry) => [
                    entry.name.toLowerCase(),
                    entry.total,
                  ])
                )
              : {};

            const getTrendIcon = (key) => {
              const currentValue = dataMap[key.toLowerCase()] ?? 0;
              const prevValue = prevDataMap[key.toLowerCase()];
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
                label: 'TANGKAI PANJANG',
                value:
                  formatPercentWithLeadingZeros(dataMap['tangkai panjang']) ||
                  '00.00',
                bg: true,
                bold: true,
                color: '#E07324',
                iconKey: 'tangkai panjang',
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
    </div>
  );
};

export default TrenBuahDidenda;
