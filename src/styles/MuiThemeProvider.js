// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import createBroadcast from 'brcast';
import themeListener, { CHANNEL } from './themeListener';

class MuiThemeProvider extends React.Component<Object> {
  constructor(props: Object, context: Object) {
    super(props, context);

    // Get the outer theme from the context, can be null
    this.outerTheme = themeListener.initial(context);
    // Propagate the theme so it can be accessed by the children
    this.broadcast.setState(this.mergeOuterLocalTheme(this.props.theme));
  }

  getChildContext() {
    if (this.props.sheetsManager) {
      return {
        [CHANNEL]: this.broadcast,
        sheetsManager: this.props.sheetsManager,
      };
    }

    return {
      [CHANNEL]: this.broadcast,
    };
  }

  componentDidMount() {
    // Subscribe on the outer theme, if present
    this.unsubscribeId = themeListener.subscribe(this.context, outerTheme => {
      this.outerTheme = outerTheme;
      // Forward the parent theme update to the children
      this.broadcast.setState(this.mergeOuterLocalTheme(this.props.theme));
    });
  }

  componentWillReceiveProps(nextProps: Object) {
    // Propagate a local theme update
    if (this.props.theme !== nextProps.theme) {
      this.broadcast.setState(this.mergeOuterLocalTheme(nextProps.theme));
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeId !== null) {
      themeListener.unsubscribe(this.context, this.unsubscribeId);
    }
  }

  broadcast = createBroadcast();
  unsubscribeId = null;
  // We are not using the React state in order to avoid unnecessary rerender.
  outerTheme = null;

  // Simple merge between the outer theme and the local theme
  mergeOuterLocalTheme(localTheme: Object) {
    // To support composition of theme.
    if (typeof localTheme === 'function') {
      return localTheme(this.outerTheme);
    }

    if (!this.outerTheme) {
      return localTheme;
    }

    return { ...this.outerTheme, ...localTheme };
  }

  render() {
    return this.props.children;
  }
}

MuiThemeProvider.propTypes = {
  /**
   * You can only provide a single element.
   */
  children: PropTypes.element.isRequired,
  /**
   * The sheetsManager is used in order to only inject once a style sheet in a page for
   * a given theme object.
   * You should provide on the server.
   */
  sheetsManager: PropTypes.object,
  /**
   * A theme object.
   */
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

MuiThemeProvider.childContextTypes = {
  ...themeListener.contextTypes,
  sheetsManager: PropTypes.object,
};

MuiThemeProvider.contextTypes = themeListener.contextTypes;

export default MuiThemeProvider;
