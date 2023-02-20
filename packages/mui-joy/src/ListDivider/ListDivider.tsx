import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { DividerRoot } from '../Divider/Divider';
import { ListDividerOwnerState, ListDividerTypeMap } from './ListDividerProps';
import { getListDividerUtilityClass } from './listDividerClasses';
import RowListContext from '../List/RowListContext';
import ComponentListContext from '../List/ComponentListContext';

const useUtilityClasses = (ownerState: ListDividerOwnerState) => {
  const { orientation, inset } = ownerState;
  const slots = {
    root: [
      'root',
      orientation,
      // `insetContext` class is already produced by Divider
      inset && inset !== 'context' && `inset${capitalize(inset)}`,
    ],
  };

  return composeClasses(slots, getListDividerUtilityClass, {});
};

const ListDividerRoot = styled(DividerRoot as unknown as 'li', {
  name: 'JoyListDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListDividerOwnerState }>(({ ownerState }) => ({
  ...(ownerState.inset === 'context' && {
    '--Divider-inset': 'calc(-1 * var(--List-padding))',
  }),
  ...(ownerState.row && {
    marginInline: 'var(--List-divider-gap)',
    ...(ownerState.inset === 'gutter' && {
      marginBlock: 'var(--List-item-paddingY)',
    }),
    ...(ownerState['data-first-child'] === undefined && {
      // combine --List-gap and --List-divider-gap to replicate flexbox gap behavior
      marginInlineStart: 'calc(var(--List-gap) + var(--List-divider-gap))',
    }),
  }),
  ...(!ownerState.row && {
    // by default, the divider line is stretched from edge-to-edge of the List
    // spacing between ListItem can be controlled by `--List-divider-gap` on the List
    ...(ownerState['data-first-child'] === undefined && {
      // combine --List-gap and --List-divider-gap to replicate flexbox gap behavior
      marginBlockStart: 'calc(var(--List-gap) + var(--List-divider-gap))',
    }),
    marginBlockEnd: 'var(--List-divider-gap)',
    ...(ownerState.inset === 'gutter' && {
      marginInlineStart: 'var(--List-item-paddingLeft)',
      marginInlineEnd: 'var(--List-item-paddingRight)',
    }),
    ...(ownerState.inset === 'startDecorator' && {
      marginInlineStart: 'var(--List-item-paddingLeft)',
    }),
    ...(ownerState.inset === 'startContent' && {
      marginInlineStart: 'calc(var(--List-item-paddingLeft) + var(--List-decorator-size))',
    }),
  }),
}));

const ListDivider = React.forwardRef(function ListDivider(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyListDivider',
  });

  const row = React.useContext(RowListContext);
  const listComponent = React.useContext(ComponentListContext);

  const {
    component: componentProp,
    role: roleProp,
    className,
    children,
    inset = 'context',
    orientation = row ? 'vertical' : 'horizontal',
    ...other
  } = props;

  const [listElement] = listComponent?.split(':') || ['', ''];
  const component =
    componentProp || (listElement && !listElement.match(/^(ul|ol|menu)$/) ? 'div' : 'li');
  const role = roleProp || (component === 'li' ? 'separator' : undefined);

  const ownerState = {
    ...props,
    inset,
    row,
    orientation,
    role,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ListDividerRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      role={role}
      {...(role === 'separator' &&
        orientation === 'vertical' && {
          // The implicit aria-orientation of separator is 'horizontal'
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role
          'aria-orientation': 'vertical',
        })}
      {...other}
    >
      {children}
    </ListDividerRoot>
  );
}) as OverridableComponent<ListDividerTypeMap>;

ListDivider.propTypes /* remove-proptypes */ = {
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
   * The empty space on the side(s) of the divider in a vertical list.
   *
   * For horizontal list (the nearest parent List has `row` prop set to `true`), only `inset="gutter"` affects the list divider.
   * @default 'context'
   */
  inset: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['context', 'gutter', 'startDecorator', 'startContent']),
    PropTypes.string,
  ]),
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default ListDivider;
