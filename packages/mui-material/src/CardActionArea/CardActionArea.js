import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import cardActionAreaClasses, { getCardActionAreaUtilityClass } from './cardActionAreaClasses';
import ButtonBase from '../ButtonBase';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    focusHighlight: ['focusHighlight'],
  };

  return composeClasses(slots, getCardActionAreaUtilityClass, classes);
};

const CardActionAreaRoot = styled(ButtonBase, {
  name: 'MuiCardActionArea',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  display: 'block',
  textAlign: 'inherit',
  width: '100%',
  [`&:hover .${cardActionAreaClasses.focusHighlight}`]: {
    opacity: theme.palette.action.hoverOpacity,
    '@media (hover: none)': {
      opacity: 0,
    },
  },
  [`&.${cardActionAreaClasses.focusVisible} .${cardActionAreaClasses.focusHighlight}`]: {
    opacity: theme.palette.action.focusOpacity,
  },
}));

const CardActionAreaFocusHighlight = styled('span', {
  name: 'MuiCardActionArea',
  slot: 'FocusHighlight',
  overridesResolver: (props, styles) => styles.focusHighlight,
})(({ theme }) => ({
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: 'inherit',
  opacity: 0,
  backgroundColor: 'currentcolor',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.short,
  }),
}));

const CardActionArea = React.forwardRef(function CardActionArea(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiCardActionArea' });
  const { children, className, focusVisibleClassName, ...other } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  return (
    <CardActionAreaRoot
      className={clsx(classes.root, className)}
      focusVisibleClassName={clsx(focusVisibleClassName, classes.focusVisible)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      {children}
      <CardActionAreaFocusHighlight className={classes.focusHighlight} ownerState={ownerState} />
    </CardActionAreaRoot>
  );
});

CardActionArea.propTypes /* remove-proptypes */ = {
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
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.func,
    PropTypes.object,
    PropTypes.shape({
      '__@iterator@91': PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      entries: PropTypes.func.isRequired,
      every: PropTypes.func.isRequired,
      filter: PropTypes.func.isRequired,
      find: PropTypes.func.isRequired,
      findIndex: PropTypes.func.isRequired,
      flat: PropTypes.func.isRequired,
      flatMap: PropTypes.func.isRequired,
      forEach: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      join: PropTypes.func.isRequired,
      keys: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      map: PropTypes.func.isRequired,
      reduce: PropTypes.func.isRequired,
      reduceRight: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      some: PropTypes.func.isRequired,
      toLocaleString: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      values: PropTypes.func.isRequired,
    }),
  ]),
};

export default CardActionArea;
