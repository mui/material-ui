import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_extendSxProp as extendSxProp } from '@mui/system';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import { TypographyTypeMap, TypographyProps, TypographyOwnerState } from './TypographyProps';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getTypographyUtilityClass } from './typographyClasses';

export const TypographyContext = React.createContext(false);

const useUtilityClasses = (ownerState: TypographyOwnerState) => {
  const { gutterBottom, noWrap, level, color, variant } = ownerState;

  const slots = {
    root: [
      'root',
      level,
      gutterBottom && 'gutterBottom',
      noWrap && 'noWrap',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getTypographyUtilityClass, {});
};

const StartDecorator = styled('span', {
  name: 'JoyTypography',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: TypographyOwnerState }>(({ ownerState }) => ({
  display: 'inline-flex',
  marginInlineEnd: 'min(var(--Typography-gap, 0.25em), 0.5rem)',
  ...((ownerState.sx as any)?.alignItems === 'flex-start' && {
    marginTop: '2px', // this makes the alignment perfect in most cases
  }),
}));

const EndDecorator = styled('span', {
  name: 'JoyTypography',
  slot: 'endDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: TypographyOwnerState }>(({ ownerState }) => ({
  display: 'inline-flex',
  marginInlineStart: 'min(var(--Typography-gap, 0.25em), 0.5rem)',
  ...((ownerState.sx as any)?.alignItems === 'flex-start' && {
    marginTop: '2px', // this makes the alignment perfect in most cases
  }),
}));

const TypographyRoot = styled('span', {
  name: 'JoyTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TypographyOwnerState }>(({ theme, ownerState }) => ({
  '--Icon-fontSize': '1.25em',
  margin: 0,
  ...(ownerState.nesting
    ? {
        display: 'inline',
      }
    : {
        fontFamily: theme.vars.fontFamily.body, // for nested typography, the font family will be inherited.
        display: 'block',
      }),
  ...((ownerState.startDecorator || ownerState.endDecorator) && {
    display: 'flex',
    alignItems: 'center',
    ...(ownerState.nesting && {
      display: 'inline-flex',
      ...(ownerState.startDecorator && {
        verticalAlign: 'bottom', // to make the text align with the parent's content
      }),
    }),
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
  ...(ownerState.variant && {
    borderRadius: theme.vars.radius.xs,
    paddingInline: '0.25em', // better than left, right because it also works with writing mode.
    ...(!ownerState.nesting && {
      marginInline: '-0.25em',
    }),
    ...theme.variants[ownerState.variant]?.[ownerState.color!],
  }),
}));

const defaultVariantMapping: Record<string, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  display1: 'h1',
  display2: 'h2',
  body1: 'p',
  body2: 'p',
  body3: 'span',
  body4: 'span',
  body5: 'span',
  inherit: 'p',
};

const Typography = React.forwardRef(function Typography(inProps, ref) {
  const {
    color: colorThemeProp,
    textColor,
    ...themeProps
  } = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyTypography',
  });

  const nesting = React.useContext(TypographyContext);

  const props = extendSxProp({ ...themeProps, color: textColor }) as TypographyProps;

  const {
    component: componentProp,
    componentsProps = {},
    gutterBottom = false,
    noWrap = false,
    level: levelProp = 'body1',
    levelMapping = {},
    children,
    endDecorator,
    startDecorator,
    variant = colorThemeProp ? 'plain' : undefined,
    ...other
  } = props;

  const color = colorThemeProp || (variant ? 'neutral' : undefined);

  const level = nesting ? inProps.level || 'inherit' : levelProp;

  const component = (componentProp ||
    (nesting
      ? 'span'
      : levelMapping[level] || defaultVariantMapping[level] || 'span')) as React.ElementType;

  const ownerState = {
    ...props,
    level,
    component,
    color,
    gutterBottom,
    noWrap,
    nesting,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: TypographyRoot,
    externalSlotProps: componentsProps.root,
    ownerState,
    additionalProps: {
      ref,
      as: component,
    },
    externalForwardedProps: other,
    className: classes.root,
  });

  const startDecoratorProps = useSlotProps({
    elementType: StartDecorator,
    externalSlotProps: componentsProps.startDecorator,
    ownerState,
    className: classes.startDecorator,
  });

  const endDecoratorProps = useSlotProps({
    elementType: EndDecorator,
    externalSlotProps: componentsProps.endDecorator,
    ownerState,
    className: classes.endDecorator,
  });

  return (
    <TypographyContext.Provider value>
      <TypographyRoot {...rootProps}>
        {startDecorator && (
          <StartDecorator {...startDecoratorProps}>{startDecorator}</StartDecorator>
        )}

        {children}
        {endDecorator && <EndDecorator {...endDecoratorProps}>{endDecorator}</EndDecorator>}
      </TypographyRoot>
    </TypographyContext.Provider>
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
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
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
   * Element placed after the children.
   */
  endDecorator: PropTypes.node,
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
  /**
   * Element placed before the children.
   */
  startDecorator: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The system color.
   */
  textColor: PropTypes /* @typescript-to-proptypes-ignore */.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default Typography;
