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
import { getTabUtilityClass } from './tabClasses';
import { TabOwnerState, TabTypeMap } from './TabProps';
import RowListContext from '../List/RowListContext';
import ListItemButtonOrientationContext from '../ListItemButton/ListItemButtonOrientationContext';
import useSlot from '../utils/useSlot';
import listItemDecoratorClasses from '../ListItemDecorator/listItemDecoratorClasses';

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
})<{ ownerState: TabOwnerState }>(({ ownerState, theme }) => [
  {
    flexGrow: ownerState.row ? 1 : 0,
    justifyContent: ownerState.row ? 'center' : 'initial',
    [`& > .${listItemDecoratorClasses.root}`]: { alignItems: 'center' },
    '--unstable_ListItemDecorator-alignItems': 'center',
    '--unstable_offset': 'calc(-1 * var(--variant-borderWidth, 0px))',
    // to prevent the Tab's background from covering TabList's underline when hovered.
    ...(ownerState.variant !== 'outlined' && {
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: ownerState.row ? '100%' : 1,
        height: !ownerState.row ? '100%' : 1,
        bottom: ownerState.row ? 0 : undefined,
        right: !ownerState.row ? 0 : undefined,
      },
      '&:not([aria-selected="true"]):hover::before': {
        backgroundColor: `var(--unstable_TabList-hasUnderline, ${theme.vars.palette.divider})`,
      },
    }),
  },
  !ownerState.disableIndicator && {
    // '&:not([aria-selected="true"]):hover': {
    //   // to prevent the Tab's background from covering TabList's underline when hovered.
    //   '--Tab-indicatorColor': `var(--unstable_TabList-hasUnderline, ${
    //     (ownerState.row && ownerState.indicatorPlacement === 'top') ||
    //     (!ownerState.row && ownerState.indicatorPlacement === 'left')
    //       ? 'transparent'
    //       : theme.vars.palette.divider
    //   })`,
    //   '--unstable_indicatorThickness':
    //     ownerState.variant === 'outlined' ? '0px' : 'var(--unstable_TabList-hasUnderline, 1px)', // this means if TabList has underline, the value will be 1px.
    // },
    '&[aria-selected="true"]': {
      '--Tab-indicatorColor': 'currentColor',
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
    },
  },
  // the padding is to account for the indicator's thickness to make the text proportional.
  !ownerState.disableIndicator &&
    ownerState.indicatorPlacement === 'bottom' && {
      paddingBottom:
        'calc(var(--ListItem-paddingY) - var(--variant-borderWidth, 0px) + var(--Tab-indicatorThickness))',
      '&::after': {
        height: 'var(--unstable_indicatorThickness, var(--Tab-indicatorThickness))',
        left: ownerState.indicatorInset ? 'var(--ListItem-paddingLeft)' : 'var(--unstable_offset)',
        right: ownerState.indicatorInset
          ? 'var(--ListItem-paddingRight)'
          : 'var(--unstable_offset)',
        bottom: 'var(--unstable_offset)',
      },
    },
  !ownerState.disableIndicator &&
    ownerState.indicatorPlacement === 'top' && {
      paddingTop:
        'calc(var(--ListItem-paddingY) - var(--variant-borderWidth, 0px) + var(--Tab-indicatorThickness))',
      '&::after': {
        height: 'var(--unstable_indicatorThickness, var(--Tab-indicatorThickness))',
        left: ownerState.indicatorInset ? 'var(--ListItem-paddingLeft)' : 'var(--unstable_offset)',
        right: ownerState.indicatorInset
          ? 'var(--ListItem-paddingRight)'
          : 'var(--unstable_offset)',
        top: 'var(--unstable_offset)',
      },
    },
  !ownerState.disableIndicator &&
    ownerState.indicatorPlacement === 'right' && {
      paddingRight: 'calc(var(--ListItem-paddingRight) + var(--Tab-indicatorThickness))',
      '&::after': {
        width: 'var(--unstable_indicatorThickness, var(--Tab-indicatorThickness))',
        top: ownerState.indicatorInset ? 'var(--ListItem-paddingY)' : 'var(--unstable_offset)',
        bottom: ownerState.indicatorInset ? 'var(--ListItem-paddingY)' : 'var(--unstable_offset)',
        right: 'var(--unstable_offset)',
      },
    },
  !ownerState.disableIndicator &&
    ownerState.indicatorPlacement === 'left' && {
      paddingLeft: 'calc(var(--ListItem-paddingLeft) + var(--Tab-indicatorThickness))',
      '&::after': {
        width: 'var(--unstable_indicatorThickness, var(--Tab-indicatorThickness))',
        top: ownerState.indicatorInset ? 'var(--ListItem-paddingY)' : 'var(--unstable_offset)',
        bottom: ownerState.indicatorInset ? 'var(--ListItem-paddingY)' : 'var(--unstable_offset)',
        left: 'var(--unstable_offset)',
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
    color: colorProp = 'neutral',
    disableIndicator = false,
    indicatorPlacement = row ? 'bottom' : 'right',
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
    disableIndicator,
    indicatorPlacement,
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
