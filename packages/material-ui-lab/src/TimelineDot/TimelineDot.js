import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { getTimelineDotUtilityClass } from './timelineDotClasses';

const useUtilityClasses = (styleProps) => {
  const { color, variant, classes } = styleProps;

  const slots = {
    root: ['root', variant, color !== 'inherit' && `${variant}${capitalize(color)}`],
  };

  return composeClasses(slots, getTimelineDotUtilityClass, classes);
};

const TimelineDotRoot = styled('span', {
  name: 'MuiTimelineDot',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return {
      ...styles.root,
      ...styles[
        styleProps.color !== 'inherit' && `${styleProps.variant}${capitalize(styleProps.color)}`
      ],
      ...styles[styleProps.variant],
    };
  },
})(({ styleProps, theme }) => ({
  /* Styles applied to the root element. */
  display: 'flex',
  alignSelf: 'baseline',
  borderStyle: 'solid',
  borderWidth: 2,
  padding: 4,
  borderRadius: '50%',
  boxShadow: theme.shadows[1],
  margin: '11.5px 0',
  /* Styles applied to the root element if `color="grey"` and `variant="filled"`. */
  ...(styleProps.color === 'grey' &&
    styleProps.variant === 'filled' && {
      borderColor: 'transparent',
      color: theme.palette.grey[50],
      backgroundColor: theme.palette.grey[400],
    }),
  /* Styles applied to the root element if `color="grey"` and `variant="outlined"`. */
  ...(styleProps.color === 'grey' &&
    styleProps.variant === 'outlined' && {
      boxShadow: 'none',
      color: theme.palette.grey.contrastText,
      borderColor: theme.palette.grey[400],
      backgroundColor: 'transparent',
    }),
  /* Styles applied to the root element if `color="primary"` and `variant="filled"`. */
  ...(styleProps.color === 'primary' &&
    styleProps.variant === 'filled' && {
      borderColor: 'transparent',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    }),
  /* Styles applied to the root element if `color="primary"` and `variant="outlined"`. */
  ...(styleProps.color === 'primary' &&
    styleProps.variant === 'outlined' && {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      borderColor: theme.palette.primary.main,
    }),
  /* Styles applied to the root element if `color="secondary"` and `variant="filled"`. */
  ...(styleProps.color === 'secondary' &&
    styleProps.variant === 'filled' && {
      borderColor: 'transparent',
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    }),
  /* Styles applied to the root element if `color="secondary"` and `variant="outlined"`. */
  ...(styleProps.color === 'secondary' &&
    styleProps.variant === 'outlined' && {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      borderColor: theme.palette.secondary.main,
    }),
}));

const TimelineDot = React.forwardRef(function TimelineDot(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimelineDot' });
  const { className, color = 'grey', variant = 'filled', ...other } = props;

  const styleProps = {
    ...props,
    color,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <TimelineDotRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    />
  );
});

TimelineDot.propTypes /* remove-proptypes */ = {
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
   * The dot can have a different colors.
   * @default 'grey'
   */
  color: PropTypes.oneOf(['grey', 'inherit', 'primary', 'secondary']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The dot can appear filled or outlined.
   * @default 'filled'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['filled', 'outlined']),
    PropTypes.string,
  ]),
};

export default TimelineDot;
