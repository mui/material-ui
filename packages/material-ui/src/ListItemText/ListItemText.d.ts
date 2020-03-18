import * as React from 'react';
import { StandardProps } from '..';
import { TypographyProps } from '../Typography';

export interface ListItemTextProps<
  PrimaryTypographyComponent extends React.ElementType = 'span',
  SecondaryTypographyComponent extends React.ElementType = 'p'
> extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemTextClassKey> {
  disableTypography?: boolean;
  inset?: boolean;
  primary?: React.ReactNode;
  primaryTypographyProps?: TypographyProps<
    PrimaryTypographyComponent,
    { component?: PrimaryTypographyComponent }
  >;
  secondary?: React.ReactNode;
  secondaryTypographyProps?: TypographyProps<
    SecondaryTypographyComponent,
    { component?: SecondaryTypographyComponent }
  >;
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
  PrimaryTypographyComponent extends React.ElementType = 'span',
  SecondaryTypographyComponent extends React.ElementType = 'p'
>(
  props: ListItemTextProps<PrimaryTypographyComponent, SecondaryTypographyComponent>,
) => JSX.Element;

export default ListItemText;
