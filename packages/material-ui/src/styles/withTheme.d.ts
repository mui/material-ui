import { Theme } from './createMuiTheme';
import { PropInjector } from '..';

export interface WithTheme {
  theme: Theme;
  innerRef?: React.Ref<any> | React.RefObject<any>;
}

export default function withTheme(): PropInjector<WithTheme, Partial<WithTheme>>;
