import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    margin: 0,
  },
  /* Styles applied to the root element if `variant="body2"`. */
  body2: theme.typography.body2,
  /* Styles applied to the root element if `variant="body1"`. */
  body1: theme.typography.body1,
  /* Styles applied to the root element if `variant="caption"`. */
  caption: theme.typography.caption,
  /* Styles applied to the root element if `variant="button"`. */
  button: theme.typography.button,
  /* Styles applied to the root element if `variant="h1"`. */
  h1: theme.typography.h1,
  /* Styles applied to the root element if `variant="h2"`. */
  h2: theme.typography.h2,
  /* Styles applied to the root element if `variant="h3"`. */
  h3: theme.typography.h3,
  /* Styles applied to the root element if `variant="h4"`. */
  h4: theme.typography.h4,
  /* Styles applied to the root element if `variant="h5"`. */
  h5: theme.typography.h5,
  /* Styles applied to the root element if `variant="h6"`. */
  h6: theme.typography.h6,
  /* Styles applied to the root element if `variant="subtitle1"`. */
  subtitle1: theme.typography.subtitle1,
  /* Styles applied to the root element if `variant="subtitle2"`. */
  subtitle2: theme.typography.subtitle2,
  /* Styles applied to the root element if `variant="overline"`. */
  overline: theme.typography.overline,
  /* Styles applied to the root element if `variant="srOnly"`. Only accessible to screen readers. */
  srOnly: {
    position: 'absolute',
    height: 1,
    width: 1,
    overflow: 'hidden',
  },
  /* Styles applied to the root element if `align="left"`. */
  alignLeft: {
    textAlign: 'left',
  },
  /* Styles applied to the root element if `align="center"`. */
  alignCenter: {
    textAlign: 'center',
  },
  /* Styles applied to the root element if `align="right"`. */
  alignRight: {
    textAlign: 'right',
  },
  /* Styles applied to the root element if `align="justify"`. */
  alignJustify: {
    textAlign: 'justify',
  },
  /* Styles applied to the root element if `nowrap={true}`. */
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  /* Styles applied to the root element if `gutterBottom={true}`. */
  gutterBottom: {
    marginBottom: '0.35em',
  },
  /* Styles applied to the root element if `paragraph={true}`. */
  paragraph: {
    marginBottom: 16,
  },
  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: 'inherit',
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  /* Styles applied to the root element if `color="textPrimary"`. */
  colorTextPrimary: {
    color: theme.palette.text.primary,
  },
  /* Styles applied to the root element if `color="textSecondary"`. */
  colorTextSecondary: {
    color: theme.palette.text.secondary,
  },
  /* Styles applied to the root element if `color="error"`. */
  colorError: {
    color: theme.palette.error.main,
  },
  /* Styles applied to the root element if `display="inline"`. */
  displayInline: {
    display: 'inline',
  },
  /* Styles applied to the root element if `display="block"`. */
  displayBlock: {
    display: 'block',
  },
});

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
};

const Typography = React.forwardRef(function Typography(props, ref) {
  const {
    align = 'inherit',
    classes,
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

  const Component =
    component ||
    (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) ||
    'span';

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes[variant]]: variant !== 'inherit',
          [classes[`color${capitalize(color)}`]]: color !== 'initial',
          [classes.noWrap]: noWrap,
          [classes.gutterBottom]: gutterBottom,
          [classes.paragraph]: paragraph,
          [classes[`align${capitalize(align)}`]]: align !== 'inherit',
          [classes[`display${capitalize(display)}`]]: display !== 'initial',
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

Typography.propTypes = {
  /**
   * Set the text-align on the component.
   */
  align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf([
    'initial',
    'inherit',
    'primary',
    'secondary',
    'textPrimary',
    'textSecondary',
    'error',
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   * Overrides the behavior of the `variantMapping` prop.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * Controls the display type
   */
  display: PropTypes.oneOf(['initial', 'block', 'inline']),
  /**
   * If `true`, the text will have a bottom margin.
   */
  gutterBottom: PropTypes.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   */
  noWrap: PropTypes.bool,
  /**
   * If `true`, the text will have a bottom margin.
   */
  paragraph: PropTypes.bool,
  /**
   * Applies the theme typography styles.
   */
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'button',
    'overline',
    'srOnly',
    'inherit',
  ]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   */
  variantMapping: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiTypography' })(Typography);
