import React, {PropTypes} from 'react';
import getMuiTheme from './styles/getMuiTheme';

function getStyles(props, state) {
  const {
    primary,
    secondary,
  } = props;

  const {
    badge,
  } = state.muiTheme;

  let badgeBackgroundColor;
  let badgeTextColor;

  if (primary) {
    badgeBackgroundColor = badge.primaryColor;
    badgeTextColor = badge.primaryTextColor;
  } else if (secondary) {
    badgeBackgroundColor = badge.secondaryColor;
    badgeTextColor = badge.secondaryTextColor;
  } else {
    badgeBackgroundColor = badge.color;
    badgeTextColor = badge.textColor;
  }

  const radius = 12;
  const radius2x = Math.floor(2 * radius);

  return {
    root: {
      position: 'relative',
      display: 'inline-block',
      padding: `${radius2x}px ${radius2x}px ${radius}px ${radius}px`,
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
      fontWeight: badge.fontWeight,
      fontSize: radius,
      width: radius2x,
      height: radius2x,
      borderRadius: '50%',
      backgroundColor: badgeBackgroundColor,
      color: badgeTextColor,
    },
  };
}

const Badge = React.createClass({
  propTypes: {
    /**
     * This is the content rendered within the badge.
     */
    badgeContent: PropTypes.node.isRequired,

    /**
     * Override the inline-styles of the badge element.
     */
    badgeStyle: PropTypes.object,

    /**
     * The badge will be added relativelty to this node.
     */
    children: PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,

    /**
     * If true, the badge will use the primary badge colors.
     */
    primary: PropTypes.bool,

    /**
     * If true, the badge will use the secondary badge colors.
     */
    secondary: PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
  },

  getDefaultProps() {
    return {
      primary: false,
      secondary: false,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  render() {
    const {
      style,
      children,
      badgeContent,
      badgeStyle,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    return (
      <div {...other} style={prepareStyles(Object.assign({}, styles.root, style))}>
        {children}
        <span style={prepareStyles(Object.assign({}, styles.badge, badgeStyle))}>
          {badgeContent}
        </span>
      </div>
    );
  },
});

export default Badge;
