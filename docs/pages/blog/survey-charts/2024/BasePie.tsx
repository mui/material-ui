import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import { DefaultizedPieValueType } from '@mui/x-charts/models';
// import { fontWeight } from "@mui/system";
// import { light } from "@mui/material/styles/createPalette";

interface DataItem {
  label: string;
  value: number;
}

export default function BasePie(props: {
  data: DataItem[];
  angle: number;
  margin?: Object;
  legend?: Object;
  height?: number;
}) {
  const data = props.data;

  const margin = props.margin || { right: 260, bottom: 10, top: 10 };
  const height = props.height || 400;
  const legend = props.legend
    ? props.legend
    : {
        direction: 'column',
        position: {
          vertical: 'middle',
          horizontal: 'right',
        },
        labelStyle: {
          fontSize: 14,
          fill: 'black',
          fontWeight: 'light',
        },
      };

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return percent > 0.04 ? `${(percent * 100).toFixed(2)}%` : '';
  };

  const startAngle = props.angle ? props.angle : 0;
  const endAngle = props.angle ? 360 + props.angle : 360;

  return (
    <Box sx={{ width: '100%' }}>
      <PieChart
        margin={margin}
        height={height}
        series={[
          {
            data,
            arcLabel: getArcLabel,
            paddingAngle: 2,
            cornerRadius: 6,
            innerRadius: 70,
            outerRadius: 150,
            startAngle,
            endAngle,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: 16,
            fontWeight: 400,
            fontFamily: 'Montserrat',
            pointerEvents: 'none',
          },
          '--ChartsLegend-rootOffsetX': '25px',
          '--ChartsLegend-rootOffsetY': '-380px',
        }}
        slotProps={{
          legend: { ...legend },
        }}
      />
    </Box>
  );
}
