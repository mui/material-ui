import * as React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  component?: React.ReactType;
  // styled API
  clone?: boolean;
}

declare const Box: React.Component<BoxProps>;

export default Box;
