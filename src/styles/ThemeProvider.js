import {Component, PropTypes} from 'react';
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

export default class ThemeProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    styleManager: PropTypes.object,
    theme: PropTypes.object,
  };

  static childContextTypes = {
    styleManager: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  getChildContext() {
    const {theme, styleManager} = this;
    return {
      theme: theme,
      styleManager: styleManager,
    };
  }

  componentWillMount() {
    this.theme = this.props.theme || createMuiTheme();
    this.styleManager = this.props.styleManager || createStyleManager({
      theme: this.theme,
      pluginRegistry: createPluginRegistry(
        nested(),
        mediaQueries(),
        descendants(),
        pseudoClasses(),
        chained(),
        units(),
        vendorPrefixer()
      ),
    });
  }

  render() {
    return this.props.children;
  }
}
