import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { name: 'Monday', Visits: 2200, Orders: 3400 },
  { name: 'Tuesday', Visits: 1280, Orders: 2398 },
  { name: 'Wedneday', Visits: 5000, Orders: 4300 },
  { name: 'Thursday', Visits: 4780, Orders: 2908 },
  { name: 'Friday', Visits: 5890, Orders: 4800 },
  { name: 'Saturday', Visits: 4390, Orders: 3800 },
  { name: 'Sunday', Visits: 4490, Orders: 4300 },
];
function SimpleLineChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Visits" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Orders" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;
