import * as React from 'react';

export interface Classes {
  [k: string]: string;
}

export interface MergeClassesOption {
  baseClasses: Classes;
  newClasses: Classes;
  Component: React.ReactType;
}

export default function mergeClasses(options?: MergeClassesOption): Classes;
