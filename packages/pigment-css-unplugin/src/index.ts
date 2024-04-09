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
  type PluginCustomOptions,
} from '@pigment-css/react/utils';
import type { ResolvePluginInstance } from 'webpack';

import { handleUrlReplacement, type AsyncResolver } from './utils';

type NextMeta = {
  type: 'next';
  dev: boolean;
  isServer: boolean;
  outputCss: boolean;
  placeholderCssFile: string;
  projectPath: string;
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
  asyncResolve?: (...args: Parameters<AsyncResolver>) => Promise<string | null>;
  transformSx?: boolean;
} & Partial<WywInJsPluginOptions> &
  Omit<PluginCustomOptions, 'themeArgs'>;

const extensions = ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts'];

function hasCorectExtension(fileName: string) {
  return extensions.some((ext) => fileName.endsWith(ext));
}

const VIRTUAL_CSS_FILE = `\0zero-runtime-styles.css`;
const VIRTUAL_THEME_FILE = `\0zero-runtime-theme.js`;

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
    preprocessor,
    asyncResolve: asyncResolveOpt,
    debug = false,
    sourceMap = false,
    transformSx = true,
    overrideContext,
    tagResolver,
    css,
    ...rest
  } = options;
  const cache = new TransformCacheCollection();
  const { emitter, onDone } = createFileReporter(debug ?? false);
  const cssLookup = meta?.type === 'next' ? globalCssLookup : new Map<string, string>();
  const cssFileLookup = meta?.type === 'next' ? globalCssFileLookup : new Map<string, string>();
  const isNext = meta?.type === 'next';
  const outputCss = isNext && meta.outputCss;
  const babelTransformPlugin: UnpluginOptions = {
    name: 'pigment-css-plugin-transform-babel',
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
  const projectPath = meta?.type === 'next' ? meta.projectPath : process.cwd();

  let webpackResolver: AsyncResolver;

  const asyncResolve: AsyncResolver = async (what, importer, stack) => {
    const result = await asyncResolveOpt?.(what, importer, stack);
    if (typeof result === 'string') {
      return result;
    }
    if (webpackResolver) {
      return webpackResolver(what, importer, stack);
    }
    return asyncResolveFallback(what, importer, stack);
  };

  const withRtl = (selector: string, cssText: string) => {
    return basePreprocessor(selector, cssText, css);
  };

  const wywInJSTransformPlugin: UnpluginOptions = {
    name: 'pigment-css-plugin-transform-wyw-in-js',
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
    async transform(code, filePath) {
      const [id] = filePath.split('?');
      const transformServices = {
        options: {
          filename: id,
          root: process.cwd(),
          preprocessor: preprocessor ?? withRtl,
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
                `${process.env.RUNTIME_PACKAGE_NAME}/exports/remove-prop-types-plugin`,
                'babel-plugin-define-var', // A fix for undefined variables in the eval phase of wyw-in-js, more details on https://github.com/siriwatknp/babel-plugin-define-var?tab=readme-ov-file#problem
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

        if (isNext) {
          // Handle url() replacement in css. Only handled in Next.js as the css is injected
          // through the use of a placeholder CSS file that lies in the nextjs plugin package.
          // So url paths can't be resolved relative to that file.
          if (cssText && cssText.includes('url(')) {
            cssText = await handleUrlReplacement(cssText, id, asyncResolve, projectPath);
          }
        }

        if (sourceMap && result.cssSourceMapText) {
          const map = Buffer.from(result.cssSourceMapText).toString('base64');
          cssText += `/*# sourceMappingURL=data:application/json;base64,${map}*/`;
        }

        // Virtual modules do not work consistently in Next.js (the build is done at least
        // thrice with different combination of parameters) resulting in error in
        // subsequent builds. So we use a placeholder CSS file with the actual CSS content
        // as part of the query params.
        if (isNext) {
          const data = `${meta.placeholderCssFile}?${encodeURIComponent(
            JSON.stringify({
              filename: id.split('/').pop(),
              source: cssText,
            }),
          )}`;
          return {
            // CSS import should be the last so that nested components produce correct CSS order injection.
            code: `${result.code}\nimport ${JSON.stringify(data)};`,
            map: result.sourceMap,
          };
        }

        const slug = slugify(cssText);
        const cssFilename = `${slug}.pigment.css`;
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
      name: 'pigment-css-plugin-theme-tokens',
      enforce: 'pre',
      webpack(compiler) {
        compiler.hooks.normalModuleFactory.tap(pluginName, (nmf) => {
          nmf.hooks.createModule.tap(
            pluginName,
            // @ts-expect-error CreateData is typed as 'object'...
            (createData: { matchResource?: string; settings: { sideEffects?: boolean } }) => {
              if (createData.matchResource && createData.matchResource.endsWith('.pigment.css')) {
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
  plugins.push(wywInJSTransformPlugin);

  // This is already handled separately for Next.js using `placeholderCssFile`
  if (!isNext) {
    plugins.push({
      name: 'pigment-css-plugin-load-output-css',
      enforce: 'pre',
      resolveId(source: string) {
        return cssFileLookup.get(source);
      },
      loadInclude(id) {
        return id.endsWith('.pigment.css');
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

export { type AsyncResolver, extendTheme };
