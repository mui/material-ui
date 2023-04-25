import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import useButton from '@mui/base/useButton';
import { styled, useThemeProps } from '../styles';
import { useColorInversion } from '../styles/ColorInversion';
import {
  ListItemButtonOwnerState,
  ExtendListItemButton,
  ListItemButtonTypeMap,
} from './ListItemButtonProps';
import listItemButtonClasses, { getListItemButtonUtilityClass } from './listItemButtonClasses';
import ListItemButtonOrientationContext from './ListItemButtonOrientationContext';
import RowListContext from '../List/RowListContext';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: ListItemButtonOwnerState) => {
  const { color, disabled, focusVisible, focusVisibleClassName, selected, variant } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      color && `color${capitalize(color)}`,
      selected && 'selected',
      variant && `variant${capitalize(variant)}`,
    ],
  };

  const composedClasses = composeClasses(slots, getListItemButtonUtilityClass, {});

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

export const StyledListItemButton = styled('div')<{ ownerState: ListItemButtonOwnerState }>(
  ({ theme, ownerState }) => [
    {
      ...(ownerState.selected && {
        '--ListItemDecorator-color': 'initial',
      }),
      ...(ownerState.disabled && {
        '--ListItemDecorator-color':
          theme.variants?.[`${ownerState.variant!}Disabled`]?.[ownerState.color!]?.color,
      }),
      WebkitTapHighlightColor: 'transparent',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch', // always stretch itself to fill the parent (List|ListItem)
      ...(ownerState.orientation === 'vertical' && {
        flexDirection: 'column',
        justifyContent: 'center',
      }),
      textAlign: 'initial',
      textDecoration: 'initial', // reset native anchor tag
      backgroundColor: 'initial', // reset button background
      cursor: 'pointer',
      // In some cases, ListItemButton is a child of ListItem so the margin needs to be controlled by the ListItem. The value is negative to account for the ListItem's padding
      marginInline: 'var(--ListItemButton-marginInline)',
      marginBlock: 'var(--ListItemButton-marginBlock)',
      ...(ownerState['data-first-child'] === undefined && {
        marginInlineStart: ownerState.row ? 'var(--List-gap)' : undefined,
        marginBlockStart: ownerState.row ? undefined : 'var(--List-gap)',
      }),
      // account for the border width, so that all of the ListItemButtons content aligned horizontally
      paddingBlock: 'calc(var(--ListItem-paddingY) - var(--variant-borderWidth, 0px))',
      // account for the border width, so that all of the ListItemButtons content aligned vertically
      paddingInlineStart:
        'calc(var(--ListItem-paddingLeft) + var(--ListItem-startActionWidth, var(--unstable_startActionWidth, 0px)))', // --internal variable makes it possible to customize the actionWidth from the top List
      paddingInlineEnd:
        'calc(var(--ListItem-paddingRight) + var(--ListItem-endActionWidth, var(--unstable_endActionWidth, 0px)))', // --internal variable makes it possible to customize the actionWidth from the top List
      minBlockSize: 'var(--ListItem-minHeight)',
      border: 'none',
      borderRadius: 'var(--ListItem-radius)',
      flexGrow: ownerState.row ? 0 : 1,
      flexBasis: ownerState.row ? 'auto' : '0%', // for long text (in vertical), displays in multiple lines.
      flexShrink: 0,
      minInlineSize: 0,
      fontSize: 'var(--ListItem-fontSize)',
      fontFamily: theme.vars.fontFamily.body,
      ...(ownerState.selected && {
        fontWeight: theme.vars.fontWeight.md,
      }),
      [theme.focus.selector]: theme.focus.default,
    },
    {
      ...theme.variants[ownerState.variant!]?.[ownerState.color!],
      ...(!ownerState.selected && {
        '&:hover': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
        '&:active': theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
      }),
    },
    {
      [`&.${listItemButtonClasses.disabled}`]:
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
    },
  ],
);

const ListItemButtonRoot = styled(StyledListItemButton, {
  name: 'JoyListItemButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({});
/**
 *
 * Demos:
 *
 * - [Lists](https://mui.com/joy-ui/react-list/)
 *
 * API:
 *
 * - [ListItemButton API](https://mui.com/joy-ui/api/list-item-button/)
 */
const ListItemButton = React.forwardRef(function ListItemButton(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyListItemButton',
  });

  const row = React.useContext(RowListContext);

  const {
    children,
    className,
    action,
    component = 'div',
    orientation = 'horizontal',
    role,
    selected = false,
    color: colorProp = selected ? 'primary' : 'neutral',
    variant = 'plain',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const buttonRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const { focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    ref: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current?.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState = {
    ...props,
    component,
    color,
    focusVisible,
    orientation,
    row,
    selected,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: ListItemButtonRoot,
    externalForwardedProps,
    ownerState,
    getSlotProps: getRootProps,
  });

  return (
    <ListItemButtonOrientationContext.Provider value={orientation}>
      <SlotRoot {...rootProps} role={role ?? rootProps.role}>
        {children}
      </SlotRoot>
    </ListItemButtonOrientationContext.Provider>
  );
}) as ExtendListItemButton<ListItemButtonTypeMap>;

ListItemButton.propTypes /* remove-proptypes */ = {
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
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default selected ? 'primary' : 'neutral'
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
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The content direction flow.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: PropTypes.bool,
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
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default ListItemButton;
