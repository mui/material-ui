// do not remove the following import (https://github.com/microsoft/TypeScript/issues/29808#issuecomment-1320713018)
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import * as React from 'react';
import { getInitColorSchemeScript as systemGetInitColorSchemeScript } from '@mui/system/cssVars';

const ATTRIBUTE = 'data-mui-color-scheme';
const MODE_KEY = 'mui-mode';
const COLOR_SCHEME_KEY = 'mui-color-scheme';

export const CONSTANT = {
  ATTRIBUTE,
  MODE_KEY,
  COLOR_SCHEME_KEY,
};

export default function getInitColorSchemeScript(
  ...params: Parameters<typeof systemGetInitColorSchemeScript>
) {
  return systemGetInitColorSchemeScript({
    attribute: ATTRIBUTE,
    colorSchemeStorageKey: COLOR_SCHEME_KEY,
    defaultMode: 'light',
    defaultLightColorScheme: 'light',
    defaultDarkColorScheme: 'dark',
    modeStorageKey: MODE_KEY,
    ...params,
  });
}
