import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { createTheme, ThemeOptions } from '@mui/material/styles';

import '@mui/x-charts/themeAugmentation';

createTheme({} as ThemeOptions);

export default function ChartUserByCountry() {
  return <PieChart colors={[]} series={[]} />;
}
