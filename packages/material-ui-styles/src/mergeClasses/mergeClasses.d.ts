import * as React from 'react';

interface Classes {
  [k: string]: string;
}

export interface MergeClassesOption {
  baseClasses: Classes;
  newClasses: Classes;
  Component: React.ReactType;
}

declare function mergeClasses(options?: MergeClassesOption): Classes;

export default mergeClasses;
