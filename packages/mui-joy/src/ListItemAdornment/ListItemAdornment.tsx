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
  /**
   * If `true`, the margin-left is added. Otherwise, the margin-right is added.
   */
  end: PropTypes.bool,
} as any;

export default ListItemAdornment;
