import React, {Children, isValidElement, cloneElement} from 'react';
import PropTypes from 'prop-types';
import List from './List';

const NestedList = (props) => {
  const {
    children,
    open,
    nestedLevel,
    style,
  } = props;

  if (!open) {
    return null;
  }

  return (
    <List style={style}>
      {Children.map(children, (child) => {
        return isValidElement(child) ? (
          cloneElement(child, {
            nestedLevel: nestedLevel + 1,
          })
        ) : child;
      })}
    </List>
  );
};

NestedList.propTypes = {
  children: PropTypes.node,
  nestedLevel: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
};

export default NestedList;
