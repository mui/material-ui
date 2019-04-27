import { Omit } from '@material-ui/core';
import { CSSProperties, StyledComponentProps, WithStylesOptions } from '../withStyles';
import * as React from 'react';

/**
 * @internal
 */
export type ComponentCreator<C extends React.ElementType> = <Theme, Props extends {} = any>(
  styles:
    | CSSProperties<Props>
    | (({ theme, ...props }: { theme: Theme } & Props) => CSSProperties<Props>),
  options?: WithStylesOptions<Theme>,
) => React.ComponentType<
  Omit<JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>, 'classes' | 'className'> &
    StyledComponentProps<'root'> & { className?: string } & Partial<Props>
>;

export interface StyledProps {
  className: string;
}

export default function styled<C extends React.ElementType>(Component: C): ComponentCreator<C>;
