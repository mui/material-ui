import * as path from 'node:path';
import { transformAsync } from '@babel/core';
import {
  type Preprocessor,
  type PluginOptions as WywInJsPluginOptions,
  type IFileReporterOptions,
  TransformCacheCollection,
  transform,
  createFileReporter,
} from '@wyw-in-js/transform';
import { asyncResolveFallback, slugify } from '@wyw-in-js/shared';
import {
  UnpluginFactoryOutput,
  WebpackPluginInstance,
  createUnplugin,
  UnpluginOptions,
} from 'unplugin';
import {
  preprocessor as basePreprocessor,
  generateTokenCss,
  generateThemeTokens,
  extendTheme,
  type Theme as BaseTheme,
} from '@pigment-css/react/utils';
import type { ResolvePluginInstance } from 'webpack';

type NextMeta = {
  type: 'next';
  dev: boolean;
  isServer: boolean;
  outputCss: boolean;
  placeholderCssFile: string;
};

type ViteMeta = {
  type: 'vite';
};

type WebpackMeta = {
  type: 'webpack';
};

type Meta = NextMeta | ViteMeta | WebpackMeta;

export type PigmentOptions<Theme extends BaseTheme = BaseTheme> = {
  theme?: Theme;
  transformLibraries?: string[];
  preprocessor?: Preprocessor;
  debug?: IFileReporterOptions | false;
  sourceMap?: boolean;
  meta?: Meta;
  asyncResolve?: (what: string) => string | null;
  transformSx?: boolean;
} & Partial<WywInJsPluginOptions>;

const extensions = ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts'];

function hasCorectExtension(fileName: string) {
  return extensions.some((ext) => fileName.endsWith(ext));
}

const VIRTUAL_CSS_FILE = `\0zero-runtime-styles.css`;
const VIRTUAL_THEME_FILE = `\0zero-runtime-theme.js`;

type AsyncResolver = (what: string, importer: string, stack: string[]) => Promise<string>;

function isZeroRuntimeThemeFile(fileName: string) {
  return fileName === VIRTUAL_CSS_FILE || fileName === VIRTUAL_THEME_FILE;
}

function isZeroRuntimeProcessableFile(fileName: string, transformLibraries: string[]) {
  const isNodeModule = fileName.includes('node_modules');
  const isTransformableFile =
    isNodeModule && transformLibraries.some((libName) => fileName.includes(libName));
  return (
    hasCorectExtension(fileName) &&
    (isTransformableFile || !isNodeModule) &&
    !fileName.includes('runtime/build')
  );
}

/**
 * Next.js initializes the plugin multiple times. So all the calls
 * have to share the same Maps.
 */
const globalCssFileLookup = new Map<string, string>();
const globalCssLookup = new Map<string, string>();

const pluginName = 'PigmentCSSWebpackPlugin';

function innerNoop() {
  return null;
}

function outerNoop() {
  return innerNoop;
}

