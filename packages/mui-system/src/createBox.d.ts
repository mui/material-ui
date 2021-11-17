import * as React from 'react';

export default function createBox(options?: {
  defaultTheme: object;
  defaultClassName?: string;
  generateClassName?: () => string;
}): React.ElementType;
