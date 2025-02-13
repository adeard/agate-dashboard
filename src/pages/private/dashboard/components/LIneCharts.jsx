import { useEffect, useMemo, useState } from 'react';
import { Column, G2, Line } from '@ant-design/plots';
import {
  convertLabel,
  countPercentage,
  formatNumberWithK,
} from '@/utils/common';
import dayjs from 'dayjs';

const classificationColor = {
  MENTAH: '#4A4A4A',
  'KURANG MATANG': '#FFE082',
  MATANG: '#FF8A80',
  'LEWAT MATANG': '#FFB74D',
  'JANJANG KOSONG': '#B0BEC5',
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
  machine_utility: '%',
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
    MENTAH: true,
    'KURANG MATANG': true,
    MATANG: true,
    'LEWAT MATANG': true,
    'JANJANG KOSONG': true,
  });
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    if (type === 'main') {
      if (variant === 'inti') {
        setLegendStatus({
          MENTAH: true,
          'KURANG MATANG': true,
          MATANG: true,
          'LEWAT MATANG': true,
          'JANJANG KOSONG': true,
        });
      } else {
        setLegendStatus({
          MENTAH: true,
          MATANG: true,
          'LEWAT MATANG': true,
          'JANJANG KOSONG': true,
        });
      }
    } else if (type === 'size') {
      setLegendStatus({
        'BUAH KECIL DIBAWAH 3KG': true,
        'BUAH KECIL DIBAWAH 5KG': true,
      });
    } else {
      setLegendStatus({
        'TANGKAI PANJANG': true,
      });
    }
  }, [type]);

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
          return {
            xField: item.title,
            yField: dt['total'],
            type: dt['name'],
            data: dt,
          };
          //   const isLegendActive = legendStatus[dt.name] === true;
          //   if (isLegendActive) {
          //     return {
          //       xField: item.title,
          //       yField: dt['total'],
          //       type: dt['name'],
          //       data: dt,
          //     };
          //   }
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
          style={{ lineWidth: 2 }}
          scale={
            chartType === 'machine_utility'
              ? {
                  color: {
                    domain: ['Mesin 1', 'Mesin 2', 'Mesin 3', 'Mesin 4'],
                    range: ['#64B5F6', '#4DD0E1', '#4DB6AC', '#81C784'],
                  },
                }
              : {
                  color:
                    chartType === 'demography'
                      ? {
                          domain: [
                            'MENTAH',
                            'KURANG MATANG',
                            'MATANG',
                            'LEWAT MATANG',
                            'JANJANG KOSONG',
                            'BUAH KECIL DIBAWAH 3KG',
                            'BUAH KECIL DIBAWAH 5KG',
                            'TANGKAI PANJANG',
                          ],
                          range: [
                            '#4A4A4A', // MENTAH (soft black)
                            '#FFE082', // KURANG MATANG (soft yellow)
                            '#FF8A80', // MATANG (soft red)
                            '#FFB74D', // LEWAT MATANG (soft orange)
                            '#B0BEC5',
                            '#CDE441',
                            '#78C52A',
                            '#CDE441',
                          ],
                        }
                      : {
                          domain:
                            chartType === 'summary_performance'
                              ? ['Diterima', 'Didenda', 'Ditolak']
                              : ['Highest', 'Average', 'Lowest'],
                          range: ['#6BAB25', '#F0CC00', '#AC0F18'],
                        },
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
                let title =
                  range === 'weekly'
                    ? `Week ${v.title}`
                    : range === 'monthly'
                    ? v.title
                    : dayjs(reformatStringDate(v.title)).format('DD MMMM YYYY');

                let totalDivider = null;

                if (chartType === 'demography') {
                  const total = v.items.reduce(
                    (acc, curr) => acc + Number(curr.value || 0),
                    0
                  );
                  const sameDate =
                    rangeMainData?.find((e) => e.title === v.title) || null;
                  totalDivider =
                    sameDate?.data?.reduce(
                      (acc, curr) => acc + Number(curr?.total || 0),
                      0
                    ) || total;
                }

                return (
                  <div key={v.title}>
                    <header>
                      <h4 className='font-semibold text-md'>{title}</h4>
                    </header>
                    <section className='mt-2'>
                      <ul>
                        {v.items.map((item) => {
                          return (
                            <li className='flex items-center justify-between gap-2'>
                              <div className='flex items-center gap-2'>
                                <div
                                  className='size-2 rounded-sm'
                                  style={{ backgroundColor: item.color }}
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
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '400',
                color: '#6D6060',
                opacity: 1,
              }}
              // onClick={() => handleLegendClick(key)}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 14,
                  height: 14,
                  borderRadius: '25%',
                  backgroundColor: usedLegendColor[key],
                  marginRight: 12,
                }}
              ></span>
              <span>{convertLabel(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineCharts;
