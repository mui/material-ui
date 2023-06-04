import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import cardContentClasses, { getCardContentUtilityClass } from './cardContentClasses';
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
})<{ ownerState: CardContentProps }>({
  display: 'flex',
  flexDirection: 'column',
  flex: 1, // fill the available space in the Card and also shrink if needed
  zIndex: 1,
  // Why not using gap?
  // 1. flexbox gap is ~93% whereas grid gap is ~95% (https://caniuse.com/flexbox-gap)
  // 2. using gap on the Card requires developer to group set of elements so that the card has proportional space
  marginTop:
    'var(--unstable_pt, calc((1 - var(--unstable_Card-horizontal)) * var(--Card-padding)))',
  marginLeft: 'var(--unstable_pl, calc(var(--unstable_Card-horizontal) * var(--Card-padding)))',
  marginBottom:
    'var(--unstable_pb, calc((1 - var(--unstable_Card-horizontal)) * var(--Card-padding)))',
  marginRight: 'var(--unstable_pr, calc(var(--unstable_Card-horizontal) * var(--Card-padding)))',
  '&[data-first-child]': {
    '--unstable_pt': '0px',
    '--unstable_pl': '0px',
  },
  '&[data-last-child]': {
    '--unstable_pr': '0px',
    '--unstable_pb': '0px',
  },
  '&:not([data-first-child])': {
    // to work with Card's stackWidth
    '--unstable_pt':
      'clamp(0px, (100% - var(--unstable_Card-stackPoint) - 1px) * -999, var(--Card-padding))',
    '--unstable_pl':
      'clamp(0px, (100% - var(--unstable_Card-stackPoint)) * 999, var(--Card-padding))',
  },
  '&:not([data-last-child])': {
    // to work with Card's stackWidth
    '--unstable_pr':
      'clamp(0px, (100% - var(--unstable_Card-stackPoint)) * 999, var(--Card-padding))',
  },
  [`& + .${cardContentClasses.root}`]: {
    // support consecutive CardContent
    '--unstable_pt':
      'clamp(0px, (var(--unstable_Card-stackPoint, 0px) - 100%) * 999, var(--Card-padding))',
    '--unstable_pl': '0px',
  },
});
/**
 * ⚠️ CardContent must be used as a direct child of the [Card](https://mui.com/joy-ui/react-card/) component.
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

export default CardContent;
