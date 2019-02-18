import { assert } from 'chai';
import alignProperty from './alignProperty';

describe('alignProperty', () => {
  const tests = [
    { args: { size: 8, grid: 4 }, expected: 8 },
    { args: { size: 8, grid: 1 }, expected: 8 },
    { args: { size: 8, grid: 9 }, expected: 9 },
    { args: { size: 8, grid: 7 }, expected: 7 },
    { args: { size: 8, grid: 17 }, expected: 0 },
  ];

  tests.forEach(test => {
    const {
      args: { size, grid },
      expected,
    } = test;

    it(`aligns ${size} on grid ${grid} to ${expected}`, () => {
      const sizeAligned = alignProperty({ size, grid });
      assert.strictEqual(sizeAligned, expected);
    });
  });
});
