import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_extendSxProp as extendSxProp } from '@material-ui/system';
import styled from '../styles/experimentalStyled';

const BoxRoot = styled('div', {}, { muiName: 'MuiBox', skipVariantsResolver: true })``;

/**
 * @ignore - do not document.
 */
const Box = React.forwardRef(function Box(inProps, ref) {
  const { className, component = 'div', ...other } = extendSxProp(inProps);
  return <BoxRoot as={component} ref={ref} className={clsx(className, 'MuiBox-root')} {...other} />;
});

Box.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  sx: PropTypes.object,
};

export default Box;
