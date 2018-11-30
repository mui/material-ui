import { GenerateClassName, JSS } from 'jss';

interface StylesOptions {
  disableGeneration?: boolean;
  generateClassName?: GenerateClassName;
  jss?: JSS;
  // TODO need info @oliviertassinari
  sheetsCache?: {};
  // TODO need info @oliviertassinari
  sheetsManager?: {};
  // TODO need info @oliviertassinari
  sheetsRegistry?: {};
}

declare const StylesContext: React.Context<StylesOptions>;

export interface StylesProviderProps extends StylesOptions {
  children: React.ReactNode;
}
declare const StylesProvider: React.ComponentType<StylesProviderProps>;
export default StylesProvider;
