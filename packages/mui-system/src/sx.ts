import { unstable_styleFunctionSx as styleFunctionSx } from '@mui/system';
import {resolveSxValue} from '../../mui-joy/src/styles/styleUtils';
import { SxProps } from './styleFunctionSx';
import { Theme } from './createTheme/createTheme';
import resolveSxContainerQueries from './resolveSxContainerQueries';

type CSSObject = Record<string, any>;

export function resolveSx(
  theme: Theme,
  sxInput: SxProps<Theme> | undefined,
): CSSObject {
  if (!sxInput) {
    return {};
  }

  const sxWithContainerQueries = resolveSxContainerQueries(sxInput, theme);

  const finalStyles = resolveSxValue(theme, sxWithContainerQueries);

  return finalStyles;
}

export default styleFunctionSx;
