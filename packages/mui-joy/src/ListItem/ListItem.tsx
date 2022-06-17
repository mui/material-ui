import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListItemProps, ListItemTypeMap } from './ListItemProps';
import listItemClasses, { getListItemUtilityClass } from './listItemClasses';
import { listItemButtonClasses } from '../ListItemButton';
import NestedListContext from '../List/NestedListContext';
import RowListContext from '../List/RowListContext';
import ComponentListContext from '../List/ComponentListContext';

const useUtilityClasses = (ownerState: ListItemProps) => {
  const { sticky, nested, variant, color } = ownerState;
  const slots = {
    root: [
      'root',
      nested && 'nested',
      sticky && 'sticky',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
    startAction: ['startAction'],
    endAction: ['endAction'],
  };

  return composeClasses(slots, getListItemUtilityClass, {});
};

const ListItemRoot = styled('li', {
  name: 'JoyListItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListItemProps & { row: boolean } }>(({ theme, ownerState }) => [
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
    '--internal-action-radius': 'var(--List-item-radius)',
    ...(ownerState.startAction && {
      '--internal-startActionWidth': '3rem', // to add sufficient padding-left on ListItemButton
    }),
    ...(ownerState.endAction && {
      '--internal-endActionWidth': '3rem', // to add sufficient padding-right on ListItemButton
    }),
    boxSizing: 'border-box',
    borderRadius: 'var(--List-item-radius)',
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
      background: 'var(--List-item-stickyBackground)',
    }),
    // Using :last-child or :first-child selector would complicate ListDivider margin
    [`& + .${listItemClasses.root}`]: ownerState.row
      ? {
          marginLeft: 'var(--List-gap)',
        }
      : {
          marginTop: 'var(--List-gap)',
        },
    [`& + .${listItemButtonClasses.root}`]: ownerState.row
      ? { marginLeft: 'var(--List-gap)' }
      : {
          marginTop: 'var(--List-gap)',
        },
  },
  theme.variants[ownerState.variant!]?.[ownerState.color!],
]);

const ListItemStartAction = styled('div', {
  name: 'JoyListItem',
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
  name: 'JoyListItem',
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
    name: 'JoyListItem',
  });

  const listComponent = React.useContext(ComponentListContext);
  const row = React.useContext(RowListContext);

  const {
    component,
    className,
    children,
    nested = false,
    sticky = false,
    variant = 'plain',
    color = 'neutral',
    startAction,
    endAction,
    ...other
  } = props;

  const ownerState = {
    sticky,
    startAction,
    endAction,
    row,
    variant,
    color,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <NestedListContext.Provider value={nested}>
      <ListItemRoot
        ref={ref}
        as={
          component || (listComponent && !listComponent.match(/^(ul|ol|menu)$/) ? 'div' : undefined)
        }
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
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
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
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default ListItem;
