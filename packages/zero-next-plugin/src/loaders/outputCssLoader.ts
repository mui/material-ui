import type { RawLoaderDefinitionFunction } from 'webpack';
import type VirtualModuleStore from '../VirtualModuleStore';

type OutputLoaderOptions = {
  moduleStore: VirtualModuleStore;
};

type LoaderType = RawLoaderDefinitionFunction<OutputLoaderOptions>;

const cssOutputLoader: LoaderType = function cssOutputLoader(content, inputSourceMap) {
  this.async();

  const { moduleStore } = this.getOptions();
  moduleStore
    .getModuleDependencies(this.resourcePath)
    .then((deps) => {
      if (deps) {
        deps.forEach((dep) => {
          this.addDependency(dep);
        });
      }
    })
    .catch((err) => {
      this.emitError(err);
      console.error(`Error getting dependencies for ${this.resourcePath}`);
    })
    .finally(() => {
      this.callback(null, content, inputSourceMap);
    });
};

export default cssOutputLoader;
