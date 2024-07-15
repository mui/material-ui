'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getCardContentUtilityClass } from './cardContentClasses';
import cardOverflowClasses from '../CardOverflow/cardOverflowClasses';
import { CardContentProps, CardContentTypeMap } from './CardContentProps';
import useSlot from '../utils/useSlot';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardContentUtilityClass, {});
};

export const StyledCardContentRoot = styled('div')<{ ownerState: CardContentProps }>(
  ({ ownerState }) => ({
    display: 'flex',
    flexDirection: ownerState.orientation === 'horizontal' ? 'row' : 'column',
    flex: 9999, // fill the available space in the Card and also shrink if needed
    zIndex: 1,
    columnGap: 'var(--Card-padding)',
    rowGap: 'max(2px, calc(0.1875 * var(--Card-padding)))',
    padding: 'var(--unstable_padding)',
    [`.${cardOverflowClasses.root} > &`]: {
      '--unstable_padding': 'calc(var(--Card-padding) * 0.75) 0px',
    },
  }),
);

const CardContentRoot = styled(StyledCardContentRoot, {
  name: 'JoyCardContent',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CardContentProps }>({});
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

  const {
    className,
    component = 'div',
    children,
    orientation = 'vertical',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const ownerState = {
    ...props,
    component,
    orientation,
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
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The component orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
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
