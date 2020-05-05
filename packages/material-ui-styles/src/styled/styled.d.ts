import { Omit, Overwrite } from '@material-ui/types';
import {
  CreateCSSProperties,
  StyledComponentProps,
  WithStylesOptions,
} from '@material-ui/styles/withStyles';
import * as React from 'react';
import { DefaultTheme } from '../defaultTheme';

// We don't want a union type here (like React.ComponentType) in order to support mapped types.
export type StyledComponent<P extends {}> = (props: P) => React.ReactElement<P, any> | null;

/**
 * @internal
 */
export type ComponentCreator<Component extends React.ElementType> = <
  Theme = DefaultTheme,
  Props extends {} = React.ComponentPropsWithoutRef<Component>
>(
  styles:
    | CreateCSSProperties<Props>
    | ((props: { theme: Theme } & Props) => CreateCSSProperties<Props>),
  options?: WithStylesOptions<Theme>
) => StyledComponent<
  Omit<
    JSX.LibraryManagedAttributes<Component, React.ComponentProps<Component>>,
    'classes' | 'className'
  > &
    StyledComponentProps<'root'> &
    Overwrite<Props, { className?: string; theme?: Theme }>
>;

export interface StyledProps {
  className: string;
}

export default function styled<Component extends React.ElementType>(
  Component: Component
): ComponentCreator<Component>;
