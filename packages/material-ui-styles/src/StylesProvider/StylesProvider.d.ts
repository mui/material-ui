import { GenerateId, Jss } from 'jss';

export interface StylesOptions {
  disableGeneration?: boolean;
  generateClassName?: GenerateId;
  injectFirst?: boolean;
  jss?: Jss;
  // TODO need info @oliviertassinari
  sheetsCache?: {};
  // TODO need info @oliviertassinari
  sheetsManager?: {};
  // TODO need info @oliviertassinari
  sheetsRegistry?: {};
}

export const StylesContext: React.Context<StylesOptions>;

export interface StylesProviderProps extends StylesOptions {
  children?: React.ReactNode;
}

declare const StylesProvider: React.JSXElementConstructor<StylesProviderProps>;

export default StylesProvider;
