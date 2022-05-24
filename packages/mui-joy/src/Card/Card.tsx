import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getCardUtilityClass } from './cardClasses';
import { CardProps, CardTypeMap } from './CardProps';
import { resolveSxValue } from '../styles/styleUtils';

const useUtilityClasses = (ownerState: CardProps) => {
  const { size, variant, color } = ownerState;

  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getCardUtilityClass, {});
};

const CardRoot = styled('div', {
  name: 'JoyCard',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CardProps }>(({ theme, ownerState }) => [
  {
    // a context variable for any child component
    '--Card-childRadius':
      ownerState.variant === 'outlined'
        ? `calc(max(var(--Card-radius) - var(--Card-padding), min(var(--Card-padding) / 2, var(--Card-radius) / 2)) - var(--variant-outlinedBorderWidth))`
        : 'max(var(--Card-radius) - var(--Card-padding), min(var(--Card-padding) / 2, var(--Card-radius) / 2))',
    // AspectRatio integration
    '--AspectRatio-radius': 'var(--Card-childRadius)',
    // Link integration
    '--Link-overlayMargin':
      ownerState.variant === 'outlined'
        ? 'calc(-1 * var(--variant-outlinedBorderWidth))'
        : undefined,
    '--Link-overlayRadius': resolveSxValue(
      { theme, ownerState },
      'borderRadius',
      'var(--Card-radius)',
    ),
    // CardCover integration
    '--CardCover-radius':
      ownerState.variant === 'outlined'
        ? `calc(var(--Card-radius) - var(--variant-outlinedBorderWidth, 0px))`
        : 'var(--Card-radius)',
    // CardOverflow integration
    '--CardOverflow-offset': `calc(-1 * var(--Card-padding))`,
    '--CardOverflow-radius':
      ownerState.variant === 'outlined'
        ? `calc(var(--Card-radius) - var(--variant-outlinedBorderWidth, 0px))`
        : 'var(--Card-radius)',
    ...(ownerState.size === 'sm' && {
      '--Card-radius': theme.vars.radius.sm,
      '--Card-padding': '0.5rem',
    }),
    ...(ownerState.size === 'md' && {
      '--Card-radius': theme.vars.radius.md,
      '--Card-padding': '1rem',
      fontSize: theme.vars.fontSize.md,
    }),
    ...(ownerState.size === 'lg' && {
      '--Card-radius': theme.vars.radius.lg,
      '--Card-padding': '1.5rem',
    }),
    padding: 'var(--Card-padding)',
    borderRadius: 'var(--Card-radius)',
    boxShadow: theme.vars.shadow.sm,
    backgroundColor: theme.vars.palette.background.body,
    fontFamily: theme.vars.fontFamily.body,
    // TODO: discuss the theme transition.
    // This value is copied from mui-material Sheet.
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  theme.variants[ownerState.variant!]?.[ownerState.color!],
]);

const Card = React.forwardRef(function Card(inProps, ref) {
  const props = useThemeProps<typeof inProps & CardProps>({
    props: inProps,
    name: 'JoyCard',
  });

  const {
    className,
    color = 'neutral',
    component = 'div',
    size = 'md',
    variant = 'plain',
    children,
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <CardRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        if (index === 0) {
          return React.cloneElement(child, { 'data-first-child': '' });
        }
        if (index === React.Children.count(children) - 1) {
          return React.cloneElement(child, { 'data-last-child': '' });
        }
        return child;
      })}
    </CardRoot>
  );
}) as OverridableComponent<CardTypeMap>;

Card.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the Card if `src` is not set.
   * This can be an element, or just a string.
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
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The size of the component.
   * It accepts theme values between 'xs' and 'xl'.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['lg', 'md', 'sm']),
    PropTypes.string,
  ]),
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
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Card;
