import * as React from 'react';
import PropTypes from 'prop-types';
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
})<{ ownerState: ListItemAdornmentProps }>(({ theme }) => ({
  display: 'inline-flex',
  color: theme.vars.palette.text.secondary, // for making icon color less obvious
  minWidth: 'var(--List-startAdornmentWidth)',
}));

const ListItemAdornment = React.forwardRef(function ListItemAdornment(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiListItemAdornment',
  });

  const { component, className, children, ...other } = props;

  const ownerState = {
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

ListItemAdornment.propTypes /* remove-proptypes */ = {
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

export default ListItemAdornment;
