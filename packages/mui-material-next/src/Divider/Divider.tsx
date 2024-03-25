'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { OverridableComponent } from '@mui/types';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getDividerUtilityClass } from './dividerClasses';
import { DividerOwnerState, DividerProps, DividerTypeMap } from './Divider.types';

const useUtilityClasses = (ownerState: DividerOwnerState) => {
  const { absolute, children, classes, flexItem, orientation, textAlign, variant } = ownerState;

  const slots = {
    root: [
      'root',
      absolute && 'absolute',
      variant,
      orientation === 'vertical' && 'vertical',
      flexItem && 'flexItem',
      !!children && 'withChildren',
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
      ownerState.orientation === 'vertical' && styles.vertical,
      ownerState.flexItem && styles.flexItem,
      ownerState.children && styles.withChildren,
      ownerState.textAlign === 'right' &&
        ownerState.orientation !== 'vertical' &&
        styles.textAlignRight,
      ownerState.textAlign === 'left' &&
        ownerState.orientation !== 'vertical' &&
        styles.textAlignLeft,
    ];
  },
})<{ ownerState: DividerOwnerState }>(
  ({ theme, ownerState }) => {
    const { vars: tokens } = theme;

    return {
      margin: 0, // Reset browser default style.
      flexShrink: 0,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: tokens.sys.color.outlineVariant,
      borderBottomWidth: '1px',
      ...(ownerState.absolute && {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
      }),
      ...(ownerState.variant === 'inset' &&
        ownerState.orientation === 'horizontal' && {
          marginLeft: '16px',
        }),
      ...(ownerState.variant === 'inset' &&
        ownerState.orientation === 'vertical' && {
          marginTop: '16px',
        }),
      ...(ownerState.variant === 'middle' &&
        ownerState.orientation === 'horizontal' && {
          marginLeft: '16px',
          marginRight: '16px',
        }),
      ...(ownerState.variant === 'middle' &&
        ownerState.orientation === 'vertical' && {
          marginTop: '16px',
          marginBottom: '16px',
        }),
      ...(ownerState.orientation === 'vertical' && {
        height: '100%',
        borderBottomWidth: 0,
        borderRightWidth: '1px',
      }),
      ...(ownerState.flexItem && {
        alignSelf: 'stretch',
        height: 'auto',
      }),
    };
  },
  ({ ownerState }) => ({
    ...(ownerState.children && {
      display: 'flex',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      border: 0,
      '&::before, &::after': {
        content: '""',
        alignSelf: 'center',
      },
    }),
  }),
  ({ theme: { vars: tokens }, ownerState }) => ({
    ...(ownerState.children &&
      ownerState.orientation !== 'vertical' && {
        '&::before, &::after': {
          width: '100%',
          borderTop: `1px solid ${tokens.sys.color.outlineVariant}`,
        },
      }),
  }),
  ({ theme: { vars: tokens }, ownerState }) => ({
    ...(ownerState.children &&
      ownerState.orientation === 'vertical' && {
        flexDirection: 'column',
        '&::before, &::after': {
          height: '100%',
          borderLeft: `1px solid ${tokens.sys.color.outlineVariant}`,
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
})<{ ownerState: DividerOwnerState }>(({ theme, ownerState }) => ({
  display: 'inline-block',
  paddingLeft: `calc(${theme.spacing(1)} * 1.2)`,
  paddingRight: `calc(${theme.spacing(1)} * 1.2)`,
  ...(ownerState.orientation === 'vertical' && {
    paddingTop: `calc(${theme.spacing(1)} * 1.2)`,
    paddingBottom: `calc(${theme.spacing(1)} * 1.2)`,
  }),
}));

/**
 * Dividers separate content into clear groups.
 *
 * Demos:
 *
 * - [Divider](https://mui.com/material-ui/react-divider/)
 * - [Lists](https://mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [Divider API](https://mui.com/material-ui/api/divider/)
 */
const Divider = React.forwardRef(function Divider<
  BaseComponentType extends React.ElementType = DividerTypeMap['defaultComponent'],
>(inProps: DividerProps<BaseComponentType>, ref: React.ForwardedRef<any>) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDivider',
  });

  const {
    absolute = false,
    children,
    className,
    component = children ? 'div' : 'hr',
    flexItem = false,
    orientation = 'horizontal',
    role = component !== 'hr' ? 'separator' : undefined,
    textAlign = 'center',
    variant = 'fullWidth',
    ...other
  } = props;

  const ownerState: DividerOwnerState = {
    ...props,
    absolute,
    component,
    flexItem,
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
}) as OverridableComponent<DividerTypeMap>;

/**
 * The following flag is used to ensure that this component isn't tabbable i.e.
 * does not get highlight/focus inside of MUI List.
 */
// @ts-ignore internal logic
Divider.muiSkipListHighlight = true;

Divider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
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
} as any;

export default Divider;
