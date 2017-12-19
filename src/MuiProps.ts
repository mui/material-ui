import * as React from 'react';
import { StyledComponentProps } from './styles';
import { Omit } from 'type-zoo';

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 */

export type StandardProps<C, ClassKey extends string, Removals extends keyof C = never> = Omit<
  C & { classes: any },
  'classes' | Removals
> &
  StyledComponentProps<ClassKey> & {
    className?: string;
    style?: Partial<React.CSSProperties>;
  };

export type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
export type Color = 'inherit' | 'primary' | 'accent' | 'default';
export type Margin = 'none' | 'dense' | 'normal';
