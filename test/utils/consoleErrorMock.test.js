// @flow
/* eslint-disable no-console */

import { assert } from 'chai';
import consoleErrorMock from './consoleErrorMock';

describe('consoleErrorMock()', () => {
  describe('callCount()', () => {
    it('should throw error when calling callCount() before spy()', () => {
      assert.throws(() => {
        consoleErrorMock.callCount();
      }, 'Requested call count before spy() was called');
    });
  });

  describe('args()', () => {
    it('should throw error when calling args() before spy()', () => {
      assert.throws(() => {
        consoleErrorMock.args();
      }, 'Requested call count before spy() was called');
    });
  });

  describe('spy()', () => {
    it('should place a spy in console.error', () => {
      consoleErrorMock.spy();
      assert.strictEqual(console.error.hasOwnProperty('isSinonProxy'), true);
      consoleErrorMock.reset();
      assert.strictEqual(console.error.hasOwnProperty('isSinonProxy'), false);
    });

    it('should keep the call count', () => {
      consoleErrorMock.spy();
      console.error();
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      consoleErrorMock.reset();
    });
  });
});
