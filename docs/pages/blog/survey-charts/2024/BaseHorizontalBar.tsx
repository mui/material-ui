import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// function generateTickValues(maxValue) {
//   let maxValueRoundedUp = Math.ceil(maxValue / 10) * 10;
//   let tickValues = [];

//   for (let i = 0; i <= maxValueRoundedUp; i += 1) {
//     tickValues.push(i);
//   }

//   return tickValues;
// }

interface DataItem {
  label: string;
  value: number;
}

function XBar(props: { data: DataItem[]; margin?: Object; height?: number; total?: number }) {
  const data = props.data || []; // Fallback to an empty array
  const dataX = Array.isArray(data) ? data.map((d) => d.label) : [];
  const dataY = Array.isArray(data) ? data.map((d) => d.value) : [];

  const TOTAL = props.total;
  const margin = props.margin || { top: 5, right: 10, bottom: 80, left: 150 };
  const height = props.height || 400;

  // ---- Add truncation logic ----
  const MAX_LABEL_LENGTH = 20; // Adjust as needed

  const truncateLabel = (label: string) => {
    if (label.length > MAX_LABEL_LENGTH) {
      return `${label.substring(0, MAX_LABEL_LENGTH)}...`;
    }
    return label;
  };
  // -----------------------------

  return (
    <Box sx={{ width: '100%', position: 'relative', textAlign: 'center' }}>
      <BarChart
        yAxis={[
          {
            scaleType: 'band',
            data: dataX, // Use original labels
            tickPlacement: 'middle',
            // Add axis valueFormatter with conditional logic
            valueFormatter: (label, context) =>
              context.location === 'tick'
                ? truncateLabel(label) // Truncated for axis tick
                : label, // Full label for tooltip header
          },
        ]}
        series={[{ data: dataY }]}
        height={height}
        margin={margin}
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

export default function BaseHorizontalBar(props: { data: DataItem[]; total?: number }) {
  const { data = [], total } = props; // Provide a default empty array for data
  return <XBar data={data} total={total} />;
}
