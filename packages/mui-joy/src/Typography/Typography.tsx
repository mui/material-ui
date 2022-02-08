import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_extendSxProp as extendSxProp } from '@mui/system';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { TypographyTypeMap, TypographyProps } from './TypographyProps';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getTypographyUtilityClass } from './typographyClasses';

const useUtilityClasses = (ownerState: TypographyProps) => {
  const { gutterBottom, noWrap, level } = ownerState;

  const slots = {
    root: ['root', level, gutterBottom && 'gutterBottom', noWrap && 'noWrap'],
  };

  return composeClasses(slots, getTypographyUtilityClass, {});
};

export const TypographyRoot = styled('span', {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TypographyProps }>(({ theme, ownerState }) => ({
  margin: 0,
  ...(ownerState.level && ownerState.level !== 'inherit' && theme.typography[ownerState.level]),
  ...(ownerState.noWrap && {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  ...(ownerState.gutterBottom && {
    marginBottom: '0.35em',
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
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    level = 'body1',
    levelMapping = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    level,
    className,
    component,
    gutterBottom,
    noWrap,
  };

  const Component = component || levelMapping[level] || defaultVariantMapping[level] || 'span';

  const classes = useUtilityClasses(ownerState);

  return (
    <TypographyRoot
      as={Component as React.ElementType}
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
  level: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['body1', 'body2', 'body3', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit']),
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
   */
  levelMapping: PropTypes /* @typescript-to-proptypes-ignore */.object,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: PropTypes.bool,
} as any;

export default Typography;
