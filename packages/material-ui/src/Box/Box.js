import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styleFunction from './styleFunction';
import styled from '../styles/experimentalStyled';

function omit(input, fields) {
  const output = {};

  Object.keys(input).forEach((prop) => {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });

  return output;
}

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
const BoxRoot = React.forwardRef(function StyledComponent(props, ref) {
  const { children, clone, className, component: Component = 'div', ...other } = props;

  const spread = omit(other, styleFunction.filterProps);

  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce && Object.keys(spread).length !== Object.keys(other).length) {
      warnedOnce = true;
      console.warn(
        'Material-UI: You are using deprecated props on the Box component.\n' +
          'You should move the properties inside the `sx` prop. For example:\n' +
          '<Box m={2} /> should become <Box sx={{ m: 2 }} />',
      );
    }
  }

  if (clone) {
    return React.cloneElement(children, {
      className: clsx(children.props.className, className),
      ...spread,
    });
  }

  if (typeof children === 'function') {
    return children({ className, ...spread });
  }

  return (
    <Component ref={ref} className={className} {...spread}>
      {children}
    </Component>
  );
});

BoxRoot.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  clone: PropTypes.bool,
  component: PropTypes.elementType,
};

/**
 * @ignore - do not document.
 */
const Box = styled(BoxRoot, {}, { muiName: 'MuiBox' })(styleFunction);

export default Box;
