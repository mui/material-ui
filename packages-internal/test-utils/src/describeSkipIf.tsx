// Shim for vitest describe.skipIf to be able to run mocha and vitest side-by-side
// TODO: Remove after migration to vitest is complete
const describeSkipIf: (condition: boolean) => Mocha.PendingSuiteFunction =
  (describe as any).skipIf ??
  function describeSkipIf(condition: boolean) {
    return condition ? describe.skip : describe;
  };

export default describeSkipIf;
