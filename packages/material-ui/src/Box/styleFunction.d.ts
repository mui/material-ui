import { BoxStyleFunction, SxProps } from './Box';
import { Theme as DefaultTheme } from '../styles';
import { CSSObject } from '../styles/experimentalStyled';

type Props<Theme> = {
  [key: string]: any;
  sx?: SxProps;
  theme: Theme;
}

export function styleFunctionSx<Theme extends object = DefaultTheme>(props: Props<Theme>): CSSObject;

declare const styleFunction: BoxStyleFunction;
export default styleFunction;
