import React from 'react';
import { spacing, palette, typography, compose } from '@material-ui/system';

const materialSystem = compose(palette, spacing, typography);

const App = () => {
  const result = materialSystem({
    theme: materialSystemTheme,
    color: 'primary.main',
    bgcolor: 'background.paper',
    fontFamily: 'h6.fontFamily',
    fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
    p: [2, 3, 4],
  });

  return null;
}

export default App;
