import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { createTheme, ThemeOptions } from '@mui/material/styles';

import '@mui/x-charts/themeAugmentation';

export const getDesignTokens = () => ({}) as ThemeOptions;

export const brandingDarkTheme = createTheme(getDesignTokens());

const colors: string[] = [];

export default function ChartUserByCountry() {
  return <PieChart colors={colors} series={[]} />;
}
