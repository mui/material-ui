'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getCardActionsUtilityClass } from './cardActionsClasses';
import { CardActionsProps, CardActionsOwnerState, CardActionsTypeMap } from './CardActionsProps';
import useSlot from '../utils/useSlot';
import buttonClasses from '../Button/buttonClasses';
import iconButtonClasses from '../IconButton/iconButtonClasses';
import cardClasses from '../Card/cardClasses';
import cardOverflowClasses from '../CardOverflow/cardOverflowClasses';
import dividerClasses from '../Divider/dividerClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardActionsUtilityClass, {});
};

export const StyledCardActionsRoot = styled('div')<{ ownerState: CardActionsOwnerState }>(({
  ownerState,
}) => {
  return {
    '--Button-radius': 'var(--Card-childRadius)',
    '--IconButton-radius': 'var(--Card-childRadius)',
    display: 'flex',
    ...(ownerState.orientation?.startsWith('horizontal') && {
      alignItems: 'center', // it is common to have children aligned center in horizontal orientation, but not vertically.
    }),
    flexDirection: ownerState.orientation === 'horizontal' ? 'row' : 'column',
    ...(ownerState.orientation === 'horizontal-reverse' && {
      flexDirection: 'row-reverse',
    }),
    zIndex: 1, // render above Link's overlay
    gap: 'calc(0.625 * var(--Card-padding))',
    padding: 'var(--unstable_padding)',
    '--unstable_padding': 'calc(0.75 * var(--Card-padding)) 0 0 0',
    [`.${cardOverflowClasses.root} > &`]: {
      '--unstable_padding': 'calc(0.75 * var(--Card-padding)) 0 var(--Card-padding)',
    },
    [`.${cardClasses.root} > .${dividerClasses.root} + &`]: {
      '--unstable_padding': '0',
    },
    ...(ownerState.buttonFlex
      ? {
          [`& > :not(.${iconButtonClasses.root})`]: {
            flex: ownerState.buttonFlex,
          },
          [`& > :not(button) > .${buttonClasses.root}`]: {
            width: '100%', // for button to fill its wrapper.
          },
        }
      : {
          [`& > .${buttonClasses.root}:only-child`]: {
            flex: 'auto',
          },
        }),
  };
});

const CardActionsRoot = styled(StyledCardActionsRoot, {
  name: 'JoyCardActions',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CardActionsOwnerState }>({});
/**
 *
 * Demos:
 *
 * - [Card](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [CardActions API](https://mui.com/joy-ui/api/card-actions/)
 */
const CardActions = React.forwardRef(function CardActions(inProps, ref) {
  const props = useThemeProps<typeof inProps & CardActionsProps>({
    props: inProps,
    name: 'JoyCardActions',
  });

  const {
    className,
    component = 'div',
    children,
    buttonFlex,
    orientation = 'horizontal',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const ownerState = {
    ...props,
    component,
    buttonFlex,
    orientation,
  };

  const classes = useUtilityClasses();

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: CardActionsRoot,
    externalForwardedProps,
    ownerState,
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<CardActionsTypeMap>;

CardActions.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The CSS `flex` for the Button and its wrapper.
   */
  buttonFlex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Used to render icon or text elements inside the CardActions if `src` is not set.
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
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal-reverse', 'horizontal', 'vertical']),
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

export default CardActions;
