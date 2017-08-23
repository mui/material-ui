// @flow weak

import * as React from 'react';
import createEagerFactory from 'recompose/createEagerFactory';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createMuiTheme from './theme';
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
export default function withTheme<BaseProps: {}>(BaseComponent: React.ComponentType<BaseProps>) {
  const factory = createEagerFactory(BaseComponent);

  class WithTheme extends React.Component<{ theme?: Object } & BaseProps, { theme: Object }> {
    static contextTypes = themeListener.contextTypes;
    static displayName = wrapDisplayName(BaseComponent, 'withTheme');
    // Exposed for test purposes.
    static Naked = BaseComponent;

    constructor(props, context) {
      super(props, context);
      this.state = {
        // We use || as it's lazy evaluated.
        theme: themeListener.initial(context) || getDefaultTheme(),
      };
    }

    state = {};

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

    unsubscribeId = null;

    render() {
      return factory({ theme: this.state.theme, ...this.props });
    }
  }

  return WithTheme;
}
