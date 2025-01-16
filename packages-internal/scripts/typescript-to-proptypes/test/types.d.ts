import type {
  InjectPropTypesInFileOptions,
  GetPropTypesFromFileOptions,
  GeneratePropTypesOptions,
} from '../src';

export type TestOptions = {
  parser?: GetPropTypesFromFileOptions;
  generator?: GeneratePropTypesOptions;
  injector?: InjectPropTypesInFileOptions;
};
