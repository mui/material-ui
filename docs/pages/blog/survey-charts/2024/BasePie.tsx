import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import { DefaultizedPieValueType } from '@mui/x-charts/models';
import type { ChartsLegendProps } from '@mui/x-charts/ChartsLegend';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface DataItem {
  label: string;
  value: number;
}

export default function BasePie(props: {
  data: DataItem[];
  angle?: number;
  margin?: Object;
  legend?: Partial<ChartsLegendProps>;
  height?: number;
}) {
  const theme = useTheme();
  console.log(theme.palette.mode);
  
  const data = props.data || [];

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const margin = props.margin || {
    right: isMobile ? 10 : isTablet ? 160 : 260,
    bottom: isMobile ? 100 : 10,
    top: 10,
    left: isMobile ? 10 : 20,
  };
  
  const height = props.height || (isMobile ? 300 : 400);
  
  const legend = props.legend
    ? props.legend
    : ({
        direction: isMobile ? 'row' : 'column',
        position: {
          vertical: isMobile ? 'bottom' : 'middle',
          horizontal: isMobile ? 'middle' : 'right',
        },
        labelStyle: {
          fontSize: isMobile ? 11 : 14,
          fill: theme.vars.palette.text.primary,
          fontWeight: 'light',
        },
        itemGap: isMobile ? 8 : 10,
        markGap: isMobile ? 3 : 8,
        itemMarkWidth: isMobile ? 8 : 10,
        maxWidth: isMobile ? 'calc(100% - 20px)' : 'auto',
      } as Partial<ChartsLegendProps>);

  const TOTAL = Array.isArray(data) ? data.map((item) => item.value).reduce((a, b) => a + b, 0) : 0;

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return percent > 0.04 ? `${(percent * 100).toFixed(2)}%` : '';
  };

  const startAngle = props.angle ? props.angle : 0;
  const endAngle = props.angle ? 360 + props.angle : 360;
  

  return (
    <Box sx={{ width: '100%', position: 'relative', textAlign: 'center' }}>
      <PieChart
        margin={margin}
        height={height}
        series={[
          {
            data,
            arcLabel: getArcLabel,
            paddingAngle: 2,
            cornerRadius: 6,
            innerRadius: isMobile ? 40 : 70,
            outerRadius: isMobile ? 90 : 150,
            startAngle,
            endAngle,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: () => ({
            fill: 'white',
            fontSize: theme.typography.pxToRem(isMobile ? 12 : 16),
            fontWeight: 400,
            pointerEvents: 'none',
          }),
          '--ChartsLegend-rootOffsetX': isMobile ? '0px' : '25px',
          '--ChartsLegend-rootOffsetY': isMobile ? '25px' : '-380px',
          '--ChartsLegend-itemWidth': isMobile ? 'auto' : '200px',
        }}
        slotProps={{
          legend: { ...legend },
        }}
      />
      <Box sx={{ position: 'absolute', bottom: isMobile ? 0 : 10, width: '100%', fontSize: 14 }}>
        <Typography
          sx={() => ({
            fontSize: theme.typography.pxToRem(13),
            marginTop: 8,
            textAlign: 'center',
            color: theme.vars.palette.text.primary,
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
