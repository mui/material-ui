import {
  describeConformance as baseDescribeConformance,
  ConformanceOptions,
} from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/system';

export default function describeConformance(
  minimalElement: React.ReactElement<unknown>,
  getOptions: () => ConformanceOptions,
) {
  function getOptionsWithDefaults() {
    return {
      ThemeProvider,
      createTheme,
      ...getOptions(),
    };
  }

  return baseDescribeConformance(minimalElement, getOptionsWithDefaults);
}
