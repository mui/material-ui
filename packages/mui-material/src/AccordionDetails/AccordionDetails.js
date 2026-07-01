'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getAccordionDetailsUtilityClass } from './accordionDetailsClasses';
import { private_accordionDetailsVars as vars } from './accordionDetailsVars';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getAccordionDetailsUtilityClass, classes);
};

const AccordionDetailsRoot = styled('div', {
  name: 'MuiAccordionDetails',
  slot: 'Root',
})(
  memoTheme(() => ({
    // Density seams over the `8px 16px 16px` default (top/inline/bottom).
    '--_topPad': '8px',
    '--_inlinePad': '16px',
    '--_bottomPad': '16px',
    '--comp-topPad': `var(${vars.topPad}, var(--_topPad))`,
    '--comp-inlinePad': `var(${vars.inlinePad}, var(--_inlinePad))`,
    '--comp-bottomPad': `var(${vars.bottomPad}, var(--_bottomPad))`,
    padding:
      'var(--comp-topPad, var(--_topPad)) var(--comp-inlinePad, var(--_inlinePad)) var(--comp-bottomPad, var(--_bottomPad))',
  })),
);

const AccordionDetails = React.forwardRef(function AccordionDetails(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiAccordionDetails' });
  const { className, ...other } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  return (
    <AccordionDetailsRoot
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
});

AccordionDetails.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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

export default AccordionDetails;
