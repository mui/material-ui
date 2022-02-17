import * as React from 'react';
import PropTypes from 'prop-types';
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
})<{ ownerState: ListProps }>(({ theme }) => ({
  '--List-padding': '0.375rem',
  '--List-gap': '0.375rem', // spacing between ListItem + ListItem or ListItemButton + ListItemButton
  '--List-radius': theme.vars.radius.sm,
  '--List-item-minHeight': '2.5rem',
  '--List-item-paddingX': '0.375rem',
  '--List-decorator-width': '3rem',
  '--List-divider-gap': 'var(--List-gap)',
  '--List-insetStart': 'var(--List-item-paddingX)',
  // by default, The ListItem & ListItemButton use automatic radius adjustment based on the parent List.
  '--List-item-radius':
    'max(var(--List-radius) - var(--List-padding), min(var(--List-padding) / 2, var(--List-radius) / 2))',
  borderRadius: 'var(--List-radius)',
  padding: 'var(--List-padding)',
  margin: 'initial',
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

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

List.propTypes /* remove-proptypes */ = {
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

export default List;
