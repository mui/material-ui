import { TestOptions } from '../types';

const options: TestOptions = {
  injector: {
    ensureBabelPluginTransformReactRemovePropTypesIntegration: true,
    includeUnusedProps: true,
  },
  parser: {
    checkDeclarations: true,
  },
};

export default options;
