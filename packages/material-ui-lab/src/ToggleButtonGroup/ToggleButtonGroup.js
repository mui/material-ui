import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import clsx from 'clsx';
import isValueSelected from './isValueSelected';
import { withStyles } from '@material-ui/core/styles';
import { withForwardedRef } from '@material-ui/core/utils';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 2,
    display: 'inline-flex',
  },
});

class ToggleButtonGroup extends React.Component {
  handleChange = (event, buttonValue) => {
    const { onChange, value } = this.props;

    if (!onChange) {
      return;
    }

    const index = value && value.indexOf(buttonValue);
    let newValue;

    if (value && index >= 0) {
      newValue = [...value];
      newValue.splice(index, 1);
    } else {
      newValue = value ? [...value, buttonValue] : [buttonValue];
    }

    onChange(event, newValue);
  };

  handleExclusiveChange = (event, buttonValue) => {
    const { onChange, value } = this.props;

    if (!onChange) {
      return;
    }

    onChange(event, value === buttonValue ? null : buttonValue);
  };

  render() {
    const {
      children,
      className,
      classes,
      exclusive,
      innerRef,
      onChange,
      value,
      ...other
    } = this.props;

    return (
      <div className={clsx(classes.root, className)} ref={innerRef} {...other}>
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) {
            return null;
          }

          warning(
            child.type !== React.Fragment,
            [
              "Material-UI: the ToggleButtonGroup component doesn't accept a Fragment as a child.",
              'Consider providing an array instead.',
            ].join('\n'),
          );

          const { selected: buttonSelected, value: buttonValue } = child.props;
          const selected =
            buttonSelected === undefined ? isValueSelected(buttonValue, value) : buttonSelected;

          return React.cloneElement(child, {
            selected,
            onChange: exclusive ? this.handleExclusiveChange : this.handleChange,
          });
        })}
      </div>
    );
  }
}

ToggleButtonGroup.propTypes = {
  /**
   * The content of the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   */
  exclusive: PropTypes.bool,
  /**
   * @ignore
   * from `withForwardRef`
   */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {object} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: PropTypes.func,
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   */
  value: PropTypes.any,
};

ToggleButtonGroup.defaultProps = {
  exclusive: false,
};

export default withStyles(styles, { name: 'MuiToggleButtonGroup' })(
  withForwardedRef(ToggleButtonGroup),
);
