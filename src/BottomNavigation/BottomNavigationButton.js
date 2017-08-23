// @flow weak
// @inheritedComponent ButtonBase

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';

export const styles = (theme: Object) => ({
  root: {
    transition: theme.transitions.create(['color', 'padding-top'], {
      duration: theme.transitions.duration.short,
    }),
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    minWidth: 80,
    maxWidth: 168,
    background: 'none',
    color: theme.palette.text.secondary,
    flex: '1',
  },
  selected: {
    paddingTop: 6,
    color: theme.palette.primary[500],
  },
  selectedIconOnly: {
    paddingTop: 16,
  },
  label: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize - 2,
    opacity: 1,
    transition: 'font-size 0.2s, opacity 0.2s',
    transitionDelay: '0.1s',
  },
  selectedLabel: {
    fontSize: theme.typography.fontSize,
  },
  hiddenLabel: {
    opacity: 0,
    transitionDelay: '0s',
  },
  icon: {
    display: 'block',
    margin: 'auto',
  },
});

class BottomNavigationButton extends React.Component<$FlowFixMeProps> {
  handleChange = event => {
    const { onChange, value, onClick } = this.props;

    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  render() {
    const {
      label,
      icon: iconProp,
      selected,
      classes,
      className: classNameProp,
      showLabel: showLabelProp,
      onChange,
      value,
      ...other
    } = this.props;

    const className = classNames(
      classes.root,
      {
        [classes.selected]: selected,
        [classes.selectedIconOnly]: !showLabelProp && !selected,
      },
      classNameProp,
    );

    const iconClassName = classNames(
      classes.icon,
      React.isValidElement(iconProp) ? iconProp.props.className : null,
    );

    const icon = React.isValidElement(iconProp)
      ? React.cloneElement(iconProp, { className: iconClassName })
      : <Icon>
          {iconProp}
        </Icon>;

    const labelClassName = classNames(classes.label, {
      [classes.selectedLabel]: selected,
      [classes.hiddenLabel]: !showLabelProp && !selected,
    });

    return (
      <ButtonBase className={className} focusRipple {...other} onClick={this.handleChange}>
        {icon}
        <span className={labelClassName}>
          {label}
        </span>
      </ButtonBase>
    );
  }
}

BottomNavigationButton.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon element. If a string is provided, it will be used as a font ligature.
   */
  icon: PropTypes.node,
  /**
   * The label element.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  selected: PropTypes.bool,
  /**
   * If `true`, the BottomNavigationButton will show its label.
   */
  showLabel: PropTypes.bool,
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any,
};

export default withStyles(styles, { name: 'MuiBottomNavigationButton' })(BottomNavigationButton);
