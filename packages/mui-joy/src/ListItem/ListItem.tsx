'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  unstable_capitalize as capitalize,
  unstable_isMuiElement as isMuiElement,
} from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';

import useSlot from '../utils/useSlot';
import { ListItemOwnerState, ListItemProps, ListItemTypeMap } from './ListItemProps';
import listItemClasses, { getListItemUtilityClass } from './listItemClasses';
import NestedListContext from '../List/NestedListContext';
import RowListContext from '../List/RowListContext';
import WrapListContext from '../List/WrapListContext';
import ComponentListContext from '../List/ComponentListContext';
import ListSubheaderContext from '../ListSubheader/ListSubheaderContext';
import GroupListContext from '../List/GroupListContext';

const useUtilityClasses = (ownerState: ListItemOwnerState) => {
  const { sticky, nested, nesting, variant, color } = ownerState;
  const slots = {
    root: [
      'root',
      nested && 'nested',
      nesting && 'nesting',
      sticky && 'sticky',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
    startAction: ['startAction'],
    endAction: ['endAction'],
  };

  return composeClasses(slots, getListItemUtilityClass, {});
};

export const StyledListItem = styled('li')<{ ownerState: ListItemOwnerState }>(
  ({ theme, ownerState }) => [
    !ownerState.nested &&
      ({
        // add negative margin to ListItemButton equal to this ListItem padding
        '--ListItemButton-marginInline': `calc(-1 * var(--ListItem-paddingLeft)) calc(-1 * var(--ListItem-paddingRight))`,
        '--ListItemButton-marginBlock': 'calc(-1 * var(--ListItem-paddingY))',
        alignItems: 'center',
        gap: 'var(--ListItem-gap)',
        marginInline: 'var(--ListItem-marginInline)',
      } as const),
    ownerState.nested &&
      ({
        // add negative margin to NestedList equal to this ListItem padding
        '--NestedList-marginRight': 'calc(-1 * var(--ListItem-paddingRight))',
        '--NestedList-marginLeft': 'calc(-1 * var(--ListItem-paddingLeft))',
        '--NestedListItem-paddingLeft': `calc(var(--ListItem-paddingLeft) + var(--List-nestedInsetStart))`,
        // add negative margin to ListItem, ListItemButton to make them start from the edge.
        '--ListItemButton-marginBlock': '0px',
        '--ListItemButton-marginInline':
          'calc(-1 * var(--ListItem-paddingLeft)) calc(-1 * var(--ListItem-paddingRight))',
        '--ListItem-marginInline':
          'calc(-1 * var(--ListItem-paddingLeft)) calc(-1 * var(--ListItem-paddingRight))',
        flexDirection: 'column',
      } as const),
    // Base styles
    {
      // Integration with control elements, for example Checkbox, Radio.
      '--unstable_actionRadius': 'calc(var(--ListItem-radius) - var(--variant-borderWidth, 0px))',
      ...(ownerState.startAction && {
        '--unstable_startActionWidth': '2rem', // to add sufficient padding-left on ListItemButton
      }),
      ...(ownerState.endAction && {
        '--unstable_endActionWidth': '2.5rem', // to add sufficient padding-right on ListItemButton
      }),
      boxSizing: 'border-box',
      borderRadius: 'var(--ListItem-radius)',
      display: 'var(--_ListItem-display)',
      '&:not([hidden])': { '--_ListItem-display': 'var(--_List-markerDisplay, flex)' },
      flex: 'none', // prevent children from shrinking when the List's height is limited.
      listStyleType: 'var(--_List-markerType, disc)',
      position: 'relative',
      paddingBlockStart: ownerState.nested ? 0 : 'var(--ListItem-paddingY)',
      paddingBlockEnd: ownerState.nested ? 0 : 'var(--ListItem-paddingY)',
      paddingInlineStart: 'var(--ListItem-paddingLeft)',
      paddingInlineEnd: 'var(--ListItem-paddingRight)',
      ...(ownerState['data-first-child'] === undefined && {
        ...(ownerState.row
          ? {
              marginInlineStart: 'var(--List-gap)',
            }
          : {
              marginBlockStart: 'var(--List-gap)',
            }),
      }),
      ...(ownerState.row &&
        ownerState.wrap && {
          marginInlineStart: 'var(--List-gap)',
          marginBlockStart: 'var(--List-gap)',
        }),
      minBlockSize: 'var(--ListItem-minHeight)',
      ...(ownerState.sticky &&
        ({
          // sticky in list item can be found in grouped options
          position: 'sticky',
          top: 'var(--ListItem-stickyTop, 0px)', // integration with Menu and Select.
          zIndex: 1,
          background: `var(--ListItem-stickyBackground, ${theme.vars.palette.background.body})`,
        } as const)),
      [`.${listItemClasses.nested} > &`]: {
        '--_ListItem-display': 'flex',
      },
    } as const,
    theme.variants[ownerState.variant!]?.[ownerState.color!],
  ],
);

const ListItemRoot = styled(StyledListItem, {
  name: 'JoyListItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListItemOwnerState }>({});

const ListItemStartAction = styled('div', {
  name: 'JoyListItem',
  slot: 'StartAction',
  overridesResolver: (props, styles) => styles.startAction,
})<{ ownerState: ListItemOwnerState }>(({ ownerState }) => ({
  display: 'inherit',
  position: 'absolute',
  top: ownerState.nested ? 'calc(var(--ListItem-minHeight) / 2)' : '50%',
  left: 0,
  transform: 'translate(var(--ListItem-startActionTranslateX), -50%)',
  zIndex: 1, // to stay on top of ListItemButton (default `position: relative`).
}));

const ListItemEndAction = styled('div', {
  name: 'JoyListItem',
  slot: 'StartAction',
  overridesResolver: (props, styles) => styles.startAction,
})<{ ownerState: ListItemOwnerState }>(({ ownerState }) => ({
  display: 'inherit',
  position: 'absolute',
  top: ownerState.nested ? 'calc(var(--ListItem-minHeight) / 2)' : '50%',
  right: 0,
  transform: 'translate(var(--ListItem-endActionTranslateX), -50%)',
}));
/**
 *
 * Demos:
 *
 * - [Lists](https://mui.com/joy-ui/react-list/)
 *
 * API:
 *
 * - [ListItem API](https://mui.com/joy-ui/api/list-item/)
 */
const ListItem = React.forwardRef(function ListItem(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyListItem',
  });

  const group = React.useContext(GroupListContext);
  const listComponent = React.useContext(ComponentListContext);
  const row = React.useContext(RowListContext);
  const wrap = React.useContext(WrapListContext);
  const nesting = React.useContext(NestedListContext);

  const {
    component: componentProp,
    className,
    children,
    nested = false,
    sticky = false,
    variant = 'plain',
    color = 'neutral',
    startAction,
    endAction,
    role: roleProp,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const [subheaderId, setSubheaderId] = React.useState('');

  const [listElement, listRole] = listComponent?.split(':') || ['', ''];
  const component =
    componentProp || (listElement && !listElement.match(/^(ul|ol|menu)$/) ? 'div' : undefined);

  let role = group === 'menu' ? 'none' : undefined;

  if (listComponent) {
    // ListItem can be used inside Menu to create nested menus, so it should have role="none"
    // https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/
    role = { menu: 'none', menubar: 'none', group: 'presentation' }[listRole];
  }
  if (roleProp) {
    role = roleProp;
  }

  const ownerState = {
    ...props,
    sticky,
    startAction,
    endAction,
    row,
    wrap,
    variant,
    color,
    nesting,
    nested,
    component,
    role,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    additionalProps: {
      role,
    },
    ref,
    className: clsx(classes.root, className),
    elementType: ListItemRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotStartAction, startActionProps] = useSlot('startAction', {
    className: classes.startAction,
    elementType: ListItemStartAction,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndAction, endActionProps] = useSlot('endAction', {
    className: classes.endAction,
    elementType: ListItemEndAction,
    externalForwardedProps,
    ownerState,
  });

  return (
    <ListSubheaderContext.Provider value={setSubheaderId}>
      <NestedListContext.Provider value={nested ? subheaderId || true : false}>
        <SlotRoot {...rootProps}>
          {startAction && <SlotStartAction {...startActionProps}>{startAction}</SlotStartAction>}

          {React.Children.map(children, (child, index) =>
            React.isValidElement(child)
              ? React.cloneElement(child, {
                  // to let ListItem knows when to apply margin(Inline|Block)Start
                  ...(index === 0 && { 'data-first-child': '' }),
                  ...(isMuiElement(child, ['ListItem']) && {
                    // The ListItem of ListItem should not be 'li'
                    component: (child.props as ListItemProps)?.component || 'div',
                  }),
                })
              : child,
          )}

          {endAction && <SlotEndAction {...endActionProps}>{endAction}</SlotEndAction>}
        </SlotRoot>
      </NestedListContext.Provider>
    </ListSubheaderContext.Provider>
  );
}) as OverridableComponent<ListItemTypeMap>;

ListItem.propTypes /* remove-proptypes */ = {
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
   * The element to display at the end of ListItem.
   */
  endAction: PropTypes.node,
  /**
   * If `true`, the component can contain NestedList.
   * @default false
   */
  nested: PropTypes.bool,
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    endAction: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startAction: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    endAction: PropTypes.elementType,
    root: PropTypes.elementType,
    startAction: PropTypes.elementType,
  }),
  /**
   * The element to display at the start of ListItem.
   */
  startAction: PropTypes.node,
  /**
   * If `true`, the component has sticky position (with top = 0).
   * @default false
   */
  sticky: PropTypes.bool,
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
} as any;

// @ts-ignore internal logic to prevent <li> in <li>
ListItem.muiName = 'ListItem';

export default ListItem;
