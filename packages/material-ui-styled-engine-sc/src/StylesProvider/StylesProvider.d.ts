import * as React from 'react';

export interface StylesProviderProps {
  children?: React.ReactNode;
  injectFirst?: boolean;
}

export default function StylesProvider(props: StylesProviderProps): JSX.Element;
