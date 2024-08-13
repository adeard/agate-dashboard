import { useState } from 'react';
import { Column } from '@ant-design/plots';

const classificationColor = {
  MENTAH: '#D2E73E', // Warna untuk 'Mentah'
  'KURANG MATANG': '#A8D140', // Warna untuk 'Kurang Matang'
  MATANG: '#6FAA3C', // Warna untuk 'Matang'
  'LEWAT MATANG': '#D0D0D0', // Warna untuk 'Lewat Matang'
  'JANJANG KOSONG': '#E0E0E0', // Warna untuk 'Janjang Kosong'
};

const Charts = ({ data, range }) => {
  const [legendStatus, setLegendStatus] = useState({
    MENTAH: true,
    'KURANG MATANG': true,
    MATANG: false,
    'LEWAT MATANG': false,
    'JANJANG KOSONG': false,
  });

  const handleLegendClick = (key) => {
    setLegendStatus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredData = data[range].reduce((curr, item) => {
    return [
      ...curr,
      ...item['data'].map((dt) => ({
        xField: item.title,
        yField: dt['total'],
        type: dt['name'],
      })),
    ];
  }, []);

  console.log({ filteredData });

  const config = {
    data: filteredData,
    xField: 'xField',
    yField: 'yField',
    legend: false, // Menonaktifkan legend bawaan
    colorField: 'type',
    color: [
      '#D2E73E', // Warna untuk 'Mentah'
      '#A8D140', // Warna untuk 'Kurang Matang'
      '#6FAA3C', // Warna untuk 'Matang'
      '#D0D0D0', // Warna untuk 'Lewat Matang'
      '#E0E0E0', // Warna untuk 'Janjang Kosong'
    ],
    columnWidthRatio: 0.2, // Mengatur lebar kolom
    barStyle: {
      radius: [4, 4, 0, 0], // Membulatkan sudut kolom atas
    },
    // tooltip: {
    //   customContent: (title, items) => {
    //     return (
    //       <div>
    //         <h4>{title}</h4>
    //         {items.map((item, index) => {
    //           const { name, color, data } = item;
    //           return (
    //             <div key={index}>
    //               <div
    //                 style={{
    //                   margin: 0,
    //                   display: 'flex',
    //                   justifyContent: 'space-between',
    //                 }}
    //               >
    //                 <div>
    //                   <span
    //                     style={{
    //                       display: 'inline-block',
    //                       width: 6,
    //                       height: 6,
    //                       borderRadius: '50%',
    //                       backgroundColor: color,
    //                       marginRight: 6,
    //                     }}
    //                   ></span>
    //                   <span>{name}</span>
    //                 </div>
    //                 <b>{data['total']}%</b>
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     );
    //   },
    // },
    // xAxis: {
    //   label: {
    //     style: {
    //       fontSize: 12,
    //       fill: '#888888',
    //     },
    //   },
    // },
    yAxis: {
      label: {
        style: {
          fontSize: 12,
          fill: '#888888',
        },
        formatter: (val) => `${val}%`, // Format sumbu y menjadi persen
      },
      min: 0,
      max: 100, // Asumsikan sumbu y berdasarkan persentase
    },
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
                fontWeight: 'bold',
                opacity: legendStatus[key] ? 1 : 0.5,
              }}
              onClick={() => handleLegendClick(key)}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  backgroundColor: legendStatus[key]
                    ? config.color[index]
                    : '#ccc',
                  marginRight: 12,
                }}
              ></span>
              <span>{key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Charts;
