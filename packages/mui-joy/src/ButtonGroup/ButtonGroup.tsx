'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { unstable_traverseBreakpoints as traverseBreakpoints } from '@mui/system/Grid';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_isMuiElement as isMuiElement,
} from '@mui/utils';
import { useThemeProps } from '../styles';
import { resolveSxValue } from '../styles/styleUtils';
import styled from '../styles/styled';
import { getButtonGroupUtilityClass } from './buttonGroupClasses';
import { ButtonGroupProps, ButtonGroupOwnerState, ButtonGroupTypeMap } from './ButtonGroupProps';
import ButtonGroupContext from './ButtonGroupContext';
import useSlot from '../utils/useSlot';
import buttonClasses from '../Button/buttonClasses';
import iconButtonClasses from '../IconButton/iconButtonClasses';
import { DividerProps } from '../Divider';

const useUtilityClasses = (ownerState: ButtonGroupOwnerState) => {
  const { size, variant, color, orientation } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getButtonGroupUtilityClass, {});
};

export const StyledButtonGroup = styled('div')<{ ownerState: ButtonGroupOwnerState }>(({
  theme,
  ownerState,
}) => {
  const { borderRadius: radius } = resolveSxValue({ theme, ownerState }, ['borderRadius']);
  const firstChildRadius =
    ownerState.orientation === 'vertical'
      ? 'var(--ButtonGroup-radius) var(--ButtonGroup-radius) var(--unstable_childRadius) var(--unstable_childRadius)'
      : 'var(--ButtonGroup-radius) var(--unstable_childRadius) var(--unstable_childRadius) var(--ButtonGroup-radius)';
  const lastChildRadius =
    ownerState.orientation === 'vertical'
      ? 'var(--unstable_childRadius) var(--unstable_childRadius) var(--ButtonGroup-radius) var(--ButtonGroup-radius)'
      : 'var(--unstable_childRadius) var(--ButtonGroup-radius) var(--ButtonGroup-radius) var(--unstable_childRadius)';
  const margin =
    ownerState.orientation === 'vertical'
      ? 'calc(var(--ButtonGroup-separatorSize) * -1) 0 0 0'
      : '0 0 0 calc(var(--ButtonGroup-separatorSize) * -1)';
  const styles = {};
  traverseBreakpoints<string | number | null>(
    theme.breakpoints,
    ownerState.spacing,
    (appendStyle, value) => {
      if (value !== null) {
        appendStyle(styles, {
          // the buttons should be connected if the value is more than 0
          '--ButtonGroup-connected': value.toString().match(/^0(?!\.)/) ? '1' : '0',
          gap: typeof value === 'string' ? value : theme.spacing?.(value),
        });
      }
    },
  );
  const outlinedStyle = theme.variants.outlined?.[ownerState.color!];
  const outlinedDisabledStyle = theme.variants.outlinedDisabled?.[ownerState.color!];
  const outlinedHoverStyle = theme.variants.outlinedHover?.[ownerState.color!];

  return [
    {
      '--ButtonGroup-separatorSize':
        ownerState.variant === 'outlined' ? '1px' : 'calc(var(--ButtonGroup-connected) * 1px)',
      '--ButtonGroup-separatorColor': outlinedStyle?.borderColor,
      '--ButtonGroup-radius': theme.vars.radius.sm,
      '--Divider-inset': '0.5rem',
      '--unstable_childRadius':
        'calc((1 - var(--ButtonGroup-connected)) * var(--ButtonGroup-radius) - var(--variant-borderWidth, 0px))', // for internal usage
      ...styles,
      display: 'flex',
      borderRadius: 'var(--ButtonGroup-radius)',
      flexDirection: ownerState.orientation === 'vertical' ? 'column' : 'row',
      // first Button or IconButton
      [`& > [data-first-child]`]: {
        '--Button-radius': firstChildRadius,
        '--IconButton-radius': firstChildRadius,
        ...(ownerState.orientation === 'horizontal' && {
          borderRight: 'var(--ButtonGroup-separatorSize) solid var(--ButtonGroup-separatorColor)',
        }),
        ...(ownerState.orientation === 'vertical' && {
          borderBottom: 'var(--ButtonGroup-separatorSize) solid var(--ButtonGroup-separatorColor)',
        }),
      },
      // middle Buttons or IconButtons
      [`& > :not([data-first-child]):not([data-last-child]):not(:only-child)`]: {
        '--Button-radius': 'var(--unstable_childRadius)',
        '--IconButton-radius': 'var(--unstable_childRadius)',
        borderRadius: 'var(--unstable_childRadius)',
        ...(ownerState.orientation === 'horizontal' && {
          borderLeft: 'var(--ButtonGroup-separatorSize) solid var(--ButtonGroup-separatorColor)',
          borderRight: 'var(--ButtonGroup-separatorSize) solid var(--ButtonGroup-separatorColor)',
        }),
        ...(ownerState.orientation === 'vertical' && {
          borderTop: 'var(--ButtonGroup-separatorSize) solid var(--ButtonGroup-separatorColor)',
          borderBottom: 'var(--ButtonGroup-separatorSize) solid var(--ButtonGroup-separatorColor)',
        }),
      },
      // last Button or IconButton
      [`& > [data-last-child]`]: {
        '--Button-radius': lastChildRadius,
        '--IconButton-radius': lastChildRadius,
        ...(ownerState.orientation === 'horizontal' && {
          borderLeft: 'var(--ButtonGroup-separatorSize) solid var(--ButtonGroup-separatorColor)',
        }),
        ...(ownerState.orientation === 'vertical' && {
          borderTop: 'var(--ButtonGroup-separatorSize) solid var(--ButtonGroup-separatorColor)',
        }),
      },
      // single Button or IconButton
      [`& > :only-child`]: {
        '--Button-radius': 'var(--ButtonGroup-radius)',
        '--IconButton-radius': 'var(--ButtonGroup-radius)',
      },
      [`& > :not([data-first-child]):not(:only-child)`]: {
        '--Button-margin': margin,
        '--IconButton-margin': margin,
      },
      [`& .${buttonClasses.root}, & .${iconButtonClasses.root}`]: {
        '&:not(:disabled)': {
          zIndex: 1, // to make borders appear above disabled buttons.
        },
        '&:disabled': {
          '--ButtonGroup-separatorColor': outlinedDisabledStyle?.borderColor,
        },
        ...(ownerState.variant === 'outlined' && {
          '&:hover': {
            '--ButtonGroup-separatorColor': outlinedHoverStyle?.borderColor,
          },
        }),
        [`&:hover, ${theme.focus.selector}`]: {
          zIndex: 2, // to make borders appear above sibling.
        },
      },
      ...(ownerState.buttonFlex && {
        [`& > *:not(.${iconButtonClasses.root})`]: {
          flex: ownerState.buttonFlex,
        },
        [`& > :not(button) > .${buttonClasses.root}`]: {
          width: '100%', // for button to fill its wrapper.
        },
      }),
    } as const,
    radius !== undefined && {
      '--ButtonGroup-radius': radius,
    },
  ];
});

