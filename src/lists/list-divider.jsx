import React from 'react';
import Divider from '../divider';
import warning from 'warning';

const ListDivider = React.createClass({

  getInitialState() {
    warning(false, '<ListDivider /> has been deprecated. Please use the <Divider /> component.');
    return null;
  },

  render() {
    return <Divider {...this.props} />;
  },
});

export default ListDivider;
