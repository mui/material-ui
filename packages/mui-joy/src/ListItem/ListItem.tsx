import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListItemProps, ListItemTypeMap } from './ListItemProps';
import listItemClasses, { getListItemUtilityClass } from './listItemClasses';
import { listItemButtonClasses } from '../ListItemButton';

const useUtilityClasses = (ownerState: ListItemProps) => {
  const { sticky } = ownerState;
  const slots = {
    root: ['root', sticky && 'sticky'],
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
  '--List-itemButton-margin': `calc(-1 * var(--List-item-paddingY))
    calc(-1 * var(--List-item-paddingX))
    calc(-1 * var(--List-item-paddingY))
    calc(-1 * var(--List-insetStart))`,
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
  margin: 'var(--List-item-margin)',
  fontSize: 'var(--List-item-fontSize)',
  fontFamily: theme.vars.fontFamily.body,
  ...(ownerState.sticky && {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    background: 'var(--List-background)',
  }),
  [`& + .${listItemClasses.root}`]: {
    marginTop: 'var(--List-gap)',
  },
  [`& + .${listItemButtonClasses.root}`]: {
    marginTop: 'var(--List-gap)',
  },
}));

const ListItemSecondaryAction = styled('div', {
  name: 'MuiListItem',
  slot: 'SecondaryAction',
  overridesResolver: (props, styles) => styles.secondaryAction,
})<{ ownerState: ListItemProps }>({
  display: 'inherit',
  position: 'absolute',
  top: '50%',
  right: 'var(--List-item-secondaryActionRight)',
  transform: 'translateY(-50%)',
});

const ListItem = React.forwardRef(function ListItem(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiListItem',
  });

  const { component, className, children, sticky = false, secondaryAction, ...other } = props;

  const ownerState = {
    sticky,
    secondaryAction,
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
      {children}
      {secondaryAction && (
        <ListItemSecondaryAction className={classes.secondaryAction} ownerState={ownerState}>
          {secondaryAction}
        </ListItemSecondaryAction>
      )}
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
