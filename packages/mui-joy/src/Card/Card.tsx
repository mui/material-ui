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
  name: 'MuiCard',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CardProps }>(({ theme, ownerState }) => {
  return [
    {
      ...(ownerState.size === 'sm' && {
        padding: '0.5rem',
      }),
      ...(ownerState.size === 'md' && {
        padding: '1rem',
        fontSize: theme.vars.fontSize.md,
      }),
      ...(ownerState.size === 'lg' && {
        padding: '1.5rem',
        fontSize: theme.vars.fontSize.lg,
      }),
      fontFamily: theme.vars.fontFamily.body,
      borderRadius: theme.vars.radius.md,
      boxShadow: theme.vars.shadow.sm,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
  ];
});

const Card = React.forwardRef(function Card(inProps, ref) {
  const props = useThemeProps<typeof inProps & CardProps>({
    props: inProps,
    name: 'MuiCard',
  });

  const {
    className,
    color = 'neutral',
    component = 'div',
    size = 'md',
    variant = 'text',
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
      {children}
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
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default Card;
