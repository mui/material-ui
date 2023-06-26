import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import useTab from '@mui/base/useTab';
import { StyledListItemButton } from '../ListItemButton/ListItemButton';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { useColorInversion } from '../styles/ColorInversion';
import tabClasses, { getTabUtilityClass } from './tabClasses';
import { TabOwnerState, TabTypeMap } from './TabProps';
import RowListContext from '../List/RowListContext';
import ListItemButtonOrientationContext from '../ListItemButton/ListItemButtonOrientationContext';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: TabOwnerState) => {
  const { selected, disabled, focusVisible, variant, color, orientation } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      selected && 'selected',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getTabUtilityClass, {});
};

const TabRoot = styled(StyledListItemButton, {
  name: 'JoyTab',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TabOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  const border = variantStyle?.border ? `${variantStyle.border} ${variantStyle.borderColor}` : '';
  return {
    justifyContent: 'var(--top, center) var(--bottom, center)',
    flexGrow: 1,
    ...variantStyle,
    ...(ownerState.selected && {
      fontWeight: 'initial',
    }),
    /**
     * ================= private variables =================
     */
    '--border-placeholder': 'var(--Tab-lineSize) solid transparent',
    '--border-bottom': `var(--top, var(--unknown)) ${border}`,
    '--border-top': `var(--bottom, var(--unknown)) ${border}`,
    '--border-left': `var(--right, var(--unknown)) ${border}`,
    '--border-right': `var(--left, var(--unknown)) ${border}`,
    '--offset-inline': 'calc(-1 * var(--variant-borderWidth, 0px))',
    '--offset-block': 'calc(-1 * var(--Tab-lineSize))',
    /**
     * =====================================================
     */
    borderBottom: 'var(--border-bottom, var(--top, var(--border-placeholder)))',
    borderRight: 'var(--border-right, var(--left, var(--border-placeholder)))',
    borderTop: 'var(--border-top, var(--bottom, var(--border-placeholder)))',
    borderLeft: 'var(--border-left, var(--right, var(--border-placeholder)))',
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      margin: 'auto', // align center if fixed width/height
      background: 'var(--Tab-lineColor)',
      height: 'var(--top, var(--Tab-lineSize)) var(--bottom, var(--Tab-lineSize))',
      width: 'var(--left, var(--Tab-lineSize)) var(--right, var(--Tab-lineSize))',
      top: 'var(--bottom, var(--offset-block)) var(--left, var(--offset-inline)) var(--right, var(--offset-inline))',
      bottom:
        'var(--top, var(--offset-block)) var(--left, var(--offset-inline)) var(--right, var(--offset-inline))',
      left: 'var(--right, var(--offset-block)) var(--top, var(--offset-inline)) var(--bottom, var(--offset-inline))',
      right:
        'var(--left, var(--offset-block)) var(--top, var(--offset-inline)) var(--bottom, var(--offset-inline))',
    },
    [`&.${tabClasses.selected}::after`]: {
      '--Tab-lineColor': 'currentColor',
    },
  };
});
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/joy-ui/react-tabs/)
 *
 * API:
 *
 * - [Tab API](https://mui.com/joy-ui/api/tab/)
 */
const Tab = React.forwardRef(function Tab(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyTab',
  });

  const row = React.useContext(RowListContext);

  const {
    action,
    children,
    value: valueProp,
    disabled = false,
    onChange,
    onClick,
    onFocus,
    component = 'button',
    orientation = 'horizontal',
    variant = 'plain',
    color: colorProp = 'neutral',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const tabRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();
  const handleRef = useForkRef(tabRef, ref) as React.RefCallback<Element>;

  const { active, focusVisible, setFocusVisible, selected, getRootProps } = useTab({
    ...props,
    rootRef: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        tabRef.current!.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState = {
    ...props,
    orientation,
    row,
    active,
    focusVisible,
    disabled,
    selected,
    variant,
    color,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    elementType: TabRoot,
    getSlotProps: getRootProps,
    externalForwardedProps,
    ownerState,
    className: classes.root,
  });

  return (
    <ListItemButtonOrientationContext.Provider value={orientation}>
      {/* @ts-ignore ListItemButton base is div which conflict with TabProps 'button' */}
      <SlotRoot {...rootProps}>{children}</SlotRoot>
    </ListItemButtonOrientationContext.Provider>
  );
}) as OverridableComponent<TabTypeMap>;

Tab.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Callback invoked when new value is being set.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * The content direction flow.
   * @default 'horizontal'
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
  /**
   * You can provide your own value. Otherwise, it falls back to the child position index.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Tab;
