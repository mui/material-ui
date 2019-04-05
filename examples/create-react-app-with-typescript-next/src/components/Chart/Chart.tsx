import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Title } from '..';

export const Chart = () => {
    return (
        <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 0
                    }}
                >
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};

// ----- Generate Sales Data -----
function createData(time: string, amount: number | undefined) {
    return { time, amount };
}

const data = [
    createData('00:00', 1200),
    createData('03:00', 600),
    createData('06:00', 300),
    createData('09:00', 1000),
    createData('12:00', 2000),
    createData('15:00', 2400),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined)
];
