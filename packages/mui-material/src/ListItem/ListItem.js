import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses, isHostComponent } from '@mui/base';
import { chainPropTypes, elementTypeAcceptingRef } from '@mui/utils';
import { alpha } from '@mui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import isMuiElement from '../utils/isMuiElement';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import ListContext from '../List/ListContext';
import listItemClasses, { getListItemUtilityClass } from './listItemClasses';
import { listItemButtonClasses } from '../ListItemButton';
import ListItemSecondaryAction from '../ListItemSecondaryAction';

export const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.dense && styles.dense,
    ownerState.alignItems === 'flex-start' && styles.alignItemsFlexStart,
    ownerState.divider && styles.divider,
    !ownerState.disableGutters && styles.gutters,
    !ownerState.disablePadding && styles.padding,
    ownerState.button && styles.button,
    ownerState.hasSecondaryAction && styles.secondaryAction,
  ];
};

const useUtilityClasses = (ownerState) => {
  const {
    alignItems,
    button,
    classes,
    dense,
    disabled,
    disableGutters,
    disablePadding,
    divider,
    hasSecondaryAction,
    selected,
  } = ownerState;

  const slots = {
    root: [
      'root',
      dense && 'dense',
      !disableGutters && 'gutters',
      !disablePadding && 'padding',
      divider && 'divider',
      disabled && 'disabled',
      button && 'button',
      alignItems === 'flex-start' && 'alignItemsFlexStart',
      hasSecondaryAction && 'secondaryAction',
      selected && 'selected',
    ],
    container: ['container'],
  };

  return composeClasses(slots, getListItemUtilityClass, classes);
};

