import { useEffect, useMemo, useState } from 'react';
import { Column, G2, Line } from '@ant-design/plots';
import {
  convertLabel,
  countPercentage,
  formatNumberWithK,
} from '@/utils/common';
import dayjs from 'dayjs';

const classificationColor = {
  MENTAH: '#000000',
  'KURANG MATANG': '#FFD700',
  MATANG: '#FF0000',
  'LEWAT MATANG': '#FF8C00',
  'JANJANG KOSONG': '#78909C',
};
const classificationColorFruit = {
  'BUAH KECIL DIBAWAH 3KG': '#CDE441',
  'BUAH KECIL DIBAWAH 5KG': '#78C52A',
};
const classificationColorTP = {
  'TANGKAI PANJANG': '#CDE441',
};
const statisticsColorAverage = {
  Highest: '#6BAB25',
  Average: '#F0CC00',
  Lowest: '#AC0F18',
};
const statisticsColorSummary = {
  Diterima: '#6BAB25',
  Didenda: '#F0CC00',
  Ditolak: '#AC0F18',
};
const statisticsColorGradingTrucks = {
  Truk: '#6BAB25',
};
const statisticsColorFruitAccepted = {
  Matang: '#6BAB25',
  'Lewat Matang': '#F0CC00',
};
const statisticsColorFruitTP = {
  'Tangkai Panjang': '#6BAB25',
};
const statisticsColorFruitRejected = {
  Mentah: '#6BAB25',
  // 'Lewat Matang': '#F0CC00',
  'Janjang Kosong': '#A86523',
  'Buah <3kg': '#AC0F18',
  'Buah 3-5kg': '#E07324',
};

const dictionaryLegendColorDemography = {
  main: classificationColor,
  size: classificationColorFruit,
  tp: classificationColorTP,
};

const machineColor = {
  'Mesin 1': '#64B5F6', // lighter blue
  'Mesin 2': '#4DD0E1', // lighter cyan
  'Mesin 3': '#4DB6AC', // lighter teal
  'Mesin 4': '#81C784', // lighter green
};

const unitSuffix = {
  truck_fines: 'kg',
  truck_gaps: 'min',
  durations: 'min',
  summary_performance: '%',
  rejected: '%',
  demography: '%',
  machine_utility: '',

  fruit_accepted: '%',
  fruit_rejected: '%',
  fruit_tangkai_panjang: '%',
  grading_trucks: '',
};

const colorCodes = {
  // Maturity classifications
  MENTAH: '#000000',
  Mentah: '#6BAB25',
  'KURANG MATANG': '#FFD700',
  MATANG: '#FF0000',
  Matang: '#6BAB25',
  'LEWAT MATANG': '#FF8C00',
  'Lewat Matang': '#F0CC00',
  'JANJANG KOSONG': '#78909C',
  'Janjang Kosong': '#A86523',

  // Fruit size classifications
  'BUAH KECIL DIBAWAH 3KG': '#CDE441',
  'Buah <3kg': '#AC0F18',
  'BUAH KECIL DIBAWAH 5KG': '#78C52A',
  'Buah 3-5kg': '#E07324',

  // Stalk classification
  'TANGKAI PANJANG': '#CDE441',
  'Tangkai Panjang': '#6BAB25',

  // Statistics average values
  Highest: '#6BAB25',
  Average: '#F0CC00',
  Lowest: '#AC0F18',

  // Summary statistics
  Diterima: '#6BAB25',
  Didenda: '#F0CC00',
  Ditolak: '#AC0F18',

  // Machine colors
  1: '#64B5F6', // lighter blue
  2: '#4DD0E1', // lighter cyan
  3: '#4DB6AC', // lighter teal
  4: '#81C784', // lighter green

  // Grading Trucs
  Truk: '#6BAB25',
};

const reformatStringDate = (string) => {
  let splitted = string.split('/');
  return `${splitted[1]}/${splitted[0]}/${splitted[2]}`;
};

