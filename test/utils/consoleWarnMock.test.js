/* eslint-disable no-console */

import { assert } from 'chai';
import consoleWarnMock from './consoleWarnMock';

describe('consoleWarnMock()', () => {
  describe('callCount()', () => {
    it('should throw error when calling callCount() before spy()', () => {
      assert.throws(() => {
        consoleWarnMock.callCount();
      }, 'Requested call count before spy() was called');
    });
  });

  describe('args()', () => {
    it('should throw error when calling args() before spy()', () => {
      assert.throws(() => {
        consoleWarnMock.args();
      }, 'Requested call count before spy() was called');
    });
  });

  describe('spy()', () => {
    it('should place a spy in console.warn', () => {
      consoleWarnMock.spy();
      assert.strictEqual(console.warn.hasOwnProperty('isSinonProxy'), true);
      consoleWarnMock.reset();
      assert.strictEqual(console.warn.hasOwnProperty('isSinonProxy'), false);
    });

    it('should keep the call count', () => {
      consoleWarnMock.spy();
      console.warn();
      assert.strictEqual(consoleWarnMock.callCount(), 1);
      consoleWarnMock.reset();
    });
  });
});
