import { ComposedStyleFunction, StyleFunction } from '../Box';

export default function compose<T extends Array<StyleFunction<any>>>(
  ...args: T
): ComposedStyleFunction<T>;
