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

/**
 * @ignore - do not document.
 */
const Box = React.forwardRef(function Box(props, ref) {
  const { children, clone, className, component: Component = 'div', ...other } = props;

  const spread = omit(other, styleFunction.filterProps);

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

const specialProperty = 'exact-prop: \u200b';

Box.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  clone: PropTypes.bool,
  component: PropTypes.elementType,
  [specialProperty]: (props) => {
    const unsupportedProps = Object.keys(props).filter(
      (prop) => ['children', 'className', 'clone', 'component'].indexOf(prop) === -1,
    );

    if (unsupportedProps.length > 0) {
      return new Error(
        `The following props are deprecated: ${unsupportedProps
          .map((prop) => `\`${prop}\``)
          .join(', ')}. You should move the properties inside the \`sx\` prop. For example:\n` +
          '<Box m={2} /> should become <Box sx={{ m: 2 }} />',
      );
    }
    return null;
  },
};

export default styled(Box, {}, { muiName: 'MuiBox' })(styleFunction);
