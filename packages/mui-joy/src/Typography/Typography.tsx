import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_extendSxProp as extendSxProp } from '@mui/system';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { TypographyTypeMap, TypographyProps } from './TypographyProps';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getTypographyUtilityClass } from './typographyClasses';

const useUtilityClasses = (ownerState: TypographyProps) => {
  const { align, gutterBottom, noWrap, paragraph, variant, level } = ownerState;

  const slots = {
    root: [
      'root',
      !level && variant,
      level,
      align && align !== 'inherit' && `align${capitalize(align)}`,
      gutterBottom && 'gutterBottom',
      noWrap && 'noWrap',
      paragraph && 'paragraph',
    ],
  };

  return composeClasses(slots, getTypographyUtilityClass, {});
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
})<{ ownerState: TypographyProps }>(({ theme, ownerState }) => ({
  margin: 0,
  // TODO: remove in the next major version
  ...(ownerState.variant &&
    ownerState.variant !== 'inherit' &&
    theme.typography[ownerState.variant]),
  // TODO: remove in the next major version
  ...(ownerState.align !== 'inherit' && {
    textAlign: ownerState.align,
  }),
  ...(ownerState.level && ownerState.level !== 'inherit' && theme.typography[ownerState.level]),
  ...(ownerState.noWrap && {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  ...(ownerState.gutterBottom && {
    marginBottom: '0.35em',
  }),
  ...(ownerState.paragraph && {
    marginBottom: 16,
  }),
}));

const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  inherit: 'p',
};

const Typography = React.forwardRef(function Typography(inProps, ref) {
  const themeProps = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiTypography',
  });

  const props = extendSxProp(themeProps);

  const {
    align = 'inherit',
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping,
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    level,
    levelMapping = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    align,
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
    ((paragraph
      ? 'p'
      : levelMapping[level || variant] ||
        variantMapping[level || variant] ||
        defaultVariantMapping[level || variant] ||
        'span') as React.ElementType);

  const classes = useUtilityClasses(ownerState);

  return (
    <TypographyRoot
      as={Component}
      ref={ref}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
}) as OverridableComponent<TypographyTypeMap>;

Typography.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   * @deprecated use `sx` prop instead. <Typography sx={{ textAlign: 'center' }} />
   */
  align: PropTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),
  /**
   * The content of the component.
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
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: PropTypes.bool,
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  level: PropTypes.oneOf([
    'body1',
    'body2',
    'body3',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'inherit',
  ]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, body1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   body3: 'p',
   *   inherit: 'p',
   * }
   */
  levelMapping: PropTypes.shape({
    body1: PropTypes.string,
    body2: PropTypes.string,
    body3: PropTypes.string,
    h1: PropTypes.string,
    h2: PropTypes.string,
    h3: PropTypes.string,
    h4: PropTypes.string,
    h5: PropTypes.string,
    h6: PropTypes.string,
    inherit: PropTypes.string,
  }),
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
   * @deprecated use `component` prop instead.
   */
  paragraph: PropTypes.bool,
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   * @deprecated use `level` prop instead.
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
   * For instance, body1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   body3: 'p',
   *   inherit: 'p',
   * }
   * @deprecated use `levelMapping` prop instead.
   */
  variantMapping: PropTypes /* @typescript-to-proptypes-ignore */.object,
} as any;

export default Typography;
