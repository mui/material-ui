import {
  describeConformance as baseDescribeConformance,
  ConformanceOptions,
} from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DefaultPropsProvider from '@mui/material/DefaultPropsProvider';

export default function describeConformance(
  minimalElement: React.ReactElement<unknown>,
  getOptions: () => ConformanceOptions,
) {
  function getOptionsWithDefaults() {
    return {
      ThemeProvider,
      createTheme,
      DefaultPropsProvider,
      ...getOptions(),
    };
  }

  return baseDescribeConformance(minimalElement, getOptionsWithDefaults);
}
