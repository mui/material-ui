import * as React from 'react';
import { PieChart, PieChartProps } from '@mui/x-charts/PieChart';
import { createTheme, ThemeOptions } from '@mui/material/styles';

interface ChartsComponentsPropsList {
  MuiPieChart: PieChartProps;
}

declare module '@mui/material/styles' {
  interface ComponentsPropsList extends ChartsComponentsPropsList {}
}

createTheme({} as ThemeOptions);

export default function ChartUserByCountry() {
  return <PieChart colors={[]} series={[]} />;
}
