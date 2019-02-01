import { Theme } from './createMuiTheme';
import { PropInjector } from '..';

export interface WithTheme {
  theme: Theme;
}

export interface ThemedComponentProps extends Partial<WithTheme> {
  innerRef?: React.Ref<any> | React.RefObject<any>;
}

export default function withTheme(): PropInjector<WithTheme, ThemedComponentProps>;
