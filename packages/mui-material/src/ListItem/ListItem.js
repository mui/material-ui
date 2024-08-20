'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import chainPropTypes from '@mui/utils/chainPropTypes';
import isHostComponent from '../utils/isHostComponent';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import isMuiElement from '../utils/isMuiElement';
import useForkRef from '../utils/useForkRef';
import ListContext from '../List/ListContext';
import { getListItemUtilityClass } from './listItemClasses';
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
    ownerState.hasSecondaryAction && styles.secondaryAction,
  ];
};

const useUtilityClasses = (ownerState) => {
  const {
    alignItems,
    classes,
    dense,
    disableGutters,
    disablePadding,
    divider,
    hasSecondaryAction,
  } = ownerState;

  const slots = {
    root: [
      'root',
      dense && 'dense',
      !disableGutters && 'gutters',
      !disablePadding && 'padding',
      divider && 'divider',
      alignItems === 'flex-start' && 'alignItemsFlexStart',
      hasSecondaryAction && 'secondaryAction',
    ],
    container: ['container'],
  };

  return composeClasses(slots, getListItemUtilityClass, classes);
};

export const ListItemRoot = styled('div', {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver,
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'left',
    variants: [
      {
        props: ({ ownerState }) => !ownerState.disablePadding,
        style: {
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      {
        props: ({ ownerState }) => !ownerState.disablePadding && ownerState.dense,
        style: {
          paddingTop: 4,
          paddingBottom: 4,
        },
      },
      {
        props: ({ ownerState }) => !ownerState.disablePadding && !ownerState.disableGutters,
        style: {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
      {
        props: ({ ownerState }) => !ownerState.disablePadding && !!ownerState.secondaryAction,
        style: {
          // Add some space to avoid collision as `ListItemSecondaryAction`
          // is absolutely positioned.
          paddingRight: 48,
        },
      },
      {
        props: ({ ownerState }) => !!ownerState.secondaryAction,
        style: {
          [`& > .${listItemButtonClasses.root}`]: {
            paddingRight: 48,
          },
        },
      },
      {
        props: {
          alignItems: 'flex-start',
        },
        style: {
          alignItems: 'flex-start',
        },
      },
      {
        props: ({ ownerState }) => ownerState.divider,
        style: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
          backgroundClip: 'padding-box',
        },
      },
      {
        props: ({ ownerState }) => ownerState.button,
        style: {
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
        },
      },
      {
        props: ({ ownerState }) => ownerState.hasSecondaryAction,
        style: {
          // Add some space to avoid collision as `ListItemSecondaryAction`
          // is absolutely positioned.
          paddingRight: 48,
        },
      },
    ],
  })),
);

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
  const props = useDefaultProps({ props: inProps, name: 'MuiListItem' });
  const {
    alignItems = 'center',
    children: childrenProp,
    className,
    component: componentProp,
    components = {},
    componentsProps = {},
    ContainerComponent = 'li',
    ContainerProps: { className: ContainerClassName, ...ContainerProps } = {},
    dense = false,
    disableGutters = false,
    disablePadding = false,
    divider = false,
    secondaryAction,
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

  const children = React.Children.toArray(childrenProp);

  // v4 implementation, deprecated in v6, will be removed in v7
  const hasSecondaryAction =
    children.length && isMuiElement(children[children.length - 1], ['ListItemSecondaryAction']);

  const ownerState = {
    ...props,
    alignItems,
    dense: childContext.dense,
    disableGutters,
    disablePadding,
    divider,
    hasSecondaryAction,
  };

  const classes = useUtilityClasses(ownerState);

  const handleRef = useForkRef(listItemRef, ref);

  const Root = slots.root || components.Root || ListItemRoot;
  const rootProps = slotProps.root || componentsProps.root || {};

  const componentProps = {
    className: clsx(classes.root, rootProps.className, className),
    ...other,
  };

  let Component = componentProp || 'li';

  // v4 implementation, deprecated in v6, will be removed in v7
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
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: PropTypes.oneOf(['center', 'flex-start']),
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
   * @deprecated Use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated Use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object,
  }),
  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   * @deprecated Use the `component` or `slots.root` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  ContainerComponent: elementTypeAcceptingRef,
  /**
   * Props applied to the container component if used.
   * @default {}
   * @deprecated Use the `slotProps.root` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  ContainerProps: PropTypes.object,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: PropTypes.bool,
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
   * The element to display at the end of ListItem.
   */
  secondaryAction: PropTypes.node,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.object,
  }),
  /**
   * The components used for each slot inside.
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
