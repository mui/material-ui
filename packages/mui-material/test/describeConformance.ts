import { describeConformance as baseDescribeConformance } from '@mui-internal/test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { InputConformanceOptions } from 'packages/test-utils/src/describeConformance';

export default function describeConformance(
  minimalElement: React.ReactElement,
  getOptions: () => InputConformanceOptions,
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
