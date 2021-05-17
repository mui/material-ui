import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles as StyledEngineGlobalStyles } from '@material-ui/styled-engine';
import defaultTheme from '../styles/defaultTheme';

function GlobalStyles(props) {
  return <StyledEngineGlobalStyles {...props} defaultTheme={defaultTheme} />;
}

GlobalStyles.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The styles you want to apply globally.
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
};

export default GlobalStyles;
