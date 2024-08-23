'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@mui/system/colorManipulator';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
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
  memoTheme(({ theme }) => ({
    margin: 0, // Reset browser default style.
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: (theme.vars || theme).palette.divider,
    borderBottomWidth: 'thin',
    variants: [
      {
        props: {
          absolute: true,
        },
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        },
      },
      {
        props: {
          light: true,
        },
        style: {
          borderColor: theme.vars
            ? `rgba(${theme.vars.palette.dividerChannel} / 0.08)`
            : alpha(theme.palette.divider, 0.08),
        },
      },
      {
        props: {
          variant: 'inset',
        },
        style: {
          marginLeft: 72,
        },
      },
      {
        props: {
          variant: 'middle',
          orientation: 'horizontal',
        },
        style: {
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
        },
      },
      {
        props: {
          variant: 'middle',
          orientation: 'vertical',
        },
        style: {
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(1),
        },
      },
      {
        props: {
          orientation: 'vertical',
        },
        style: {
          height: '100%',
          borderBottomWidth: 0,
          borderRightWidth: 'thin',
        },
      },
      {
        props: {
          flexItem: true,
        },
        style: {
          alignSelf: 'stretch',
          height: 'auto',
        },
      },
      {
        props: ({ ownerState }) => !!ownerState.children,
        style: {
          display: 'flex',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          border: 0,
          borderTopStyle: 'solid',
          borderLeftStyle: 'solid',
          '&::before, &::after': {
            content: '""',
            alignSelf: 'center',
          },
        },
      },
      {
        props: ({ ownerState }) => ownerState.children && ownerState.orientation !== 'vertical',
        style: {
          '&::before, &::after': {
            width: '100%',
            borderTop: `thin solid ${(theme.vars || theme).palette.divider}`,
            borderTopStyle: 'inherit',
          },
        },
      },
      {
        props: ({ ownerState }) => ownerState.orientation === 'vertical' && ownerState.children,
        style: {
          flexDirection: 'column',
          '&::before, &::after': {
            height: '100%',
            borderLeft: `thin solid ${(theme.vars || theme).palette.divider}`,
            borderLeftStyle: 'inherit',
          },
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.textAlign === 'right' && ownerState.orientation !== 'vertical',
        style: {
          '&::before': {
            width: '90%',
          },
          '&::after': {
            width: '10%',
          },
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.textAlign === 'left' && ownerState.orientation !== 'vertical',
        style: {
          '&::before': {
            width: '10%',
          },
          '&::after': {
            width: '90%',
          },
        },
      },
    ],
  })),
);

const DividerWrapper = styled('span', {
  name: 'MuiDivider',
  slot: 'Wrapper',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.wrapper, ownerState.orientation === 'vertical' && styles.wrapperVertical];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'inline-block',
    paddingLeft: `calc(${theme.spacing(1)} * 1.2)`,
    paddingRight: `calc(${theme.spacing(1)} * 1.2)`,
    variants: [
      {
        props: {
          orientation: 'vertical',
        },
        style: {
          paddingTop: `calc(${theme.spacing(1)} * 1.2)`,
          paddingBottom: `calc(${theme.spacing(1)} * 1.2)`,
        },
      },
    ],
  })),
);

const Divider = React.forwardRef(function Divider(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiDivider' });
  const {
    absolute = false,
    children,
    className,
    orientation = 'horizontal',
    component = children || orientation === 'vertical' ? 'div' : 'hr',
    flexItem = false,
    light = false,
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
      aria-orientation={
        role === 'separator' && (component !== 'hr' || orientation === 'vertical')
          ? orientation
          : undefined
      }
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

/**
 * The following flag is used to ensure that this component isn't tabbable i.e.
 * does not get highlight/focus inside of MUI List.
 */
if (Divider) {
  Divider.muiSkipListHighlight = true;
}

Divider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * @deprecated Use <Divider sx={{ opacity: 0.6 }} /> (or any opacity or color) instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
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
