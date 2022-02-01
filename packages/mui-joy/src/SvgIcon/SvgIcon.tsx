import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getSvgIconUtilityClass } from './svgIconClasses';
import { SvgIconProps, SvgIconTypeMap } from './SvgIconProps';

const useUtilityClasses = (ownerState: SvgIconProps) => {
  const { color, fontSize, classes } = ownerState;

  const slots = {
    root: [
      'root',
      color && `color${capitalize(color)}`,
      fontSize && `fontSize${capitalize(fontSize)}`,
    ],
  };

  return composeClasses(slots, getSvgIconUtilityClass, classes);
};

const SvgIconRoot = styled('svg', {
  name: 'MuiSvgIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SvgIconProps }>(({ theme, ownerState }) => {
  return [
    {
      userSelect: 'none',
      width: '1em',
      height: '1em',
      display: 'inline-block',
      fill: 'currentColor',
      flexShrink: 0,
      transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      fontSize:
        ownerState.fontSize !== 'inherit' ? theme.vars.fontSize[ownerState.fontSize!] : 'inherit',
      color:
        ownerState.color !== 'inherit' && theme.vars.palette[ownerState.color!]
          ? theme.vars.palette[ownerState.color!].textColor
          : 'inherit',
    },
  ];
});

const SvgIcon = React.forwardRef(function SvgIcon(inProps, ref) {
  const props = useThemeProps<typeof inProps & SvgIconProps>({
    props: inProps,
    name: 'MuiSvgIcon',
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
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    fontSize,
    inheritViewBox,
    viewBox,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <SvgIconRoot
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      focusable="false"
      color={htmlColor}
      aria-hidden={titleAccess ? undefined : true}
      role={titleAccess ? 'img' : undefined}
      ref={ref}
      {...other}
      {...(!inheritViewBox && { viewBox })}
    >
      {children}
      {titleAccess ? <title>{titleAccess}</title> : null}
    </SvgIconRoot>
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
  color: PropTypes.oneOf(['danger', 'info', 'inherit', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 1rem, but can be configure to inherit font size.
   * @default 'md'
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
    'xs',
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
