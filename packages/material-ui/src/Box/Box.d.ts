import * as React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  component?: React.ElementType;
  // styled API
  clone?: boolean;
}

declare const Box: React.ComponentType<BoxProps>;

export default Box;
