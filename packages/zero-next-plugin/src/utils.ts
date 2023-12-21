import type * as Webpack from 'webpack';

type CssModuleType = {
  auto: boolean | RegExp | ((resourcePath: string) => boolean);
  exportGlobals: boolean;
  exportLocalsConvention:
    | 'asIs'
    | 'camelCase'
    | 'camelCaseOnly'
    | 'dashes'
    | 'dashesOnly'
    | ((name: string) => string);
  exportOnlyLocals: boolean;
  getLocalIdent: (
    context: Webpack.LoaderContext<unknown>,
    localIdentName: string,
    exportName: string,
    options: object,
  ) => string;
  localIdentContext: string;
  localIdentHashDigest: string;
  localIdentHashFunction: string;
  localIdentHashSalt: string;
  localIdentName: string;
  localIdentRegExp: string | RegExp;
  mode:
    | 'local'
    | 'global'
    | 'pure'
    | 'icss'
    | ((resourcePath: string) => 'local' | 'global' | 'pure' | 'icss');
  namedExport: boolean;
};

export function isCssModule(
  rule: Webpack.RuleSetRule,
): rule is Webpack.RuleSetRule & { options: { modules: CssModuleType } } {
  return (
    rule.options &&
    typeof rule.options === 'object' &&
    rule.options.modules &&
    typeof rule.options.modules.getLocalIdent === 'function'
  );
}

export function isCssLoader(rule: Webpack.RuleSetRule): boolean {
  return typeof rule.loader === 'string' && rule.loader.includes('css-loader');
}

export function isFSCache(
  cache: Webpack.Configuration['cache'],
): cache is Webpack.FileCacheOptions {
  return typeof cache === 'object' && cache.type === 'filesystem';
}
