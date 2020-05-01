import {
  ClassNameMap,
  Styles,
  WithStylesOptions,
  StyledComponentProps,
} from '@material-ui/styles/withStyles';
import { Omit } from '@material-ui/types';
import { DefaultTheme } from '../defaultTheme';

type MakeStylesHook<
  Props extends {} = any,
  ClassKey extends string = string
> = undefined extends Props
  ? (props?: Pick<StyledComponentProps<ClassKey>, 'classes'>) => ClassNameMap<ClassKey>
  : (props: Props & Pick<StyledComponentProps<ClassKey>, 'classes'>) => ClassNameMap<ClassKey>;

/**
 * `makeStyles` where the passed `styles` can depend on props
 */
export default function makeStyles<
  Theme = DefaultTheme,
  Props extends {} = any,
  ClassKey extends string = string
>(
  styles: Styles<Theme, Props, ClassKey>,
  options?: Omit<WithStylesOptions<Theme>, 'withTheme'>,
): MakeStylesHook<Props, ClassKey>;
