'use client';
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import getValidReactChildren from '@mui/utils/getValidReactChildren';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import toggleButtonGroupClasses, {
  getToggleButtonGroupUtilityClass,
} from './toggleButtonGroupClasses';
import ToggleButtonGroupContext from './ToggleButtonGroupContext';
import ToggleButtonGroupButtonContext from './ToggleButtonGroupButtonContext';
import toggleButtonClasses from '../ToggleButton/toggleButtonClasses';
import ownerDocument from '../utils/ownerDocument';
import useForkRef from '../utils/useForkRef';

const useUtilityClasses = (ownerState) => {
  const { classes, orientation, fullWidth, disabled } = ownerState;

  const slots = {
    root: ['root', orientation, fullWidth && 'fullWidth'],
    grouped: ['grouped', `grouped${capitalize(orientation)}`, disabled && 'disabled'],
    firstButton: ['firstButton'],
    lastButton: ['lastButton'],
    middleButton: ['middleButton'],
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
      {
        [`& .${toggleButtonGroupClasses.firstButton}`]: styles.firstButton,
      },
      {
        [`& .${toggleButtonGroupClasses.lastButton}`]: styles.lastButton,
      },
      {
        [`& .${toggleButtonGroupClasses.middleButton}`]: styles.middleButton,
      },
      styles.root,
      ownerState.orientation === 'vertical' && styles.vertical,
      ownerState.fullWidth && styles.fullWidth,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    borderRadius: (theme.vars || theme).shape.borderRadius,
    variants: [
      {
        props: { orientation: 'vertical' },
        style: {
          flexDirection: 'column',
          [`& .${toggleButtonGroupClasses.grouped}`]: {
            [`&.${toggleButtonGroupClasses.selected} + .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]:
              {
                borderTop: 0,
                marginTop: 0,
              },
          },
          [`& .${toggleButtonGroupClasses.firstButton},& .${toggleButtonGroupClasses.middleButton}`]:
            {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          [`& .${toggleButtonGroupClasses.lastButton},& .${toggleButtonGroupClasses.middleButton}`]:
            {
              marginTop: -1,
              borderTop: '1px solid transparent',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
          [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled},& .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
            {
              borderTop: '1px solid transparent',
            },
        },
      },
      {
        props: { fullWidth: true },
        style: {
          width: '100%',
        },
      },
      {
        props: { orientation: 'horizontal' },
        style: {
          [`& .${toggleButtonGroupClasses.grouped}`]: {
            [`&.${toggleButtonGroupClasses.selected} + .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]:
              {
                borderLeft: 0,
                marginLeft: 0,
              },
          },
          [`& .${toggleButtonGroupClasses.firstButton},& .${toggleButtonGroupClasses.middleButton}`]:
            {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          [`& .${toggleButtonGroupClasses.lastButton},& .${toggleButtonGroupClasses.middleButton}`]:
            {
              marginLeft: -1,
              borderLeft: '1px solid transparent',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            },
          [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled},& .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
            {
              borderLeft: '1px solid transparent',
            },
        },
      },
    ],
  })),
);

const ToggleButtonGroup = React.forwardRef(function ToggleButtonGroup(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiToggleButtonGroup' });
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
    rovingFocus = false,
    onKeyDown,
    ...other
  } = props;
  const ownerState = { ...props, disabled, fullWidth, orientation, size };
  const classes = useUtilityClasses(ownerState);

  const theme = useTheme();
  const groupRef = React.useRef(null);
  const handleRef = useForkRef(groupRef, ref);

  const getFocusableItems = React.useCallback(() => {
    const root = groupRef.current;
    if (!root) {
      return [];
    }
    const candidates = Array.from(root.querySelectorAll('button,[role="button"],[tabindex]'));
    return candidates.filter((el) => {
      if (!(el instanceof HTMLElement)) {
        return false;
      }
      if (el.getAttribute('aria-disabled') === 'true') {
        return false;
      }
      if (/** @type {any} */ el.disabled) {
        return false;
      }
      return el.tabIndex >= 0 && typeof el.focus === 'function';
    });
  }, []);

  const handleRovingKeyDown = React.useCallback(
    (event) => {
      if (!rovingFocus) {
        return;
      }
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      const list = groupRef.current;
      if (!list) {
        return;
      }
      const doc = ownerDocument(list);
      const active = doc.activeElement;
      const current =
        active && list.contains(active)
          ? /** @type {HTMLElement} */ active.closest('button,[role="button"],[tabindex]')
          : null;
      const items = getFocusableItems();
      if (items.length === 0) {
        return;
      }

      const isHorizontal = orientation === 'horizontal';
      const isRtl = theme?.direction === 'rtl';
      let prevKey;
      let nextKey;
      if (isHorizontal) {
        prevKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
        nextKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
      } else {
        prevKey = 'ArrowUp';
        nextKey = 'ArrowDown';
      }

      const currentIndex = current ? items.indexOf(current) : -1;
      let nextIndex = -1;
      switch (event.key) {
        case prevKey:
          nextIndex = currentIndex === -1 ? 0 : (currentIndex - 1 + items.length) % items.length;
          break;
        case nextKey:
          nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = items.length - 1;
          break;
        default:
          break;
      }

      if (nextIndex !== -1) {
        event.preventDefault();
        items[nextIndex].focus();
      }
    },
    [getFocusableItems, orientation, rovingFocus, theme?.direction],
  );

  const handleRootKeyDown = (event) => {
    handleRovingKeyDown(event);
    onKeyDown?.(event);
  };

  const handleChange = React.useCallback(
    (event, buttonValue) => {
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
    },
    [onChange, value],
  );

  const handleExclusiveChange = React.useCallback(
    (event, buttonValue) => {
      if (!onChange) {
        return;
      }

      onChange(event, value === buttonValue ? null : buttonValue);
    },
    [onChange, value],
  );

  const context = React.useMemo(
    () => ({
      className: classes.grouped,
      onChange: exclusive ? handleExclusiveChange : handleChange,
      value,
      size,
      fullWidth,
      color,
      disabled,
    }),
    [
      classes.grouped,
      exclusive,
      handleExclusiveChange,
      handleChange,
      value,
      size,
      fullWidth,
      color,
      disabled,
    ],
  );

  const validChildren = getValidReactChildren(children);
  const childrenCount = validChildren.length;

  const getButtonPositionClassName = (index) => {
    const isFirstButton = index === 0;
    const isLastButton = index === childrenCount - 1;

    if (isFirstButton && isLastButton) {
      return '';
    }
    if (isFirstButton) {
      return classes.firstButton;
    }
    if (isLastButton) {
      return classes.lastButton;
    }
    return classes.middleButton;
  };

  return (
    <ToggleButtonGroupRoot
      role="group"
      className={clsx(classes.root, className)}
      ref={handleRef}
      ownerState={ownerState}
      onKeyDown={handleRootKeyDown}
      {...other}
    >
      <ToggleButtonGroupContext.Provider value={context}>
        {validChildren.map((child, index) => {
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

          return (
            <ToggleButtonGroupButtonContext.Provider
              key={index}
              value={getButtonPositionClassName(index)}
            >
              {child}
            </ToggleButtonGroupButtonContext.Provider>
          );
        })}
      </ToggleButtonGroupContext.Provider>
    </ToggleButtonGroupRoot>
  );
});

ToggleButtonGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
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
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * If `true`, enables roving focus with Arrow keys (and Home/End) across the group's focusable children.
   * @default false
   */
  rovingFocus: PropTypes.bool,
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
