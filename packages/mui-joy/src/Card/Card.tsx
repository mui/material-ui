import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_isMuiElement as isMuiElement,
} from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { ColorInversionProvider, useColorInversion } from '../styles/ColorInversion';
import { getCardUtilityClass } from './cardClasses';
import { CardProps, CardOwnerState, CardTypeMap } from './CardProps';
import { resolveSxValue } from '../styles/styleUtils';
import { CardRowContext } from './CardContext';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: CardOwnerState) => {
  const { size, variant, color, orientation } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
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
})<{ ownerState: CardOwnerState }>(({ theme, ownerState }) => [
  {
    // a context variable for any child component
    '--Card-childRadius':
      'max((var(--Card-radius) - var(--variant-borderWidth, 0px)) - var(--Card-padding), min(var(--Card-padding) / 2, (var(--Card-radius) - var(--variant-borderWidth, 0px)) / 2))',
    // AspectRatio integration
    '--AspectRatio-radius': 'var(--Card-childRadius)',
    // Link integration
    '--unstable_actionMargin': 'calc(-1 * var(--variant-borderWidth, 0px))',
    // Link, Radio, Checkbox integration
    '--unstable_actionRadius': resolveSxValue(
      { theme, ownerState },
      'borderRadius',
      'var(--Card-radius)',
    ),
    // CardCover integration
    '--CardCover-radius': 'calc(var(--Card-radius) - var(--variant-borderWidth, 0px))',
    // CardOverflow integration
    '--CardOverflow-offset': `calc(-1 * var(--Card-padding))`,
    '--CardOverflow-radius': 'calc(var(--Card-radius) - var(--variant-borderWidth, 0px))',
    // Divider integration
    '--Divider-inset': 'calc(-1 * var(--Card-padding))',
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
    boxShadow: theme.shadow.sm,
    backgroundColor: theme.vars.palette.background.surface,
    fontFamily: theme.vars.fontFamily.body,
    position: 'relative',
    display: 'flex',
    flexDirection: ownerState.orientation === 'horizontal' ? 'row' : 'column',
  },
  theme.variants[ownerState.variant!]?.[ownerState.color!],
  ownerState.color !== 'context' &&
    ownerState.invertedColors &&
    theme.colorInversion[ownerState.variant!]?.[ownerState.color!],
]);

/**
 *
 * Demos:
 *
 * - [Card](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [Card API](https://mui.com/joy-ui/api/card/)
 */
const Card = React.forwardRef(function Card(inProps, ref) {
  const props = useThemeProps<typeof inProps & CardProps>({
    props: inProps,
    name: 'JoyCard',
  });

  const {
    className,
    color: colorProp = 'neutral',
    component = 'div',
    invertedColors = false,
    size = 'md',
    variant = 'plain',
    children,
    orientation = 'vertical',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const ownerState = {
    ...props,
    color,
    component,
    orientation,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: CardRoot,
    externalForwardedProps,
    ownerState,
  });

  const result = (
    <CardRowContext.Provider value={orientation === 'horizontal'}>
      <SlotRoot {...rootProps}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          const extraProps: Record<string, any> = {};
          if (isMuiElement(child, ['Divider'])) {
            extraProps.inset = 'inset' in child.props ? child.props.inset : 'context';

            const dividerOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical';
            extraProps.orientation =
              'orientation' in child.props ? child.props.orientation : dividerOrientation;
          }
          if (index === 0) {
            extraProps['data-first-child'] = '';
          }
          if (index === React.Children.count(children) - 1) {
            extraProps['data-last-child'] = '';
          }
          return React.cloneElement(child, extraProps);
        })}
      </SlotRoot>
    </CardRowContext.Provider>
  );

  if (invertedColors) {
    return <ColorInversionProvider variant={variant}>{result}</ColorInversionProvider>;
  }
  return result;
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
   * If `true`, the children with an implicit color prop invert their colors to match the component's variant and color.
   * @default false
   */
  invertedColors: PropTypes.bool,
  /**
   * The component orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['lg', 'md', 'sm']),
    PropTypes.string,
  ]),
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
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Card;
