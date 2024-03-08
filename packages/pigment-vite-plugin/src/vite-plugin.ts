/**
 * Extended from -
 * https://github.com/callstack/linaria/blob/master/packages/vite/src/index.ts
 * for it be customizable in future
 */

import { existsSync } from 'node:fs';
import path from 'node:path';

import type { ModuleNode, Plugin, ResolvedConfig, ViteDevServer, FilterPattern } from 'vite';
import { optimizeDeps, createFilter } from 'vite';

import { slugify, logger as wywLogger, syncResolve } from '@wyw-in-js/shared';
import {
  TransformCacheCollection,
  transform,
  Preprocessor,
  createFileReporter,
  getFileIdx,
  type PluginOptions,
  type IFileReporterOptions,
} from '@wyw-in-js/transform';
import { type PluginCustomOptions } from '@pigment-css/react/utils';

export type VitePluginOptions = {
  debug?: IFileReporterOptions | false | null | undefined;
  exclude?: FilterPattern;
  include?: FilterPattern;
  preprocessor?: Preprocessor;
  sourceMap?: boolean;
  transformLibraries?: string[];
  transformSx?: boolean;
} & Partial<PluginOptions> &
  PluginCustomOptions;

function innerNoop() {
  return null;
}

function outerNoop() {
  return innerNoop;
}

