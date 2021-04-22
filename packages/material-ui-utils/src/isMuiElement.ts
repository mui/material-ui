import * as React from 'react';

export default function isMuiElement(element: any, muiNames: readonly string[]): boolean {
  return React.isValidElement(element) && muiNames.indexOf((element.type as any).muiName) !== -1;
}
