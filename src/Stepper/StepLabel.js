import React, {Component, PropTypes} from 'react';
import CheckCircle from '../svg-icons/action/check-circle';
import SvgIcon from '../SvgIcon';

const getStyles = ({active, completed, disabled}, {muiTheme, stepper}) => {
  const {
    textColor,
    disabledTextColor,
    iconColor,
    inactiveIconColor,
  } = muiTheme.stepper;
  const {orientation} = stepper;

  const styles = {
    root: {
      height: orientation === 'horizontal' ? 72 : 64,
      color: textColor,
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      paddingLeft: 14,
      paddingRight: 14,
    },
    icon: {
      color: iconColor,
      display: 'block',
      fontSize: 24,
      width: 24,
      height: 24,
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      paddingRight: 8,
      width: 24,
    },
  };

  if (active) {
    styles.root.fontWeight = 500;
  }

  if (!completed && !active) {
    styles.icon.color = inactiveIconColor;
  }

  if (disabled) {
    styles.icon.color = inactiveIconColor;
    styles.root.color = disabledTextColor;
    styles.root.cursor = 'not-allowed';
  }

  return styles;
};

class StepLabel extends Component {
  static muiName = 'StepLabel';

  static propTypes = {
    /**
     * Sets active styling. Overrides disabled coloring.
     */
    active: PropTypes.bool,
    /**
     * The label text node
     */
    children: PropTypes.node,
    /**
     * Sets completed styling. Overrides disabled coloring.
     */
    completed: PropTypes.bool,
    /**
     * Sets disabled styling.
     */
    disabled: PropTypes.bool,
    /**
     * The icon displayed by the step label.
     */
    icon: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * @ignore
     */
    last: PropTypes.bool,
    /**
     * Override the inline-style of the root element.
     */
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    stepper: PropTypes.object,
  };

  renderIcon(completed, icon, styles) {
    const iconType = typeof icon;

    if (iconType === 'number' || iconType === 'string') {
      if (completed) {
        return (
          <CheckCircle
            color={styles.icon.color}
            style={styles.icon}
          />
        );
      }

      return (
        <SvgIcon color={styles.icon.color} style={styles.icon}>
          <circle cx="12" cy="12" r="10" />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fontSize="12"
            fill="#fff"
          >
            {icon}
          </text>
        </SvgIcon>
      );
    }

    return icon;
  }

  render() {
    const {
      active, // eslint-disable-line no-unused-vars
      children,
      completed,
      icon: userIcon,
      last, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const icon = this.renderIcon(completed, userIcon, styles);

    return (
      <span style={prepareStyles(Object.assign(styles.root, style))} {...other}>
        {icon && (
          <span style={prepareStyles(styles.iconContainer)}>
            {icon}
          </span>
        )}
        {children}
      </span>
    );
  }
}

export default StepLabel;
