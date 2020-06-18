import { ParserOptions, GenerateOptions, InjectOptions } from '../src';

export type TestOptions = {
  parser?: Partial<ParserOptions>;
  generator?: Partial<GenerateOptions>;
  injector?: Partial<InjectOptions>;
};
