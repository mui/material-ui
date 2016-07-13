import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import IconButton from '../IconButton';
import shallowEqual from 'recompose/shallowEqual';

export const styleSheet = createStyleSheet('Checkbox', (theme) => {
  return {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      color: theme.palette.text.secondary,
    },
    checked: {
      color: theme.palette.accent[500],
    },
  };
});

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    /**
     * If true, the checkbox will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * @ignore
     */
    id: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    /**
     * If false, the ripple effect will be disabled.
     */
    ripple: PropTypes.bool,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return (
      !shallowEqual(this.props, nextProps)
    );
  }

  handleClick = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event, !this.props.checked);
    }
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  isControlled() {
    return typeof this.props.checked === 'boolean';
  }

  render() {
    const {
      checked,
      className,
      disabled,
      id,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    const classNames = ClassNames(classes.root, {
      [classes.disabled]: disabled,
      [classes.checked]: checked,
    }, className);

    return (
      <IconButton
        id={id}
        component="span"
        className={classNames}
        disabled={disabled}
        aria-checked={checked}
        onClick={this.handleClick}
        tabIndex="0"
        role="checkbox"
        {...other}
      >
        {checked ? 'check_box' : 'check_box_outline_blank'}
      </IconButton>
    );
  }
}
