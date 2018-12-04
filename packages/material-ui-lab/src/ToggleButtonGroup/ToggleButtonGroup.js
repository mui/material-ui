import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import hasValue from './hasValue';
import isValueSelected from './isValueSelected';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    transition: theme.transitions.create('background,box-shadow'),
    background: 'transparent',
    borderRadius: 2,
    overflow: 'hidden',
  },
  /* Styles applied to the root element if `selected={true}` or `selected="auto" and `value` set. */
  selected: {
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
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
      children: childrenProp,
      className: classNameProp,
      classes,
      exclusive,
      onChange,
      selected: selectedProp,
      value,
      ...other
    } = this.props;

    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      const { selected: buttonSelected, value: buttonValue } = child.props;

      const selected =
        buttonSelected === undefined ? isValueSelected(buttonValue, value) : buttonSelected;

      return React.cloneElement(child, {
        selected,
        onChange: exclusive ? this.handleExclusiveChange : this.handleChange,
      });
    });

    const groupSelected = selectedProp === 'auto' ? hasValue(value) : selectedProp;
    const className = classNames(
      classes.root,
      {
        [classes.selected]: groupSelected,
      },
      classNameProp,
    );

    return (
      <div className={className} {...other}>
        {children}
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
   * See [CSS API](#css-api) below for more details.
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
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {object} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: PropTypes.func,
  /**
   * If `true`, render the group in a selected state. If `auto` (the default)
   * render in a selected state if `value` is not empty.
   */
  selected: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['auto'])]),
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   */
  value: PropTypes.any,
};

ToggleButtonGroup.defaultProps = {
  exclusive: false,
  selected: 'auto',
};

export default withStyles(styles, { name: 'MuiToggleButtonGroup' })(ToggleButtonGroup);
