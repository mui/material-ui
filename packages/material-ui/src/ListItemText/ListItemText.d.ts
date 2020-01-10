import * as React from 'react';
import { StandardProps } from '..';
import { TypographyProps } from '../Typography';

export interface ListItemTextProps<
  P extends React.ElementType = 'span',
  S extends React.ElementType = 'p'
> extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemTextClassKey> {
  disableTypography?: boolean;
  inset?: boolean;
  primary?: React.ReactNode;
  primaryTypographyProps?: TypographyProps<P, { component?: P }>;
  secondary?: React.ReactNode;
  secondaryTypographyProps?: TypographyProps<S, { component?: S }>;
}

export type ListItemTextClassKey =
  | 'root'
  | 'multiline'
  | 'dense'
  | 'inset'
  | 'primary'
  | 'secondary';

// If use function instead const, yarn proptypes (scripts/generateProptypes.ts) will overwrite ListItemText.js with proptypes from current file.
// const declarations are ignored.
/* tslint:disable:prefer-declare-function */
declare const ListItemText: <
  P extends React.ElementType = 'span',
  S extends React.ElementType = 'p'
>(
  props: ListItemTextProps<P, S>,
) => JSX.Element;

export default ListItemText;
