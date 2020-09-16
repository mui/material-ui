import React from 'react';

const RltContext = React.createContext({
  rtl: false,
  setRtl: () => {},
});

export default RltContext;
