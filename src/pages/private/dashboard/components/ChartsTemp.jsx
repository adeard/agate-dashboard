import { useState } from 'react';
import { Column } from '@ant-design/plots';

const data = [
  {
    product_type: 'Office supplies',
    sex: 'Male',
    order_amt: 8,
    product_sub_type: 'Eraser',
  },
  {
    product_type: 'Office supplies',
    sex: 'Male',
    order_amt: 10,
    product_sub_type: 'Bookshelf',
  },
  {
    product_type: 'Office supplies',
    sex: 'Male',
    order_amt: 20,
    product_sub_type: 'Inkstone',
  },
  {
    product_type: 'Office supplies',
    sex: 'Female',
    order_amt: 13,
    product_sub_type: 'Inkstone',
  },
  {
    product_type: 'Office supplies',
    sex: 'Female',
    order_amt: 21,
    product_sub_type: 'Eraser',
  },
  {
    product_type: 'Office supplies',
    sex: 'Female',
    order_amt: 21,
    product_sub_type: 'Bookshelf',
  },
  {
    product_type: 'Home appliances and furniture',
    sex: 'Male',
    order_amt: 13,
    product_sub_type: 'Washing machine',
  },
  {
    product_type: 'Home appliances and furniture',
    sex: 'Female',
    order_amt: 2,
    product_sub_type: 'Washing machine',
  },
  {
    product_type: 'Home appliances and furniture',
    sex: 'Male',
    order_amt: 5,
    product_sub_type: 'Microwave oven',
  },
  {
    product_type: 'Home appliances and furniture',
    sex: 'Male',
    order_amt: 14,
    product_sub_type: 'Induction cooker',
  },
  {
    product_type: 'Home appliances and furniture',
    sex: 'Female',
    order_amt: 23,
    product_sub_type: 'Microwave oven',
  },
  {
    product_type: 'Home appliances and furniture',
    sex: 'Female',
    order_amt: 23,
    product_sub_type: 'Induction cooker',
  },
  {
    product_type: 'Electronic products',
    sex: 'Male',
    order_amt: 33,
    product_sub_type: 'Computer',
  },
  {
    product_type: 'Electronic products',
    sex: 'Female',
    order_amt: 4,
    product_sub_type: 'Computer',
  },
  {
    product_type: 'Electronic products',
    sex: 'Female',
    order_amt: 23,
    product_sub_type: 'Switch',
  },
  {
    product_type: 'Electronic products',
    sex: 'Male',
    order_amt: 20.9,
    product_sub_type: 'Switch',
  },
  {
    product_type: 'Electronic products',
    sex: 'Male',
    order_amt: 5.9,
    product_sub_type: 'Mouse',
  },
  {
    product_type: 'Electronic products',
    sex: 'Female',
    order_amt: 5.9,
    product_sub_type: 'Mouse',
  },
];

const ChartsTemp = () => {
  const [legendStatus, setLegendStatus] = useState({
    Eraser: true,
    Bookshelf: true,
    Inkstone: true,
    'Washing machine': true,
    'Microwave oven': true,
    'Induction cooker': true,
    Computer: true,
    Switch: true,
    Mouse: true,
  });

  const handleLegendClick = (itemName) => {
    setLegendStatus((prevStatus) => ({
      ...prevStatus,
      [itemName]: !prevStatus[itemName],
    }));
  };

  const filteredData = data.filter(
    (item) => legendStatus[item.product_sub_type]
  );

  console.log(filteredData);

  const config = {
    data: filteredData,
    xField: 'product_type',
    yField: 'order_amt',
    legend: false,
    stack: {
      groupBy: ['x', 'series'],
      series: false,
    },
    colorField: 'product_sub_type',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ flex: 4 }}>
        <Column {...config} />
      </div>
      <div style={{ flex: 1, marginLeft: '20px' }}>
        {/* Custom Legend */}
        <div>
          {Object.keys(legendStatus).map((key, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                cursor: 'pointer',
                opacity: legendStatus[key] ? 1 : 0.5,
              }}
              onClick={() => handleLegendClick(key)}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: legendStatus[key]
                    ? data.find((item) => item.product_sub_type === key).color
                    : '#ccc',
                  marginRight: 8,
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

export default ChartsTemp;
