// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import wrapDisplayName from 'recompose/wrapDisplayName';
import { createMuiTheme } from './theme';

let DEFAULT_THEME;

function getDefaultTheme() {
  if (!DEFAULT_THEME) {
    DEFAULT_THEME = createMuiTheme();
  }
  return DEFAULT_THEME;
}

const withTheme = (BaseComponent) => {
  const WithTheme = (ownerProps, context) => {
    const { theme = getDefaultTheme() } = context;

    return <BaseComponent theme={theme} {...ownerProps} />;
  };

  WithTheme.contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  WithTheme.displayName = wrapDisplayName(BaseComponent, 'withTheme');

  return WithTheme;
};

export default withTheme;
