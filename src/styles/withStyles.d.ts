import * as React from 'react';
import { WithTheme } from '../styles/withTheme';
import { Omit, ConsistentWith } from '..';
import { Theme } from './createMuiTheme';

/**
 * This is basically the API of JSS. It defines a Map<string, CSS>,
 * where
 *
 * - the `keys` are the class (names) that will be created
 * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
 */
export type StyleRules<ClassKey extends string = string> = Record<ClassKey, React.CSSProperties>;

export type StyleRulesCallback<ClassKey extends string = string> = (
  theme: Theme,
) => StyleRules<ClassKey>;

export interface StylesCreator {
  create(theme: Theme, name: string): StyleRules;
  options: { index: number };
  themingEnabled: boolean;
}

export interface WithStylesOptions {
  flip?: boolean;
  withTheme?: boolean;
  name?: string;
}

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export interface WithStyles<ClassKey extends string = string> extends Partial<WithTheme> {
  classes: ClassNameMap<ClassKey>;
}

export interface StyledComponentProps<ClassKey extends string = string> {
  classes?: Partial<ClassNameMap<ClassKey>>;
  innerRef?: React.Ref<any>;
}

export default function withStyles<ClassKey extends string>(
  style: StyleRules<ClassKey> | StyleRulesCallback<ClassKey>,
  options?: WithStylesOptions,
): <P extends ConsistentWith<WithStyles<ClassKey>>>(
  component: React.ComponentType<P & WithStyles<ClassKey>>,
) => React.ComponentType<Omit<P, 'classes'> & StyledComponentProps<ClassKey>>;
