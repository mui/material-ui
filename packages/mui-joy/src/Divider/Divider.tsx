import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { DividerOwnerState, DividerTypeMap } from './DividerProps';
import { getDividerUtilityClass } from './dividerClasses';

const useUtilityClasses = (ownerState: DividerOwnerState) => {
  const slots = {
    root: ['root', ownerState.orientation === 'vertical' && 'vertical'],
  };

  return composeClasses(slots, getDividerUtilityClass, {});
};

const DividerRoot = styled('hr', {
  name: 'JoyDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: DividerOwnerState }>(({ theme, ownerState }) => ({
  '--Divider-thickness': '1px',
  position: 'relative',
  alignSelf: 'stretch',
  ...(ownerState.children
    ? {
        '--Divider-gap': theme.spacing(1),
        '--Divider-childPosition': '50%',
        display: 'flex',
        flexDirection: ownerState.orientation === 'vertical' ? 'column' : 'row',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        border: 0,
        fontFamily: theme.vars.fontFamily.body,
        fontSize: theme.vars.fontSize.sm,
        '&::before, &::after': {
          position: 'relative',
          width: ownerState.orientation === 'vertical' ? 'var(--Divider-thickness)' : 'initial',
          height: ownerState.orientation === 'vertical' ? 'initial' : 'var(--Divider-thickness)',
          backgroundColor: theme.vars.palette.divider, // use logical size + background is better than border because they work with gradient.
          content: '""',
        },
        '&::before': {
          marginInlineEnd:
            ownerState.orientation === 'vertical'
              ? 'initial'
              : 'min(var(--Divider-childPosition) * 999, var(--Divider-gap))',
          marginBlockEnd:
            ownerState.orientation === 'vertical'
              ? 'min(var(--Divider-childPosition) * 999, var(--Divider-gap))'
              : 'initial',
          flexBasis: 'var(--Divider-childPosition)',
        },
        '&::after': {
          marginInlineStart:
            ownerState.orientation === 'vertical'
              ? 'initial'
              : 'min((100% - var(--Divider-childPosition)) * 999, var(--Divider-gap))',
          marginBlockStart:
            ownerState.orientation === 'vertical'
              ? 'min((100% - var(--Divider-childPosition)) * 999, var(--Divider-gap))'
              : 'initial',
          flexBasis: 'calc(100% - var(--Divider-childPosition))',
        },
      }
    : {
        border: 'none', // reset the border for `hr` tag
        margin: 'initial', // reset margin for `hr` tag
        listStyle: 'none',
        backgroundColor: theme.vars.palette.divider, // use logical size + background is better than border because they work with gradient.
        flexShrink: 0,
        width: ownerState.orientation === 'vertical' ? 'var(--Divider-thickness)' : 'initial',
        height: ownerState.orientation === 'vertical' ? 'initial' : 'var(--Divider-thickness)',
      }),
}));

const Divider = React.forwardRef(function Divider(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyDivider',
  });

  const {
    className,
    children,
    component = children !== undefined && children !== null ? 'div' : 'hr',
    orientation = 'horizontal',
    role = component !== 'hr' ? 'separator' : undefined,
    ...other
  } = props;

  const ownerState = {
    ...props,
    role,
    orientation,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <DividerRoot
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
    </DividerRoot>
  );
}) as OverridableComponent<DividerTypeMap>;

Divider.propTypes /* remove-proptypes */ = {
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
   * For horizontal list (the nearest parent List has `row` prop set to `true`), only `inset="gutter"` affects the list divider.
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

export default Divider;
