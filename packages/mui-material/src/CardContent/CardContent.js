'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getCardContentUtilityClass } from './cardContentClasses';
import { private_cardContentVars as vars } from './cardContentVars';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardContentUtilityClass, classes);
};

const CardContentRoot = styled('div', {
  name: 'MuiCardContent',
  slot: 'Root',
})({
  // Density seams over the literal defaults (no size axis).
  '--_pad': '16px',
  '--_padBottom': '24px',
  '--comp-pad': `var(${vars.pad}, var(--_pad))`,
  '--comp-padBottom': `var(${vars.padBottom}, var(--_padBottom))`,
  padding: 'var(--comp-pad, var(--_pad))',
  '&:last-child': {
    paddingBottom: 'var(--comp-padBottom, var(--_padBottom))',
  },
});

const CardContent = React.forwardRef(function CardContent(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiCardContent',
  });

  const { className, component = 'div', ...other } = props;

  const ownerState = { ...props, component };

  const classes = useUtilityClasses(ownerState);

  return (
    <CardContentRoot
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
});

CardContent.propTypes /* remove-proptypes */ = {
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default CardContent;
