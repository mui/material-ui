import * as React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  component?: React.ReactType;
  // styled API
  clone?: boolean;
}

export const unstable_Box: React.Component<BoxProps>;
