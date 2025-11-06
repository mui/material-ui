'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useTab } from '@mui/base/useTab';
import { StyledListItemButton } from '../ListItemButton/ListItemButton';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getTabUtilityClass } from './tabClasses';
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
})<{ ownerState: TabOwnerState }>(({ ownerState }) => [
  {
    flex: 'initial',
    justifyContent: ownerState.row ? 'center' : 'initial',
    '--unstable_ListItemDecorator-alignItems': 'center',
    '--unstable_offset': 'min(calc(-1 * var(--variant-borderWidth, 0px)), -1px)',
  },
  !ownerState.disableIndicator && {
    '&[aria-selected="true"]': {
      '--Tab-indicatorColor': 'currentColor',
      zIndex: 1, // to stay above other tab elements
    },
    // using pseudo element for showing active indicator is best for controlling the size and customization.
    // for example, developers can customize the radius, width or background.
    // (border and box-shadow are not flexible when it comes to customization).
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      margin: 'auto',
      background: 'var(--Tab-indicatorColor)',
      borderRadius: 'var(--Tab-indicatorRadius)',
    },
  },
  // the padding is to account for the indicator's thickness to make the text proportional.
  !ownerState.disableIndicator &&
    ownerState.indicatorPlacement === 'bottom' && {
      paddingBottom:
        'calc(var(--ListItem-paddingY) - var(--variant-borderWidth, 0px) + var(--Tab-indicatorThickness) - 1px)',
      '&::after': {
        height: 'var(--Tab-indicatorThickness)',
        width: 'var(--Tab-indicatorSize)',
        left: ownerState.indicatorInset ? 'var(--ListItem-paddingLeft)' : 'var(--unstable_offset)',
        right: ownerState.indicatorInset
          ? 'var(--ListItem-paddingRight)'
          : 'var(--unstable_offset)',
        bottom: 'calc(-1px - var(--unstable_TabList-underlineBottom, 0px))',
      },
    },
  !ownerState.disableIndicator &&
    ownerState.indicatorPlacement === 'top' && {
      paddingTop:
        'calc(var(--ListItem-paddingY) - var(--variant-borderWidth, 0px) + var(--Tab-indicatorThickness) - 1px)',
      '&::after': {
        height: 'var(--Tab-indicatorThickness)',
        width: 'var(--Tab-indicatorSize)',
        left: ownerState.indicatorInset ? 'var(--ListItem-paddingLeft)' : 'var(--unstable_offset)',
        right: ownerState.indicatorInset
          ? 'var(--ListItem-paddingRight)'
          : 'var(--unstable_offset)',
        top: 'calc(-1px - var(--unstable_TabList-underlineTop, 0px))',
      },
    },
  !ownerState.disableIndicator &&
    ownerState.indicatorPlacement === 'right' && {
      paddingRight: 'calc(var(--ListItem-paddingRight) + var(--Tab-indicatorThickness) - 1px)',
      '&::after': {
        height: 'var(--Tab-indicatorSize)',
        width: 'var(--Tab-indicatorThickness)',
        top: ownerState.indicatorInset ? 'var(--ListItem-paddingY)' : 'var(--unstable_offset)',
        bottom: ownerState.indicatorInset ? 'var(--ListItem-paddingY)' : 'var(--unstable_offset)',
        right: 'calc(-1px - var(--unstable_TabList-underlineRight, 0px))',
      },
    },
  !ownerState.disableIndicator &&
    ownerState.indicatorPlacement === 'left' && {
      paddingLeft: 'calc(var(--ListItem-paddingLeft) + var(--Tab-indicatorThickness) - 1px)',
      '&::after': {
        height: 'var(--Tab-indicatorSize)',
        width: 'var(--Tab-indicatorThickness)',
        top: ownerState.indicatorInset ? 'var(--ListItem-paddingY)' : 'var(--unstable_offset)',
        bottom: ownerState.indicatorInset ? 'var(--ListItem-paddingY)' : 'var(--unstable_offset)',
        left: 'calc(-1px - var(--unstable_TabList-underlineLeft, 0px))',
      },
    },
]);
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
    color = 'neutral',
    disableIndicator = false,
    indicatorPlacement = row ? 'bottom' : 'right',
    indicatorInset = false,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const tabRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement | null>(null);
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
    disableIndicator,
    indicatorPlacement,
    indicatorInset,
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
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
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
   * If `true`, the pseudo element indicator is hidden.
   * @default false
   */
  disableIndicator: PropTypes.bool,
  /**
   * If `true`, the indicator stay within the padding based on the `Tabs` orientation.
   * @default false
   */
  indicatorInset: PropTypes.bool,
  /**
   * The indicator's position when the Tab is selected.
   * @default row ? 'bottom' : 'right'
   */
  indicatorPlacement: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
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
