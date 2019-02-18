/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { getDisplayName, ponyfillGlobal } from '@material-ui/utils';
import createMuiTheme from './createMuiTheme';
import themeListener from './themeListener';

let defaultTheme;

function getDefaultTheme() {
  if (defaultTheme) {
    return defaultTheme;
  }

  defaultTheme = createMuiTheme();
  return defaultTheme;
}

// Provide the theme object as a property to the input component.
const withThemeOld = Component => {
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && Component === undefined) {
    throw new Error(
      [
        'You are calling withTheme(Component) with an undefined component.',
        'You may have forgotten to import it.',
      ].join('\n'),
    );
  }

  class WithTheme extends React.Component {
    constructor(props, context) {
      super();
      this.state = {
        // We use || as the function call is lazy evaluated.
        theme: themeListener.initial(context) || getDefaultTheme(),
      };
    }

    componentDidMount() {
      this.unsubscribeId = themeListener.subscribe(this.context, theme => {
        this.setState({ theme });
      });
    }

    componentWillUnmount() {
      if (this.unsubscribeId !== null) {
        themeListener.unsubscribe(this.context, this.unsubscribeId);
      }
    }

    render() {
      const { innerRef, ...other } = this.props;
      return <Component theme={this.state.theme} ref={innerRef} {...other} />;
    }
  }

  WithTheme.propTypes = {
    /**
     * Use that property to pass a ref callback to the decorated component.
     */
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  };

  WithTheme.contextTypes = themeListener.contextTypes;

  if (process.env.NODE_ENV !== 'production') {
    WithTheme.displayName = `WithTheme(${getDisplayName(Component)})`;
  }

  hoistNonReactStatics(WithTheme, Component);

  if (process.env.NODE_ENV !== 'production') {
    // Exposed for test purposes.
    WithTheme.Naked = Component;
  }

  return WithTheme;
};

/* istanbul ignore if */
if (!ponyfillGlobal.__MUI_STYLES__) {
  ponyfillGlobal.__MUI_STYLES__ = {};
}

if (!ponyfillGlobal.__MUI_STYLES__.withTheme) {
  ponyfillGlobal.__MUI_STYLES__.withTheme = withThemeOld;
}

export default ponyfillGlobal.__MUI_STYLES__.withTheme;
