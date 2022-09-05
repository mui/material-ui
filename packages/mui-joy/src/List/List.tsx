import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { MenuUnstyledContext } from '@mui/base/MenuUnstyled';
import { SelectUnstyledContext } from '@mui/base/SelectUnstyled';
import { styled, useThemeProps } from '../styles';
import { ListProps, ListOwnerState, ListTypeMap } from './ListProps';
import { getListUtilityClass } from './listClasses';
import NestedListContext from './NestedListContext';
import ComponentListContext from './ComponentListContext';
import ListProvider from './ListProvider';

const useUtilityClasses = (ownerState: ListOwnerState) => {
  const { variant, color, size, nesting, row, instanceSize } = ownerState;
  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      !instanceSize && !nesting && size && `size${capitalize(size)}`,
      instanceSize && `size${capitalize(instanceSize)}`,
      nesting && 'nesting',
      row && 'row',
    ],
  };

  return composeClasses(slots, getListUtilityClass, {});
};

export const ListRoot = styled('ul', {
  name: 'JoyList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListOwnerState }>(({ theme, ownerState }) => {
  function applySizeVars(size: ListProps['size']) {
    if (size === 'sm') {
      return {
        '--List-divider-gap': '0.25rem',
        '--List-item-minHeight': '2rem',
        '--List-item-paddingY': '0.25rem',
        '--List-item-paddingX': '0.5rem',
        '--List-item-fontSize': theme.vars.fontSize.sm,
        '--List-decorator-size': ownerState.row ? '1.5rem' : '2rem',
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
        '--List-decorator-size': ownerState.row ? '1.75rem' : '2.5rem',
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
        '--List-decorator-size': ownerState.row ? '2.25rem' : '3rem',
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
      marginBlockEnd: 'initial', // reset user agent stylesheet.
    },
    !ownerState.nesting && {
      ...applySizeVars(ownerState.size),
      '--List-gap': '0px',
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
      // --List-padding is not declared to let list uses --List-divider-gap by default.
      ...(ownerState.row
        ? {
            ...(ownerState.wrap
              ? {
                  padding: 'var(--List-padding)',
                  marginInlineStart: 'calc(-1 * var(--List-gap))',
                  marginBlockStart: 'calc(-1 * var(--List-gap))',
                }
              : {
                  paddingInline: 'var(--List-padding, var(--List-divider-gap))',
                  paddingBlock: 'var(--List-padding)',
                }),
          }
        : {
            paddingBlock: 'var(--List-padding, var(--List-divider-gap))',
            paddingInline: 'var(--List-padding)',
          }),
    },
    {
      borderRadius: 'var(--List-radius)',
      listStyle: 'none',
      display: 'flex',
      flexDirection: ownerState.row ? 'row' : 'column',
      ...(ownerState.wrap && {
        flexWrap: 'wrap',
      }),
      flexGrow: 1,
      position: 'relative', // for sticky ListItem
      ...theme.variants[ownerState.variant!]?.[ownerState.color!],
    },
  ];
});

const List = React.forwardRef(function List(inProps, ref) {
  const nesting = React.useContext(NestedListContext);
  const menuContext = React.useContext(MenuUnstyledContext);
  const selectContext = React.useContext(SelectUnstyledContext);
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyList',
  });

  const {
    component,
    className,
    children,
    size = inProps.size ?? 'md',
    row = false,
    wrap = false,
    variant = 'plain',
    color = 'neutral',
    role: roleProp,
    ...other
  } = props;

  const role = roleProp ?? (menuContext || selectContext ? 'group' : undefined);

  const ownerState = {
    ...props,
    instanceSize: inProps.size,
    size,
    nesting,
    row,
    wrap,
    variant,
    color,
    role,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ListRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      role={role}
      {...other}
    >
      <ComponentListContext.Provider
        value={`${typeof component === 'string' ? component : ''}:${role || ''}`}
      >
        <ListProvider row={row} wrap={wrap}>
          {children}
        </ListProvider>
      </ComponentListContext.Provider>
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * If `true`, display the list in horizontal direction.
   * @default false
   */
  row: PropTypes.bool,
  /**
   * The size of the component (affect other nested list* components).
   * @default 'md'
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
  /**
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
  /**
   * Only for horizontal list.
   * If `true`, the list sets the flex-wrap to "wrap" and adjust margin to have gap-like behavior (will move to `gap` in the future).
   *
   * @default false
   */
  wrap: PropTypes.bool,
} as any;

export default List;
