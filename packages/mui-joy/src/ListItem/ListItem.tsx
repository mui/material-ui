import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListItemProps, ListItemTypeMap } from './ListItemProps';
import listItemClasses, { getListItemUtilityClass } from './listItemClasses';

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
  '--List-itemButton-margin':
    'max(-0.375rem, -1 * var(--List-item-paddingX)) calc(-1 * var(--List-item-paddingX))',
  '--List-decorator-color': theme.vars.palette.text.tertiary, // for making icon color less obvious
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  padding: 'min(0.375rem, var(--List-item-paddingX)) var(--List-item-paddingX)',
  paddingLeft: 'var(--List-insetStart)',
  minHeight: 'var(--List-item-minHeight)',
  ...theme.typography.body1,
  [`& + .${listItemClasses.root}`]: {
    marginTop: 'var(--List-gap)',
  },
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
} as any;

export default ListItem;
