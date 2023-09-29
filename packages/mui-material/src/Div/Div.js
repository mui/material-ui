'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getDivUtilityClass } from './divClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getDivUtilityClass, classes);
};

const DivRoot = styled('div', {
  name: 'MuiDiv',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(() => {
  return {};
});

const Div = React.forwardRef(function Div(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDiv',
  });

  const { className, ...other } = props;

  const ownerState = { ...props };

  const classes = useUtilityClasses(ownerState);

  return (
    <DivRoot
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
});

Div.propTypes /* remove-proptypes */ = {
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Div;
