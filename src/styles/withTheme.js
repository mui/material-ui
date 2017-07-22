// @flow weak

import { Component } from 'react';
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
export default function withTheme(BaseComponent) {
  const factory = createEagerFactory(BaseComponent);

  class WithTheme extends Component {
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
      this.unsubscribe = themeListener.subscribe(this.context, theme => {
        this.setState({ theme });
      });
    }

    componentWillUnmount() {
      if (this.unsubscribe !== null) {
        this.unsubscribe();
      }
    }

    unsubscribe = null;

    render() {
      return factory({ theme: this.state.theme, ...this.props });
    }
  }

  WithTheme.contextTypes = themeListener.contextTypes;
  WithTheme.displayName = wrapDisplayName(BaseComponent, 'withTheme');

  return WithTheme;
}
