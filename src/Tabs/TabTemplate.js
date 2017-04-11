import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  width: '100%',
  position: 'relative',
  textAlign: 'initial',
};

const TabTemplate = ({children, selected, style}) => {
  const templateStyle = Object.assign({}, styles, style);
  if (!selected) {
    templateStyle.height = 0;
    templateStyle.overflow = 'hidden';
  }

  return (
    <div style={templateStyle}>
      {children}
    </div>
  );
};

TabTemplate.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
  style: PropTypes.object,
};

export default TabTemplate;
