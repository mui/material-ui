// @flow weak
/* eslint-disable react/react-in-jsx-scope */

import React from 'react';
import PropTypes from 'prop-types';
import createMuiTheme from './theme';
// eslint-disable-next-line max-len
import muiThemeProviderFactory, { MUI_SHEET_ORDER as muiSheetOrder } from './muiThemeProviderFactory';

export const MUI_SHEET_ORDER = muiSheetOrder;

const MuiThemeProvider = muiThemeProviderFactory(createMuiTheme());

export default MuiThemeProvider;

export const MuiThemeProviderDocs = () => <span />;

MuiThemeProviderDocs.propTypes = {
  /**
   * You can only provide a single element.
   */
  children: PropTypes.element.isRequired,
  /**
   * A style manager instance.
   */
  styleManager: PropTypes.object,
  /**
   * A theme object.
   */
  theme: PropTypes.object,
};
