import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import '@mui/x-charts/themeAugmentation';

export const getDesignTokens = () => ({}) as ThemeOptions;

export const brandingDarkTheme = createTheme(getDesignTokens());

const colors: string[] = [];

export default function ChartUserByCountry() {
  return (
    <React.Fragment>
      <Typography />
      <PieChart colors={colors} series={[]} />
    </React.Fragment>
  );
}
