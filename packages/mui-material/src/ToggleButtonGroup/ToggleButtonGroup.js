import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import isValueSelected from './isValueSelected';
import toggleButtonGroupClasses, {
  getToggleButtonGroupUtilityClass,
} from './toggleButtonGroupClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, orientation, fullWidth, disabled } = ownerState;

  const slots = {
    root: ['root', orientation === 'vertical' && 'vertical', fullWidth && 'fullWidth'],
    grouped: ['grouped', `grouped${capitalize(orientation)}`, disabled && 'disabled'],
  };

  return composeClasses(slots, getToggleButtonGroupUtilityClass, classes);
};

const ToggleButtonGroupRoot = styled('div', {
  name: 'MuiToggleButtonGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${toggleButtonGroupClasses.grouped}`]: styles.grouped },
      {
        [`& .${toggleButtonGroupClasses.grouped}`]:
          styles[`grouped${capitalize(ownerState.orientation)}`],
      },
      styles.root,
      ownerState.orientation === 'vertical' && styles.vertical,
      ownerState.fullWidth && styles.fullWidth,
    ];
  },
})(({ ownerState, theme }) => ({
  display: 'inline-flex',
  borderRadius: (theme.vars || theme).shape.borderRadius,
  ...(ownerState.orientation === 'vertical' && {
    flexDirection: 'column',
  }),
  ...(ownerState.fullWidth && {
    width: '100%',
  }),
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    ...(ownerState.orientation === 'horizontal'
      ? {
          '&:not(:first-of-type)': {
            marginLeft: -1,
            borderLeft: '1px solid transparent',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
          '&:not(:last-of-type)': {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          [`&.${toggleButtonGroupClasses.selected} + .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]:
            {
              borderLeft: 0,
              marginLeft: 0,
            },
        }
      : {
          '&:not(:first-of-type)': {
            marginTop: -1,
            borderTop: '1px solid transparent',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
          '&:not(:last-of-type)': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
          [`&.${toggleButtonGroupClasses.selected} + .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]:
            {
              borderTop: 0,
              marginTop: 0,
            },
        }),
  },
}));

const ToggleButtonGroup = React.forwardRef(function ToggleButtonGroup(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiToggleButtonGroup' });
  const {
    children,
    className,
    color = 'standard',
    disabled = false,
    exclusive = false,
    fullWidth = false,
    onChange,
    orientation = 'horizontal',
    size = 'medium',
    value,
    ...other
  } = props;
  const ownerState = { ...props, disabled, fullWidth, orientation, size };
  const classes = useUtilityClasses(ownerState);

  const handleChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }

    const index = value && value.indexOf(buttonValue);
    let newValue;

    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
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
    <ToggleButtonGroupRoot
      role="group"
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "MUI: The ToggleButtonGroup component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        return React.cloneElement(child, {
          className: clsx(classes.grouped, child.props.className),
          onChange: exclusive ? handleExclusiveChange : handleChange,
          selected:
            child.props.selected === undefined
              ? isValueSelected(child.props.value, value)
              : child.props.selected,
          size: child.props.size || size,
          fullWidth,
          color: child.props.color || color,
          disabled: child.props.disabled || disabled,
        });
      })}
    </ToggleButtonGroupRoot>
  );
});

ToggleButtonGroup.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the button when it is selected.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'standard'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * If `true`, the component is disabled. This implies that all ToggleButton children will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   * @default false
   */
  exclusive: PropTypes.bool,
  /**
   * If `true`, the button group will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * Callback fired when the value changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: PropTypes.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value: PropTypes.any,
};

export default ToggleButtonGroup;
