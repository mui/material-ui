import 'chai';
import type { AssertionError as RealAssertionError } from 'assertion-error';

declare module 'chai' {
  // Looks like they forgot to export the AssertionError type in @types/chai
  export const AssertionError: typeof RealAssertionError;
}
