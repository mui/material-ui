'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_isMuiElement as isMuiElement,
} from '@mui/utils';
import { unstable_extendSxProp as extendSxProp } from '@mui/system';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { TypographyTypeMap, TypographyProps, TypographyOwnerState } from './TypographyProps';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useSlot from '../utils/useSlot';
import { getTypographyUtilityClass } from './typographyClasses';
import { TypographySystem } from '../styles/types';

/**
 * @internal
 * For creating nested Typography to have inherit level (unless an explicit `level` prop is provided)
 * and change the HTML tag to `span` (unless an explicit `component` prop is provided).
 */
export const TypographyNestedContext = React.createContext(false);

if (process.env.NODE_ENV !== 'production') {
  TypographyNestedContext.displayName = 'TypographyNestedContext';
}

/**
 * @internal
 * Typography's level will be inherit within this context unless an explicit `level` prop is provided.
 *
 * This is used in components, for example Table, to inherit the parent's size by default.
 */
export const TypographyInheritContext = React.createContext(false);

if (process.env.NODE_ENV !== 'production') {
  TypographyInheritContext.displayName = 'TypographyInheritContext';
}

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
})<{ ownerState: TypographyOwnerState }>({
  display: 'inline-flex',
  marginInlineEnd: 'clamp(4px, var(--Typography-gap, 0.375em), 0.75rem)',
});

const EndDecorator = styled('span', {
  name: 'JoyTypography',
  slot: 'endDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: TypographyOwnerState }>({
  display: 'inline-flex',
  marginInlineStart: 'clamp(4px, var(--Typography-gap, 0.375em), 0.75rem)',
});

const TypographyRoot = styled('span', {
  name: 'JoyTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TypographyOwnerState }>(({ theme, ownerState }) => {
  const lineHeight =
    ownerState.level !== 'inherit' ? theme.typography[ownerState.level!]?.lineHeight : '1';
  return {
    '--Icon-fontSize': `calc(1em * ${lineHeight})`,
    ...(ownerState.color && {
      '--Icon-color': 'currentColor',
    }),
    margin: 'var(--Typography-margin, 0px)',
    ...(ownerState.nesting
      ? {
          display: 'inline', // looks better than `inline-block` when using with `variant` prop.
        }
      : {
          display: 'block', // don't rely on user agent, always `block`.
          ...(ownerState.unstable_hasSkeleton && {
            position: 'relative',
          }),
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
    fontSize: `var(--Typography-fontSize, ${
      ownerState.level && ownerState.level !== 'inherit'
        ? (theme.typography[ownerState.level]?.fontSize ?? 'inherit')
        : 'inherit'
    })`,
    ...(ownerState.noWrap && {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    ...(ownerState.gutterBottom && {
      marginBottom: '0.35em',
    }),
    ...(ownerState.color && {
      color: `var(--variant-plainColor, rgba(${
        theme.vars.palette[ownerState.color]?.mainChannel
      } / 1))`,
    }),
    ...(ownerState.variant && {
      borderRadius: theme.vars.radius.xs,
      paddingBlock: 'min(0.1em, 4px)',
      paddingInline: '0.25em', // better than left, right because it also works with writing mode.
      ...(!ownerState.nesting && {
        marginInline: '-0.25em',
      }),
      ...theme.variants[ownerState.variant]?.[ownerState.color!],
    }),
  };
});

const defaultVariantMapping: Partial<Record<keyof TypographySystem | 'inherit', string>> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  'title-lg': 'p',
  'title-md': 'p',
  'title-sm': 'p',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  'body-xs': 'span',
  inherit: 'p',
};
/**
 *
 * Demos:
 *
 * - [Skeleton](https://mui.com/joy-ui/react-skeleton/)
 * - [Typography](https://mui.com/joy-ui/react-typography/)
 *
 * API:
 *
 * - [Typography API](https://mui.com/joy-ui/api/typography/)
 */
const Typography = React.forwardRef(function Typography(inProps, ref) {
  const {
    color: colorProp,
    textColor,
    ...themeProps
  } = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyTypography',
  });

  const nesting = React.useContext(TypographyNestedContext);
  const inheriting = React.useContext(TypographyInheritContext);

  const props = extendSxProp({ ...themeProps, color: textColor }) as TypographyProps;

  const {
    component: componentProp,
    gutterBottom = false,
    noWrap = false,
    level: levelProp = 'body-md',
    levelMapping = defaultVariantMapping,
    children,
    endDecorator,
    startDecorator,
    variant,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const color = inProps.color ?? (variant ? (colorProp ?? 'neutral') : colorProp);

  const level = nesting || inheriting ? inProps.level || 'inherit' : levelProp;

  const hasSkeleton = isMuiElement(children, ['Skeleton']);
  const component =
    componentProp ||
    ((nesting
      ? 'span'
      : levelMapping[level] || defaultVariantMapping[level] || 'span') as React.ElementType);

  const ownerState = {
    ...props,
    level,
    component,
    color,
    gutterBottom,
    noWrap,
    nesting,
    variant,
    unstable_hasSkeleton: hasSkeleton,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: TypographyRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: StartDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: EndDecorator,
    externalForwardedProps,
    ownerState,
  });

  return (
    <TypographyNestedContext.Provider value>
      <SlotRoot {...rootProps}>
        {startDecorator && (
          <SlotStartDecorator {...startDecoratorProps}>{startDecorator}</SlotStartDecorator>
        )}

        {hasSkeleton
          ? React.cloneElement(children as React.ReactElement<any>, {
              variant: (children as React.ReactElement<any>).props.variant || 'inline',
            })
          : children}
        {endDecorator && <SlotEndDecorator {...endDecoratorProps}>{endDecorator}</SlotEndDecorator>}
      </SlotRoot>
    </TypographyNestedContext.Provider>
  );
}) as OverridableComponent<TypographyTypeMap>;

Typography.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
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
   * @default 'body-md'
   */
  level: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'h1',
      'h2',
      'h3',
      'h4',
      'title-lg',
      'title-md',
      'title-sm',
      'body-lg',
      'body-md',
      'body-sm',
      'body-xs',
      'inherit',
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
   *   'title-lg': 'p',
   *   'title-md': 'p',
   *   'title-sm': 'p',
   *   'body-lg': 'p',
   *   'body-md': 'p',
   *   'body-sm': 'p',
   *   'body-xs': 'span',
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
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    endDecorator: PropTypes.elementType,
    root: PropTypes.elementType,
    startDecorator: PropTypes.elementType,
  }),
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
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

// @ts-ignore internal logic to let communicate with Breadcrumbs
Typography.muiName = 'Typography';

export default Typography;
