import React from 'react';
import {AppCanvas, Styles, Mixins} from 'material-ui';

import CodeExample from '../code-example/code-example';
import FullWidthSection from '../full-width-section';

import AppBarWaterfallExample from './app-bar-waterfall-example';
import AppBarWaterfallExampleCode from '!raw!./app-bar-waterfall-example';

const {StylePropable} = Mixins;
const {Typography} = Styles;
const ThemeManager = Styles.ThemeManager;
const DefaultRawTheme = Styles.LightRawTheme;

const AppBarWaterfall = React.createClass({

  mixins: [StylePropable],

  getInitialState() {
    let muiTheme = ThemeManager.getMuiTheme(DefaultRawTheme);
    // To switch to RTL...
    // muiTheme.isRtl = true;
    return {
      muiTheme,
    };
  },

  contextTypes: {
    router: React.PropTypes.func,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getStyles() {
    return {
      headline: {
        //headline
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack,
      },
    };
  },

  render() {
    let styles = this.getStyles();
    return (
      <AppCanvas>
        <AppBarWaterfallExample/>
        <FullWidthSection>
          <h2 style={styles.headline}>Waterfall AppBar</h2>

          <p>Here is an example of how you can obtain a nice animation effect on scroll
            when using position waterfall.</p>
          <CodeExample code={AppBarWaterfallExampleCode}/>
        </FullWidthSection>
      </AppCanvas>
    );
  },
});

export default AppBarWaterfall;
