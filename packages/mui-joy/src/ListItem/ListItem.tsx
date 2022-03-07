import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListItemProps, ListItemTypeMap } from './ListItemProps';
import listItemClasses, { getListItemUtilityClass } from './listItemClasses';
import { listItemButtonClasses } from '../ListItemButton';
import NestedListContext from '../List/NestedListContext';

const useUtilityClasses = (ownerState: ListItemProps) => {
  const { sticky, nested } = ownerState;
  const slots = {
    root: ['root', nested && 'nested', sticky && 'sticky'],
    startAction: ['startAction'],
    endAction: ['endAction'],
  };

  return composeClasses(slots, getListItemUtilityClass, {});
};

const ListItemRoot = styled('li', {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListItemProps }>(({ theme, ownerState }) => [
  !ownerState.nested && {
    // add negative margin to ListItemButton equal to this ListItem padding
    '--List-itemButton-margin': `calc(-1 * var(--List-item-paddingY))
calc(-1 * var(--List-item-paddingRight))
calc(-1 * var(--List-item-paddingY))
calc(-1 * var(--List-item-paddingLeft))`,
    alignItems: 'center',
    margin: 'var(--List-item-margin)',
  },
  ownerState.nested && {
    // add negative margin to NestedList equal to this ListItem padding
    '--NestedList-margin':
      '0px calc(-1 * var(--List-item-paddingRight)) 0px calc(-1 * var(--List-item-paddingLeft))',
    '--NestedList-item-paddingLeft': `calc(var(--List-item-paddingLeft) + var(--List-nestedInsetStart))`,
    // add negative margin to ListItem, ListItemButton to make them start from the edge.
    '--List-itemButton-margin':
      'calc(-1 * var(--List-item-paddingY)) calc(-1 * var(--List-item-paddingRight)) 0px calc(-1 * var(--List-item-paddingLeft))',
    '--List-item-margin':
      'calc(-1 * var(--List-item-paddingY)) calc(-1 * var(--List-item-paddingRight)) 0px calc(-1 * var(--List-item-paddingLeft))',
    flexDirection: 'column',
  },
  // Base styles
  {
    ...(ownerState.startAction && {
      '--internal-startActionWidth': '3rem', // to add sufficient padding-left on ListItemButton
    }),
    ...(ownerState.endAction && {
      '--internal-endActionWidth': '3rem', // to add sufficient padding-right on ListItemButton
    }),
    boxSizing: 'border-box',
    display: 'flex',
    position: 'relative',
    padding: 'var(--List-item-paddingY)',
    paddingLeft: 'var(--List-item-paddingLeft)',
    paddingRight: 'var(--List-item-paddingRight)',
    minHeight: 'var(--List-item-minHeight)',
    fontSize: 'var(--List-item-fontSize)',
    fontFamily: theme.vars.fontFamily.body,
    ...(ownerState.sticky && {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      background: 'var(--List-background)',
    }),
    // Using :last-child or :first-child selector would complicate ListDivider margin
    [`& + .${listItemClasses.root}`]: {
      marginTop: 'var(--List-gap)',
    },
    [`& + .${listItemButtonClasses.root}`]: {
      marginTop: 'var(--List-gap)',
    },
  },
]);

const ListItemStartAction = styled('div', {
  name: 'MuiListItem',
  slot: 'StartAction',
  overridesResolver: (props, styles) => styles.startAction,
})<{ ownerState: ListItemProps }>(({ ownerState }) => ({
  display: 'inherit',
  position: 'absolute',
  top: ownerState.nested ? 'calc(var(--List-item-minHeight) / 2)' : '50%',
  left: 0,
  transform: 'translate(var(--List-item-startActionTranslateX), -50%)',
}));

const ListItemEndAction = styled('div', {
  name: 'MuiListItem',
  slot: 'StartAction',
  overridesResolver: (props, styles) => styles.startAction,
})<{ ownerState: ListItemProps }>(({ ownerState }) => ({
  display: 'inherit',
  position: 'absolute',
  top: ownerState.nested ? 'calc(var(--List-item-minHeight) / 2)' : '50%',
  right: 0,
  transform: 'translate(var(--List-item-endActionTranslateX), -50%)',
}));

const ListItem = React.forwardRef(function ListItem(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiListItem',
  });

  const {
    component,
    className,
    children,
    nested = false,
    sticky = false,
    startAction,
    endAction,
    ...other
  } = props;

  const ownerState = {
    sticky,
    startAction,
    endAction,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <NestedListContext.Provider value={nested}>
      <ListItemRoot
        ref={ref}
        as={component}
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        {...other}
      >
        {startAction && (
          <ListItemStartAction className={classes.startAction} ownerState={ownerState}>
            {startAction}
          </ListItemStartAction>
        )}

        {children}
        {endAction && (
          <ListItemEndAction className={classes.endAction} ownerState={ownerState}>
            {endAction}
          </ListItemEndAction>
        )}
      </ListItemRoot>
    </NestedListContext.Provider>
  );
}) as OverridableComponent<ListItemTypeMap>;

ListItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
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
   * The element to display at the end of ListItem.
   */
  endAction: PropTypes.node,
  /**
   * If `true`, the component can contain NestedList.
   * @default false
   */
  nested: PropTypes.bool,
  /**
   * The element to display at the start of ListItem.
   */
  startAction: PropTypes.node,
  /**
   * If `true`, the component has sticky position (with top = 0).
   * @default false
   */
  sticky: PropTypes.bool,
} as any;

export default ListItem;
