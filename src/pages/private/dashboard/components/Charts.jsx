import { useEffect, useMemo, useState } from 'react';
import { Column, G2 } from '@ant-design/plots';
import {
  convertLabel,
  countPercentage,
  formatNumberWithK,
} from '@/utils/common';

const classificationColor = {
  MENTAH: '#CDE441',
  'KURANG MATANG': '#78C52A',
  MATANG: '#4BA92A',
  'LEWAT MATANG': '#617E46',
  'JANJANG KOSONG': '#436840',
  'BUAH KECIL DIBAWAH 3KG': '#CDE441',
  'BUAH KECIL DIBAWAH 5KG': '#78C52A',
  'TANGKAI PANJANG': '#CDE441',
};

const Charts = ({
  data,
  range,
  type,
  variant = 'inti',
  height,
  width,
  toggleDrawer,
  dividerPercent = null,
}) => {
  const [legendStatus, setLegendStatus] = useState({
    MENTAH: true,
    'KURANG MATANG': true,
    MATANG: true,
    'LEWAT MATANG': true,
    'JANJANG KOSONG': true,
  });
  const [selectedData, setSelectedData] = useState(null);

  console.log({ dividerPercent, range });

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
      console.log({ founded });
      return founded;
    } else {
      return [];
    }
  }, [range, dividerPercent]);

  const filteredData = useMemo(() => {
    return data[range].reduce((curr, item) => {
      let availData = [
        ...item['data'].map((dt) => {
          const isLegendActive = legendStatus[dt.name] === true;
          if (isLegendActive) {
            return {
              xField: item.title,
              yField: dt['total'],
              type: dt['name'],
              data: dt,
            };
          }
        }),
      ];

      return [...curr, ...availData].filter(Boolean);
    }, []);
  }, [data, range, legendStatus]);

  const config = {
    data: filteredData,
    xField: 'xField',
    yField: 'yField',
    legend: false, // Menonaktifkan legend bawaan
    colorField: 'type',
    // seriesField: 'type',
    color: [
      '#CDE441', // Warna untuk 'Mentah'
      '#78C52A', // Warna untuk 'Kurang Matang'
      '#4BA92A', // Warna untuk 'Matang'
      '#617E46', // Warna untuk 'Lewat Matang'
      '#436840', // Warna untuk 'Janjang Kosong'
    ],
    stack: true,

    onReady: ({ chart }) => {
      const handleClick = (event) => {
        const { data } = event;
        const allData = chart.value.data
          .filter((i) => i.xField === data.data.xField)
          .map((e) => e.data);
        setSelectedData(allData);
        toggleDrawer({
          variant: variant,
          label: data.data.xField,
          demography: allData,
        });
      };

      chart.on('element:click', handleClick); // Desktop click
      chart.on('element:pointerdown', handleClick); // Mobile tap (POINTER_DOWN)
    },
  };

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap' }}
      className='chart-container'
    >
      {/* Chart */}
      <div style={{ flex: 4 }}>
        <Column
          {...config}
          height={height}
          width={width}
          style={{
            fill: ({ type }) => {
              return classificationColor[type];
            },
            radiusTopLeft: 32,
            radiusTopRight: 32,
          }}
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
                const total = v.items.reduce(
                  (acc, curr) => acc + Number(curr.value || 0),
                  0
                );
                const sameDate =
                  rangeMainData?.find((e) => e.title === v.title) || null;
                const totalDivider =
                  sameDate?.data?.reduce(
                    (acc, curr) => acc + Number(curr?.total || 0),
                    0
                  ) || total;

                return (
                  <div key={v.title}>
                    <h4 className='font-semibold text-md'>
                      {range === 'weekly' ? 'Week ' : ''}
                      {v.title}
                    </h4>
                    <h5 className='text-xs font-semibold italic'>
                      Total: {total} tbs
                    </h5>
                    {v.items.map((item) => {
                      const { name, value } = item;
                      return (
                        <div>
                          <div
                            style={{
                              margin: 0,
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: '8px',
                            }}
                          >
                            <div>
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  backgroundColor: classificationColor[name],
                                  marginRight: 6,
                                }}
                              ></span>
                              <span className='capitalize'>
                                {convertLabel(name)}
                              </span>
                            </div>
                            <b>
                              {countPercentage(value, totalDivider).toFixed(2)}%
                            </b>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              },
            },
          }}
        />
      </div>

      {/* Custom Legend */}
      <div style={{ flex: 1, marginLeft: '20px' }} className='custom-legend'>
        <div className='h-max lg:h-full flex flex-wrap lg:justify-center lg:flex-col gap-2'>
          {Object.keys(legendStatus).map((key, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '400',
                color: '#6D6060',
                opacity: legendStatus[key] ? 1 : 0.5,
              }}
              onClick={() => handleLegendClick(key)}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 14,
                  height: 14,
                  borderRadius: '25%',
                  backgroundColor: legendStatus[key]
                    ? config.color[index]
                    : '#ccc',
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

export default Charts;
