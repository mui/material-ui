import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { NestedListItemProps, NestedListItemTypeMap } from './NestedListItemProps';
import { getNestedListItemUtilityClass } from './nestedListItemClasses';
import { listItemClasses } from '../ListItem';

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
  // insetStart has no effect on nested list item
  '--List-itemButton-margin':
    'calc(-1 * var(--List-item-paddingY)) calc(-1 * var(--List-item-paddingX))',
  [`& > .${listItemClasses.root}`]: {
    // in case of using ListItem as a wrapper inside nested ListItem
    margin: 'calc(-1 * var(--List-item-paddingY)) calc(-1 * var(--List-item-paddingX))',
  },
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  padding: 'var(--List-item-paddingY) var(--List-item-paddingX)',
  minHeight: 'var(--List-item-minHeight)',
  marginBottom: 'var(--List-gap)',
  ...theme.typography.body1,
  ...(ownerState.sticky && {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    background: 'var(--List-background)',
  }),
}));

const NestedListItemSecondaryAction = styled('div', {
  name: 'MuiNestedListItem',
  slot: 'SecondaryAction',
  overridesResolver: (props, styles) => styles.secondaryAction,
})<{ ownerState: NestedListItemProps }>({
  display: 'inherit',
  position: 'absolute',
  top: 'var(--List-secondaryAction-top, 50%)',
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
