import * as React from 'react';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListItemAdornmentProps, ListItemAdornmentTypeMap } from './ListItemAdornmentProps';
import { getListItemAdornmentUtilityClass } from './listItemAdornmentClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getListItemAdornmentUtilityClass, {});
};

const ListItemAdornmentRoot = styled('span', {
  name: 'MuiListItemAdornment',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListItemAdornmentProps }>(({ ownerState }) => ({
  display: 'inline-flex',
  ...(ownerState.end
    ? { marginLeft: 'var(--List-itemGutter)' }
    : { minWidth: 'var(--List-startAdornment)' }),
}));

const ListItemAdornment = React.forwardRef(function ListItemAdornment(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiListItemAdornment',
  });

  const { component, className, children, end = false, ...other } = props;

  const ownerState = {
    end,
    ...props,
  };

  const classes = useUtilityClasses();

  return (
    <ListItemAdornmentRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      {children}
    </ListItemAdornmentRoot>
  );
}) as OverridableComponent<ListItemAdornmentTypeMap>;

export default ListItemAdornment;
