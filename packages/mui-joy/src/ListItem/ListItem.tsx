import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  unstable_capitalize as capitalize,
  unstable_isMuiElement as isMuiElement,
} from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListItemProps, ListItemTypeMap } from './ListItemProps';
import { getListItemUtilityClass } from './listItemClasses';
import NestedListContext from '../List/NestedListContext';
import RowListContext from '../List/RowListContext';
import ComponentListContext from '../List/ComponentListContext';

const useUtilityClasses = (ownerState: ListItemProps & { nesting: boolean }) => {
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

const ListItemRoot = styled('li', {
  name: 'JoyListItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{
  ownerState: ListItemProps & { row: boolean; 'data-first-child'?: string };
}>(({ theme, ownerState }) => [
  !ownerState.nested && {
    // add negative margin to ListItemButton equal to this ListItem padding
    '--List-itemButton-marginInline': `calc(-1 * var(--List-item-paddingLeft)) calc(-1 * var(--List-item-paddingRight))`,
    '--List-itemButton-marginBlock': 'calc(-1 * var(--List-item-paddingY))',
    alignItems: 'center',
    marginBlock: 'var(--List-item-marginBlock)',
    marginInline: 'var(--List-item-marginInline)',
  },
  ownerState.nested && {
    // add negative margin to NestedList equal to this ListItem padding
    '--NestedList-marginRight': 'calc(-1 * var(--List-item-paddingRight))',
    '--NestedList-marginLeft': 'calc(-1 * var(--List-item-paddingLeft))',
    '--NestedList-item-paddingLeft': `calc(var(--List-item-paddingLeft) + var(--List-nestedInsetStart))`,
    // add negative margin to ListItem, ListItemButton to make them start from the edge.
    '--List-itemButton-marginBlock': 'calc(-1 * var(--List-item-paddingY)) 0px',
    '--List-itemButton-marginInline':
      'calc(-1 * var(--List-item-paddingLeft)) calc(-1 * var(--List-item-paddingRight))',
    '--List-item-marginBlock': 'calc(-1 * var(--List-item-paddingY)) 0px',
    '--List-item-marginInline':
      'calc(-1 * var(--List-item-paddingLeft)) calc(-1 * var(--List-item-paddingRight))',
    flexDirection: 'column',
  },
  // Base styles
  {
    // Integration with control elements, eg. Checkbox, Radio.
    '--internal-action-radius': 'var(--List-item-radius)',
    ...(ownerState.startAction && {
      '--internal-startActionWidth': '2rem', // to add sufficient padding-left on ListItemButton
    }),
    ...(ownerState.endAction && {
      '--internal-endActionWidth': '2.5rem', // to add sufficient padding-right on ListItemButton
    }),
    boxSizing: 'border-box',
    borderRadius: 'var(--List-item-radius)',
    display: 'flex',
    position: 'relative',
    paddingBlockStart: 'var(--List-item-paddingY)',
    paddingBlockEnd: ownerState.nested ? 0 : 'var(--List-item-paddingY)',
    paddingInlineStart: 'var(--List-item-paddingLeft)',
    paddingInlineEnd: 'var(--List-item-paddingRight)',
    ...(ownerState['data-first-child'] === undefined && {
      marginInlineStart: ownerState.row ? 'var(--List-gap)' : undefined,
      marginBlockStart: ownerState.row ? undefined : 'var(--List-gap)',
    }),
    minBlockSize: 'var(--List-item-minHeight)',
    fontSize: 'var(--List-item-fontSize)',
    fontFamily: theme.vars.fontFamily.body,
    ...(ownerState.sticky && {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      background: 'var(--List-item-stickyBackground)',
    }),
  },
  theme.variants[ownerState.variant!]?.[ownerState.color!],
]);

const ListItemStartAction = styled('div', {
  name: 'JoyListItem',
  slot: 'StartAction',
  overridesResolver: (props, styles) => styles.startAction,
})<{ ownerState: ListItemProps }>(({ ownerState }) => ({
  display: 'inherit',
  position: 'absolute',
  top: ownerState.nested ? 'calc(var(--List-item-minHeight) / 2)' : '50%',
  left: 0,
  transform: 'translate(var(--List-item-startActionTranslateX), -50%)',
}));

const ListItemEndAction = styled('div', {
  name: 'JoyListItem',
  slot: 'StartAction',
  overridesResolver: (props, styles) => styles.startAction,
})<{ ownerState: ListItemProps }>(({ ownerState }) => ({
  display: 'inherit',
  position: 'absolute',
  top: ownerState.nested ? 'calc(var(--List-item-minHeight) / 2)' : '50%',
  right: 0,
  transform: 'translate(var(--List-item-endActionTranslateX), -50%)',
}));

const ListItem = React.forwardRef(function ListItem(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyListItem',
  });

  const listComponent = React.useContext(ComponentListContext);
  const row = React.useContext(RowListContext);
  const nesting = React.useContext(NestedListContext);

  const {
    component,
    className,
    children,
    nested = false,
    sticky = false,
    variant = 'plain',
    color = 'neutral',
    startAction,
    endAction,
    ...other
  } = props;

  const ownerState = {
    sticky,
    startAction,
    endAction,
    row,
    variant,
    color,
    nesting,
    nested,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <NestedListContext.Provider value={nested}>
      <ListItemRoot
        ref={ref}
        as={
          component || (listComponent && !listComponent.match(/^(ul|ol|menu)$/) ? 'div' : undefined)
        }
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        {...other}
      >
        {startAction && (
          <ListItemStartAction className={classes.startAction} ownerState={ownerState}>
            {startAction}
          </ListItemStartAction>
        )}

        {React.Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                // to let ListItem knows when to apply margin(Inline|Block)Start
                ...(index === 0 && { 'data-first-child': '' }),
                ...(isMuiElement(child, ['ListItem']) && {
                  // The ListItem of ListItem should not be 'li'
                  component: child.props.component || 'div',
                }),
              })
            : child,
        )}

        {endAction && (
          <ListItemEndAction className={classes.endAction} ownerState={ownerState}>
            {endAction}
          </ListItemEndAction>
        )}
      </ListItemRoot>
    </NestedListContext.Provider>
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
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
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
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

// @ts-ignore internal logic to prevent <li> in <li>
ListItem.muiName = 'ListItem';

export default ListItem;
