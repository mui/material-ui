import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import ClassNames from 'classnames';
import shallowEqual from 'recompose/shallowEqual';
import warning from 'warning';
import IconButton from '../IconButton';

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

let didWarnCheckedDefaultChecked = false;
let didWarnControlledToUncontrolled = false;
let didWarnUncontrolledToControlled = false;

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    className: PropTypes.string,
    /**
     * @ignore
     */
    defaultChecked: PropTypes.bool,
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

  componentWillMount() {
    const { props } = this;

    this.isControlled = props.checked !== undefined;

    if (
      process.env.NODE_ENV !== 'production' &&
      props.checked !== undefined &&
      props.defaultChecked !== undefined &&
      !didWarnCheckedDefaultChecked
    ) {
      warning(
        false,
        'Input elements must be either controlled or uncontrolled ' +
        '(specify either the checked prop, or the defaultChecked prop, but not ' +
        'both). Decide between using a controlled or uncontrolled input ' +
        'element and remove one of these props. More info: ' +
        'https://fb.me/react-controlled-components'
      );
      didWarnCheckedDefaultChecked = true;
    }

    if (!this.isControlled) { // not controlled, use internal state
      this.setState({ checked: props.defaultChecked });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      (!this.isControlled && this.state.checked !== nextState.checked)
    );
  }

  componentWillUpdate(nextProps) {
    if (
      process.env.NODE_ENV !== 'production' &&
      this.isControlled !== (nextProps.checked !== undefined)
    ) {
      const owner = this._reactInternalInstance._currentElement._owner; // eslint-disable-line no-underscore-dangle
      if (this.isControlled && !didWarnControlledToUncontrolled) {
        warning(
          false,
          '%s is changing a controlled Checkbox to be uncontrolled. ' +
          'Input elements should not switch from controlled to uncontrolled (or viceversa). ' +
          'Decide between using a controlled or uncontrolled input ' +
          'element for the lifetime of the component. More info: https://fb.me/react-controlled-components',
          owner && owner.getName() || 'A component',
        );
        didWarnControlledToUncontrolled = true;
      } else if (!didWarnUncontrolledToControlled) {
        warning(
          false,
          '%s is changing an uncontrolled Checkbox to be controlled. ' +
          'Input elements should not switch from uncontrolled to controlled (or viceversa). ' +
          'Decide between using an uncontrolled or controlled input ' +
          'element for the lifetime of the component. More info: https://fb.me/react-controlled-components',
          owner && owner.getName() || 'A component',
        );
        didWarnUncontrolledToControlled = true;
      }
    }
  }

  isControlled = undefined;

  handleClick = (event) => {
    let newChecked;

    if (this.isControlled) {
      newChecked = !this.props.checked;
    } else {
      newChecked = !this.state.checked;
      this.setState({ checked: !this.state.checked });
    }

    if (this.props.onChange) {
      this.props.onChange(event, newChecked);
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  render() {
    const {
      checked: checkedProp,
      className,
      disabled,
      id,
      ...other,
    } = this.props;

    let checked = this.isControlled ? checkedProp : this.state.checked;

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
