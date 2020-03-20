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

  describe('args', () => {
    it('was removed but throws a descriptive error', () => {
      assert.throws(
        () => consoleErrorMock.args(),
        'args() was removed in favor of messages(). Use messages() to match against the actual error message that will be displayed in the console.',
      );
    });
  });

  describe('messages()', () => {
    describe('when not spying', () => {
      it('should throw error', () => {
        assert.throws(() => {
          consoleErrorMock.messages();
        }, 'Requested call count before spy() was called');
      });
    });

    describe('when spying', () => {
      beforeEach(() => {
        consoleErrorMock.spy();
      });

      afterEach(() => {
        consoleErrorMock.reset();
      });

      it('returns the formatted output', () => {
        console.error('expected %s but got %s', '1', 2);

        assert.strictEqual(consoleErrorMock.messages()[0], 'expected 1 but got 2');
      });
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
