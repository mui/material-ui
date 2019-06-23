import { Options } from './useMediaQuery';
import { Theme } from '../styles/createMuiTheme';
export {
  MuiMediaQueryListEvent,
  MuiMediaQueryList,
  MuiMediaQueryListListener,
} from './useMediaQuery';
export { Options };

export default function useMediaQueryTheme(
  query: string | ((theme: Theme) => string),
  options?: Options,
): boolean;
