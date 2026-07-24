import {
  type InjectPropTypesInFileOptions,
  type GetPropTypesFromFileOptions,
  type GeneratePropTypesOptions,
} from '../src';

export type TestOptions = {
  parser?: GetPropTypesFromFileOptions;
  generator?: GeneratePropTypesOptions;
  injector?: InjectPropTypesInFileOptions;
};
