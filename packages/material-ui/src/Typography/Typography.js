import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import typographyClasses, { getTypographyUtilityClass } from './typographyClasses';

const getTextColor = (color, palette) => {
  if (color.indexOf('text') === 0) {
    return palette.text[color.split('text').pop().toLowerCase()];
  }

  if (color === 'inherit' || color === 'initial') {
    return color;
  }

  return palette[color].main;
};

const overridesResolver = (props, styles) => {
  const { styleProps = {} } = props;

  return deepmerge(styles.root || {}, {
    ...(styleProps.variant && styles[styleProps.variant]),
    ...(styleProps.color && styles[`color${capitalize(styleProps.color)}`]),
    ...(styleProps.align && styles[`align${capitalize(styleProps.align)}`]),
    ...(styleProps.display && styles[`display${capitalize(styleProps.display)}`]),
    ...(styleProps.noWrap && styles.noWrap),
    ...(styleProps.gutterBottom && styles.gutterBottom),
    ...(styleProps.paragraph && styles.paragraph),
  });
};

export const TypographyRoot = experimentalStyled(
  'span',
  {},
  { name: 'MuiTypography', slot: 'Root', overridesResolver },
)(({ theme, styleProps }) => ({
  margin: 0,
  ...(styleProps.variant && theme.typography[styleProps.variant]),
  ...(styleProps.align !== 'inherit' && {
    textAlign: styleProps.align,
  }),
  ...(styleProps.noWrap && {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  ...(styleProps.gutterBottom && {
    marginBottom: '0.35em',
  }),
  ...(styleProps.paragraph && {
    marginBottom: 16,
  }),
  ...(styleProps.color &&
    styleProps.color !== 'initial' && {
      color: getTextColor(styleProps.color, theme.palette),
    }),
  ...(styleProps.display !== 'initial' && {
    display: styleProps.display,
  }),
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

const useUtilityClasses = (styleProps) => {
  const {
    align,
    color,
    display,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes = {},
  } = styleProps;

  return {
    root: clsx(
      typographyClasses['root'],
      classes['root'],
      getTypographyUtilityClass(`color${capitalize(color)}`),
      classes[`color${capitalize(color)}`],
      typographyClasses[`align${capitalize(align)}`],
      classes[`align${capitalize(align)}`],
      typographyClasses[`display${capitalize(display)}`],
      classes[`display${capitalize(display)}`],
      getTypographyUtilityClass(variant),
      classes[variant],
      {
        [typographyClasses['gutterBottom']]: gutterBottom,
        [classes['gutterBottom']]: gutterBottom,
        [typographyClasses['noWrap']]: noWrap,
        [classes['noWrap']]: noWrap,
        [typographyClasses['paragraph']]: paragraph,
        [classes['paragraph']]: paragraph,
      },
    ),
  };
};

const Typography = React.forwardRef(function Typography(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTypography' });

  const {
    align = 'inherit',
    className,
    color = 'initial',
    component,
    display = 'initial',
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping,
    ...other
  } = props;

  const styleProps = {
    ...props,
    align,
    className,
    color,
    component,
    display,
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

  const classes = useUtilityClasses(styleProps);

  return (
    <TypographyRoot
      as={Component}
      ref={ref}
      styleProps={styleProps}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
});

Typography.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'initial'
   */
  color: PropTypes.oneOf([
    'error',
    'inherit',
    'initial',
    'primary',
    'secondary',
    'textPrimary',
    'textSecondary',
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Controls the display type
   * @default 'initial'
   */
  display: PropTypes.oneOf(['block', 'initial', 'inline']),
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
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  paragraph: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
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
