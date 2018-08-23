import * as React from 'react';
import { StandardProps } from '../';

export function cloneChildrenWithClassName<T>(children: React.ReactNode, className: string): T[];

export type NamedMuiComponent = React.ComponentType & { muiName: string };

export interface NamedMuiElement {
  type: NamedMuiComponent;
  props: StandardProps<{}, never>;
  key: string | number | null;
}

export function isMuiElement(element: any, muiNames: string[]): element is NamedMuiElement;
export function isMuiComponent(element: any, muiNames: string[]): element is NamedMuiComponent;
