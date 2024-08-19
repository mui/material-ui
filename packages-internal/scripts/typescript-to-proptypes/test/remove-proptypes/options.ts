import { TestOptions } from '../types';

const options: TestOptions = {
  injector: {
    ensureBabelPluginTransformReactRemovePropTypesIntegration: true,
    includeUnusedProps: true,
  },
  parser: {
    checkDeclarations: true,
  } as TestOptions['parser'],
};

export default options;
