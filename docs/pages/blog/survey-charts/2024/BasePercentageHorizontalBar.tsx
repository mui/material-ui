import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';

// function roundToNearest(num) {
//   if (num < 7) return 5;

//   return 10;
// }

// function generateTickValues(maxValue, tickSize = 10) {
//   let tickValues = [];
//   const roundedTickSize = roundToNearest(tickSize);
//   let maxValueRoundedUp =
//     Math.ceil(maxValue / roundedTickSize) * roundedTickSize;

//   for (let i = 0; i < maxValue; i += roundedTickSize) {
//     tickValues.push(i);
//   }
//   tickValues.push(maxValueRoundedUp);

//   return tickValues;
// }

interface DataItem {
  label: string;
  value: number;
}

interface ExtendedDataItem extends DataItem {
  originalValue: number;
  total: number;
}

function XBar(props: { data: ExtendedDataItem[]; margin?: Object; height?: number }) {
  const data = props.data;
  const dataY = data.map((d) => d.label);
  const dataX = data.map((d) => d.value);

  const TOTAL = props.data.length > 0 ? props.data[0].total : 0;

  const margin = props.margin || { top: 5, right: 10, bottom: 80, left: 150 };
  const height = props.height || 400;

  const MAX_LABEL_LENGTH = 20; // Adjust as needed

  const truncateLabel = (label: string) => {
    if (label.length > MAX_LABEL_LENGTH) {
      return `${label.substring(0, MAX_LABEL_LENGTH)}...`;
    }
    return label;
  };

  return (
    <Box sx={{ width: '100%', position: 'relative', textAlign: 'center' }}>
      <BarChart
        margin={margin}
        height={height}
        yAxis={[{
          scaleType: 'band',
          data: dataY,
          tickPlacement: 'middle',
          valueFormatter: (label, context) =>
            context.location === 'tick'
              ? truncateLabel(label)
              : label,
        }]}
        series={[{
          type: 'bar',
          data: dataX,
          valueFormatter: (value, context) => {
            const dataIndex = context.dataIndex;
            if (dataIndex === undefined || dataIndex < 0 || dataIndex >= props.data.length) {
              return '';
            }
            const originalItem = props.data[dataIndex];
            return `${originalItem.value.toFixed(2)}% (${originalItem.originalValue} respondents)`;
          },
        }]}
        layout="horizontal"
      />
      <Box sx={{ position: 'absolute', bottom: 10, width: '100%', fontSize: 14 }}>
        <Typography
          sx={(theme) => ({
            fontSize: theme.typography.pxToRem(13),
            marginTop: 8,
            textAlign: 'center',
            color: (theme.vars || theme).palette.grey[700],
            '& a': {
              color: 'inherit',
              textDecoration: 'underline',
            },
          })}
        >
          {TOTAL} respondents.
        </Typography>
      </Box>
    </Box>
  );
}

export default function BasePercentageHorizontalBar(props: { data: DataItem[]; total: number }) {
  const { data, total } = props;

  const dataWithPercentage = data.map((d) => ({
    ...d,
    value: parseFloat(((d.value / total) * 100).toFixed(2)),
    originalValue: d.value,
    total: props.total,
  }));

  return <XBar data={dataWithPercentage} />;
}
