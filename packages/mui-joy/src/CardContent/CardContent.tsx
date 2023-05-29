import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getCardContentUtilityClass } from './cardContentClasses';
import { CardContentProps, CardContentTypeMap } from './CardContentProps';
import useSlot from '../utils/useSlot';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardContentUtilityClass, {});
};

const CardContentRoot = styled('div', {
  name: 'JoyCardContent',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{
  ownerState: CardContentProps & {
    'data-parent'?: 'HCard' | 'VCard';
    'data-first-child'?: string;
    'data-last-child'?: string;
  };
}>(({ ownerState }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  zIndex: 1,
  padding: 'var(--Card-padding)',
  ...(ownerState['data-parent'] === 'VCard' && {
    marginInline: 'calc(-1 * var(--Card-padding))',
    ...(ownerState['data-first-child'] !== undefined && {
      marginBlockStart: 'calc(-1 * var(--Card-padding))',
      borderTopLeftRadius: 'var(--CardOverflow-radius)',
      borderTopRightRadius: 'var(--CardOverflow-radius)',
    }),
    ...(ownerState['data-last-child'] !== undefined && {
      marginBlockEnd: 'calc(-1 * var(--Card-padding))',
      borderBottomLeftRadius: 'var(--CardOverflow-radius)',
      borderBottomRightRadius: 'var(--CardOverflow-radius)',
    }),
  }),
  ...(ownerState['data-parent'] === 'HCard' && {
    marginBlock: 'calc(-1 * var(--Card-padding))',
    ...(ownerState['data-first-child'] !== undefined && {
      marginInlineStart: 'calc(-1 * var(--Card-padding))',
      borderTopLeftRadius: 'var(--CardOverflow-radius)',
      borderBottomLeftRadius: 'var(--CardOverflow-radius)',
    }),
    ...(ownerState['data-last-child'] !== undefined && {
      marginInlineEnd: 'calc(-1 * var(--Card-padding))',
      borderTopRightRadius: 'var(--CardOverflow-radius)',
      borderBottomRightRadius: 'var(--CardOverflow-radius)',
    }),
  }),
}));
/**
 *
 * Demos:
 *
 * - [Card](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [CardContent API](https://mui.com/joy-ui/api/card-content/)
 */
const CardContent = React.forwardRef(function CardContent(inProps, ref) {
  const props = useThemeProps<typeof inProps & CardContentProps>({
    props: inProps,
    name: 'JoyCardContent',
  });

  const { className, component = 'div', children, slots = {}, slotProps = {}, ...other } = props;
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const ownerState = {
    ...props,
    component,
  };

  const classes = useUtilityClasses();

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: CardContentRoot,
    externalForwardedProps,
    ownerState,
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<CardContentTypeMap>;

CardContent.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the CardContent if `src` is not set.
   * This can be an element, or just a string.
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
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

// @ts-ignore internal logic
CardContent.muiName = 'CardContent';

export default CardContent;
