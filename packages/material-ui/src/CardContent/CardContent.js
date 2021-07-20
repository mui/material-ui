import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getCardContentUtilityClass } from './cardContentClasses';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardContentUtilityClass, classes);
};

const CardContentRoot = styled('div', {
  name: 'MuiCardContent',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(() => {
  return {
    padding: 16,
    '&:last-child': {
      paddingBottom: 24,
    },
  };
});

const CardContent = React.forwardRef(function CardContent(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiCardContent',
  });

  const { className, component = 'div', ...other } = props;

  const styleProps = { ...props, component };

  const classes = useUtilityClasses(styleProps);

  return (
    <CardContentRoot
      as={component}
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    />
  );
});

CardContent.propTypes /* remove-proptypes */ = {
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default CardContent;
