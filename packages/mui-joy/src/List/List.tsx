import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListProps, ListTypeMap } from './ListProps';
import { getListUtilityClass } from './listClasses';
import NestedListContext from './NestedListContext';
import RowListContext from './RowListContext';
import ComponentListContext from './ComponentListContext';

const useUtilityClasses = (ownerState: ListProps & { nesting: boolean }) => {
  const { size, nesting, row } = ownerState;
  const slots = {
    root: ['root', size && `size${capitalize(size)}`, nesting && 'nesting', row && 'row'],
  };

  return composeClasses(slots, getListUtilityClass, {});
};

const ListRoot = styled('ul', {
  name: 'JoyList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListProps & { nesting: boolean; instanceSize: ListProps['size'] } }>(
  ({ theme, ownerState }) => {
    function applySizeVars(size: ListProps['size']) {
      if (size === 'sm') {
        return {
          '--List-divider-gap': '0.25rem',
          '--List-item-minHeight': '2rem',
          '--List-item-paddingY': '0.25rem',
          '--List-item-paddingX': '0.375rem',
          '--List-item-fontSize': theme.vars.fontSize.sm,
          '--List-decorator-width': ownerState.row ? '1.5rem' : '2rem',
          '--Icon-fontSize': '1.125rem',
        };
      }
      if (size === 'md') {
        return {
          '--List-divider-gap': '0.375rem',
          '--List-item-minHeight': '2.5rem',
          '--List-item-paddingY': '0.375rem',
          '--List-item-paddingX': '0.75rem',
          '--List-item-fontSize': theme.vars.fontSize.md,
          '--List-decorator-width': ownerState.row ? '1.75rem' : '2.5rem',
          '--Icon-fontSize': '1.25rem',
        };
      }
      if (size === 'lg') {
        return {
          '--List-divider-gap': '0.5rem',
          '--List-item-minHeight': '3rem',
          '--List-item-paddingY': '0.5rem',
          '--List-item-paddingX': '1rem',
          '--List-item-fontSize': theme.vars.fontSize.md,
          '--List-decorator-width': ownerState.row ? '2.25rem' : '3rem',
          '--Icon-fontSize': '1.5rem',
        };
      }
      return {};
    }
    return [
      ownerState.nesting && {
        // instanceSize is the specified size of the rendered element <List size="sm" />
        // only apply size variables if instanceSize is provided so that the variables can be pass down to children by default.
        ...applySizeVars(ownerState.instanceSize),
        '--List-item-paddingRight': 'var(--List-item-paddingX)',
        '--List-item-paddingLeft': 'var(--NestedList-item-paddingLeft)',
        // reset ListItem, ListItemButton negative margin (caused by NestedListItem)
        '--List-itemButton-marginBlock': '0px',
        '--List-itemButton-marginInline': '0px',
        '--List-item-marginBlock': '0px',
        '--List-item-marginInline': '0px',
        padding: 0,
        marginInlineStart: 'var(--NestedList-marginLeft)',
        marginInlineEnd: 'var(--NestedList-marginRight)',
        marginBlockStart: 'var(--List-gap)',
      },
      !ownerState.nesting && {
        ...applySizeVars(ownerState.size),
        '--List-gap': '0px',
        '--List-padding': '0px',
        '--List-decorator-color': theme.vars.palette.text.tertiary,
        '--List-nestedInsetStart': '0px',
        '--List-item-paddingLeft': 'var(--List-item-paddingX)',
        '--List-item-paddingRight': 'var(--List-item-paddingX)',
        '--internal-child-radius':
          'max(var(--List-radius, 0px) - var(--List-padding), min(var(--List-padding) / 2, var(--List-radius, 0px) / 2))',
        // If --List-padding is 0, the --List-item-radius will be 0.
        '--List-item-radius': 'min(calc(var(--List-padding) * 999), var(--internal-child-radius))',
        // by default, The ListItem & ListItemButton use automatic radius adjustment based on the parent List.
        '--List-item-startActionTranslateX': 'calc(0.5 * var(--List-item-paddingLeft))',
        '--List-item-endActionTranslateX': 'calc(-0.5 * var(--List-item-paddingRight))',
        margin: 'initial',
        padding: 'var(--List-padding, 0px)',
      },
      {
        borderRadius: 'var(--List-radius)',
        listStyle: 'none',
        display: 'flex',
        flexDirection: ownerState.row ? 'row' : 'column',
        flexGrow: 1,
        position: 'relative', // for sticky ListItem
      },
    ];
  },
);

const List = React.forwardRef(function List(inProps, ref) {
  const nesting = React.useContext(NestedListContext);
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyList',
  });

  const { component, className, children, size = 'md', row = false, ...other } = props;

  const ownerState = {
    instanceSize: inProps.size,
    size,
    nesting,
    row,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  console.log('row', row);

  return (
    <RowListContext.Provider value={row}>
      <ComponentListContext.Provider value={typeof component === 'string' ? component : undefined}>
        <ListRoot
          ref={ref}
          as={component}
          className={clsx(classes.root, className)}
          ownerState={ownerState}
          {...other}
        >
          {React.Children.map(children, (child, index) =>
            React.isValidElement(child)
              ? React.cloneElement(child, {
                  // to let List(Item|ItemButton) knows when to apply margin(Inline|Block)Start
                  ...(index === 0 && { 'data-first-child': '' }),
                })
              : child,
          )}
        </ListRoot>
      </ComponentListContext.Provider>
    </RowListContext.Provider>
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
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
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
   * If `true`, display the list in horizontal direction.
   */
  row: PropTypes.bool,
  /**
   * The size of the component (affect other nested list* components).
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default List;
