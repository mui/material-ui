'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import useThemeProps from '../styles/useThemeProps';
import useSlot from '../utils/useSlot';
import styled from '../styles/styled';
import { getAspectRatioUtilityClass } from './aspectRatioClasses';
import { AspectRatioProps, AspectRatioOwnerState, AspectRatioTypeMap } from './AspectRatioProps';

const useUtilityClasses = (ownerState: AspectRatioOwnerState) => {
  const { variant, color } = ownerState;
  const slots = {
    root: ['root'],
    content: [
      'content',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getAspectRatioUtilityClass, {});
};

// Use to control the width of the content, usually in a flexbox row container
const AspectRatioRoot = styled('div', {
  name: 'JoyAspectRatio',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AspectRatioOwnerState }>(({ ownerState, theme }) => {
  const minHeight =
    typeof ownerState.minHeight === 'number' ? `${ownerState.minHeight}px` : ownerState.minHeight;
  const maxHeight =
    typeof ownerState.maxHeight === 'number' ? `${ownerState.maxHeight}px` : ownerState.maxHeight;
  return {
    // a context variable for any child component
    '--AspectRatio-paddingBottom': `clamp(var(--AspectRatio-minHeight), calc(100% / (${ownerState.ratio})), var(--AspectRatio-maxHeight))`,
    '--AspectRatio-maxHeight': maxHeight || '9999px',
    '--AspectRatio-minHeight': minHeight || '0px',
    '--Icon-color':
      ownerState.color !== 'neutral' || ownerState.variant === 'solid'
        ? 'currentColor'
        : theme.vars.palette.text.icon,
    borderRadius: 'var(--AspectRatio-radius)',
    display: ownerState.flex ? 'flex' : 'block',
    flex: ownerState.flex ? 1 : 'initial',
    flexDirection: 'column',
    margin: 'var(--AspectRatio-margin)',
  };
});

const AspectRatioContent = styled('div', {
  name: 'JoyAspectRatio',
  slot: 'Content',
  overridesResolver: (props, styles) => styles.content,
})<{ ownerState: AspectRatioOwnerState }>(({ theme, ownerState }) => ({
  flex: 1,
  position: 'relative',
  borderRadius: 'inherit',
  height: 0,
  paddingBottom: 'calc(var(--AspectRatio-paddingBottom) - 2 * var(--variant-borderWidth, 0px))',
  overflow: 'hidden',
  transition: 'inherit', // makes it easy to add transition to the content
  // use data-attribute instead of :first-child to support zero config SSR (emotion)
  // use nested selector for integrating with nextjs image `fill` layout (spans are inserted on top of the img)
  '& [data-first-child]': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: ownerState.objectFit,
    margin: 0,
    padding: 0,
    '& > img': {
      // support art-direction that uses <picture><img /></picture>
      width: '100%',
      height: '100%',
      objectFit: ownerState.objectFit,
    },
  },
  ...theme.typography['body-md'],
  ...theme.variants[ownerState.variant!]?.[ownerState.color!],
}));

/**
 *
 * Demos:
 *
 * - [Aspect Ratio](https://mui.com/joy-ui/react-aspect-ratio/)
 * - [Skeleton](https://mui.com/joy-ui/react-skeleton/)
 *
 * API:
 *
 * - [AspectRatio API](https://mui.com/joy-ui/api/aspect-ratio/)
 */
const AspectRatio = React.forwardRef(function AspectRatio(inProps, ref) {
  const props = useThemeProps<typeof inProps & AspectRatioProps>({
    props: inProps,
    name: 'JoyAspectRatio',
  });

  const {
    children,
    ratio = '16 / 9',
    minHeight,
    maxHeight,
    objectFit = 'cover',
    color = 'neutral',
    variant = 'soft',
    component,
    flex = false,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    flex,
    minHeight,
    maxHeight,
    objectFit,
    ratio,
    color,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: AspectRatioRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotContent, contentProps] = useSlot('content', {
    className: classes.content,
    elementType: AspectRatioContent,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      <SlotContent {...contentProps}>
        {React.Children.map(children, (child, index) =>
          index === 0 && React.isValidElement(child)
            ? React.cloneElement(child, { 'data-first-child': '' } as Record<string, string>)
            : child,
        )}
      </SlotContent>
    </SlotRoot>
  );
}) as OverridableComponent<AspectRatioTypeMap>;

AspectRatio.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Used to render icon or text elements inside the AspectRatio if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * By default, the AspectRatio will maintain the aspect ratio of its content.
   * Set this prop to `true` when the container is a flex row and you want the AspectRatio to fill the height of its container.
   * @default false
   */
  flex: PropTypes.bool,
  /**
   * The maximum calculated height of the element (not the CSS height).
   */
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The minimum calculated height of the element (not the CSS height).
   */
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The CSS object-fit value of the first-child.
   * @default 'cover'
   */
  objectFit: PropTypes.oneOf([
    '-moz-initial',
    'contain',
    'cover',
    'fill',
    'inherit',
    'initial',
    'none',
    'revert-layer',
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
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    content: PropTypes.elementType,
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
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default AspectRatio;
