/* eslint-disable no-underscore-dangle */
// Thanks https://github.com/sysgears/webpack-virtual-modules/blob/ea53626016db74de66b14401b7377cbc3fc31059/src/index.ts
// This is the webpack-virtual-modules package with the slight alteration that
// we can write modules before the compiler is available.
import path from 'path';

import type { Compiler } from 'webpack';
import VirtualStats from './virtual-stats';
import {
  checkActivation,
  createWebpackData,
  getData,
  getFileStorage,
  getModulePath,
  getReadDirBackend,
  getStatStorage,
  setData,
} from './vmUtils';

let inode = 45000000;

export default class VirtualModulesPlugin {
  private _staticModules: Record<string, string> | null;

  private _compiler: Compiler | null = null;

  private _watcher: any = null;

  public constructor(modules?: Record<string, string>) {
    this._staticModules = modules || null;
  }

  public writeModule(filePath: string, contents: string): void {
    // next-with-linaria patch, if not initialized yet, add to static modules
    if (!this._compiler) {
      if (!this._staticModules) {
        this._staticModules = {};
      }
      this._staticModules[filePath] = contents;
      return;
    }

    checkActivation(this);

    const len = contents ? contents.length : 0;
    const time = Date.now();
    const date = new Date(time);

    const stats = new VirtualStats({
      dev: 8675309,
      nlink: 0,
      uid: 1000,
      gid: 1000,
      rdev: 0,
      blksize: 4096,
      ino: (inode += 1),
      mode: 33188,
      size: len,
      blocks: Math.floor(len / 4096),
      atime: date,
      mtime: date,
      ctime: date,
      birthtime: date,
    });
    const modulePath = getModulePath(filePath, this._compiler);

    if (process.env.WVM_DEBUG) {
      // eslint-disable-next-line no-console
      console.log(this._compiler.name, 'Write virtual module:', modulePath, contents);
    }

    // When using the WatchIgnorePlugin (https://github.com/webpack/webpack/blob/52184b897f40c75560b3630e43ca642fcac7e2cf/lib/WatchIgnorePlugin.js),
    // the original watchFileSystem is stored in `wfs`. The following "unwraps" the ignoring
    // wrappers, giving us access to the "real" watchFileSystem.
    let finalWatchFileSystem = this._watcher && this._watcher.watchFileSystem;

    while (finalWatchFileSystem && finalWatchFileSystem.wfs) {
      finalWatchFileSystem = finalWatchFileSystem.wfs;
    }

    let finalInputFileSystem: any = this._compiler.inputFileSystem;
    while (finalInputFileSystem && finalInputFileSystem._inputFileSystem) {
      finalInputFileSystem = finalInputFileSystem._inputFileSystem;
    }

    finalInputFileSystem._writeVirtualFile(modulePath, stats, contents);
    if (
      finalWatchFileSystem &&
      (finalWatchFileSystem.watcher.fileWatchers.size ||
        finalWatchFileSystem.watcher.fileWatchers.length)
    ) {
      const fileWatchers =
        finalWatchFileSystem.watcher.fileWatchers instanceof Map
          ? Array.from(finalWatchFileSystem.watcher.fileWatchers.values())
          : finalWatchFileSystem.watcher.fileWatchers;
      for (let i = 0; i < fileWatchers.length; i += 1) {
        let fileWatcher = fileWatchers[i];
        if ('watcher' in fileWatcher) {
          fileWatcher = fileWatcher.watcher;
        }
        if (fileWatcher.path === modulePath) {
          if (process.env.DEBUG) {
            // eslint-disable-next-line no-console
            console.log(this._compiler.name, 'Emit file change:', modulePath, time);
          }
          delete fileWatcher.directoryWatcher._cachedTimeInfoEntries;
          fileWatcher.emit('change', time, null);
        }
      }
    }
  }

