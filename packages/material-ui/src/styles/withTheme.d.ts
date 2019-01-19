import { Theme } from './createMuiTheme';
import { PropInjector } from '..';

export interface WithTheme {
  theme: Theme;
}

export interface ThemedComponentProps extends Partial<WithTheme> {
  innerRef?: React.Ref<any> | React.RefObject<any>;
}

<<<<<<< HEAD
<<<<<<< HEAD
export default function withTheme(): PropInjector<WithTheme, ThemedComponentProps>;
=======
export interface Options {
  withProps?: boolean;
  name?: string;
}

export default function withTheme(options?: Options): PropInjector<WithTheme, Partial<WithTheme>>;
>>>>>>> Add TypeScript declarations
=======
export default function withTheme(): PropInjector<WithTheme, Partial<WithTheme>>;
>>>>>>> PR remarks
