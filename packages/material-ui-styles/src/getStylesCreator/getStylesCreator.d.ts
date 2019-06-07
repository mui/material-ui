import { StyleRules, Styles } from '@material-ui/styles/withStyles';

export interface StylesCreator<Theme, Props extends object, ClassKey extends string = string> {
  create: (theme: Theme, name: string) => StyleRules<Props, ClassKey>;
  options: {};
  themingEnabled: boolean;
}

export default function getStylesCreator<S extends Styles<any, any>>(
  style: S,
): StylesCreator<any, any>;
