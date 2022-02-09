import * as React from 'react';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListItemContentProps, ListItemContentTypeMap } from './ListItemContentProps';
import { getListItemContentUtilityClass } from './listItemContentClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getListItemContentUtilityClass, {});
};

const ListItemContentRoot = styled('div', {
  name: 'MuiListItemContent',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListItemContentProps }>({
  flex: '1 1 auto',
  minWidth: 0,
});

const ListItemContent = React.forwardRef(function ListItemContent(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiListItemContent',
  });

  const { component, className, children, ...other } = props;

  const ownerState = {
    ...props,
  };

  const classes = useUtilityClasses();

  return (
    <ListItemContentRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      {children}
    </ListItemContentRoot>
  );
}) as OverridableComponent<ListItemContentTypeMap>;

export default ListItemContent;
