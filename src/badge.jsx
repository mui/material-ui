import React from 'react';
import Typography from './styles/typography';
import StylePropable from './mixins/style-propable';
import muiThemeable from './muiThemeable';

let Badge = React.createClass({
  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    /**
     * This is the content rendered within the badge.
     */
    badgeContent: React.PropTypes.node.isRequired,

    /**
     * Override the inline-styles of the badge element.
     */
    badgeStyle: React.PropTypes.object,

    /**
     * The badge will be added relativelty to this node.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * If true, the badge will use the primary badge colors.
     */
    primary: React.PropTypes.bool,

    /**
     * If true, the badge will use the secondary badge colors.
     */
    secondary: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      primary: false,
      secondary: false,
    };
  },

  getStyles() {
    const theme = this.props._muiTheme.badge;

    const badgeBackgroundColor = this.props.primary
      ? theme.primaryColor
      : this.props.secondary
        ? theme.secondaryColor
        : theme.color;

    const badgeTextColor = this.props.primary
      ? theme.primaryTextColor
      : this.props.secondary
        ? theme.secondaryTextColor
        : theme.textColor;

    const radius = 12;
    const radius2x = Math.floor(2 * radius);

    return {
      root: {
        position: 'relative',
        display: 'inline-block',
        padding: [radius2x + 'px', radius2x + 'px', radius + 'px', radius + 'px'].join(' '),
      },
      badge: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        fontWeight: Typography.fontWeightMedium,
        fontSize: radius,
        width: radius2x,
        height: radius2x,
        borderRadius: '50%',
        backgroundColor: badgeBackgroundColor,
        color: badgeTextColor,
      },
    };
  },
  render() {
    const {
      style,
      children,
      badgeContent,
      badgeStyle,
      ...other,
    } = this.props;

    const styles = this.getStyles();

    return (
      <div {...other} style={this.prepareStyles(styles.root, style)}>
        {children}
        <span style={this.prepareStyles(styles.badge, badgeStyle)}>
          {badgeContent}
        </span>
      </div>
    );
  },
});

Badge = muiThemeable(Badge);

export default Badge;
