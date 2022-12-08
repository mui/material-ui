import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { alpha } from '@mui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getDividerUtilityClass } from './dividerClasses';

const useUtilityClasses = (ownerState) => {
  const { absolute, children, classes, flexItem, light, orientation, textAlign, variant } =
    ownerState;

  const slots = {
    root: [
      'root',
      absolute && 'absolute',
      variant,
      light && 'light',
      orientation === 'vertical' && 'vertical',
      flexItem && 'flexItem',
      children && 'withChildren',
      children && orientation === 'vertical' && 'withChildrenVertical',
      textAlign === 'right' && orientation !== 'vertical' && 'textAlignRight',
      textAlign === 'left' && orientation !== 'vertical' && 'textAlignLeft',
    ],
    wrapper: ['wrapper', orientation === 'vertical' && 'wrapperVertical'],
  };

  return composeClasses(slots, getDividerUtilityClass, classes);
};

const DividerRoot = styled('div', {
  name: 'MuiDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.absolute && styles.absolute,
      styles[ownerState.variant],
      ownerState.light && styles.light,
      ownerState.orientation === 'vertical' && styles.vertical,
      ownerState.flexItem && styles.flexItem,
      ownerState.children && styles.withChildren,
      ownerState.children && ownerState.orientation === 'vertical' && styles.withChildrenVertical,
      ownerState.textAlign === 'right' &&
        ownerState.orientation !== 'vertical' &&
        styles.textAlignRight,
      ownerState.textAlign === 'left' &&
        ownerState.orientation !== 'vertical' &&
        styles.textAlignLeft,
    ];
  },
})(
  ({ theme, ownerState }) => ({
    margin: 0, // Reset browser default style.
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: (theme.vars || theme).palette.divider,
    borderBottomWidth: 'thin',
    ...(ownerState.absolute && {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
    }),
    ...(ownerState.light && {
      borderColor: theme.vars
        ? `rgba(${theme.vars.palette.dividerChannel} / 0.08)`
        : alpha(theme.palette.divider, 0.08),
    }),
    ...(ownerState.variant === 'inset' && {
      marginLeft: 72,
    }),
    ...(ownerState.variant === 'middle' &&
      ownerState.orientation === 'horizontal' && {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      }),
    ...(ownerState.variant === 'middle' &&
      ownerState.orientation === 'vertical' && {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      }),
    ...(ownerState.orientation === 'vertical' && {
      height: '100%',
      borderBottomWidth: 0,
      borderRightWidth: 'thin',
    }),
    ...(ownerState.flexItem && {
      alignSelf: 'stretch',
      height: 'auto',
    }),
  }),
  ({ theme, ownerState }) => ({
    ...(ownerState.children && {
      display: 'flex',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      border: 0,
      '&::before, &::after': {
        position: 'relative',
        width: '100%',
        borderTop: `thin solid ${(theme.vars || theme).palette.divider}`,
        top: '50%',
        content: '""',
        transform: 'translateY(50%)',
      },
    }),
  }),
  ({ theme, ownerState }) => ({
    ...(ownerState.children &&
      ownerState.orientation === 'vertical' && {
        flexDirection: 'column',
        '&::before, &::after': {
          height: '100%',
          top: '0%',
          left: '50%',
          borderTop: 0,
          borderLeft: `thin solid ${(theme.vars || theme).palette.divider}`,
          transform: 'translateX(0%)',
        },
      }),
  }),
  ({ ownerState }) => ({
    ...(ownerState.textAlign === 'right' &&
      ownerState.orientation !== 'vertical' && {
        '&::before': {
          width: '90%',
        },
        '&::after': {
          width: '10%',
        },
      }),
    ...(ownerState.textAlign === 'left' &&
      ownerState.orientation !== 'vertical' && {
        '&::before': {
          width: '10%',
        },
        '&::after': {
          width: '90%',
        },
      }),
  }),
);

const DividerWrapper = styled('span', {
  name: 'MuiDivider',
  slot: 'Wrapper',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.wrapper, ownerState.orientation === 'vertical' && styles.wrapperVertical];
  },
})(({ theme, ownerState }) => ({
  display: 'inline-block',
  paddingLeft: `calc(${theme.spacing(1)} * 1.2)`,
  paddingRight: `calc(${theme.spacing(1)} * 1.2)`,
  ...(ownerState.orientation === 'vertical' && {
    paddingTop: `calc(${theme.spacing(1)} * 1.2)`,
    paddingBottom: `calc(${theme.spacing(1)} * 1.2)`,
  }),
}));

const Divider = React.forwardRef(function Divider(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiDivider' });
  const {
    absolute = false,
    children,
    className,
    component = children ? 'div' : 'hr',
    flexItem = false,
    light = false,
    orientation = 'horizontal',
    role = component !== 'hr' ? 'separator' : undefined,
    textAlign = 'center',
    variant = 'fullWidth',
    ...other
  } = props;

  const ownerState = {
    ...props,
    absolute,
    component,
    flexItem,
    light,
    orientation,
    role,
    textAlign,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <DividerRoot
      as={component}
      className={clsx(classes.root, className)}
      role={role}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      {children ? (
        <DividerWrapper className={classes.wrapper} ownerState={ownerState}>
          {children}
        </DividerWrapper>
      ) : null}
    </DividerRoot>
  );
});

Divider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: PropTypes.bool,
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
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: PropTypes.bool,
  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   */
  light: PropTypes.bool,
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
  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: PropTypes.oneOf(['center', 'left', 'right']),
  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['fullWidth', 'inset', 'middle']),
    PropTypes.string,
  ]),
};

export default Divider;
