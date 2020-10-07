import React from 'react';
import { palette } from '@material-ui/system';

const App = () => {
  const result = palette({
    theme: {},
    bgcolor: ['red', 'blue'],
  });

  return null;
}

export default App;
