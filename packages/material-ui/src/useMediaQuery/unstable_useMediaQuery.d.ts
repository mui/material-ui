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
  ssrMatchMedia?: (query: string) => MuiMediaQueryList;
}

export default function unstable_useMediaQuery(query: string, options?: Options): boolean;