  public apply(compiler: Compiler) {
    this._compiler = compiler;

    const afterEnvironmentHook = () => {
      let finalInputFileSystem: any = compiler.inputFileSystem;
      while (finalInputFileSystem && finalInputFileSystem._inputFileSystem) {
        finalInputFileSystem = finalInputFileSystem._inputFileSystem;
      }

      if (!finalInputFileSystem._writeVirtualFile) {
        const originalPurge = finalInputFileSystem.purge;

        finalInputFileSystem.purge = () => {
          originalPurge.apply(finalInputFileSystem, []);
          if (finalInputFileSystem._virtualFiles) {
            Object.keys(finalInputFileSystem._virtualFiles).forEach((file) => {
              const data = finalInputFileSystem._virtualFiles[file];
              finalInputFileSystem._writeVirtualFile(file, data.stats, data.contents);
            });
          }
        };

        // @ts-ignore
        finalInputFileSystem._writeVirtualFile = (file, stats, contents) => {
          const statStorage = getStatStorage(finalInputFileSystem);
          const fileStorage = getFileStorage(finalInputFileSystem);
          const readDirStorage = getReadDirBackend(finalInputFileSystem);
          finalInputFileSystem._virtualFiles = finalInputFileSystem._virtualFiles || {};
          finalInputFileSystem._virtualFiles[file] = {
            stats,
            contents,
          };
          setData(statStorage, file, createWebpackData(stats));
          setData(fileStorage, file, createWebpackData(contents));
          const segments = file.split(/[\\/]/);
          let count = segments.length - 1;
          const minCount = segments[0] ? 1 : 0;
          while (count > minCount) {
            const dir = segments.slice(0, count).join(path.sep) || path.sep;
            try {
              finalInputFileSystem.readdirSync(dir);
            } catch (e) {
              const time = Date.now();
              const dirStats = new VirtualStats({
                dev: 8675309,
                nlink: 0,
                uid: 1000,
                gid: 1000,
                rdev: 0,
                blksize: 4096,
                ino: (inode += 1),
                mode: 16877,
                size: stats.size,
                blocks: Math.floor(stats.size / 4096),
                atime: time,
                mtime: time,
                ctime: time,
                birthtime: time,
              });

              setData(readDirStorage, dir, createWebpackData([]));
              setData(statStorage, dir, createWebpackData(dirStats));
            }
            let dirData = getData(getReadDirBackend(finalInputFileSystem), dir);
            // Webpack v4 returns an array, webpack v5 returns an object
            dirData = dirData[1] || dirData.result;
            const filename = segments[count];
            if (dirData.indexOf(filename) < 0) {
              const files = dirData.concat([filename]).sort();
              setData(getReadDirBackend(finalInputFileSystem), dir, createWebpackData(files));
            } else {
              break;
            }
            count -= 1;
          }
        };
      }
    };
    const afterResolversHook = () => {
      if (this._staticModules) {
        const entries = Object.entries(this._staticModules);
        for (let i = 0; i < entries.length; i += 1) {
          const [filePath, contents] = entries[i];
          this.writeModule(filePath, contents);
        }
        this._staticModules = null;
      }
    };

    // @ts-ignore
    const watchRunHook = (watcher, callback) => {
      this._watcher = watcher.compiler || watcher;
      const virtualFiles = (compiler as any).inputFileSystem._virtualFiles;
      const fts = compiler.fileTimestamps as any;
      if (virtualFiles && fts && typeof fts.set === 'function') {
        Object.keys(virtualFiles).forEach((file) => {
          fts.set(file, +virtualFiles[file].stats.mtime);
        });
      }
      callback();
    };

    if (compiler.hooks) {
      compiler.hooks.afterEnvironment.tap('VirtualModulesPlugin', afterEnvironmentHook);
      compiler.hooks.afterResolvers.tap('VirtualModulesPlugin', afterResolversHook);
      compiler.hooks.watchRun.tapAsync('VirtualModulesPlugin', watchRunHook);
    } else {
      (compiler as any).plugin('after-environment', afterEnvironmentHook);
      (compiler as any).plugin('after-resolvers', afterResolversHook);
      (compiler as any).plugin('watch-run', watchRunHook);
    }
  }
}
