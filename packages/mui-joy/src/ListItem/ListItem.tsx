import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import ListItemContext from './ListItemContext';
import { ListItemProps, ListItemTypeMap } from './ListItemProps';
import listItemClasses, { getListItemUtilityClass } from './listItemClasses';
import listItemButtonClasses from '../ListItemButton/listItemButtonClasses';

const useUtilityClasses = (ownerState: ListItemProps) => {
  const { sticky, nestedLevel } = ownerState;
  const slots = {
    root: ['root', sticky && 'sticky', !!nestedLevel && `nestedLevel${nestedLevel}`],
    secondaryAction: ['secondaryAction'],
  };

  return composeClasses(slots, getListItemUtilityClass, {});
};

const ListItemRoot = styled('li', {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListItemProps }>(({ theme, ownerState }) => ({
  // add negative margin to ListItemButton equal to this ListItem padding
  '--List-itemButton-margin':
    'calc(-1 * var(--List-item-paddingY)) calc(-1 * var(--List-item-paddingX)) calc(-1 * var(--List-item-paddingY)) calc(-1 * var(--List-insetStart))',
  '--List-decorator-color': theme.vars.palette.text.tertiary, // for making icon color less obvious
  ...(ownerState.secondaryAction && {
    '--List-item-secondaryActionWidth': '3rem', // to add sufficient padding-right on ListItemButton
  }),
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  padding: 'var(--List-item-paddingY) var(--List-item-paddingX)',
  paddingLeft: 'var(--List-insetStart)',
  minHeight: 'var(--List-item-minHeight)',
  ...theme.typography.body1,
  ...(ownerState.sticky && {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    background: 'var(--List-background)',
  }),
  [`& + .${listItemClasses.root}, & + .${listItemButtonClasses.root}`]: {
    marginTop: 'var(--List-gap)',
  },
  ...(ownerState.nestedLevel && {
    // add negative margin to NestedList equal to this ListItem padding & clear the padding
    '--NestedList-margin':
      'calc(-1 * var(--List-item-paddingY)) calc(-1 * (var(--List-item-paddingX) + var(--List-padding)))',
    '--NestedList-padding': 'var(--List-padding)',
    '--NestedList-radius': 'var(--List-radius)',
    '--NestedList-gap': 'var(--List-gap)',
    '--NestedList-background': 'var(--List-background)',
    '--NestedList-item-radius': 'var(--List-item-radius)',
    '--NestedList-item-paddingX': 'var(--List-item-paddingX)',
    '--NestedList-item-paddingY': 'var(--List-item-paddingY)',
    '--NestedList-item-minHeight': 'var(--List-item-minHeight)',
    '--NestedList-decorator-width': 'var(--List-decorator-width)',
    '--NestedList-divider-gap': 'var(--List-divider-gap)',
    '--NestedList-nestedItem-startGap': 'var(--List-nestedItem-startGap)',
    '--NestedList-insetStart': `calc(var(--List-insetStart) + var(--List-nestedItem-startGap))`,
    flexDirection: 'column',
    alignItems: 'initial',
    // insetStart has no effect on nested list item
    paddingLeft: 'var(--List-item-paddingX)',
    '--List-itemButton-margin':
      'calc(-1 * var(--List-item-paddingY)) calc(-1 * var(--List-item-paddingX))',
  }),
}));

const ListItemSecondaryAction = styled('div', {
  name: 'MuiListItem',
  slot: 'SecondaryAction',
  overridesResolver: (props, styles) => styles.secondaryAction,
})<{ ownerState: ListItemProps }>({
  display: 'inherit',
  position: 'absolute',
  top: '50%',
  right: 'var(--List-item-paddingX)',
  transform: 'translateY(-50%)',
});

const ListItem = React.forwardRef(function ListItem(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiListItem',
  });

  const {
    component,
    className,
    children,
    sticky = false,
    secondaryAction,
    nestedLevel,
    ...other
  } = props;

  const ownerState = {
    sticky,
    secondaryAction,
    nestedLevel,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ListItemRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      <ListItemContext.Provider value={{ nestedLevel }}>
        {children}
        {secondaryAction && (
          <ListItemSecondaryAction className={classes.secondaryAction} ownerState={ownerState}>
            {secondaryAction}
          </ListItemSecondaryAction>
        )}
      </ListItemContext.Provider>
    </ListItemRoot>
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
  secondaryAction: PropTypes.node,
  /**
   * If `true`, the component has sticky position (with top = 0).
   * @default false
   */
  sticky: PropTypes.bool,
} as any;

export default ListItem;