const ButtonGroupRoot = styled(StyledButtonGroup, {
  name: 'JoyButtonGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ButtonGroupOwnerState }>({});

/**
 *
 * Demos:
 *
 * - [Button Group](https://mui.com/joy-ui/react-button-group/)
 *
 * API:
 *
 * - [ButtonGroup API](https://mui.com/joy-ui/api/button-group/)
 */
const ButtonGroup = React.forwardRef(function ButtonGroup(inProps, ref) {
  const props = useThemeProps<typeof inProps & ButtonGroupProps>({
    props: inProps,
    name: 'JoyButtonGroup',
  });

  const {
    buttonFlex,
    className,
    component = 'div',
    disabled = false,
    size = 'md',
    color = 'neutral',
    variant = 'outlined',
    children,
    orientation = 'horizontal',
    slots = {},
    slotProps = {},
    spacing = 0,
    ...other
  } = props;

  const ownerState = {
    ...props,
    buttonFlex,
    color,
    component,
    orientation,
    spacing,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: ButtonGroupRoot,
    externalForwardedProps,
    additionalProps: {
      role: 'group',
    },
    ownerState,
  });

  const buttonGroupContext = React.useMemo(
    () => ({ variant, color, size, disabled }),
    [variant, color, size, disabled],
  );

  return (
    <SlotRoot {...rootProps}>
      <ButtonGroupContext.Provider value={buttonGroupContext}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          const extraProps: Record<string, any> = {};
          if (isMuiElement(child, ['Divider'])) {
            const childProps = child.props as DividerProps;
            extraProps.inset = childProps?.inset ?? 'context';

            const dividerOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical';
            extraProps.orientation = childProps?.orientation ?? dividerOrientation;
            extraProps.role = 'presentation';
            extraProps.component = 'span';
          }
          if (React.Children.count(children) > 1) {
            if (index === 0) {
              extraProps['data-first-child'] = '';
            }
            if (index === React.Children.count(children) - 1) {
              extraProps['data-last-child'] = '';
            }
          }
          return React.cloneElement(child, extraProps);
        })}
      </ButtonGroupContext.Provider>
    </SlotRoot>
  );
}) as OverridableComponent<ButtonGroupTypeMap>;

ButtonGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The flex value of the button.
   * @example buttonFlex={1} will set flex: '1 1 auto' on each button (stretch the button to equally fill the available space).
   */
  buttonFlex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Used to render icon or text elements inside the ButtonGroup if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, all the buttons will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['lg', 'md', 'sm']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.shape({
      lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
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
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default ButtonGroup;
