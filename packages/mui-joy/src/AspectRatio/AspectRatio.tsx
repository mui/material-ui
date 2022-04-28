import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getAspectRatioUtilityClass } from './aspectRatioClasses';
import { AspectRatioProps, AspectRatioTypeMap } from './AspectRatioProps';

const useUtilityClasses = (ownerState: AspectRatioProps) => {
  const { variant, color } = ownerState;
  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getAspectRatioUtilityClass, {});
};

const AspectRatioRoot = styled('div', {
  name: 'MuiAspectRatio',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AspectRatioProps }>(({ theme, ownerState }) => {
  const min = typeof ownerState.min === 'number' ? `${ownerState.min}px` : ownerState.min;
  const max = typeof ownerState.max === 'number' ? `${ownerState.max}px` : ownerState.max;
  return [
    {
      position: 'relative',
      borderRadius: 'var(--AspectRatio-radius)',
      height: 0,
      paddingBottom: `clamp(${min || '0px'}, calc(100% / (${ownerState.ratio})), ${
        max || '9999px'
      })`,
      // use data-attribute instead of :first-child to support zero config SSR (emotion)
      '& > [data-first-child]': {
        borderRadius: 'var(--AspectRatio-radius)',
        boxSizing: 'border-box',
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: ownerState.objectFit,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        '& > img': {
          // support art-direction that uses <picture><img /></picture>
          width: '100%',
          height: '100%',
          objectFit: ownerState.objectFit,
        },
      },
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
  ];
});

const AspectRatio = React.forwardRef(function AspectRatio(inProps, ref) {
  const props = useThemeProps<typeof inProps & AspectRatioProps>({
    props: inProps,
    name: 'MuiAspectRatio',
  });

  const {
    className,
    component = 'div',
    children,
    ratio = '16 / 9',
    min,
    max,
    objectFit = 'cover',
    color = 'neutral',
    variant = 'light',
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    min,
    max,
    objectFit,
    ratio,
    color,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <AspectRatioRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {React.Children.map(children, (child, index) =>
        index === 0 && React.isValidElement(child)
          ? React.cloneElement(child, { 'data-first-child': '' })
          : child,
      )}
    </AspectRatioRoot>
  );
}) as OverridableComponent<AspectRatioTypeMap>;

AspectRatio.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the AspectRatio if `src` is not set.
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
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The maximum calculated height of the element (not the CSS height).
   */
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The minimum calculated height of the element (not the CSS height).
   */
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The CSS object-fit value of the first-child.
   */
  objectFit: PropTypes.oneOf([
    '-moz-initial',
    'contain',
    'cover',
    'fill',
    'inherit',
    'initial',
    'none',
    'revert',
    'scale-down',
    'unset',
  ]),
  /**
   * The aspect-ratio of the element. The current implementation uses padding instead of the CSS aspect-ratio due to browser support.
   * https://caniuse.com/?search=aspect-ratio
   * @default '16 / 9'
   */
  ratio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
   * @default 'light'
   */
  variant: PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
} as any;

export default AspectRatio;
