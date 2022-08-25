import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getAlertUtilityClass } from './alertClasses';
import { AlertProps, AlertTypeMap } from './AlertProps';

const useUtilityClasses = (ownerState: AlertProps) => {
  const { variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      size && `size${capitalize(size)}`,
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getAlertUtilityClass, {});
};

const AlertRoot = styled('div', {
  name: 'JoyAlert',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AlertProps }>(({ theme, ownerState }) => {
  return [
    {
      '--Alert-radius': theme.vars.radius.sm,
      '--Alert-gap': '0.5rem',
      ...(ownerState.size === 'sm' && {
        fontSize: theme.vars.fontSize.sm,
        '--Alert-minHeight': '2rem',
        '--Alert-paddingInline': '0.5rem',
        '--Alert-decorator-childHeight': 'min(1.5rem, var(--Alert-minHeight))',
        '--Icon-fontSize': '1.25rem',
      }),
      ...(ownerState.size === 'md' && {
        fontSize: theme.vars.fontSize.md,
        '--Alert-minHeight': '2.5rem',
        '--Alert-paddingInline': '0.75rem',
        '--Alert-decorator-childHeight': 'min(2rem, var(--Alert-minHeight))',
        '--Icon-fontSize': '1.5rem',
      }),
      ...(ownerState.size === 'lg' && {
        fontSize: theme.vars.fontSize.lg,
        '--Alert-minHeight': '3rem',
        '--Alert-paddingInline': '1rem',
        '--Alert-gap': '0.75rem',
        '--Alert-decorator-childHeight': 'min(2.375rem, var(--Alert-minHeight))',
        '--Icon-fontSize': '1.75rem',
      }),
      '--Alert-decorator-childOffset':
        'min(calc(var(--Alert-paddingInline) - (var(--Alert-minHeight) - 2 * var(--variant-borderWidth) - var(--Alert-decorator-childHeight)) / 2), var(--Alert-paddingInline))',
      minHeight: 'var(--Alert-minHeight)',
      ...theme.typography.body2,
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      paddingInline: `var(--Alert-paddingInline)`,
      borderRadius: 'var(--Alert-radius)',
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
  ];
});

const AlertStartDecorator = styled('span', {
  name: 'JoyAlert',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: AlertProps }>(({ theme, ownerState }) => ({
  '--Alert-margin': '0 0 0 calc(var(--Alert-decorator-childOffset) * -1)',
  '--IconButton-margin': '0 0 0 calc(var(--Alert-decorator-childOffset) * -1)',
  '--Icon-margin': '0 0 0 calc(var(--Alert-paddingInline) / -4)',
  pointerEvents: 'none', // to make the input focused when click on the element because start element usually is an icon
  display: 'inherit',
  alignItems: 'center',
  marginInlineEnd: 'var(--Alert-gap)',
  color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
}));

const AlertEndDecorator = styled('span', {
  name: 'JoyAlert',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: AlertProps }>(({ theme, ownerState }) => ({
  '--Alert-margin': '0 calc(var(--Alert-decorator-childOffset) * -1) 0 0',
  '--IconButton-margin': '0 calc(var(--Alert-decorator-childOffset) * -1) 0 0',
  '--Icon-margin': '0 calc(var(--Alert-paddingInline) / -4) 0 0',
  display: 'inherit',
  alignItems: 'center',
  marginInlineStart: 'var(--Alert-gap)',
  color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
}));

const Alert = React.forwardRef(function Alert(inProps, ref) {
  const props = useThemeProps<typeof inProps & AlertProps>({
    props: inProps,
    name: 'JoyAlert',
  });

  const {
    children,
    className,
    color = 'primary',
    role = 'alert',
    variant = 'soft',
    size = 'md',
    startDecorator,
    endDecorator,
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    variant,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <AlertRoot
      role={role}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {startDecorator && (
        <AlertStartDecorator className={classes.startDecorator} ownerState={ownerState}>
          {startDecorator}
        </AlertStartDecorator>
      )}

      {children}
      {endDecorator && (
        <AlertEndDecorator className={classes.endDecorator} ownerState={ownerState}>
          {endDecorator}
        </AlertEndDecorator>
      )}
    </AlertRoot>
  );
}) as OverridableComponent<AlertTypeMap>;

Alert.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * Element placed after the children.
   */
  endDecorator: PropTypes.node,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: PropTypes.string,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * Element placed before the children.
   */
  startDecorator: PropTypes.node,
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
   * @default 'soft'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default Alert;
