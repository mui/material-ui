import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useSlot from '../utils/useSlot';
import { getSvgIconUtilityClass } from './svgIconClasses';
import { SvgIconProps, SvgIconTypeMap, SvgIconOwnerState } from './SvgIconProps';

const useUtilityClasses = (ownerState: SvgIconOwnerState) => {
  const { color, fontSize } = ownerState;

  const slots = {
    root: [
      'root',
      color && `color${capitalize(color)}`,
      fontSize && `fontSize${capitalize(fontSize)}`,
    ],
  };

  return composeClasses(slots, getSvgIconUtilityClass, {});
};

const SvgIconRoot = styled('svg', {
  name: 'JoySvgIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SvgIconOwnerState }>(({ theme, ownerState }) => ({
  ...(ownerState.instanceFontSize &&
    ownerState.instanceFontSize !== 'inherit' && {
      '--Icon-fontSize': theme.vars.fontSize[ownerState.instanceFontSize],
    }),
  userSelect: 'none',
  margin: 'var(--Icon-margin)',
  width: '1em',
  height: '1em',
  display: 'inline-block',
  fill: 'currentColor',
  flexShrink: 0,
  ...(ownerState.fontSize &&
    ownerState.fontSize !== 'inherit' && {
      fontSize: `var(--Icon-fontSize, ${theme.fontSize[ownerState.fontSize]})`,
    }),
  color: 'var(--Icon-color)',
  ...(ownerState.color !== 'inherit' &&
    ownerState.color !== 'context' &&
    theme.vars.palette[ownerState.color!] && {
      color: theme.vars.palette[ownerState.color!].plainColor,
    }),
  ...(ownerState.color === 'context' && {
    color: theme.variants.plain?.[ownerState.color!]?.color,
  }),
}));
/**
 *
 * Demos:
 *
 * - [Avatar](https://mui.com/joy-ui/react-avatar/)
 *
 * API:
 *
 * - [SvgIcon API](https://mui.com/joy-ui/api/svg-icon/)
 */
const SvgIcon = React.forwardRef(function SvgIcon(inProps, ref) {
  const props = useThemeProps<typeof inProps & SvgIconProps>({
    props: inProps,
    name: 'JoySvgIcon',
  });

  const {
    children,
    className,
    color = 'inherit',
    component = 'svg',
    fontSize = 'xl',
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = '0 0 24 24',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    fontSize,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: SvgIconRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      color: htmlColor,
      focusable: false,
      ...(titleAccess && { role: 'img' }),
      ...(!titleAccess && { 'aria-hidden': true }),
      ...(!inheritViewBox && { viewBox }),
    },
  });

  return (
    <SlotRoot {...rootProps}>
      {children}
      {titleAccess ? <title>{titleAccess}</title> : null}
    </SlotRoot>
  );
}) as OverridableComponent<SvgIconTypeMap>;

SvgIcon.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Node passed into the SVG element.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'inherit', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 1rem, but can be configure to inherit font size.
   * @default 'xl'
   */
  fontSize: PropTypes.oneOf([
    'inherit',
    'lg',
    'md',
    'sm',
    'xl',
    'xl2',
    'xl3',
    'xl4',
    'xl5',
    'xl6',
    'xl7',
    'xs',
    'xs2',
    'xs3',
  ]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: PropTypes.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: PropTypes.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
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
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: PropTypes.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: PropTypes.string,
} as any;

export default SvgIcon;
