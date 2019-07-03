import { Omit, IsAny, CoerceEmptyInterface } from '@material-ui/types';
import {
  CreateCSSProperties,
  StyledComponentProps,
  WithStylesOptions,
} from '@material-ui/styles/withStyles';
import * as React from 'react';

/**
 * @internal
 */
export type ComponentCreator<Component extends React.ElementType> = <Theme, Props extends {} = any>(
  styles:
    | CreateCSSProperties<Props>
    | ((props: { theme: Theme } & CoerceEmptyInterface<Props>) => CreateCSSProperties<Props>),
  options?: WithStylesOptions<Theme>,
) => React.ComponentType<
  Omit<
    JSX.LibraryManagedAttributes<Component, React.ComponentProps<Component>>,
    'classes' | 'className'
  > &
    StyledComponentProps<'root'> & { className?: string } & CoerceEmptyInterface<Props>
>;

export interface StyledProps {
  className: string;
}

export default function styled<Component extends React.ElementType>(
  Component: Component,
): ComponentCreator<Component>;
