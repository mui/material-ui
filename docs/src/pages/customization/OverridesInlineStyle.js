// @flow

import React from 'react';
import Button from 'material-ui/Button';

// We can use inline-style
const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
};

function OverridesInlineStyle() {
  return (
    <Button style={style}>
      {'inline-style'}
    </Button>
  );
}

export default OverridesInlineStyle;