export const plugin = createUnplugin<PigmentOptions, true>((options) => {
  const {
    theme,
    meta,
    transformLibraries = [],
    preprocessor = basePreprocessor,
    asyncResolve: asyncResolveOpt,
    debug = false,
    sourceMap = false,
    transformSx = true,
    overrideContext,
    tagResolver,
    ...rest
  } = options;
  const cache = new TransformCacheCollection();
  const { emitter, onDone } = createFileReporter(debug ?? false);
  const cssLookup = meta?.type === 'next' ? globalCssLookup : new Map<string, string>();
  const cssFileLookup = meta?.type === 'next' ? globalCssFileLookup : new Map<string, string>();
  const isNext = meta?.type === 'next';
  const outputCss = isNext && meta.outputCss;
  const babelTransformPlugin: UnpluginOptions = {
    name: 'zero-plugin-transform-babel',
    enforce: 'post',
    transformInclude(id) {
      return isZeroRuntimeProcessableFile(id, transformLibraries);
    },
    async transform(code, id) {
      const result = await transformAsync(code, {
        filename: id,
        babelrc: false,
        configFile: false,
        plugins: [[`${process.env.RUNTIME_PACKAGE_NAME}/exports/sx-plugin`]],
      });
      if (!result) {
        return null;
      }
      return {
        code: result.code ?? code,
        map: result.map,
      };
    },
  };

  let webpackResolver: AsyncResolver;

  const asyncResolve: AsyncResolver = async (what, importer, stack) => {
    const result = asyncResolveOpt?.(what);
    if (typeof result === 'string') {
      return result;
    }
    // Use Webpack's resolver to resolve actual path but
    // ignore next.js files during evaluation phase of WyW
    if (webpackResolver && !what.startsWith('next')) {
      return webpackResolver(what, importer, stack);
    }
    return asyncResolveFallback(what, importer, stack);
  };

  const linariaTransformPlugin: UnpluginOptions = {
    name: 'zero-plugin-transform-linaria',
    enforce: 'post',
    buildEnd() {
      onDone(process.cwd());
    },
    transformInclude(id) {
      return isZeroRuntimeProcessableFile(id, transformLibraries);
    },
    webpack(compiler) {
      const resolverPlugin: ResolvePluginInstance = {
        apply(resolver) {
          webpackResolver = function webpackAsyncResolve(
            what: string,
            importer: string,
            stack: string[],
          ) {
            const context = path.isAbsolute(importer)
              ? path.dirname(importer)
              : path.join(process.cwd(), path.dirname(importer));
            return new Promise((resolve, reject) => {
              resolver.resolve({}, context, what, { stack: new Set(stack) }, (err, result) => {
                if (err) {
                  reject(err);
                } else if (result) {
                  resolve(result);
                } else {
                  reject(new Error(`${process.env.PACKAGE_NAME}: Cannot resolve ${what}`));
                }
              });
            });
          };
        },
      };
      compiler.options.resolve.plugins = compiler.options.resolve.plugins || [];
      compiler.options.resolve.plugins.push(resolverPlugin);
    },
    async transform(code, id) {
      const transformServices = {
        options: {
          filename: id,
          root: process.cwd(),
          preprocessor,
          pluginOptions: {
            ...rest,
            themeArgs: {
              theme,
            },
            overrideContext(context: Record<string, unknown>, filename: string) {
              if (overrideContext) {
                return overrideContext(context, filename);
              }
              if (!context.$RefreshSig$) {
                context.$RefreshSig$ = outerNoop;
              }
              return context;
            },
            tagResolver(source: string, tag: string) {
              const tagResult = tagResolver?.(source, tag);
              if (tagResult) {
                return tagResult;
              }
              if (source.endsWith('/zero-styled')) {
                return require.resolve(`${process.env.RUNTIME_PACKAGE_NAME}/exports/${tag}`);
              }
              return null;
            },
            babelOptions: {
              ...rest.babelOptions,
              plugins: [
                ['babel-plugin-transform-react-remove-prop-types', { mode: 'remove' }],
                ...(rest.babelOptions?.plugins ?? []),
              ],
            },
          },
        },
        cache,
        eventEmitter: emitter,
      };

      try {
        const result = await transform(transformServices, code, asyncResolve);

        if (!result.cssText) {
          return null;
        }

        let { cssText } = result;
        if (isNext && !outputCss) {
          return {
            code: result.code,
            map: result.sourceMap,
          };
        }
        const slug = slugify(cssText);
        const cssFilename = `${slug}.zero.css`;

        if (sourceMap && result.cssSourceMapText) {
          const map = Buffer.from(result.cssSourceMapText).toString('base64');
          cssText += `/*# sourceMappingURL=data:application/json;base64,${map}*/`;
        }

        // Virtual modules do not work consistently in Next.js (the build is done at least
        // thrice) resulting in error in subsequent builds. So we use a placeholder CSS
        // file with the actual CSS content as part of the query params.
        if (isNext) {
          const data = `${meta.placeholderCssFile}?${encodeURIComponent(
            JSON.stringify({
              filename: cssFilename,
              source: cssText,
            }),
          )}`;
          return {
            // CSS import should be the last so that nested components produce correct CSS order injection.
            code: `${result.code}\nimport ${JSON.stringify(data)};`,
            map: result.sourceMap,
          };
        }
        const cssId = `./${cssFilename}`;
        cssFileLookup.set(cssId, cssFilename);
        cssLookup.set(cssFilename, cssText);
        return {
          code: `${result.code}\nimport ${JSON.stringify(`./${cssFilename}`)};`,
          map: result.sourceMap,
        };
      } catch (e) {
        const error = new Error((e as Error).message);
        error.stack = (e as Error).stack;
        throw error;
      }
    },
  };

  const plugins: Array<UnpluginOptions> = [
    {
      name: 'zero-plugin-theme-tokens',
      enforce: 'pre',
      webpack(compiler) {
        compiler.hooks.normalModuleFactory.tap(pluginName, (nmf) => {
          nmf.hooks.createModule.tap(
            pluginName,
            // @ts-expect-error CreateData is typed as 'object'...
            (createData: { matchResource?: string; settings: { sideEffects?: boolean } }) => {
              if (createData.matchResource && createData.matchResource.endsWith('.zero.css')) {
                createData.settings.sideEffects = true;
              }
            },
          );
        });
      },
      ...(isNext
        ? {
            transformInclude(id) {
              return (
                // this file should exist in the package
                id.endsWith(`${process.env.RUNTIME_PACKAGE_NAME}/styles.css`) ||
                id.endsWith('/pigment-css-react/styles.css') ||
                id.includes(`${process.env.RUNTIME_PACKAGE_NAME}/theme`) ||
                id.includes('/pigment-css-react/theme')
              );
            },
            transform(_code, id) {
              if (id.endsWith('styles.css')) {
                return theme ? generateTokenCss(theme) : _code;
              }
              if (id.includes('pigment-css-react/theme')) {
                return `export default ${
                  theme ? JSON.stringify(generateThemeTokens(theme)) : '{}'
                };`;
              }
              return null;
            },
          }
        : {
            resolveId(source: string) {
              if (source === `${process.env.RUNTIME_PACKAGE_NAME}/styles.css`) {
                return VIRTUAL_CSS_FILE;
              }
              if (source === `${process.env.RUNTIME_PACKAGE_NAME}/theme`) {
                return VIRTUAL_THEME_FILE;
              }
              return null;
            },
            loadInclude(id) {
              return isZeroRuntimeThemeFile(id);
            },
            load(id) {
              if (id === VIRTUAL_CSS_FILE && theme) {
                return generateTokenCss(theme);
              }
              if (id === VIRTUAL_THEME_FILE) {
                return `export default ${
                  theme ? JSON.stringify(generateThemeTokens(theme)) : '{}'
                };`;
              }
              return null;
            },
          }),
    },
  ];

  if (transformSx) {
    plugins.push(babelTransformPlugin);
  }
  plugins.push(linariaTransformPlugin);

  // This is already handled separately for Next.js using `placeholderCssFile`
  if (!isNext) {
    plugins.push({
      name: 'zero-plugin-load-output-css',
      enforce: 'pre',
      resolveId(source: string) {
        return cssFileLookup.get(source);
      },
      loadInclude(id) {
        return id.endsWith('.zero.css');
      },
      load(id) {
        return cssLookup.get(id) ?? '';
      },
    });
  }
  return plugins;
});

export const webpack = plugin.webpack as unknown as UnpluginFactoryOutput<
  PigmentOptions,
  WebpackPluginInstance
>;

export { extendTheme };
