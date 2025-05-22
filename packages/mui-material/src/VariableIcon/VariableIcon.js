'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '../utils/capitalize';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getVariableIconUtilityClass } from './variableIconClasses';

export function fontSizes(theme) {
  return [
    {
      props: { fontSize: 'small' },
      style: { fontSize: theme.typography?.pxToRem?.(20) || '1.25rem' },
    },
    {
      props: { fontSize: 'medium' },
      style: { fontSize: theme.typography?.pxToRem?.(24) || '1.5rem' },
    },
    {
      props: { fontSize: 'large' },
      style: { fontSize: theme.typography?.pxToRem?.(40) || '2.5rem' },
    },
    {
      props: { fontSize: 'larger' },
      style: { fontSize: theme.typography?.pxToRem?.(48) || '3rem' },
    },
  ];
}

const useUtilityClasses = (ownerState) => {
  const { color, fontSize, classes } = ownerState;

  const slots = {
    root: [
      'root',
      color !== 'inherit' && `color${capitalize(color)}`,
      `fontSize${capitalize(fontSize)}`,
    ],
  };

  return composeClasses(slots, getVariableIconUtilityClass, classes);
};

const VariableIconRoot = styled('span', {
  name: 'MuiVariableIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.color !== 'inherit' && styles[`color${capitalize(ownerState.color)}`],
      styles[`fontSize${capitalize(ownerState.fontSize)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    flexShrink: 0,
    transition: theme.transitions?.create?.('fill', {
      duration: (theme.vars ?? theme).transitions?.duration?.shorter,
    }),
    variants: [
      {
        props: { fontSize: 'inherit' },
        style: { fontSize: 'inherit' },
      },
      ...fontSizes(theme),
      // TODO v5 deprecate color prop, v6 remove for sx
      ...Object.entries((theme.vars ?? theme).palette)
        .filter(([, value]) => value && value.main)
        .map(([color]) => ({
          props: { color },
          style: { color: (theme.vars ?? theme).palette?.[color]?.main },
        })),
      {
        props: { color: 'action' },
        style: { color: (theme.vars ?? theme).palette?.action?.active },
      },
      {
        props: { color: 'disabled' },
        style: { color: (theme.vars ?? theme).palette?.action?.disabled },
      },
      {
        props: { color: 'inherit' },
        style: { color: undefined },
      },
    ],
  })),
);

const VariableIcon = React.forwardRef(function VariableIcon(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiVariableIcon' });
  const {
    children,
    className,
    color = 'inherit',
    component = 'span',
    fontSize = 'medium',
    titleAccess,
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    fontSize,
    instanceFontSize: inProps.fontSize,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <VariableIconRoot
      as={component}
      className={clsx(classes.root, className)}
      focusable="false"
      aria-hidden={titleAccess ? undefined : true}
      role={titleAccess ? 'img' : undefined}
      aria-label={titleAccess}
      ref={ref}
      {...other}
      ownerState={ownerState}
    >
      {children}
    </VariableIconRoot>
  );
});

VariableIcon.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the icon element.
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'inherit'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'inherit',
      'action',
      'disabled',
      'primary',
      'secondary',
      'error',
      'info',
      'success',
      'warning',
    ]),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Allows increasing or decreasing emphasis.
   */
  emphasis: PropTypes.oneOf(['heavy', 'light', 'regular']),
  /**
   * Indicates if the icon should be filled.
   */
  filled: PropTypes.bool,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit', 'larger', 'large', 'medium', 'small']),
    PropTypes.string,
  ]),
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
   */
  titleAccess: PropTypes.string,
};

VariableIcon.muiName = 'SvgIcon';

export default VariableIcon;
