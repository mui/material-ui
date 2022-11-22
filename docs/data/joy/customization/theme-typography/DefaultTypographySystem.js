import * as React from 'react';
import { useTheme } from '@mui/joy/styles';

export default function DefaultTypographySystem() {
  const theme = useTheme();
  return (
    <div>
      {Object.entries(theme.typography).map(([level, style]) => (
        <div key={level} style={style}>
          {level}
        </div>
      ))}
    </div>
  );
}
