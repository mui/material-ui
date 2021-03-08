// @inheritedComponent ButtonBase
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '../styles';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import toggleButtonClasses, { getToggleButtonUtilityClass } from './toggleButtonClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(
    {
      ...styles[`size${capitalize(styleProps.size)}`],
      [`& .${toggleButtonClasses.label}`]: styles.label,
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { classes, selected, disabled, size } = styleProps;

  const slots = {
    root: ['root', selected && 'selected', disabled && 'disabled', `size${capitalize(size)}`],
    label: ['label'],
  };

  return composeClasses(slots, getToggleButtonUtilityClass, classes);
};

const ToggleButtonRoot = experimentalStyled(
  ButtonBase,
  {},
  {
    name: 'MuiToggleButton',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => ({
  /* Styles applied to the root element. */
  ...theme.typography.button,
  borderRadius: theme.shape.borderRadius,
  padding: 11,
  border: `1px solid ${alpha(theme.palette.action.active, 0.12)}`,
  color: alpha(theme.palette.action.active, 0.38),
  '&.Mui-selected': {
    color: theme.palette.action.active,
    backgroundColor: alpha(theme.palette.action.active, 0.12),
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.active, 0.15),
    },
  },
  '&.Mui-disabled': {
    color: alpha(theme.palette.action.disabled, 0.12),
  },
  '&:hover': {
    textDecoration: 'none',
    // Reset on mouse devices
    backgroundColor: alpha(theme.palette.text.primary, 0.05),
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
  /* Styles applied to the root element if `size="small"`. */
  ...(styleProps.size === 'small' && {
    padding: 7,
    fontSize: theme.typography.pxToRem(13),
  }),
  /* Styles applied to the root element if `size="large"`. */
  ...(styleProps.size === 'large' && {
    padding: 15,
    fontSize: theme.typography.pxToRem(15),
  }),
}));

const ToggleButtonLabel = experimentalStyled(
  'span',
  {},
  {
    name: 'MuiToggleButton',
    slot: 'Label',
  },
)({
  /* Styles applied to the label wrapper element. */
  width: '100%', // Ensure the correct width for iOS Safari
  display: 'inherit',
  alignItems: 'inherit',
  justifyContent: 'inherit',
});

const ToggleButton = React.forwardRef(function ToggleButton(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiToggleButton' });
  const {
    children,
    className,
    disabled = false,
    disableFocusRipple = false,
    onChange,
    onClick,
    selected,
    size = 'medium',
    value,
    ...other
  } = props;

  const styleProps = {
    ...props,
    disabled,
    disableFocusRipple,
    size,
  };

  const classes = useUtilityClasses(styleProps);

  const handleChange = (event) => {
    if (onClick) {
      onClick(event, value);
      if (event.defaultPrevented) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  return (
    <ToggleButtonRoot
      className={clsx(classes.root, className)}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      ref={ref}
      onClick={handleChange}
      onChange={onChange}
      value={value}
      styleProps={styleProps}
      aria-pressed={selected}
      {...other}
    >
      <ToggleButtonLabel className={classes.label} styleProps={styleProps}>
        {children}
      </ToggleButtonLabel>
    </ToggleButtonRoot>
  );
});

ToggleButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
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
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusedVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * If `true`, the button is rendered in an active state.
   */
  selected: PropTypes.bool,
  /**
   * The size of the component.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: PropTypes.any.isRequired,
};

export default ToggleButton;
