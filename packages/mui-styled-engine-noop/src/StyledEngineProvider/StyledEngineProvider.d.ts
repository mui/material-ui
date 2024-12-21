import * as React from 'react';

export interface StyledEngineProviderProps {
  children?: React.ReactNode;
  injectFirst?: boolean;
}

export default function StyledEngineProvider(props: StyledEngineProviderProps): React.JSX.Element;
