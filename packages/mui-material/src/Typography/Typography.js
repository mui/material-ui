'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled, internal_createExtendSxProp } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import { getTypographyUtilityClass } from './typographyClasses';

const extendSxProp = internal_createExtendSxProp();

const useUtilityClasses = (ownerState) => {
  const { align, gutterBottom, noWrap, paragraph, variant, classes } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      ownerState.align !== 'inherit' && `align${capitalize(align)}`,
      gutterBottom && 'gutterBottom',
      noWrap && 'noWrap',
      paragraph && 'paragraph',
    ],
  };

  return composeClasses(slots, getTypographyUtilityClass, classes);
};

export const TypographyRoot = styled('span', {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.variant && styles[ownerState.variant],
      ownerState.align !== 'inherit' && styles[`align${capitalize(ownerState.align)}`],
      ownerState.noWrap && styles.noWrap,
      ownerState.gutterBottom && styles.gutterBottom,
      ownerState.paragraph && styles.paragraph,
    ];
  },
})(({ theme }) => ({
  margin: 0,
  variants: [
    {
      props: {
        variant: 'inherit',
      },
      style: {
        // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
        font: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    },
    ...Object.entries(theme.typography)
      .filter(([variant, value]) => variant !== 'inherit' && value && typeof value === 'object')
      .map(([variant, value]) => ({
        props: { variant },
        style: value,
      })),
    ...Object.entries(theme.palette)
      .filter(([, value]) => value && value.main)
      .map(([color]) => ({
        props: { color },
        style: {
          color: (theme.vars || theme).palette[color].main,
        },
      })),
    {
      props: ({ ownerState }) => ownerState.align !== 'inherit',
      style: {
        textAlign: 'var(--Typography-textAlign)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.noWrap,
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    {
      props: ({ ownerState }) => ownerState.gutterBottom,
      style: {
        marginBottom: '0.35em',
      },
    },
    {
      props: ({ ownerState }) => ownerState.paragraph,
      style: {
        marginBottom: 16,
      },
    },
  ],
}));

const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p',
};

// TODO v7: remove this transformation and `extendSxProp`
const colorTransformations = {
  textPrimary: 'text.primary',
  textSecondary: 'text.secondary',
  // For the main palette, the color will be applied by the `...Object.entries(theme.palette)` clause in the TypographyRoot's styles
  primary: null,
  secondary: null,
  error: null,
  info: null,
  success: null,
  warning: null,
};

const Typography = React.forwardRef(function Typography(inProps, ref) {
  const { color, ...themeProps } = useDefaultProps({ props: inProps, name: 'MuiTypography' });
  const textColor = colorTransformations[color];
  const props = extendSxProp({
    ...themeProps,
    ...(textColor !== null && {
      color: textColor || color,
    }),
  });

  const {
    align = 'inherit',
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping,
    ...other
  } = props;

  const ownerState = {
    ...props,
    align,
    color,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping,
  };

  const Component =
    component ||
    (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) ||
    'span';

  const classes = useUtilityClasses(ownerState);

  return (
    <TypographyRoot
      as={Component}
      ref={ref}
      className={clsx(classes.root, className)}
      {...other}
      ownerState={ownerState}
      style={{
        ...(align !== 'inherit' && { '--Typography-textAlign': align }),
        ...other.style,
      }}
    />
  );
});

Typography.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: PropTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
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
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: PropTypes.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: PropTypes.bool,
  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   */
  paragraph: PropTypes.bool,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'body1',
      'body2',
      'button',
      'caption',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'inherit',
      'overline',
      'subtitle1',
      'subtitle2',
    ]),
    PropTypes.string,
  ]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: PropTypes /* @typescript-to-proptypes-ignore */.object,
};

export default Typography;
