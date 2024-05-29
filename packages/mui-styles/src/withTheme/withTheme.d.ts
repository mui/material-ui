import * as React from 'react';
import { ConsistentWith, DistributiveOmit, PropInjector } from '@mui/types';
import { DefaultTheme } from '../defaultTheme';

export interface WithThemeCreatorOption<Theme = DefaultTheme> {
  defaultTheme?: Theme;
}

export interface WithTheme<Theme = DefaultTheme> {
  theme: Theme;
}

export interface ThemedComponentProps extends Partial<WithTheme> {
  ref?: React.Ref<unknown>;
}

export function withThemeCreator<Theme = DefaultTheme>(
  option?: WithThemeCreatorOption<Theme>,
): PropInjector<WithTheme<Theme>, ThemedComponentProps>;

export default function withTheme<
  Theme,
  C extends React.JSXElementConstructor<ConsistentWith<React.ComponentProps<C>, WithTheme<Theme>>>,
>(
  component: C,
): React.JSXElementConstructor<
  DistributiveOmit<
    React.JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>,
    keyof WithTheme<Theme>
  > &
    Partial<WithTheme<Theme>> &
    ThemedComponentProps
>;
