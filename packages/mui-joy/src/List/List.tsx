import * as React from 'react';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListProps, ListTypeMap } from './ListProps';
import { getListUtilityClass } from './listClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getListUtilityClass, {});
};

const ListRoot = styled('ul', {
  name: 'MuiList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListProps }>({
  // ========= Public variables =========
  '--List-gutter': '0.375rem',
  //   below variables inherit from ListItem
  //   if there is no ListItem as a parent, use the default values.
  '--List-radius': 'var(--NestedList-radius, 8px)',
  '--List-itemGutter': 'var(--NestedList-itemGutter, 0.375rem)',
  '--List-itemMinHeight': 'var(--NestedList-itemMinHeight, 2.5rem)',
  '--List-startAdornment': 'var(--NestedList-startAdornment, 3rem)',
  '--List-separatorSize': 'var(--NestedList-separatorSize, 0.375rem)',
  //   to override padding-left of the nested ListItem & ListItemButton if this list is inside a ListItem.
  '--List-insetLeft': 'calc(var(--NestedList-level) * (var(--List-itemGutter) + 1.5rem))',

  // ========= Private variables =========
  //   to reset the ListItemButton in nested list
  '--ListItemButton-margin': 'initial',

  borderRadius: 'var(--List-radius)',
  padding: 'var(--NestedList-padding, 0.375rem var(--List-gutter))',
  listStyle: 'none',
  margin: 'var(--NestedList-margin, initial)',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

const List = React.forwardRef(function List(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiList',
  });

  const { component, className, children, ...other } = props;

  const ownerState = {
    ...props,
  };

  const classes = useUtilityClasses();

  return (
    <ListRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      {children}
    </ListRoot>
  );
}) as OverridableComponent<ListTypeMap>;

export default List;