export const ListItemRoot = styled('div', {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver,
})(({ theme, ownerState }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  width: '100%',
  boxSizing: 'border-box',
  textAlign: 'left',
  ...(!ownerState.disablePadding && {
    paddingTop: 8,
    paddingBottom: 8,
    ...(ownerState.dense && {
      paddingTop: 4,
      paddingBottom: 4,
    }),
    ...(!ownerState.disableGutters && {
      paddingLeft: 16,
      paddingRight: 16,
    }),
    ...(!!ownerState.secondaryAction && {
      // Add some space to avoid collision as `ListItemSecondaryAction`
      // is absolutely positioned.
      paddingRight: 48,
    }),
  }),
  ...(!!ownerState.secondaryAction && {
    [`& > .${listItemButtonClasses.root}`]: {
      paddingRight: 48,
    },
  }),
  [`&.${listItemClasses.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus,
  },
  [`&.${listItemClasses.selected}`]: {
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
      : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${listItemClasses.focusVisible}`]: {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
        : alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
          ),
    },
  },
  [`&.${listItemClasses.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity,
  },
  ...(ownerState.alignItems === 'flex-start' && {
    alignItems: 'flex-start',
  }),
  ...(ownerState.divider && {
    borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
    backgroundClip: 'padding-box',
  }),
  ...(ownerState.button && {
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: (theme.vars || theme).palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    [`&.${listItemClasses.selected}:hover`]: {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
        : alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
          ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
          : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  }),
  ...(ownerState.hasSecondaryAction && {
    // Add some space to avoid collision as `ListItemSecondaryAction`
    // is absolutely positioned.
    paddingRight: 48,
  }),
}));

const ListItemContainer = styled('li', {
  name: 'MuiListItem',
  slot: 'Container',
  overridesResolver: (props, styles) => styles.container,
})({
  position: 'relative',
});

/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */
const ListItem = React.forwardRef(function ListItem(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiListItem' });
  const {
    alignItems = 'center',
    autoFocus = false,
    button = false,
    children: childrenProp,
    className,
    component: componentProp,
    components = {},
    componentsProps = {},
    ContainerComponent = 'li',
    ContainerProps: { className: ContainerClassName, ...ContainerProps } = {},
    dense = false,
    disabled = false,
    disableGutters = false,
    disablePadding = false,
    divider = false,
    focusVisibleClassName,
    secondaryAction,
    selected = false,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const context = React.useContext(ListContext);
  const childContext = React.useMemo(
    () => ({
      dense: dense || context.dense || false,
      alignItems,
      disableGutters,
    }),
    [alignItems, context.dense, dense, disableGutters],
  );

  const listItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error(
          'MUI: Unable to set focus to a ListItem whose component has not been rendered.',
        );
      }
    }
  }, [autoFocus]);

  const children = React.Children.toArray(childrenProp);

  // v4 implementation, deprecated in v5, will be removed in v6
  const hasSecondaryAction =
    children.length && isMuiElement(children[children.length - 1], ['ListItemSecondaryAction']);

  const ownerState = {
    ...props,
    alignItems,
    autoFocus,
    button,
    dense: childContext.dense,
    disabled,
    disableGutters,
    disablePadding,
    divider,
    hasSecondaryAction,
    selected,
  };

  const classes = useUtilityClasses(ownerState);

  const handleRef = useForkRef(listItemRef, ref);

  const Root = slots.root || components.Root || ListItemRoot;
  const rootProps = slotProps.root || componentsProps.root || {};

  const componentProps = {
    className: clsx(classes.root, rootProps.className, className),
    disabled,
    ...other,
  };

  let Component = componentProp || 'li';

  if (button) {
    componentProps.component = componentProp || 'div';
    componentProps.focusVisibleClassName = clsx(
      listItemClasses.focusVisible,
      focusVisibleClassName,
    );

    Component = ButtonBase;
  }

  // v4 implementation, deprecated in v5, will be removed in v6
  if (hasSecondaryAction) {
    // Use div by default.
    Component = !componentProps.component && !componentProp ? 'div' : Component;

    // Avoid nesting of li > li.
    if (ContainerComponent === 'li') {
      if (Component === 'li') {
        Component = 'div';
      } else if (componentProps.component === 'li') {
        componentProps.component = 'div';
      }
    }

    return (
      <ListContext.Provider value={childContext}>
        <ListItemContainer
          as={ContainerComponent}
          className={clsx(classes.container, ContainerClassName)}
          ref={handleRef}
          ownerState={ownerState}
          {...ContainerProps}
        >
          <Root
            {...rootProps}
            {...(!isHostComponent(Root) && {
              as: Component,
              ownerState: { ...ownerState, ...rootProps.ownerState },
            })}
            {...componentProps}
          >
            {children}
          </Root>
          {children.pop()}
        </ListItemContainer>
      </ListContext.Provider>
    );
  }

  return (
    <ListContext.Provider value={childContext}>
      <Root
        {...rootProps}
        as={Component}
        ref={handleRef}
        {...(!isHostComponent(Root) && {
          ownerState: { ...ownerState, ...rootProps.ownerState },
        })}
        {...componentProps}
      >
        {children}
        {secondaryAction && <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>}
      </Root>
    </ListContext.Provider>
  );
});

ListItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: PropTypes.oneOf(['center', 'flex-start']),
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   * @deprecated checkout [ListItemButton](/material-ui/api/list-item-button/) instead
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the list item is a button (using `ButtonBase`). Props intended
   * for `ButtonBase` can then be applied to `ListItem`.
   * @default false
   * @deprecated checkout [ListItemButton](/material-ui/api/list-item-button/) instead
   */
  button: PropTypes.bool,
  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: chainPropTypes(PropTypes.node, (props) => {
    const children = React.Children.toArray(props.children);

    // React.Children.toArray(props.children).findLastIndex(isListItemSecondaryAction)
    let secondaryActionIndex = -1;
    for (let i = children.length - 1; i >= 0; i -= 1) {
      const child = children[i];
      if (isMuiElement(child, ['ListItemSecondaryAction'])) {
        secondaryActionIndex = i;
        break;
      }
    }

    //  is ListItemSecondaryAction the last child of ListItem
    if (secondaryActionIndex !== -1 && secondaryActionIndex !== children.length - 1) {
      return new Error(
        'MUI: You used an element after ListItemSecondaryAction. ' +
          'For ListItem to detect that it has a secondary action ' +
          'you must pass it as the last child to ListItem.',
      );
    }

    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
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
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object,
  }),
  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   * @deprecated
   */
  ContainerComponent: elementTypeAcceptingRef,
  /**
   * Props applied to the container component if used.
   * @default {}
   * @deprecated
   */
  ContainerProps: PropTypes.object,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   * @deprecated checkout [ListItemButton](/material-ui/api/list-item-button/) instead
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction: PropTypes.node,
  /**
   * Use to apply selected styling.
   * @default false
   * @deprecated checkout [ListItemButton](/material-ui/api/list-item-button/) instead
   */
  selected: PropTypes.bool,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.object,
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
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
};

export default ListItem;
