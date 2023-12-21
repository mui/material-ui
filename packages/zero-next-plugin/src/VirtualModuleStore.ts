import Cache, { type FileSystemCache } from 'file-system-cache';
import path from 'path';
import type * as Webpack from 'webpack';

import VirtualModulesPlugin from './plugins/webpack-virtual-modules';
import { isFSCache } from './utils';

type CachedFile = {
  path: string;
  value: {
    content: string;
    path: string;
  };
};

export default class VirtualModuleStore {
  private vmInstances: Map<string, VirtualModulesPlugin> = new Map();

  private initialCachedFiles: Record<string, string> = {};

  private cssCache: FileSystemCache | undefined;

  private dependencyCache: FileSystemCache | undefined;

  constructor(config: Webpack.Configuration) {
    this.addModule = this.addModule.bind(this);

    if (isFSCache(config.cache)) {
      const baseDir = config.cache.cacheDirectory || path.join(process.cwd(), '.linaria-cache');

      const cachePath = path.join(baseDir, `linaria-${config.mode}`);
      this.cssCache = Cache({
        basePath: cachePath,
        ns: config.cache.version,
      });

      this.cssCache.load().then((cachedFiles) => {
        cachedFiles.files.forEach(({ value: { content, path: filePath } }: CachedFile) => {
          this.initialCachedFiles[filePath] = content;
          this.addModule(filePath, content, false);
        });
      });

      this.dependencyCache = Cache({
        basePath: cachePath,
        ns: `${config.cache.version}-deps`,
      });
    }
  }

  public createStore(name = 'default') {
    const vm = new VirtualModulesPlugin(this.initialCachedFiles);
    this.vmInstances.set(name, vm);
    return vm;
  }

  public addModule(filePath: string, content: string, addToCache = true) {
    this.vmInstances.forEach((vm) => {
      vm.writeModule(filePath, content);
    });
    if (this.cssCache && addToCache) {
      this.cssCache.set(filePath, { content, path: filePath });
    }
  }

  public addModuleDependencies(modulePath: string, deps: string[]) {
    if (this.dependencyCache) {
      this.dependencyCache.set(modulePath, deps);
    }
  }

  public async getModuleDependencies(modulePath: string): Promise<string[] | null> {
    if (this.dependencyCache) {
      return this.dependencyCache.get(modulePath);
    }
    return null;
  }
}
