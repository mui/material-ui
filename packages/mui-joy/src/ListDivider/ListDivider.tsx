import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListDividerProps, ListDividerTypeMap } from './ListDividerProps';
import { getListDividerUtilityClass } from './listDividerClasses';
import ListOrientationContext from '../List/ListOrientationContext';

const useUtilityClasses = (ownerState: ListDividerProps) => {
  const slots = {
    root: ['root', ownerState.inset && `inset${capitalize(ownerState.inset)}`],
  };

  return composeClasses(slots, getListDividerUtilityClass, {});
};

const ListDividerRoot = styled('li', {
  name: 'JoyListDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{
  ownerState: ListDividerProps & {
    orientation: 'horizontal' | 'vertical';
    'data-first-child'?: boolean;
  };
}>(({ theme, ownerState }) => ({
  border: 'none', // reset the border for `hr` tag
  ...(ownerState.orientation === 'horizontal' && {
    borderInlineStart: '1px solid',
    marginBlock: ownerState.inset === 'gutter' ? 'var(--List-item-paddingY)' : 0,
    marginInline: 'var(--List-divider-gap)',
    ...(ownerState['data-first-child'] === undefined && {
      // combine --List-gap and --List-divider-gap to replicate flexbox gap behavior
      marginInlineStart: 'calc(var(--List-gap) + var(--List-divider-gap))',
    }),
  }),
  ...(ownerState.orientation !== 'horizontal' && {
    // by default, the divider line is stretched from edge-to-edge of the List
    // spacing between ListItem can be controlled by `--List-divider-gap` on the List
    ...(ownerState['data-first-child'] === undefined && {
      // combine --List-gap and --List-divider-gap to replicate flexbox gap behavior
      marginBlockStart: 'calc(var(--List-gap) + var(--List-divider-gap))',
    }),
    marginBlockEnd: 'var(--List-divider-gap)',
    marginInline: 'calc(-1 * var(--List-padding))',
    ...(ownerState.inset === 'gutter' && {
      marginInlineStart: 'var(--List-item-paddingLeft)',
      marginInlineEnd: 'var(--List-item-paddingRight)',
    }),
    ...(ownerState.inset === 'startDecorator' && {
      marginInlineStart: 'var(--List-item-paddingLeft)',
    }),
    ...(ownerState.inset === 'startContent' && {
      marginInlineStart: 'calc(var(--List-item-paddingLeft) + var(--List-decorator-width))',
    }),
    borderBlockEnd: '1px solid',
  }),
  borderColor: theme.vars.palette.divider,
  listStyle: 'none',
}));

const ListDivider = React.forwardRef(function ListDivider(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyListDivider',
  });

  const orientation = React.useContext(ListOrientationContext);

  const { component, className, children, inset, role = 'separator', ...other } = props;

  const ownerState = {
    inset,
    orientation,
    ...props,
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
        orientation === 'horizontal' && {
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
   * The empty space on the side(s) of the divider in a vertical list.
   *
   * For horizontal list (the nearest parent List has `horizontal` orientation), only `inset="gutter"` affects the list divider.
   */
  inset: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['gutter', 'startDecorator', 'startContent']),
    PropTypes.string,
  ]),
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
