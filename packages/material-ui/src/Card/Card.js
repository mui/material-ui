import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getCardUtilityClass } from './cardClasses';
import Paper from '../Paper';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, { ...styleProps });
};

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: [
      'root',
    ],
  };

  return composeClasses(slots, getCardUtilityClass, classes);
};

const CardRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiCard',
    slot: 'Root',
    overridesResolver,
  },
)(() => {
  return {
    /* Styles applied to the root element. */
    overflow: 'hidden',
  };
});

const Card = React.forwardRef(function Card(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiCard' });

  const { className, raised = false, ...other } = props;

  const styleProps = { ...props }

  const classes = useUtilityClasses(styleProps)

  return (
    <CardRoot
      as={Paper}
      styleProps={styleProps}
      className={clsx(classes.root, className)}
      elevation={raised ? 8 : 1}
      ref={ref}
      {...other}
    />
  );
});

Card.propTypes = {
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
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: PropTypes.bool,
  /**
  * The system prop that allows defining system overrides as well as additional CSS styles.
  */
  sx: PropTypes.object,
};

export default Card;
