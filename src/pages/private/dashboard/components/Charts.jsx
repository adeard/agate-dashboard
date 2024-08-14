import { useEffect, useMemo, useState } from 'react';
import { Column } from '@ant-design/plots';
import { convertLabel } from '@/utils/common';

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

const Charts = ({ data, range, type, variant = 'inti' }) => {
  const [legendStatus, setLegendStatus] = useState({
    MENTAH: true,
    'KURANG MATANG': true,
    MATANG: true,
    'LEWAT MATANG': true,
    'JANJANG KOSONG': true,
  });

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

      return [
        ...curr,
        // item['data'].length === 0 ? { xField: item.title, yField: 0 } : null,
        ...availData,
      ].filter(Boolean);
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
    columnWidthRatio: 0.2, // Mengatur lebar kolom
    barStyle: {
      radius: [4, 4, 0, 0], // Membulatkan sudut kolom atas
    },
    stack: true,
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Chart */}
      <div style={{ flex: 4 }}>
        <Column
          {...config}
          style={{
            fill: ({ type }) => {
              return classificationColor[type];
            },
          }}
          axis={{
            x: {},
            y: {
              labelFormatter: (value) => `${value}%`,
            },
          }}
          interaction={{
            tooltip: {
              render: (e, v) => {
                return (
                  <div key={v.title}>
                    <h4 className='font-semibold text-md'>{v.title}</h4>
                    {v.items.map((item) => {
                      const { name, value, color } = item;
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
                                {name.toLowerCase()}
                              </span>
                            </div>
                            <b>{Number(value).toFixed(2)}%</b>
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
      <div style={{ flex: 1, marginLeft: '20px' }}>
        <div>
          {Object.keys(legendStatus).map((key, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
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
