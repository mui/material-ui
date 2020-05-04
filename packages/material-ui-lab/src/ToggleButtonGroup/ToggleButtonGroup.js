import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import isValueSelected from './isValueSelected';
import { withStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    display: 'inline-flex',
  },
  /* Styles applied to the children. */
  grouped: {
    padding: '0px 11px 0px 12px',
    '&:not(:first-child)': {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    '&:not(:last-child)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  /* Styles applied to the children if `size="small"`. */
  groupedSizeSmall: {
    padding: '0px 7px 0px 8px',
  },
  /* Styles applied to the children if `size="large"`. */
  groupedSizeLarge: {
    padding: '0px 15px 0px 16px',
  },
});

const ToggleButtonGroup = React.forwardRef(function ToggleButton(props, ref) {
  const {
    children,
    classes,
    className,
    exclusive = false,
    onChange,
    size = 'medium',
    value,
    ...other
  } = props;

  const handleChange = (event, buttonValue) => {
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

  const handleExclusiveChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }

    onChange(event, value === buttonValue ? null : buttonValue);
  };

  return (
    <div className={clsx(classes.root, className)} ref={ref} role="group" {...other}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "Material-UI: The ToggleButtonGroup component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        const { selected: buttonSelected, value: buttonValue } = child.props;
        const selected =
          buttonSelected === undefined ? isValueSelected(buttonValue, value) : buttonSelected;

        return React.cloneElement(child, {
          className: clsx(
            classes.grouped,
            {
              [classes[`groupedSize${capitalize(size)}`]]: size !== 'medium',
            },
            child.props.className,
          ),
          selected,
          onChange: exclusive ? handleExclusiveChange : handleChange,
          size,
        });
      })}
    </div>
  );
});

ToggleButtonGroup.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the button.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
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
   * @param {object} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: PropTypes.func,
  /**
   * The size of the buttons.
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value: PropTypes.any,
};

export default withStyles(styles, { name: 'MuiToggleButtonGroup' })(ToggleButtonGroup);
