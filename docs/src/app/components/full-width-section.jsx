import React from 'react';
import {ClearFix, Mixins, Styles} from 'material-ui';
let {StylePropable, StyleResizable} = Mixins;
let DesktopGutter = Styles.Spacing.desktopGutter;


let FullWidthSection = React.createClass({

  mixins: [StylePropable, StyleResizable],

  propTypes: {
    children: React.PropTypes.node,
    contentStyle: React.PropTypes.object,
    contentType: React.PropTypes.string,
    style: React.PropTypes.object,
    useContent: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      useContent: false,
      contentType: 'div',
    };
  },

  getStyles() {
    return {
      root: {
        padding: DesktopGutter + 'px',
        boxSizing: 'border-box',
      },
      content: {
        maxWidth: '1200px',
        margin: '0 auto',
      },
      rootWhenSmall: {
        paddingTop: (DesktopGutter * 2) + 'px',
        paddingBottom: (DesktopGutter * 2) + 'px',
      },
      rootWhenLarge: {
        paddingTop: (DesktopGutter * 3) + 'px',
        paddingBottom: (DesktopGutter * 3) + 'px',
      },
    };
  },

  render() {
    let {
      style,
      useContent,
      contentType,
      contentStyle,
      ...other,
    } = this.props;

    let styles = this.getStyles();

    let content;
    if (useContent) {
      content =
        React.createElement(
          contentType,
          {style: this.mergeAndPrefix(styles.content, contentStyle)},
          this.props.children
        );
    } else {
      content = this.props.children;
    }

    return (
      <ClearFix {...other}
        style={this.mergeAndPrefix(
          styles.root,
          style,
          this.isDeviceSize(StyleResizable.statics.Sizes.SMALL) && styles.rootWhenSmall,
          this.isDeviceSize(StyleResizable.statics.Sizes.LARGE) && styles.rootWhenLarge)}>
        {content}
      </ClearFix>
    );
  },
});

export default FullWidthSection;
