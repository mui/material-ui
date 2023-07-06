import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  unstable_capitalize as capitalize,
  unstable_isMuiElement as isMuiElement,
} from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverrideProps, DefaultComponentProps } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getToggleButtonGroupUtilityClass } from './toggleButtonGroupClasses';
import {
  ToggleButtonGroupProps,
  ToggleButtonGroupTypeMap,
  SupportedValue,
  ToggleButtonGroupOwnerState,
} from './ToggleButtonGroupProps';
import useSlot from '../utils/useSlot';
import { StyledButtonGroup } from '../ButtonGroup/ButtonGroup';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';

interface InternalChangeEventHandler<Value> {
  (event: React.MouseEvent, value: Value | Array<Value> | null): void;
}

const useUtilityClasses = (ownerState: ToggleButtonGroupOwnerState<any>) => {
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

  return composeClasses(slots, getToggleButtonGroupUtilityClass, {});
};

const ToggleButtonGroupRoot = styled(StyledButtonGroup as unknown as 'div', {
  name: 'JoyToggleButtonGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ToggleButtonGroupOwnerState<any> }>(({ theme, ownerState }) => ({
  '& [aria-pressed="true"], & [aria-pressed="true"]:not([data-first-child]):not([data-last-child])':
    {
      ...(ownerState.color !== 'context' && {
        backgroundColor:
          theme.vars.palette?.[ownerState.color!]?.[`${ownerState.variant!}ActiveBg`],
        ...(ownerState.variant === 'outlined' && {
          borderColor:
            theme.vars.palette?.[ownerState.color!]?.[`${ownerState.variant!}HoverBorder`],
        }),
        '&:hover': {
          backgroundColor:
            theme.vars.palette?.[ownerState.color!]?.[`${ownerState.variant!}ActiveBg`],
        },
        '&:not(:disabled)': {
          zIndex: 2,
        },
      }),
    },
}));
/**
 * ⚠️ ToggleButtonGroup must be used as a direct child of the [Card](https://mui.com/joy-ui/react-card/) component.
 *
 * Demos:
 *
 * - [Card](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [ToggleButtonGroup API](https://mui.com/joy-ui/api/card-content/)
 */
const ToggleButtonGroup = React.forwardRef(function ToggleButtonGroup<
  TValue extends SupportedValue,
>(inProps: ToggleButtonGroupProps<TValue>, ref: React.ForwardedRef<HTMLDivElement>) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoyToggleButtonGroup',
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
    onChange,
    orientation = 'horizontal',
    slots = {},
    slotProps = {},
    spacing = 0,
    value,
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
    elementType: ToggleButtonGroupRoot,
    externalForwardedProps,
    ownerState,
  });

  const buttonGroupContext = React.useMemo(
    () => ({ variant, color, size, disabled }),
    [variant, color, size, disabled],
  );

  const handleChange = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, buttonValue: any) => {
      if (!onChange || buttonValue === undefined) {
        return;
      }
      if (Array.isArray(value)) {
        const set = new Set(value);
        if (set.has(buttonValue)) {
          set.delete(buttonValue);
        } else {
          set.add(buttonValue);
        }
        (onChange as InternalChangeEventHandler<TValue>)(event, Array.from(set));
      } else {
        (onChange as InternalChangeEventHandler<TValue>)(
          event,
          value === buttonValue ? null : buttonValue,
        );
      }
    },
    [value, onChange],
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
            extraProps.inset = 'inset' in child.props ? child.props.inset : 'context';

            const dividerOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical';
            extraProps.orientation =
              'orientation' in child.props ? child.props.orientation : dividerOrientation;
            extraProps.role = 'presentation';
            extraProps.component = 'span';
          }
          if (child.type === 'button' || isMuiElement(child, ['Button', 'IconButton'])) {
            extraProps.onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
              child.props.onClick?.(event);
              if (!event.defaultPrevented) {
                handleChange(event, child.props.value);
              }
            };
            extraProps['aria-pressed'] = Array.isArray(value)
              ? value.indexOf(child.props.value) !== -1
              : value === child.props.value;
          }
          if (index === 0) {
            extraProps['data-first-child'] = '';
          }
          if (index === React.Children.count(children) - 1) {
            extraProps['data-last-child'] = '';
          }
          return React.cloneElement(child, extraProps);
        })}
      </ButtonGroupContext.Provider>
    </SlotRoot>
  );
}) as ToggleButtonGroupComponent;

interface ToggleButtonGroupComponent {
  <TValue extends SupportedValue, C extends React.ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: C;
    } & OverrideProps<ToggleButtonGroupTypeMap<TValue>, C>,
  ): JSX.Element | null;
  <TValue extends SupportedValue>(
    props: DefaultComponentProps<ToggleButtonGroupTypeMap<TValue>>,
  ): JSX.Element | null;
  propTypes?: any;
}

ToggleButtonGroup.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the ToggleButtonGroup if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The component orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default ToggleButtonGroup;