export default function wywVitePlugin({
  debug,
  include,
  exclude,
  sourceMap,
  preprocessor,
  transformLibraries = [],
  overrideContext,
  tagResolver,
  ...rest
}: VitePluginOptions = {}): Plugin {
  const filter = createFilter(include, exclude);
  const cssLookup: { [key: string]: string } = {};
  const cssFileLookup: { [key: string]: string } = {};
  let config: ResolvedConfig;
  let devServer: ViteDevServer;

  const { emitter, onDone } = createFileReporter(debug ?? false);

  // <dependency id, targets>
  const targets: { dependencies: string[]; id: string }[] = [];
  const cache = new TransformCacheCollection();
  return {
    name: 'vite-plugin-zero-runtime',
    enforce: 'post',
    buildEnd() {
      onDone(process.cwd());
    },
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },
    configureServer(_server) {
      devServer = _server;
    },
    resolveId(importeeUrl: string) {
      const [id] = importeeUrl.split('?', 1);
      if (cssLookup[id]) {
        return id;
      }
      return cssFileLookup[id];
    },
    load(url: string) {
      const [id] = url.split('?', 1);
      return cssLookup[id];
    },
    handleHotUpdate(ctx) {
      // it's module, so just transform it
      if (ctx.modules.length) {
        return ctx.modules;
      }

      // Select affected modules of changed dependency
      const affected = targets.filter(
        (x) =>
          // file is dependency of any target
          x.dependencies.some((dep) => dep === ctx.file) ||
          // or changed module is a dependency of any target
          x.dependencies.some((dep) => ctx.modules.some((m) => m.file === dep)),
      );
      const deps = affected.flatMap((target) => target.dependencies);

      for (let i = 0; i < deps.length; i += 1) {
        const depId = deps[i];
        cache.invalidateForFile(depId);
      }

      return affected
        .map((target) => devServer.moduleGraph.getModuleById(target.id))
        .concat(ctx.modules)
        .filter((m): m is ModuleNode => !!m);
    },
    async transform(code: string, url: string) {
      const [id] = url.split('?', 1);

      // Main modification start
      if (id in cssLookup) {
        return null;
      }

      let shouldReturn = url.includes('node_modules');

      if (shouldReturn) {
        shouldReturn = !transformLibraries.some((libName: string) => url.includes(libName));
      }

      if (shouldReturn) {
        return null;
      }
      // Main modification end

      // Do not transform ignored and generated files
      if (!filter(url)) {
        return null;
      }

      const log = wywLogger.extend('vite');
      log('Vite transform', getFileIdx(id));

      const asyncResolve = async (what: string, importer: string, stack: string[]) => {
        // @TODO - Remove this when @mui/system published esm files by default at the base directory
        if (what.startsWith('@mui/system') && !what.includes('esm')) {
          return what.replace('@mui/system', '@mui/system/esm');
        }
        const resolved = await this.resolve(what, importer);
        if (resolved) {
          if (resolved.external) {
            // If module is marked as external, Rollup will not resolve it,
            // so we need to resolve it ourselves with default resolver
            const resolvedId = syncResolve(what, importer, stack);
            log("resolve ✅ '%s'@'%s -> %O\n%s", what, importer, resolved);
            return resolvedId;
          }

          log("resolve ✅ '%s'@'%s -> %O\n%s", what, importer, resolved);
          // Vite adds param like `?v=667939b3` to cached modules
          const resolvedId = resolved.id.split('?', 1)[0];

          if (resolvedId.startsWith('\0')) {
            // \0 is a special character in Rollup that tells Rollup to not include this in the bundle
            // https://rollupjs.org/guide/en/#outputexports
            return null;
          }

          if (!existsSync(resolvedId)) {
            await optimizeDeps(config);
          }

          return resolvedId;
        }

        log("resolve ❌ '%s'@'%s", what, importer);
        throw new Error(`Could not resolve ${what}`);
      };

      const presets = new Set(
        Array.isArray(rest.babelOptions?.presets) ? rest.babelOptions?.presets : [],
      );
      presets.add('@babel/preset-typescript');

      try {
        const result = await transform(
          {
            options: {
              filename: id,
              root: process.cwd(),
              preprocessor,
              pluginOptions: {
                ...rest,
                babelOptions: {
                  ...rest.babelOptions,
                  plugins: [
                    ['babel-plugin-transform-react-remove-prop-types', { mode: 'remove' }],
                    ...(rest.babelOptions?.plugins ?? []),
                  ],
                  presets: Array.from(presets),
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
                    return `${process.env.RUNTIME_PACKAGE_NAME}/exports/${tag}`;
                  }
                  return null;
                },
              },
            },
            cache,
            eventEmitter: emitter,
          },
          code,
          asyncResolve,
        );

        let { cssText, dependencies } = result;

        if (!cssText) {
          return null;
        }

        dependencies ??= [];

        const slug = slugify(cssText);
        const cssFilename = path
          .normalize(`${id.replace(/\.[jt]sx?$/, '')}_${slug}.css`)
          .replace(/\\/g, path.posix.sep);

        const cssRelativePath = path
          .relative(config.root, cssFilename)
          .replace(/\\/g, path.posix.sep);

        const cssId = `/${cssRelativePath}`;

        if (sourceMap && result.cssSourceMapText) {
          const map = Buffer.from(result.cssSourceMapText).toString('base64');
          cssText += `/*# sourceMappingURL=data:application/json;base64,${map}*/`;
        }

        cssLookup[cssFilename] = cssText;
        cssFileLookup[cssId] = cssFilename;

        result.code += `\nimport ${JSON.stringify(cssFilename)};\n`;
        if (devServer?.moduleGraph) {
          const module = devServer.moduleGraph.getModuleById(cssId);

          if (module) {
            devServer.moduleGraph.invalidateModule(module);
            module.lastHMRTimestamp = module.lastInvalidationTimestamp || Date.now();
          }
        }

        for (let i = 0, end = dependencies.length; i < end; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          const depModule = await this.resolve(dependencies[i], url, {
            isEntry: false,
          });
          if (depModule) {
            dependencies[i] = depModule.id;
          }
        }
        const target = targets.find((t) => t.id === id);
        if (!target) {
          targets.push({ id, dependencies });
        } else {
          target.dependencies = dependencies;
        }
        return { code: result.code, map: result.sourceMap };
      } catch (ex) {
        const err = new Error(`MUI: Error while transforming file '${id}'`);
        err.message = (ex as Error).message;
        err.stack = (ex as Error).stack;
        throw err;
      }
    },
  };
}
