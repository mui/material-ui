// @flow
import {Component, PropTypes, Element} from 'react';
import {createMuiTheme} from './theme';
import {createStyleManager} from 'stylishly/lib/styleManager';
import {createPluginRegistry} from 'stylishly/lib/pluginRegistry';
import vendorPrefixer from 'stylishly-vendor-prefixer';
import pseudoClasses from 'stylishly-pseudo-classes';
import descendants from 'stylishly-descendants';
import chained from 'stylishly-chained';
import units from 'stylishly-units';
import nested from 'stylishly-nested';
import mediaQueries from 'stylishly-media-queries';
import keyframes from 'stylishly-keyframes';

export function createDefaultContext(props:{styleManager?: Object, theme?: Object} = {}) {
  const theme = props.theme || createMuiTheme();
  const styleManager = props.styleManager || createStyleManager({
    theme: theme,
    pluginRegistry: createPluginRegistry(
      nested(),
      mediaQueries(),
      keyframes(),
      descendants(),
      pseudoClasses(),
      chained(),
      units(),
      vendorPrefixer()
    ),
  });
  return {theme, styleManager};
}

type Props = {
  children: Element<any>,
  styleManager?: Object,
  theme?: Object,
}

export default class MuiThemeProvider extends Component<void, Props, void> {
  static childContextTypes = {
    styleManager: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      theme: this,
      styleManager: this,
    };
  }

  componentWillMount() {
    const {theme, styleManager} = createDefaultContext(this.props);
    this.theme = theme;
    this.styleManager = styleManager;
  }

  props:Props;
  theme:Object;
  styleManager:Object;

  render() {
    return this.props.children;
  }
}
