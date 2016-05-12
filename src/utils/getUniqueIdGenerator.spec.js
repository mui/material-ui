/* eslint-env mocha */
import {assert} from 'chai';
import getUniqueIdGenerator from './getUniqueIdGenerator';

describe('utils/getUniqueIdGenerator', () => {
  let gen;
  let anotherGen;

  describe('one generator', () => {
    beforeEach(() => {
      gen = getUniqueIdGenerator();
    });

    it('should generate string start with prefix', () => {
      const prefix = 'prefix';
      const uniqueId = getUniqueIdGenerator(prefix)();
      assert.isString(uniqueId);
      assert.isTrue(uniqueId.startsWith(prefix));
    });

    it('should generate different uniqueIds each time it is invoked', () => {
      assert.notStrictEqual(gen(), gen());
    });
  });

  describe('different generators', () => {
    beforeEach(() => {
      gen = getUniqueIdGenerator();
      anotherGen = getUniqueIdGenerator();
    });

    it('should generate same uniqueId when having same invoked times', () => {
      assert.strictEqual(gen(), anotherGen());
    });
  });
});
