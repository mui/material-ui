import * as React from 'react';

export default function createBox(options?: {
  defaultTheme: object;
  defaultClassName?: string;
  generateClassName?: (componentName: string) => string;
}): React.ElementType;
