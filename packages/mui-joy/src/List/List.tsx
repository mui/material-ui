import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListProps, ListTypeMap } from './ListProps';
import { getListUtilityClass } from './listClasses';
import { useNestedList } from './NestedListContext';

const useUtilityClasses = (ownerState: ListProps & { nested: boolean }) => {
  const { size, nested } = ownerState;
  const slots = {
    root: ['root', size && `size${capitalize(size)}`, nested && 'nested'],
  };

  return composeClasses(slots, getListUtilityClass, {});
};

const ListRoot = styled('ul', {
  name: 'MuiList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListProps & { nested: boolean; instanceSize: ListProps['size'] } }>(
  ({ theme, ownerState }) => {
    function applySizeVars(size: ListProps['size']) {
      if (size === 'sm') {
        return {
          '--List-gap': '0.25rem',
          '--List-item-minHeight': '2rem',
          '--List-item-paddingY': '0.25rem',
          '--List-item-paddingLeft': '0.25rem',
          '--List-item-paddingRight': '0.25rem',
          '--List-item-fontSize': theme.vars.fontSize.sm,
          '--List-decorator-width': '2rem',
        };
      }
      if (size === 'md') {
        return {
          '--List-gap': '0.375rem',
          '--List-item-minHeight': '2.5rem',
          '--List-item-paddingY': '0.375rem',
          '--List-item-paddingLeft': '0.75rem',
          '--List-item-paddingRight': '0.75rem',
          '--List-item-fontSize': theme.vars.fontSize.md,
          '--List-decorator-width': '2.5rem',
        };
      }
      if (size === 'lg') {
        return {
          '--List-gap': '0.5rem',
          '--List-item-minHeight': '3rem',
          '--List-item-paddingY': '0.5rem',
          '--List-item-paddingLeft': '0.5rem',
          '--List-item-paddingRight': '0.5rem',
          '--List-item-fontSize': theme.vars.fontSize.md,
          '--List-decorator-width': '3rem',
        };
      }
      return {};
    }
    return [
      ownerState.nested && {
        // instanceSize is the specified size of the rendered element <List size="sm" />
        // only apply size variables if instanceSize is provided so that the variables can be pass down to children by default.
        ...applySizeVars(ownerState.instanceSize),
        '--List-item-paddingLeft': 'var(--NestedList-item-paddingLeft)',
        // reset ListItem, ListItemButton negative margin (caused by NestedListItem)
        '--List-itemButton-margin': '0px',
        '--List-item-margin': '0px',
        padding: 0,
        margin: 'var(--NestedList-margin)',
        marginTop: 'var(--List-gap)',
      },
      !ownerState.nested && {
        ...applySizeVars(ownerState.size),
        '--List-padding': '0px',
        '--List-radius': '0px',
        '--List-divider-gap': '0px',
        '--List-decorator-color': theme.vars.palette.text.tertiary,
        '--List-nestedInsetStart': '0.75rem',
        '--List-background': theme.vars.palette.background.body,
        // by default, The ListItem & ListItemButton use automatic radius adjustment based on the parent List.
        '--List-item-radius':
          'max(var(--List-radius) - var(--List-padding), min(var(--List-padding) / 2, var(--List-radius) / 2))',
        '--List-item-startActionTranslateX': 'var(--List-item-paddingLeft)',
        '--List-item-endActionTranslateX': 'calc(-1 * var(--List-item-paddingLeft))',
        background: 'var(--List-background)',
        borderRadius: 'var(--List-radius)',
        padding: 'var(--List-padding)',
        margin: 'initial',
      },
      {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        position: 'relative', // for sticky ListItem
      },
    ];
  },
);

const List = React.forwardRef(function List(inProps, ref) {
  const nested = useNestedList();
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiList',
  });

  const { component, className, children, size = 'md', ...other } = props;

  const ownerState = {
    instanceSize: inProps.size,
    size,
    nested,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

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
  /**
   * The size of the component (affect other nested list* components).
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
} as any;

export default List;
