import { Omit } from '@material-ui/types';
import {
  CreateCSSProperties,
  StyledComponentProps,
  WithStylesOptions,
} from '@material-ui/styles/withStyles';
import * as React from 'react';

/**
 * If props is any, returns empty object, otherwise T
 * @internal
 */
export type GetProps<T> = 0 extends 1 & T ? {} : T;

/**
 * @internal
 */
export type ComponentCreator<Component extends React.ElementType> = <Theme, Props extends {} = any>(
  styles:
    | CreateCSSProperties<Props>
    | (({ theme, ...props }: { theme: Theme } & Props) => CreateCSSProperties<Props>),
  options?: WithStylesOptions<Theme>,
) => React.ComponentType<
  Omit<
    JSX.LibraryManagedAttributes<Component, React.ComponentProps<Component>>,
    'classes' | 'className'
  > &
    StyledComponentProps<'root'> & { className?: string } & GetProps<Props>
>;

export interface StyledProps {
  className: string;
}

export default function styled<Component extends React.ElementType>(
  Component: Component,
): ComponentCreator<Component>;
