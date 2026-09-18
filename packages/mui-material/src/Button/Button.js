'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveProps from '@mui/utils/resolveProps';
import memoTheme from '../utils/memoTheme';
import createStyledSlots from '../utils/createStyledSlots';
import createAppearance, { prefixed, bare, whenTrue } from '../utils/createAppearance';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { getTransitionStyles } from '../transitions/utils';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { useDefaultProps } from '../DefaultPropsProvider';
import ButtonGroupContext from '../ButtonGroup/ButtonGroupContext';
import ButtonGroupButtonContext from '../ButtonGroup/ButtonGroupButtonContext';
import ButtonSurface from '../ButtonBase/ButtonSurface';
import CircularProgress from '../CircularProgress';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';
import buttonSlots from './unstyled/buttonSlots';
import ButtonUnstyled from './unstyled/ButtonUnstyled';

// Shared by the two icon slots, and referenced from their style bodies.
const commonIconStyles = [
  { props: { size: 'small' }, style: { '& > *:nth-of-type(1)': { fontSize: 18 } } },
  { props: { size: 'medium' }, style: { '& > *:nth-of-type(1)': { fontSize: 20 } } },
  { props: { size: 'large' }, style: { '& > *:nth-of-type(1)': { fontSize: 22 } } },
];

