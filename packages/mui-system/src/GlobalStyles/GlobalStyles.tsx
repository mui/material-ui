'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles as MuiGlobalStyles, Interpolation } from '@mui/styled-engine';
import useTheme from '../useTheme';
import { Theme as SystemTheme } from '../createTheme';

export interface GlobalStylesProps<Theme = SystemTheme> {
  styles: Interpolation<Theme>;
  defaultTheme?: object;
  themeId?: string;
}

function GlobalStyles<Theme = SystemTheme>({
  styles,
  themeId,
  defaultTheme = {},
}: GlobalStylesProps<Theme>) {
  const upperTheme = useTheme(defaultTheme);

  const globalStyles =
    typeof styles === 'function'
      ? styles(themeId ? (upperTheme as any)[themeId] || upperTheme : upperTheme)
      : styles;

  return <MuiGlobalStyles styles={globalStyles as any} />;
}

GlobalStyles.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  defaultTheme: PropTypes.object,
  /**
   * @ignore
   */
  styles: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  /**
   * @ignore
   */
  themeId: PropTypes.string,
} as any;

export default GlobalStyles;
