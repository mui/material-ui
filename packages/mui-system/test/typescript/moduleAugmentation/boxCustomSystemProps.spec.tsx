import * as React from 'react';
import { Box } from '@mui/system';

declare module '@mui/system' {
  interface CustomSystemProps {
    customProp?: 'customValue';
  }
}

function CustomSystemPropsTest() {
  <Box customProp="customValue" />;
}

function InvalidCustomSystemPropsValueTest() {
  // @ts-expect-error otherCustomValue is not assignable to customValue
  <Box customProp="otherCustomValue" />;
}

function UndefinedCustomSystemPropsTest() {
  // @ts-expect-error otherCustomProp is not defined in CustomSystemProps
  <Box otherCustomProp="customValue" />;
}
