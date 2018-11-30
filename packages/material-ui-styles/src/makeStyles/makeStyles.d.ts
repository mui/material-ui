import {
  ClassKeyOfStyles,
  ClassNameMap,
  PropsOfStyles,
  Styles,
  WithStylesOptions,
} from '@material-ui/styles/withStyles';

export default function makeStyles<S extends Styles<any, any>>(
  styles: S,
  options?: WithStylesOptions<ClassKeyOfStyles<S>>,
): (props: PropsOfStyles<S>) => ClassNameMap<ClassKeyOfStyles<S>>;
