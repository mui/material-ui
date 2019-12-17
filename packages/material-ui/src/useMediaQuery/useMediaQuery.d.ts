import { DefaultTheme } from '@material-ui/styles/defaultTheme';

export interface MuiMediaQueryListEvent {
  matches: boolean;
}

export interface MuiMediaQueryList {
  matches: boolean;
  addListener: (listener: MuiMediaQueryListListener) => void;
  removeListener: (listener: MuiMediaQueryListListener) => void;
}

export type MuiMediaQueryListListener = (event: MuiMediaQueryListEvent) => void;

export interface Options {
  defaultMatches?: boolean;
  noSsr?: boolean;
  ssrMatchMedia?: (query: string) => { matches: boolean };
}

export default function useMediaQuery<Theme = DefaultTheme>(
  query: string | ((theme: Theme) => string),
  options?: Options,
): boolean;
