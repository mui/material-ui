'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { resolveSxValue } from '../styles/styleUtils';

import { ListProps, ListOwnerState, ListTypeMap } from './ListProps';
import { getListUtilityClass } from './listClasses';
import NestedListContext from './NestedListContext';
import ComponentListContext from './ComponentListContext';
import GroupListContext from './GroupListContext';
import ListProvider from './ListProvider';
import RadioGroupContext from '../RadioGroup/RadioGroupContext';
import useSlot from '../utils/useSlot';

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
  const { p, padding, borderRadius } = resolveSxValue({ theme, ownerState }, [
    'p',
    'padding',
    'borderRadius',
  ]);
  function applySizeVars(size: ListProps['size']) {
    if (size === 'sm') {
      return {
        '--ListDivider-gap': '0.25rem',
        '--ListItem-minHeight': '2rem',
        '--ListItem-paddingY': '3px',
        '--ListItem-paddingX': ownerState.marker ? '3px' : '0.5rem',
        '--ListItem-gap': '0.5rem',
        '--ListItemDecorator-size': ownerState.orientation === 'horizontal' ? '1.5rem' : '2rem',
        '--Icon-fontSize': theme.vars.fontSize.lg,
      };
    }
    if (size === 'md') {
      return {
        '--ListDivider-gap': '0.375rem',
        '--ListItem-minHeight': '2.25rem',
        '--ListItem-paddingY': '0.25rem',
        '--ListItem-paddingX': ownerState.marker ? '0.25rem' : '0.75rem',
        '--ListItem-gap': '0.625rem',
        '--ListItemDecorator-size': ownerState.orientation === 'horizontal' ? '1.75rem' : '2.5rem',
        '--Icon-fontSize': theme.vars.fontSize.xl,
      };
    }
    if (size === 'lg') {
      return {
        '--ListDivider-gap': '0.5rem',
        '--ListItem-minHeight': '2.75rem',
        '--ListItem-paddingY': '0.375rem',
        '--ListItem-paddingX': ownerState.marker ? '0.5rem' : '1rem',
        '--ListItem-gap': '0.75rem',
        '--ListItemDecorator-size': ownerState.orientation === 'horizontal' ? '2.25rem' : '3rem',
        '--Icon-fontSize': theme.vars.fontSize.xl2,
      };
    }
    return {};
  }
  return [
    ownerState.nesting &&
      ({
        // instanceSize is the specified size of the rendered element <List size="sm" />
        // only apply size variables if instanceSize is provided so that the variables can be pass down to children by default.
        ...applySizeVars(ownerState.instanceSize),
        '--ListItem-paddingRight': 'var(--ListItem-paddingX)',
        '--ListItem-paddingLeft': 'var(--NestedListItem-paddingLeft)',
        // reset ListItem, ListItemButton negative margin (caused by NestedListItem)
        '--ListItemButton-marginBlock': '0px',
        '--ListItemButton-marginInline': '0px',
        '--ListItem-marginBlock': '0px',
        '--ListItem-marginInline': '0px',
        padding: 0,
        ...(ownerState.marker && {
          paddingInlineStart: 'calc(3ch - var(--_List-markerDeduct, 0px))', // the width of the marker
        }),
        marginInlineStart: 'var(--NestedList-marginLeft)',
        marginInlineEnd: 'var(--NestedList-marginRight)',
        marginBlockStart: 'var(--List-gap)',
        marginBlockEnd: 'initial', // reset user agent stylesheet.
      } as const),
    !ownerState.nesting && {
      ...applySizeVars(ownerState.size),
      '--List-gap': '0px',
      '--List-nestedInsetStart': '0px',
      '--ListItem-paddingLeft': 'var(--ListItem-paddingX)',
      '--ListItem-paddingRight': 'var(--ListItem-paddingX)',
      ...(ownerState.marker && {
        '--_List-markerDeduct': '1ch',
      }),
      // Automatic radius adjustment kicks in only if '--List-padding' and '--List-radius' are provided.
      '--unstable_List-childRadius':
        'calc(max(var(--List-radius) - var(--List-padding), min(var(--List-padding) / 2, var(--List-radius) / 2)) - var(--variant-borderWidth, 0px))',
      '--ListItem-radius': 'var(--unstable_List-childRadius)',
      // by default, The ListItem & ListItemButton use automatic radius adjustment based on the parent List.
      '--ListItem-startActionTranslateX': 'calc(0.5 * var(--ListItem-paddingLeft))',
      '--ListItem-endActionTranslateX': 'calc(-0.5 * var(--ListItem-paddingRight))',
      margin: 'initial',
      ...theme.typography[`body-${ownerState.size!}`],
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
      ...(ownerState.marker && {
        paddingInlineStart: '3ch', // the width of the marker
      }),
    },
    {
      boxSizing: 'border-box',
      borderRadius: 'var(--List-radius)',
      listStyle: 'none',
      display: 'flex',
      flexDirection: ownerState.orientation === 'horizontal' ? 'row' : 'column',
      ...(ownerState.wrap &&
        ({
          flexWrap: 'wrap',
        } as const)),
      ...(ownerState.marker && {
        '--_List-markerDisplay': 'list-item',
        '--_List-markerType': ownerState.marker,
        lineHeight: 'calc(var(--ListItem-minHeight) - 2 * var(--ListItem-paddingY))',
      }),
      flexGrow: 1,
      position: 'relative', // for sticky ListItem
      ...theme.variants[ownerState.variant!]?.[ownerState.color!],
      '--unstable_List-borderWidth': 'var(--variant-borderWidth, 0px)', // For children to lookup the List's border width.
      ...(borderRadius !== undefined && {
        '--List-radius': borderRadius,
      }),
      ...(p !== undefined && { '--List-padding': p }),
      ...(padding !== undefined && { '--List-padding': padding }),
    } as const,
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
  const group = React.useContext(GroupListContext);
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
    color = 'neutral',
    role: roleProp,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const size = sizeProp || (inProps.size ?? 'md');

  let role;
  if (group) {
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
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: ListRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      as: component,
      role,
      'aria-labelledby': typeof nesting === 'string' ? nesting : undefined,
    },
  });

  return (
    <SlotRoot {...rootProps}>
      <ComponentListContext.Provider
        value={`${typeof component === 'string' ? component : ''}:${role || ''}`}
      >
        <ListProvider row={orientation === 'horizontal'} wrap={wrap}>
          {children}
        </ListProvider>
      </ComponentListContext.Provider>
    </SlotRoot>
  );
}) as OverridableComponent<ListTypeMap>;

List.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The marker (such as a disc, character, or custom counter style) of the list items.
   * When this prop is specified, the List Item changes the CSS display to `list-item` in order to apply the marker.
   *
   * To see all available options, check out the [MDN list-style-type page](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type).
   */
  marker: PropTypes.string,
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
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
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
