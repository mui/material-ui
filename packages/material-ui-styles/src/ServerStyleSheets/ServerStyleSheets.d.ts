import * as React from 'react';

declare class ServerStyleSheets {
  constructor(options?: object);
  collect(children: React.ReactNode, options?: object): void;
  toString(): string;
  getStyleElement(props?: object): React.ReactElement;
}

export default ServerStyleSheets;
