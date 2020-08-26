import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export type NamedMuiComponent = React.ComponentType & { muiName: string };

export interface NamedMuiElement {
  type: NamedMuiComponent;
  props: StandardProps<{}>;
  key: string | number | null;
}

export default function isMuiElement(element: any, muiNames: string[]): element is NamedMuiElement;
