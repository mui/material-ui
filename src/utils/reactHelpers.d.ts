import * as React from 'react';

export function cloneChildrenWithClassName<T>(
  children: React.ReactNode,
  className: string
): T[];

export function isMuiElement(element: any, muiNames: Array<string>): boolean;
export function isMuiComponent(element: any, muiNames: Array<string>): boolean;
