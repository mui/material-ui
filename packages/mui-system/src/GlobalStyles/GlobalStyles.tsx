import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles as MuiGlobalStyles, Interpolation } from '@mui/styled-engine';
import useTheme from '../useTheme';
import { Theme as SystemTheme } from '../createTheme';

export interface GlobalStylesProps<Theme = SystemTheme> {
  styles: Interpolation<Theme>;
  defaultTheme?: object;
  identifier?: string;
}

function GlobalStyles<Theme = SystemTheme>({
  styles,
  identifier,
  defaultTheme = {},
}: GlobalStylesProps<Theme>) {
  const upperTheme = useTheme(defaultTheme);

  const globalStyles =
    typeof styles === 'function'
      ? styles(identifier ? (upperTheme as any)[identifier] || upperTheme : upperTheme)
      : styles;

  return <MuiGlobalStyles styles={globalStyles as any} />;
}

GlobalStyles.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  defaultTheme: PropTypes.any,
  /**
   * @ignore
   */
  identifier: PropTypes.string,
  /**
   * @ignore
   */
  styles: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.number,
    PropTypes.object,
    PropTypes.shape({
      __emotion_styles: PropTypes.any.isRequired,
    }),
    PropTypes.string,
    PropTypes.bool,
  ]),
} as any;

export default GlobalStyles;
