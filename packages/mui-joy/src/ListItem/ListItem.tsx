import * as React from 'react';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListItemProps, ListItemTypeMap } from './ListItemProps';
import { getListItemUtilityClass } from './listItemClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getListItemUtilityClass, {});
};

const ListItemRoot = styled('li', {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListItemProps }>(({ theme }) => ({
  // add negative margin to ListItemButton equal to this ListItem padding
  '--ListItemButton-margin':
    'max(-0.375rem, -1 * var(--List-itemGutter)) calc(-1 * var(--List-itemGutter))',

  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  padding: 'min(0.375rem, var(--List-itemGutter)) var(--List-itemGutter)',
  minHeight: 'var(--List-itemMinHeight)',
  ...theme.typography.body1,
}));

const ListItem = React.forwardRef(function ListItem(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiListItem',
  });

  const { component, className, children, ...other } = props;

  const ownerState = {
    ...props,
  };

  const classes = useUtilityClasses();

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
