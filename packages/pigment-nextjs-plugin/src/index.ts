import * as path from 'node:path';
import type { NextConfig } from 'next';
import { findPagesDir } from 'next/dist/lib/find-pages-dir';
import {
  webpack as webpackPlugin,
  extendTheme,
  type PigmentOptions as BasePigmentOptions,
} from '@pigment-css/unplugin';

export type PigmentOptions = BasePigmentOptions & {
  asyncResolve?: (what: string) => string | null;
};

const extractionFile = path.join(
  path.dirname(require.resolve('../package.json')),
  'zero-virtual.css',
);

export function withPigment(nextConfig: NextConfig, pigmentConfig: PigmentOptions) {
  const { babelOptions, asyncResolve, ...rest } = pigmentConfig;
  const webpack: Exclude<NextConfig['webpack'], undefined> = (config, context) => {
    const { dir, dev, isServer, config: resolvedNextConfig } = context;

    const findPagesDirResult = findPagesDir(
      dir,
      // @ts-expect-error next.js v12 accepts 2 arguments, while v13 only accepts 1
      resolvedNextConfig.experimental?.appDir ?? false,
    );

    let hasAppDir = false;

    if ('appDir' in resolvedNextConfig.experimental) {
      hasAppDir =
        !!resolvedNextConfig.experimental.appDir &&
        !!(findPagesDirResult && findPagesDirResult.appDir);
    } else {
      hasAppDir = !!(findPagesDirResult && findPagesDirResult.appDir);
    }

    config.module.rules.unshift({
      enforce: 'pre',
      test: (filename: string) => filename.endsWith('zero-virtual.css'),
      use: require.resolve('../loader'),
    });
    config.plugins.push(
      webpackPlugin({
        ...rest,
        meta: {
          type: 'next',
          dev,
          isServer,
          outputCss: dev || hasAppDir || !isServer,
          placeholderCssFile: extractionFile,
        },
        asyncResolve(what) {
          if (what === 'next/image') {
            return require.resolve('../next-image');
          }
          if (what.startsWith('next/font')) {
            return require.resolve('../next-font');
          }
          return asyncResolve?.(what) ?? null;
        },
        babelOptions: {
          ...babelOptions,
          presets: [...(babelOptions?.presets ?? []), 'next/babel'],
        },
      }),
    );

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, context);
    }
    config.ignoreWarnings = config.ignoreWarnings ?? [];
    config.ignoreWarnings.push({
      module: /(zero-virtual\.css)|(runtime\/styles\.css)/,
    });
    return config;
  };
  return {
    ...nextConfig,
    webpack,
  };
}

export { extendTheme };
