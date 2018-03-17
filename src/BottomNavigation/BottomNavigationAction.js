// @inheritedComponent ButtonBase

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';

export const styles = theme => ({
  root: {
    transition: theme.transitions.create(['color', 'padding-top'], {
      duration: theme.transitions.duration.short,
    }),
    paddingTop: theme.spacing.unit,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    minWidth: 80,
    maxWidth: 168,
    color: theme.palette.text.secondary,
    flex: '1',
  },
  selected: {
    paddingTop: 6,
    color: theme.palette.primary.main,
  },
  selectedIconOnly: {
    paddingTop: theme.spacing.unit * 2,
  },
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  label: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    opacity: 1,
    transition: 'font-size 0.2s, opacity 0.2s',
    transitionDelay: '0.1s',
  },
  labelSelected: {
    fontSize: theme.typography.pxToRem(14),
  },
  labelHidden: {
    opacity: 0,
    transitionDelay: '0s',
  },
});

class BottomNavigationAction extends React.Component {
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
      classes,
      className: classNameProp,
      icon,
      label,
      onChange,
      onClick,
      selected,
      showLabel: showLabelProp,
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

    const labelClassName = classNames(classes.label, {
      [classes.labelSelected]: selected,
      [classes.labelHidden]: !showLabelProp && !selected,
    });

    return (
      <ButtonBase className={className} focusRipple onClick={this.handleChange} {...other}>
        <span className={classes.wrapper}>
          {icon}
          <span className={labelClassName}>{label}</span>
        </span>
      </ButtonBase>
    );
  }
}

BottomNavigationAction.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon element.
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
   * If `true`, the BottomNavigationAction will show its label.
   */
  showLabel: PropTypes.bool,
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any,
};

export default withStyles(styles, { name: 'MuiBottomNavigationAction' })(BottomNavigationAction);
