import * as React from 'react';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListItemSeparatorProps, ListItemSeparatorTypeMap } from './ListItemSeparatorProps';
import { getListItemSeparatorUtilityClass } from './listItemSeparatorClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getListItemSeparatorUtilityClass, {});
};

const ListItemSeparatorRoot = styled('li', {
  name: 'MuiListItemSeparator',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListItemSeparatorProps }>(({ theme, ownerState }) => ({
  border: 'none', // reset the border for `hr` tag
  borderBottom: '1px solid',
  borderColor: theme.vars.palette.neutral.outlinedBorder,
  margin: 'var(--List-separatorSize) calc(-1 * var(--List-gutter))',
  ...(ownerState.inset === 'gutter' && {
    margin: 'var(--List-separatorSize) var(--List-itemGutter)',
  }),
  ...(ownerState.inset === 'leftAdornment' && {
    marginLeft: 'var(--List-insetLeft, var(--List-itemGutter))',
  }),
  ...(ownerState.inset === 'leftContent' && {
    marginLeft: 'calc(var(--List-insetLeft, var(--List-gutter)) + var(--List-startAdornment))',
  }),
}));

const ListItemSeparator = React.forwardRef(function ListItemSeparator(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiListItemSeparator',
  });

  const { component, className, children, inset, ...other } = props;

  const ownerState = {
    inset,
    ...props,
  };

  const classes = useUtilityClasses();

  return (
    <ListItemSeparatorRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      role="separator"
      {...other}
    >
      {children}
    </ListItemSeparatorRoot>
  );
}) as OverridableComponent<ListItemSeparatorTypeMap>;

export default ListItemSeparator;
