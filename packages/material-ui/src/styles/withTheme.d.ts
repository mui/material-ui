import { PropInjector } from '@material-ui/types';
import { Theme } from './createMuiTheme';

export interface WithTheme {
  theme: Theme;
}

export interface ThemedComponentProps extends Partial<WithTheme> {
  ref?: React.Ref<unknown>;
}

declare const withTheme: PropInjector<WithTheme, ThemedComponentProps>;

export default withTheme;
