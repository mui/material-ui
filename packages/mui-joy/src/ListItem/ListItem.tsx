import * as React from 'react';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListItemProps, ListItemTypeMap } from './ListItemProps';
import { getListItemUtilityClass } from './listItemClasses';

const useUtilityClasses = (ownerState: ListItemProps) => {
  const { nestedLevel } = ownerState;
  const slots = {
    root: ['root', !!nestedLevel && `nestedLevel${nestedLevel}`],
  };

  return composeClasses(slots, getListItemUtilityClass, {});
};

const ListItemRoot = styled('li', {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListItemProps }>(({ theme, ownerState }) => ({
  // add negative margin to ListItemButton equal to this ListItem padding
  '--ListItemButton-margin':
    'max(-0.375rem, -1 * var(--List-itemGutter)) calc(-1 * var(--List-itemGutter))',

  ...(ownerState.nestedLevel && {
    // tell the List that it is nested
    '--NestedList-level': ownerState.nestedLevel,

    // add negative margin to NestedList equal to this ListItem padding & clear the padding
    '--NestedList-margin':
      'max(-0.375rem, -1 * var(--List-itemGutter)) calc(-1 * var(--List-itemGutter))',
    '--NestedList-padding': '0px var(--List-gutter)',

    '--NestedList-radius': 'var(--List-radius)',
    '--NestedList-gutter': 'var(--List-gutter)',
    '--NestedList-itemMinHeight': 'var(--List-itemMinHeight)',
    '--NestedList-startAdornment': 'var(--List-startAdornment)',
    '--NestedList-separatorSize': 'var(--List-separatorSize)',
    margin: '0px calc(-1 * var(--List-gutter))',
  }),
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  padding: 'min(0.375rem, var(--List-itemGutter)) var(--List-itemGutter)',
  ...(!ownerState.nestedLevel && {
    paddingLeft: 'var(--List-insetLeft, var(--List-itemGutter))',
  }),
  minHeight: 'var(--List-itemMinHeight)',
  ...theme.typography.body1,
}));

const ListItem = React.forwardRef(function ListItem(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiListItem',
  });

  const { component, className, children, nestedLevel, ...other } = props;

  const ownerState = {
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
      {children}
    </ListItemRoot>
  );
}) as OverridableComponent<ListItemTypeMap>;

export default ListItem;