// The Material Design styles, unchanged.
const styles = {
  root: memoTheme(({ theme }) => {
    const inheritContainedBackgroundColor =
      theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800];

    const inheritContainedHoverBackgroundColor =
      theme.palette.mode === 'light' ? theme.palette.grey.A100 : theme.palette.grey[700];
    return {
      ...theme.typography.button,
      minWidth: 64,
      padding: '6px 16px',
      border: 0,
      borderRadius: (theme.vars || theme).shape.borderRadius,
      ...getTransitionStyles(theme, ['background-color', 'box-shadow', 'border-color', 'color'], {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': {
        textDecoration: 'none',
      },
      [`&.${buttonClasses.disabled}`]: {
        color: (theme.vars || theme).palette.action.disabled,
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: `var(--variant-containedColor)`,
            backgroundColor: `var(--variant-containedBg)`,
            boxShadow: (theme.vars || theme).shadows[2],
            '&:hover': {
              boxShadow: (theme.vars || theme).shadows[4],
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                boxShadow: (theme.vars || theme).shadows[2],
              },
            },
            '&:active': {
              boxShadow: (theme.vars || theme).shadows[8],
            },
            [`&.${buttonClasses.focusVisible}`]: {
              ...theme.focusVisible,
              boxShadow: theme.focusVisible?.boxShadow
                ? `${(theme.vars || theme).shadows[6]}, ${theme.focusVisible.boxShadow}`
                : (theme.vars || theme).shadows[6],
            },
            [`&.${buttonClasses.disabled}`]: {
              color: (theme.vars || theme).palette.action.disabled,
              boxShadow: (theme.vars || theme).shadows[0],
              backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            padding: '5px 15px',
            border: '1px solid currentColor',
            borderColor: `var(--variant-outlinedBorder, currentColor)`,
            backgroundColor: `var(--variant-outlinedBg)`,
            color: `var(--variant-outlinedColor)`,
            [`&.${buttonClasses.disabled}`]: {
              border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            padding: '6px 8px',
            color: `var(--variant-textColor)`,
            backgroundColor: `var(--variant-textBg)`,
          },
        },
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color },
            style: {
              '--variant-textColor': (theme.vars || theme).palette[color].main,
              '--variant-outlinedColor': (theme.vars || theme).palette[color].main,
              '--variant-outlinedBorder': theme.alpha(
                (theme.vars || theme).palette[color].main,
                0.5,
              ),
              '--variant-containedColor': (theme.vars || theme).palette[color].contrastText,
              '--variant-containedBg': (theme.vars || theme).palette[color].main,
              '@media (hover: hover)': {
                '&:hover': {
                  '--variant-containedBg': (theme.vars || theme).palette[color].dark,
                  '--variant-textBg': theme.alpha(
                    (theme.vars || theme).palette[color].main,
                    (theme.vars || theme).palette.action.hoverOpacity,
                  ),
                  '--variant-outlinedBorder': (theme.vars || theme).palette[color].main,
                  '--variant-outlinedBg': theme.alpha(
                    (theme.vars || theme).palette[color].main,
                    (theme.vars || theme).palette.action.hoverOpacity,
                  ),
                },
              },
            },
          })),
        {
          props: {
            color: 'inherit',
          },
          style: {
            color: 'inherit',
            borderColor: 'currentColor',
            '--variant-containedBg': theme.vars
              ? theme.vars.palette.Button.inheritContainedBg
              : inheritContainedBackgroundColor,
            '@media (hover: hover)': {
              '&:hover': {
                '--variant-containedBg': theme.vars
                  ? theme.vars.palette.Button.inheritContainedHoverBg
                  : inheritContainedHoverBackgroundColor,
                '--variant-textBg': theme.alpha(
                  (theme.vars || theme).palette.text.primary,
                  (theme.vars || theme).palette.action.hoverOpacity,
                ),
                '--variant-outlinedBg': theme.alpha(
                  (theme.vars || theme).palette.text.primary,
                  (theme.vars || theme).palette.action.hoverOpacity,
                ),
              },
            },
          },
        },
        {
          props: {
            size: 'small',
            variant: 'text',
          },
          style: {
            padding: '4px 5px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'text',
          },
          style: {
            padding: '8px 11px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            size: 'small',
            variant: 'outlined',
          },
          style: {
            padding: '3px 9px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'outlined',
          },
          style: {
            padding: '7px 21px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            size: 'small',
            variant: 'contained',
          },
          style: {
            padding: '4px 10px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'contained',
          },
          style: {
            padding: '8px 22px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            disableElevation: true,
          },
          style: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
            [`&.${buttonClasses.focusVisible}`]: {
              boxShadow: theme.focusVisible?.boxShadow ?? 'none',
            },
            '&:active': {
              boxShadow: 'none',
            },
            [`&.${buttonClasses.disabled}`]: {
              boxShadow: 'none',
            },
          },
        },
        {
          props: { fullWidth: true },
          style: { width: '100%' },
        },
        {
          props: {
            loadingPosition: 'center',
          },
          style: {
            ...getTransitionStyles(theme, ['background-color', 'box-shadow', 'border-color'], {
              duration: theme.transitions.duration.short,
            }),
            [`&.${buttonClasses.loading}`]: {
              color: 'transparent',
            },
          },
        },
      ],
    };
  }),
  startIcon: ({ theme }) => ({
    display: 'inherit',
    // An icon slot with no icon in it is a loading spacer. It only takes
    // space on the side the indicator is on.
    [`&.${buttonClasses.loadingIconPlaceholder}`]: {
      display: 'none',
    },
    [`&.${buttonClasses.loadingIconPlaceholder} > *`]: {
      display: 'inline-block',
      width: '1em',
      height: '1em',
    },
    alignItems: 'center',
    marginRight: 8,
    marginLeft: -4,
    '&::before': {
      content: '"\\200b"',
      width: 0,
      overflow: 'hidden',
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          marginLeft: -2,
        },
      },
      {
        props: { loadingPosition: 'start' },
        style: {
          [`&.${buttonClasses.loadingIconPlaceholder}`]: {
            display: 'inherit',
          },
        },
      },
      {
        props: { loadingPosition: 'start', loading: true },
        style: {
          ...getTransitionStyles(theme, ['opacity'], {
            duration: theme.transitions.duration.short,
          }),
          opacity: 0,
        },
      },
      {
        props: { loadingPosition: 'start', loading: true, fullWidth: true },
        style: {
          marginRight: -8,
        },
      },
      ...commonIconStyles,
    ],
  }),
  endIcon: ({ theme }) => ({
    display: 'inherit',
    // An icon slot with no icon in it is a loading spacer. It only takes
    // space on the side the indicator is on.
    [`&.${buttonClasses.loadingIconPlaceholder}`]: {
      display: 'none',
    },
    [`&.${buttonClasses.loadingIconPlaceholder} > *`]: {
      display: 'inline-block',
      width: '1em',
      height: '1em',
    },
    marginRight: -4,
    marginLeft: 8,
    variants: [
      {
        props: { size: 'small' },
        style: {
          marginRight: -2,
        },
      },
      {
        props: { loadingPosition: 'end' },
        style: {
          [`&.${buttonClasses.loadingIconPlaceholder}`]: {
            display: 'inherit',
          },
        },
      },
      {
        props: { loadingPosition: 'end', loading: true },
        style: {
          ...getTransitionStyles(theme, ['opacity'], {
            duration: theme.transitions.duration.short,
          }),
          opacity: 0,
        },
      },
      {
        props: { loadingPosition: 'end', loading: true, fullWidth: true },
        style: {
          marginLeft: -8,
        },
      },
      ...commonIconStyles,
    ],
  }),
  loadingIndicator: ({ theme }) => ({
    display: 'none',
    position: 'absolute',
    visibility: 'visible',
    variants: [
      { props: { loading: true }, style: { display: 'flex' } },
      {
        props: { loadingPosition: 'start' },
        style: {
          left: 14,
        },
      },
      {
        props: {
          loadingPosition: 'start',
          size: 'small',
        },
        style: {
          left: 10,
        },
      },
      {
        props: {
          variant: 'text',
          loadingPosition: 'start',
        },
        style: {
          left: 6,
        },
      },
      {
        props: {
          loadingPosition: 'center',
        },
        style: {
          left: '50%',
          transform: 'translate(-50%)',
          color: (theme.vars || theme).palette.action.disabled,
        },
      },
      {
        props: { loadingPosition: 'end' },
        style: {
          right: 14,
        },
      },
      {
        props: {
          loadingPosition: 'end',
          size: 'small',
        },
        style: {
          right: 10,
        },
      },
      {
        props: {
          variant: 'text',
          loadingPosition: 'end',
        },
        style: {
          right: 6,
        },
      },
      {
        props: { loadingPosition: 'start', fullWidth: true },
        style: {
          position: 'relative',
          left: -10,
        },
      },
      {
        props: { loadingPosition: 'end', fullWidth: true },
        style: {
          position: 'relative',
          right: -10,
          // The indicator is always rendered before the children, so an
          // in-flow one at the end has to be moved by the layout.
          order: 1,
        },
      },
    ],
  }),
};

