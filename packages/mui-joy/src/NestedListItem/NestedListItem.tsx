import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { NestedListItemProps, NestedListItemTypeMap } from './NestedListItemProps';
import nestedListItemClasses, { getNestedListItemUtilityClass } from './nestedListItemClasses';
import { listItemClasses } from '../ListItem';
import { listItemButtonClasses } from '../ListItemButton';

const useUtilityClasses = (ownerState: NestedListItemProps) => {
  const { sticky } = ownerState;
  const slots = {
    root: ['root', sticky && 'sticky'],
    secondaryAction: ['secondaryAction'],
  };

  return composeClasses(slots, getNestedListItemUtilityClass, {});
};

const NestedListItemRoot = styled('li', {
  name: 'MuiNestedListItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: NestedListItemProps }>(({ theme, ownerState }) => ({
  ...(ownerState.secondaryAction && {
    '--List-item-secondaryActionWidth': '3rem', // to add sufficient padding-right on ListItemButton
  }),
  // add negative margin to NestedList equal to this ListItem padding
  '--NestedList-margin': '0px calc(-1 * var(--List-item-paddingX))',
  '--NestedList-insetStart': `calc(var(--List-insetStart) + var(--List-insetStartAddition))`,
  // add negative margin to ListItem, ListItemButton to make them start from the edge.
  '--List-itemButton-margin':
    'calc(-1 * var(--List-item-paddingY)) calc(-1 * var(--List-item-paddingX)) 0px',
  '--List-item-margin':
    'calc(-1 * var(--List-item-paddingY)) calc(-1 * var(--List-item-paddingX)) 0px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  padding: 'var(--List-item-paddingY) var(--List-item-paddingX)',
  minHeight: 'var(--List-item-minHeight)',
  ...theme.typography.body1,
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
  [`& + .${nestedListItemClasses.root}`]: {
    marginTop: 'var(--List-gap)',
  },
}));

const NestedListItemSecondaryAction = styled('div', {
  name: 'MuiNestedListItem',
  slot: 'SecondaryAction',
  overridesResolver: (props, styles) => styles.secondaryAction,
})<{ ownerState: NestedListItemProps }>({
  display: 'inherit',
  position: 'absolute',
  top: 'calc(var(--List-item-minHeight) / 2)',
  right: 'var(--List-item-paddingX)',
  transform: 'translateY(-50%)',
});

const NestedListItem = React.forwardRef(function NestedListItem(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiNestedListItem',
  });

  const { component, className, children, sticky = false, secondaryAction, ...other } = props;

  const ownerState = {
    sticky,
    secondaryAction,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <NestedListItemRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      {children}
      {secondaryAction && (
        <NestedListItemSecondaryAction className={classes.secondaryAction} ownerState={ownerState}>
          {secondaryAction}
        </NestedListItemSecondaryAction>
      )}
    </NestedListItemRoot>
  );
}) as OverridableComponent<NestedListItemTypeMap>;

NestedListItem.propTypes /* remove-proptypes */ = {
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
   * The element to display at the end of NestedListItem.
   */
  secondaryAction: PropTypes.node,
  /**
   * If `true`, the component has sticky position (with top = 0).
   * @default false
   */
  sticky: PropTypes.bool,
} as any;

export default NestedListItem;
