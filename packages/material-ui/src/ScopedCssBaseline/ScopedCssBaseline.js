import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import { html, body } from '../CssBaseline/CssBaseline';
import { getScopedCssBaselineUtilityClass } from './scopedCssBaselineClasses';

const overridesResolver = (props, styles) => {
  return styles.root || {};
};

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getScopedCssBaselineUtilityClass, classes);
};

const ScopedCssBaselineRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiScopedCssBaseline',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme }) => ({
  /* Styles applied to the root element. */
  ...html,
  ...body(theme),
  '& *, & *::before, & *::after': {
    boxSizing: 'inherit',
  },
  '& strong, & b': {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const ScopedCssBaseline = React.forwardRef(function ScopedCssBaseline(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiScopedCssBaseline' });
  const { className, ...other } = props;

  // TODO: convert to simple assignment after the type error in defaultPropsHandler.js:60:6 is fixed
  const styleProps = {
    ...props,
  };

  const classes = useUtilityClasses(styleProps);
  return (
    <ScopedCssBaselineRoot
      ref={ref}
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      {...other}
    />
  );
});

ScopedCssBaseline.propTypes /* remove-proptypes */ = {
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
};

export default ScopedCssBaseline;
