import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { useColorInversion } from '../styles/ColorInversion';
import useSlot from '../utils/useSlot';
import { getAlertUtilityClass } from './alertClasses';
import { AlertProps, AlertOwnerState, AlertTypeMap } from './AlertProps';

const useUtilityClasses = (ownerState: AlertOwnerState) => {
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
})<{ ownerState: AlertOwnerState }>(({ theme, ownerState }) => ({
  '--Alert-radius': theme.vars.radius.sm,
  '--Alert-decoratorChildRadius':
    'max((var(--Alert-radius) - var(--variant-borderWidth, 0px)) - var(--Alert-padding), min(var(--Alert-padding) + var(--variant-borderWidth, 0px), var(--Alert-radius) / 2))',
  '--Button-minHeight': 'var(--Alert-decoratorChildHeight)',
  '--IconButton-size': 'var(--Alert-decoratorChildHeight)',
  '--Button-radius': 'var(--Alert-decoratorChildRadius)',
  '--IconButton-radius': 'var(--Alert-decoratorChildRadius)',
  ...(ownerState.size === 'sm' && {
    '--Alert-padding': '0.5rem',
    '--Alert-gap': '0.375rem',
    '--Alert-decoratorChildHeight': '1.5rem',
    '--Icon-fontSize': '1.125rem',
    fontSize: theme.vars.fontSize.sm,
  }),
  ...(ownerState.size === 'md' && {
    '--Alert-padding': '0.75rem',
    '--Alert-gap': '0.5rem',
    '--Alert-decoratorChildHeight': '2rem',
    '--Icon-fontSize': '1.25rem',
    fontSize: theme.vars.fontSize.sm,
    fontWeight: theme.vars.fontWeight.md,
  }),
  ...(ownerState.size === 'lg' && {
    '--Alert-padding': '1rem',
    '--Alert-gap': '0.75rem',
    '--Alert-decoratorChildHeight': '2.375rem',
    '--Icon-fontSize': '1.5rem',
    fontSize: theme.vars.fontSize.md,
    fontWeight: theme.vars.fontWeight.md,
  }),
  fontFamily: theme.vars.fontFamily.body,
  lineHeight: theme.vars.lineHeight.md,
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  padding: `var(--Alert-padding)`,
  borderRadius: 'var(--Alert-radius)',
  ...theme.variants[ownerState.variant!]?.[ownerState.color!],
}));

const AlertStartDecorator = styled('span', {
  name: 'JoyAlert',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: AlertOwnerState }>(({ theme, ownerState }) => ({
  display: 'inherit',
  flex: 'none',
  marginInlineEnd: 'var(--Alert-gap)',
  ...(ownerState.color !== 'context' && {
    color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
  }),
}));

const AlertEndDecorator = styled('span', {
  name: 'JoyAlert',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: AlertOwnerState }>(({ theme, ownerState }) => ({
  display: 'inherit',
  flex: 'none',
  marginInlineStart: 'var(--Alert-gap)',
  marginLeft: 'auto',
  ...(ownerState.color !== 'context' && {
    color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
  }),
}));
/**
 *
 * Demos:
 *
 * - [Alert](https://mui.com/joy-ui/react-alert/)
 *
 * API:
 *
 * - [Alert API](https://mui.com/joy-ui/api/alert/)
 */
const Alert = React.forwardRef(function Alert(inProps, ref) {
  const props = useThemeProps<typeof inProps & AlertProps>({
    props: inProps,
    name: 'JoyAlert',
  });

  const {
    children,
    className,
    color: colorProp = 'primary',
    role = 'alert',
    variant = 'soft',
    size = 'md',
    startDecorator,
    endDecorator,
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const ownerState = {
    ...props,
    color,
    variant,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: AlertRoot,
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      role,
    },
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: AlertStartDecorator,
    externalForwardedProps: other,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: AlertEndDecorator,
    externalForwardedProps: other,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      {startDecorator && (
        <SlotStartDecorator {...startDecoratorProps}>{startDecorator}</SlotStartDecorator>
      )}

      {children}
      {endDecorator && <SlotEndDecorator {...endDecoratorProps}>{endDecorator}</SlotEndDecorator>}
    </SlotRoot>
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
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
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
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
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
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Alert;