const LineCharts = ({
  data,
  range,
  type,
  variant = 'inti',
  height,
  width,
  toggleDrawer,
  dividerPercent = null,
  chartType,
  machineType = 'all',
}) => {
  const [legendStatus, setLegendStatus] = useState({
    'Mesin 1': true,
    'Mesin 2': true,
    'Mesin 3': true,
    'Mesin 4': true,
  });
  const [selectedData, setSelectedData] = useState(null);

  const [showLabel, setShowLabel] = useState(true);

  const handleLegendClick = (key) => {
    setLegendStatus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const rangeMainData = useMemo(() => {
    if (dividerPercent && range) {
      const founded = dividerPercent[range];
      return founded;
    } else {
      return [];
    }
  }, [range, dividerPercent]);

  const filteredData = useMemo(() => {
    let configuredData =
      chartType === 'demography' ? data[type][range] : data[range];

    return configuredData.reduce((curr, item) => {
      let dataUsed =
        chartType === 'truck_gaps'
          ? item['data']?.[machineType] || []
          : item['data'];
      let availData = [
        ...dataUsed.map((dt) => {
          if (chartType === 'machine_utility') {
            const isLegendActive = legendStatus[`Mesin ${dt.name}`] === true;
            if (isLegendActive) {
              return {
                xField: item.title,
                yField: dt['total'],
                type: dt['name'],
                data: dt,
              };
            } else {
              return;
            }
          }
          return {
            xField: item.title,
            yField: dt['total'],
            type: dt['name'],
            data: dt,
          };
        }),
      ];

      return [...curr, ...availData].filter(Boolean);
    }, []);
  }, [data, range, legendStatus, chartType, machineType]);

  const config = {
    data: filteredData,
    xField: 'xField',
    yField: 'yField',
    legend: false, // Menonaktifkan legend bawaan
    colorField: 'type',
    // seriesField: 'type',

    // stack: true,

    // onReady: ({ chart }) => {
    //   const handleClick = (event) => {
    //     const { data } = event;
    //     const allData = chart.value.data
    //       .filter((i) => i.xField === data.data.xField)
    //       .map((e) => e.data);
    //     setSelectedData(allData);
    //     toggleDrawer({
    //       variant: variant,
    //       label: data.data.xField,
    //       demography: allData,
    //     });
    //   };

    //   chart.on('element:click', handleClick); // Desktop click
    //   chart.on('element:pointerdown', handleClick); // Mobile tap (POINTER_DOWN)
    // },
  };

  const usedLegendColor = useMemo(() => {
    if (chartType === 'demography') {
      return dictionaryLegendColorDemography[type];
    }
    if (chartType === 'summary_performance') {
      return statisticsColorSummary;
    }
    if (chartType === 'machine_utility') {
      return machineColor;
    }
    if (chartType === 'grading_trucks') {
      return statisticsColorGradingTrucks;
    }
    if (chartType === 'fruit_accepted') {
      return statisticsColorFruitAccepted;
    }
    if (chartType === 'fruit_tangkai_panjang') {
      return statisticsColorFruitTP;
    }
    if (chartType === 'fruit_rejected') {
      return statisticsColorFruitRejected;
    }

    return statisticsColorAverage;
  }, [type, chartType]);

  return (
    <div
      // style={{ display: 'flex', flexWrap: 'wrap' }}
      className='grid grid-cols-9'
    >
      <div className='col-span-8'>
        <Line
          {...config}
          height={height}
          style={{
            lineWidth: 3,
            stroke: (v) => {
              const { type } = v[0];

              return colorCodes[type];
            },
          }}
          point={{
            shapeField: 'circle',
            sizeField: 4,
            style: {
              fill: (d) => colorCodes[d.type],
              lineWidth: 0,
            },
          }}
          label={
            showLabel && {
              position: 'bottom',
              formatter: (text) => {
                const num = Number(text);
                const formatted = Number.isInteger(num) ? num : num.toFixed(3);
                return `${formatted}${unitSuffix[chartType]}`;
              },
              style: {
                fill: '#000000',
                opacity: 1,
                transform: 'translate(0, 16px)',
                textAlign: 'start',
              },
              offsetY: 8,
            }
          }
          axis={{
            x: {
              labelFormatter: (value) =>
                range === 'weekly' ? `Week ${value}` : value,
            },
            y: {
              labelFormatter: (value) => formatNumberWithK(value),
            },
          }}
          interaction={{
            tooltip: {
              render: (e, v) => {
                // console.log({ e, v });
                let getTitleFirstIndex = v.title.split(',')[0];
                let title =
                  range === 'weekly'
                    ? `Week ${getTitleFirstIndex}`
                    : range === 'monthly'
                    ? getTitleFirstIndex
                    : dayjs(reformatStringDate(getTitleFirstIndex)).format(
                        'DD MMMM YYYY'
                      );

                return (
                  <div key={v.title}>
                    <header>
                      <h4 className='font-semibold text-md'>{title}</h4>
                    </header>
                    <section className='mt-2'>
                      <ul>
                        {v.items
                          .filter(
                            (item) =>
                              item.name !== 'xField' && item.name !== 'yField'
                          )
                          .map((item, index) => {
                            return (
                              <li
                                className='flex items-center justify-between gap-2'
                                key={index}
                              >
                                <div className='flex items-center gap-2'>
                                  <div
                                    className='size-2 rounded-sm'
                                    style={{
                                      backgroundColor: colorCodes[item.name],
                                    }}
                                  ></div>

                                  <span>
                                    {chartType === 'machine_utility'
                                      ? 'Mesin '
                                      : ''}
                                    {item.name}
                                  </span>
                                </div>
                                <span className='font-semibold'>
                                  {typeof item.value === 'number'
                                    ? Number(item.value).toLocaleString()
                                    : item.value}
                                  <span className='text-xs font-thin'>
                                    {' '}
                                    {unitSuffix[chartType]}
                                  </span>
                                </span>
                              </li>
                            );
                          })}
                      </ul>
                    </section>
                  </div>
                );
              },
            },
          }}
        />
      </div>

      {/* Custom Legend */}
      <div className='flex-1'>
        <div className='h-max lg:h-full flex flex-wrap lg:justify-center lg:flex-col gap-2'>
          {Object.keys(usedLegendColor).map((key, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: chartType === 'machine_utility' ? 'pointer' : '',
                fontSize: '14px',
                fontWeight: '400',
                color: '#6D6060',
                opacity: 1,
              }}
              onClick={
                chartType === 'machine_utility'
                  ? () => handleLegendClick(key)
                  : null
              }
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 16,
                  height: 16,
                  borderRadius: '100%',
                  backgroundColor: (
                    chartType === 'machine_utility' ? legendStatus[key] : true
                  )
                    ? usedLegendColor[key]
                    : 'lightgray',
                  marginRight: 12,
                }}
              ></span>
              <span>{convertLabel(key)}</span>
            </div>
          ))}
          <div className='form-control'>
            <label className='label flex cursor-pointer items-center justify-start'>
              <input
                type='checkbox'
                checked={showLabel}
                onChange={(e) => setShowLabel(e.target.checked)}
                className='checkbox w-4 h-4 rounded-sm'
              />
              <span className='label-text ml-3'>Data Label</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineCharts;
