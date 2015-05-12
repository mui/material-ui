var React = require('react');
var mui = require('mui');
var ClearFix = mui.ClearFix;
var StylePropable = mui.Mixins.StylePropable;
var StyleResizable = mui.Mixins.StyleResizable;
var DesktopGutter = mui.Styles.Spacing.desktopGutter;

var FullWidthSection = React.createClass({

  mixins: [StylePropable, StyleResizable],

  propTypes: {
    useContent: React.PropTypes.bool,
    contentType: React.PropTypes.string,
    contentStyle: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      useContent: false,
      contentType: 'div'
    };
  },

	getStyles: function() {
		return  {
			root: {
				padding: DesktopGutter + 'px',
        boxSizing: 'border-box'
			},
			content: {
    			maxWidth: '1200px',
    			margin: '0 auto'
			},
			rootWhenSmall: {
    			paddingTop: (DesktopGutter * 2) + 'px',
    			paddingBottom: (DesktopGutter * 2) + 'px'
			},
			rootWhenLarge: {
    			paddingTop: (DesktopGutter * 3) + 'px',
    			paddingBottom: (DesktopGutter * 3) + 'px'
			}
		};
	},

	render: function() {
    var {
      style,
      useContent,
      contentType,
      contentStyle,
      ...other
    } = this.props;

		var styles = this.getStyles();

    var content;
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
	}
});

module.exports = FullWidthSection;
