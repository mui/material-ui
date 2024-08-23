import * as React from 'react';
import { StylesProviderProps } from '../StylesProvider';

declare class ServerStyleSheets {
  constructor(options?: object);
  collect(children: React.ReactNode, options?: object): React.ReactElement<StylesProviderProps>;
  toString(): string;
  getStyleElement(props?: object): React.ReactElement<any>;
}

export default ServerStyleSheets;
