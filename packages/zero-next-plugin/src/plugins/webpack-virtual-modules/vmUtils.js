/* eslint-disable no-underscore-dangle */
import * as path from 'node:path';

export function checkActivation(instance) {
  if (!instance._compiler) {
    throw new Error('You must use this plugin only after creating webpack instance!');
  }
}

export function getModulePath(filePath, compiler) {
  return path.isAbsolute(filePath) ? filePath : path.join(compiler.context, filePath);
}

export function createWebpackData(result) {
  return (backendOrStorage) => {
    // In Webpack v5, this variable is a "Backend", and has the data stored in a field
    // _data. In V4, the `_` prefix isn't present.
    if (backendOrStorage._data) {
      const curLevelIdx = backendOrStorage._currentLevel;
      const curLevel = backendOrStorage._levels[curLevelIdx];
      return {
        result,
        level: curLevel,
      };
    }
    // Webpack 4
    return [null, result];
  };
}

export function getData(storage, key) {
  // Webpack 5
  if (storage._data instanceof Map) {
    return storage._data.get(key);
  }
  if (storage._data) {
    return storage.data[key];
  }
  if (storage.data instanceof Map) {
    // Webpack v4
    return storage.data.get(key);
  }
  return storage.data[key];
}

export function setData(backendOrStorage, key, valueFactory) {
  const value = valueFactory(backendOrStorage);

  // Webpack v5
  if (backendOrStorage._data instanceof Map) {
    backendOrStorage._data.set(key, value);
  } else if (backendOrStorage._data) {
    backendOrStorage.data[key] = value;
  } else if (backendOrStorage.data instanceof Map) {
    // Webpack 4
    backendOrStorage.data.set(key, value);
  } else {
    backendOrStorage.data[key] = value;
  }
}

export function getStatStorage(fileSystem) {
  if (fileSystem._statStorage) {
    // Webpack v4
    return fileSystem._statStorage;
  }
  if (fileSystem._statBackend) {
    // webpack v5
    return fileSystem._statBackend;
  }
  // Unknown version?
  throw new Error("Couldn't find a stat storage");
}

export function getFileStorage(fileSystem) {
  if (fileSystem._readFileStorage) {
    // Webpack v4
    return fileSystem._readFileStorage;
  }
  if (fileSystem._readFileBackend) {
    // Webpack v5
    return fileSystem._readFileBackend;
  }
  throw new Error("Couldn't find a readFileStorage");
}

export function getReadDirBackend(fileSystem) {
  if (fileSystem._readdirBackend) {
    return fileSystem._readdirBackend;
  }
  if (fileSystem._readdirStorage) {
    return fileSystem._readdirStorage;
  }
  throw new Error("Couldn't find a readDirStorage from Webpack Internals");
}