// Material Design's appearance vocabulary. Button needs every naming rule there
// is: a bare value, two prefixed ones, and two that emit a class only when true.
const appearance = createAppearance({
  variant: {
    default: 'text',
    className: bare,
    values: ['text', 'outlined', 'contained'],
  },
  size: {
    default: 'medium',
    className: prefixed('size'),
    values: ['small', 'medium', 'large'],
  },
  color: {
    default: 'primary',
    className: prefixed('color'),
    values: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'],
    prefix: 'color',
  },
  fullWidth: { default: false, className: whenTrue('fullWidth'), values: [true] },
  // Only classed while loading, as before, so a button that is not loading does
  // not carry a position class.
  loadingPosition: {
    default: 'center',
    className: (value, props) => (props.loading ? prefixed('loadingPosition')(value) : null),
    values: ['start', 'center', 'end'],
    classKeys: ['loadingPositionStart', 'loadingPositionCenter', 'loadingPositionEnd'],
  },
  disableElevation: { default: false, className: whenTrue('disableElevation'), values: [true] },
});

// The root is `ButtonSurface`, the reset styles and the ripple, and not
// `ButtonBase`. `ButtonUnstyled` already calls `useButtonBase`, so a root that
// called it again would apply the semantics twice: two `role="button"`, two
// tabIndex computations, and two `focusVisible` states feeding one class.
const materialSlots = {
  ...buttonSlots,
  slots: {
    ...buttonSlots.slots,
    root: {
      ...buttonSlots.slots.root,
      elementType: ButtonSurface,
      // `ButtonSurface` reads `ownerState` itself, so it has to pass through
      // rather than being filtered off as a styling prop.
      styledOptions: {
        shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'ownerState',
      },
    },
  },
};

const styledSlots = createStyledSlots(materialSlots, getButtonUtilityClass, styles, appearance);

export const ButtonRoot = styledSlots.root;
export const ButtonStartIcon = styledSlots.startIcon;
export const ButtonEndIcon = styledSlots.endIcon;

/** Material's default spinner, with its own appearance props bound. */
function ButtonLoadingSpinner(props) {
  return <CircularProgress color="inherit" size={16} {...props} />;
}

const slots = { ...styledSlots, loadingSpinner: ButtonLoadingSpinner };

const Button = React.forwardRef(function Button(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`.
  // Resolved here rather than inside the component: ButtonGroup's context and
  // the theme's defaultProps both carry appearance props, so they have to be
  // settled before the appearance is translated.
  const contextProps = React.useContext(ButtonGroupContext);
  const positionClassName = React.useContext(ButtonGroupButtonContext) || '';
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps({ props: resolvedProps, name: 'MuiButton' });

  const {
    color,
    size,
    variant,
    fullWidth,
    disableElevation,
    disableFocusRipple = false,
    loadingPosition = 'center',
    className,
    slots: slotsProp,
    ...other
  } = props;

  return (
    <ButtonUnstyled
      {...other}
      ref={ref}
      className={clsx(contextProps.className, className, positionClassName)}
      appearance={appearance.resolve({
        color,
        size,
        variant,
        fullWidth,
        disableElevation,
        loadingPosition,
        // Not part of the vocabulary; read by `loadingPosition`'s `className`.
        loading: other.loading,
      })}
      slots={{ ...slots, ...slotsProp }}
      // A ripple is Material Design, so the logic half knows nothing about it.
      // This rides through on `...other` to the root slot.
      focusRipple={!disableFocusRipple}
    />
  );
});

Button.propTypes = {
  ...ButtonUnstyled.propTypes,
  /**
   * If `true`, the keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * The color of the component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
    PropTypes.string,
  ]),
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string,
  ]),
};

export default Button;
