import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { componentPropType, chainPropTypes } from '@material-ui/utils';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    margin: 0,
  },
  /* Styles applied to the root element if `variant="display4"`. */
  display4: theme.typography.display4,
  /* Styles applied to the root element if `variant="display3"`. */
  display3: theme.typography.display3,
  /* Styles applied to the root element if `variant="display2"`. */
  display2: theme.typography.display2,
  /* Styles applied to the root element if `variant="display1"`. */
  display1: theme.typography.display1,
  /* Styles applied to the root element if `variant="headline"`. */
  headline: theme.typography.headline,
  /* Styles applied to the root element if `variant="title"`. */
  title: theme.typography.title,
  /* Styles applied to the root element if `variant="subheading"`. */
  subheading: theme.typography.subheading,
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
  /* Styles applied to the root element if `align="nowrap"`. */
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
  /* Styles applied to the root element if `inline={true}`. */
  inline: {
    display: 'inline',
  },
});

const nextVariants = {
  display4: 'h1',
  display3: 'h2',
  display2: 'h3',
  display1: 'h4',
  headline: 'h5',
  title: 'h6',
  subheading: 'subtitle1',
};

function getVariant(theme, variantProp) {
  const typography = theme.typography;
  let variant = variantProp;

  if (!variant) {
    variant = typography.useNextVariants ? 'body2' : 'body1';
  }

  // complete v2 switch
  if (typography.useNextVariants) {
    variant = nextVariants[variant] || variant;
  }

  return variant;
}

const defaultHeadlineMapping = {
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
  // deprecated
  display4: 'h1',
  display3: 'h1',
  display2: 'h1',
  display1: 'h1',
  headline: 'h1',
  title: 'h2',
  subheading: 'h3',
};

function Typography(props) {
  const {
    align,
    classes,
    className: classNameProp,
    color,
    component: componentProp,
    gutterBottom,
    headlineMapping,
    inline,
    internalDeprecatedVariant,
    noWrap,
    paragraph,
    theme,
    variant: variantProp,
    ...other
  } = props;

  const variant = getVariant(theme, variantProp);
  const className = clsx(
    classes.root,
    {
      [classes[variant]]: variant !== 'inherit',
      [classes[`color${capitalize(color)}`]]: color !== 'default',
      [classes.noWrap]: noWrap,
      [classes.gutterBottom]: gutterBottom,
      [classes.paragraph]: paragraph,
      [classes[`align${capitalize(align)}`]]: align !== 'inherit',
      [classes.inline]: inline,
    },
    classNameProp,
  );

  const Component =
    componentProp ||
    (paragraph ? 'p' : headlineMapping[variant] || defaultHeadlineMapping[variant]) ||
    'span';

  return <Component className={className} {...other} />;
}

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
   * See [CSS API](#css-api) below for more details.
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
    'default',
    'error',
    'inherit',
    'primary',
    'secondary',
    'textPrimary',
    'textSecondary',
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default, it maps the variant to a good default headline component.
   */
  component: componentPropType,
  /**
   * If `true`, the text will have a bottom margin.
   */
  gutterBottom: PropTypes.bool,
  /**
   * We are empirically mapping the variant property to a range of different DOM element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` property.
   * The default mapping is the following:
   */
  headlineMapping: PropTypes.object,
  /**
   *  Controls whether the Typography is inline or not.
   */
  inline: PropTypes.bool,
  /**
   * A deprecated variant is used from an internal component. Users don't need
   * a deprecation warning here if they switched to the v2 theme. They already
   * get the mapping that will be applied in the next major release.
   *
   * @internal
   */
  internalDeprecatedVariant: PropTypes.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with an ellipsis.
   */
  noWrap: PropTypes.bool,
  /**
   * If `true`, the text will have a bottom margin.
   */
  paragraph: PropTypes.bool,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * Applies the theme typography styles.
   * Use `body1` as the default value with the legacy implementation and `body2` with the new one.
   */
  variant: chainPropTypes(
    PropTypes.oneOf([
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
      // deprecated
      'display4',
      'display3',
      'display2',
      'display1',
      'headline',
      'title',
      'subheading',
    ]),
    props => {
      const deprecatedVariants = [
        'display4',
        'display3',
        'display2',
        'display1',
        'headline',
        'title',
        'subheading',
      ];
      if (
        props.theme.typography.useNextVariants &&
        !props.internalDeprecatedVariant &&
        deprecatedVariants.indexOf(props.variant) !== -1
      ) {
        return new Error(
          'Material-UI: you are using a deprecated typography variant: ' +
            `\`${props.variant}\` that will be removed in the next major release.\n` +
            'Please read the migration guide under https://material-ui.com/style/typography#migration-to-typography-v2.',
        );
      }

      return null;
    },
  ),
};

Typography.defaultProps = {
  align: 'inherit',
  color: 'default',
  gutterBottom: false,
  headlineMapping: defaultHeadlineMapping,
  inline: false,
  noWrap: false,
  paragraph: false,
};

export default withStyles(styles, { name: 'MuiTypography', withTheme: true })(Typography);
