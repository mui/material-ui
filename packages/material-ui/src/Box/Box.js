import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_extendSxProp as extendSxProp } from '@material-ui/system';
import styled from '../styles/experimentalStyled';

const BoxInner = React.forwardRef((props, ref) => {
  const { children, className, component: Component = 'div', sx, ...other } = props;

  if (typeof children === 'function') {
    return children({ className: clsx(className, 'MuiBox-root'), ...other });
  }

  return (
    <Component ref={ref} className={clsx(className, 'MuiBox-root')} {...other}>
      {children}
    </Component>
  );
});

BoxInner.propTypes = {
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  className: PropTypes.string,
  clone: PropTypes.bool,
  component: PropTypes.elementType,
  sx: PropTypes.object,
};

const BoxRoot = styled(BoxInner, {}, { muiName: 'MuiBox', skipVariantsResolver: true })``;

/**
 * @ignore - do not document.
 */
const Box = React.forwardRef(function Box(inProps, ref) {
  const props = extendSxProp(inProps);
  return <BoxRoot ref={ref} {...props} />;
});

Box.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
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
