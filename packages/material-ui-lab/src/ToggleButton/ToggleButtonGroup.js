import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';

export const styles = theme => ({
  root: {
    transition: theme.transitions.create('background,box-shadow'),
    background: 'transparent',
    borderRadius: 2,
    overflow: 'hidden',
  },

  selected: {
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
  },
});

function isValueSelected(value, candidate) {
  if (candidate === undefined || value === undefined) {
    return false;
  }

  if (Array.isArray(candidate)) {
    return candidate.indexOf(value) >= 0;
  }

  return value === candidate;
}

class ToggleButtonGroup extends React.Component {
  handleChange = (e, buttonValue) => {
    const { onChange, value } = this.props;

    if (!onChange) {
      return;
    }

    const index = value && value.indexOf(buttonValue);
    let newValue;

    if (index >= 0) {
      newValue = [...value];
      newValue.splice(index, 1);
    } else {
      newValue = value ? [...value, buttonValue] : [buttonValue];
    }

    onChange(e, newValue);
  };

  handleExclusiveChange = (e, buttonValue) => {
    const { onChange, value } = this.props;

    if (!onChange) {
      return;
    }

    onChange(e, value === buttonValue ? null : buttonValue);
  };

  render() {
    const {
      children: childrenProp,
      classes,
      className: classNameProp,
      exclusive,
      value,
      onChange,
      selected: selectedProp,
      ...other
    } = this.props;
    let groupSelected = selectedProp;

    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      const { selected: buttonSelected, value: buttonValue } = child.props;

      const selected =
        buttonSelected === undefined ? isValueSelected(buttonValue, value) : buttonSelected;

      if (selectedProp === undefined) {
        groupSelected = groupSelected || selected;
      }

      return React.cloneElement(child, {
        selected,
        onChange: exclusive ? this.handleExclusiveChange : this.handleChange,
      });
    });

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
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true` only allow one of the child ToggleButton values to be selected.
   */
  exclusive: PropTypes.bool,
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {number} value of the selected buttons
   */
  onChange: PropTypes.func,
  /**
   * If `true` render the group in a selected state. If `auto` render in a
   * selected state if any of the child ToggleButtons are selected.
   */
  selected: PropTypes.bool,
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   */
  value: PropTypes.any,
};

ToggleButtonGroup.defaultProps = {
  exclusive: false,
};

export default withStyles(styles, { name: 'MuiToggleButtonGroup' })(ToggleButtonGroup);
