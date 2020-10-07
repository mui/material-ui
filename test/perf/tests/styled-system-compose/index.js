import React from 'react';
import { space, color, fontFamily, fontSize, compose } from 'styled-system';

const styledSystem = compose(color, space, fontFamily, fontSize);

const App = () => {
  const result = styledSystem({
    theme: styledSystemTheme,
    color: 'primary.main',
    bg: 'background.paper',
    fontFamily: 'h6.fontFamily',
    fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
    p: [2, 3, 4],
  });

  return null;
}

export default App;
