// @flow
// This is a fork of https://github.com/cssinjs/react-jss/blob/master/src/JssProvider.js
// waiting for the component to be released.
// Use this version at your own risk.

import { Component } from 'react';
import type { Node } from 'react';
import * as ns from 'react-jss/lib/ns';
import contextTypes from 'react-jss/lib/contextTypes';
import createGenerateClassNameDefault from 'material-ui/styles/createGenerateClassName';

type Props = {
  jss?: Object,
  registry?: Object,
  generateClassName?: Function,
  children: Node,
};

class JssProvider extends Component<Props> {
  static contextTypes = contextTypes;

  static childContextTypes = contextTypes;

  getChildContext() {
    const { registry: sheetsRegistry, jss, generateClassName } = this.props;
    const context = {
      ...this.context,
      [ns.sheetOptions]: this.context[ns.sheetOptions] || {},
    };

    if (sheetsRegistry) {
      context[ns.sheetsRegistry] = sheetsRegistry;
    }

    if (jss) {
      context[ns.jss] = jss;
    }

    if (generateClassName) {
      context[ns.sheetOptions].generateClassName = generateClassName;
    } else if (!context[ns.sheetOptions].generateClassName) {
      if (!this.generateClassName) {
        let createGenerateClassName = createGenerateClassNameDefault;

        if (jss && jss.options.createGenerateClassName) {
          createGenerateClassName = jss.options.createGenerateClassName;
        }

        this.generateClassName = createGenerateClassName();
      }

      context[ns.sheetOptions].generateClassName = this.generateClassName;
    }

    return context;
  }

  generateClassName = null;

  render() {
    return this.props.children;
  }
}

export default JssProvider;
