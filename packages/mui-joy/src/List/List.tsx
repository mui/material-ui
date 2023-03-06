import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { MenuUnstyledContext } from '@mui/base/MenuUnstyled';
import { SelectUnstyledContext } from '@mui/base/SelectUnstyled';
import { styled, useThemeProps } from '../styles';
import { useColorInversion } from '../styles/ColorInversion';
import { ListProps, ListOwnerState, ListTypeMap } from './ListProps';
import { getListUtilityClass } from './listClasses';
import NestedListContext from './NestedListContext';
import ComponentListContext from './ComponentListContext';
import ListProvider from './ListProvider';
import RadioGroupContext from '../RadioGroup/RadioGroupContext';

const useUtilityClasses = (ownerState: ListOwnerState) => {
  const { variant, color, size, nesting, orientation, instanceSize } = ownerState;
  const slots = {
    root: [
      'root',
      orientation,
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      !instanceSize && !nesting && size && `size${capitalize(size)}`,
      instanceSize && `size${capitalize(instanceSize)}`,
      nesting && 'nesting',
    ],
  };

  return composeClasses(slots, getListUtilityClass, {});
};

export const StyledList = styled('ul')<{ ownerState: ListOwnerState }>(({ theme, ownerState }) => {
  function applySizeVars(size: ListProps['size']) {
    if (size === 'sm') {
      return {
        '--ListDivider-gap': '0.25rem',
        '--ListItem-minHeight': '2rem',
        '--ListItem-paddingY': '0.25rem',
        '--ListItem-paddingX': '0.5rem',
        '--ListItem-fontSize': theme.vars.fontSize.sm,
        '--List-decoratorSize': ownerState.orientation === 'horizontal' ? '1.5rem' : '2rem',
        '--Icon-fontSize': '1.125rem',
      };
    }
    if (size === 'md') {
      return {
        '--ListDivider-gap': '0.375rem',
        '--ListItem-minHeight': '2.5rem',
        '--ListItem-paddingY': '0.375rem',
        '--ListItem-paddingX': '0.75rem',
        '--ListItem-fontSize': theme.vars.fontSize.md,
        '--List-decoratorSize': ownerState.orientation === 'horizontal' ? '1.75rem' : '2.5rem',
        '--Icon-fontSize': '1.25rem',
      };
    }
    if (size === 'lg') {
      return {
        '--ListDivider-gap': '0.5rem',
        '--ListItem-minHeight': '3rem',
        '--ListItem-paddingY': '0.5rem',
        '--ListItem-paddingX': '1rem',
        '--ListItem-fontSize': theme.vars.fontSize.md,
        '--List-decoratorSize': ownerState.orientation === 'horizontal' ? '2.25rem' : '3rem',
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
      '--ListItem-paddingRight': 'var(--ListItem-paddingX)',
      '--ListItem-paddingLeft': 'var(--NestedList-item-paddingLeft)',
      // reset ListItem, ListItemButton negative margin (caused by NestedListItem)
      '--List-itemButtonMarginBlock': '0px',
      '--List-itemButtonMarginInline': '0px',
      '--ListItem-marginBlock': '0px',
      '--ListItem-marginInline': '0px',
      padding: 0,
      marginInlineStart: 'var(--NestedList-marginLeft)',
      marginInlineEnd: 'var(--NestedList-marginRight)',
      marginBlockStart: 'var(--List-gap)',
      marginBlockEnd: 'initial', // reset user agent stylesheet.
    },
    !ownerState.nesting && {
      ...applySizeVars(ownerState.size),
      '--List-gap': '0px',
      '--List-decoratorColor': theme.vars.palette.text.tertiary,
      '--List-nestedInsetStart': '0px',
      '--ListItem-paddingLeft': 'var(--ListItem-paddingX)',
      '--ListItem-paddingRight': 'var(--ListItem-paddingX)',
      // Automatic radius adjustment kicks in only if '--List-padding' and '--List-radius' are provided.
      '--unstable_childRadius':
        'max(var(--List-radius) - var(--List-padding), min(var(--List-padding) / 2, var(--List-radius) / 2))',
      '--ListItem-radius': 'var(--unstable_childRadius)',
      // by default, The ListItem & ListItemButton use automatic radius adjustment based on the parent List.
      '--ListItem-startActionTranslateX': 'calc(0.5 * var(--ListItem-paddingLeft))',
      '--ListItem-endActionTranslateX': 'calc(-0.5 * var(--ListItem-paddingRight))',
      margin: 'initial',
      // --List-padding is not declared to let list uses --ListDivider-gap by default.
      ...(ownerState.orientation === 'horizontal'
        ? {
            ...(ownerState.wrap
              ? {
                  padding: 'var(--List-padding)', // Fallback is not needed for row-wrap List
                  marginInlineStart: 'calc(-1 * var(--List-gap))',
                  marginBlockStart: 'calc(-1 * var(--List-gap))',
                }
              : {
                  paddingInline: 'var(--List-padding, var(--ListDivider-gap))',
                  paddingBlock: 'var(--List-padding)',
                }),
          }
        : {
            paddingBlock: 'var(--List-padding, var(--ListDivider-gap))',
            paddingInline: 'var(--List-padding)',
          }),
    },
    {
      boxSizing: 'border-box',
      borderRadius: 'var(--List-radius)',
      listStyle: 'none',
      display: 'flex',
      flexDirection: ownerState.orientation === 'horizontal' ? 'row' : 'column',
      ...(ownerState.wrap && {
        flexWrap: 'wrap',
      }),
      flexGrow: 1,
      position: 'relative', // for sticky ListItem
      ...theme.variants[ownerState.variant!]?.[ownerState.color!],
    },
  ];
});

const ListRoot = styled(StyledList, {
  name: 'JoyList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({});
/**
 *
 * Demos:
 *
 * - [Lists](https://mui.com/joy-ui/react-list/)
 *
 * API:
 *
 * - [List API](https://mui.com/joy-ui/api/list/)
 */
const List = React.forwardRef(function List(inProps, ref) {
  const nesting = React.useContext(NestedListContext);
  const menuContext = React.useContext(MenuUnstyledContext);
  const selectContext = React.useContext(SelectUnstyledContext);
  const radioGroupContext = React.useContext(RadioGroupContext);
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyList',
  });

  const {
    component,
    className,
    children,
    size: sizeProp,
    orientation = 'vertical',
    wrap = false,
    variant = 'plain',
    color: colorProp = 'neutral',
    role: roleProp,
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);
  const size = sizeProp || (inProps.size ?? 'md');

  let role;
  if (menuContext || selectContext) {
    role = 'group';
  }
  if (radioGroupContext) {
    role = 'presentation';
  }
  if (roleProp) {
    role = roleProp;
  }

  const ownerState = {
    ...props,
    instanceSize: inProps.size,
    size,
    nesting,
    orientation,
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
      aria-labelledby={typeof nesting === 'string' ? nesting : undefined}
      {...other}
    >
      <ComponentListContext.Provider
        value={`${typeof component === 'string' ? component : ''}:${role || ''}`}
      >
        <ListProvider row={orientation === 'horizontal'} wrap={wrap}>
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
   * The component orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
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
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
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
