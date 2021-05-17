import * as React from 'react';

export interface Classes {
  [k: string]: string | undefined | null;
}

export interface MergeClassesOption {
  baseClasses: Classes;
  newClasses?: Classes;
  Component?: React.ElementType | null;
}

export default function mergeClasses(options?: MergeClassesOption): Classes;
