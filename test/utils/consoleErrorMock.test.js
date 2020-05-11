import { expect } from 'chai';
import consoleErrorMock from './consoleErrorMock';

describe('consoleErrorMock()', () => {
  describe('callCount()', () => {
    it('should throw error when calling callCount() before spy()', () => {
      expect(() => {
        consoleErrorMock.callCount();
      }).to.throw('Requested call count before spy() was called');
    });
  });

  describe('args', () => {
    it('was removed but throws a descriptive error', () => {
      expect(() => consoleErrorMock.args()).to.throw(
        'args() was removed in favor of messages(). Use messages() to match against the actual error message that will be displayed in the console.',
      );
    });
  });

  describe('messages()', () => {
    describe('when not spying', () => {
      it('should throw error', () => {
        expect(() => {
          consoleErrorMock.messages();
        }).to.throw('Requested call count before spy() was called');
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

        expect(consoleErrorMock.messages()[0]).to.equal('expected 1 but got 2');
      });
    });
  });

  describe('spy()', () => {
    it('should place a spy in console.error', () => {
      consoleErrorMock.spy();
      expect(console.error.hasOwnProperty('isSinonProxy')).to.equal(true);
      consoleErrorMock.reset();
      expect(console.error.hasOwnProperty('isSinonProxy')).to.equal(false);
    });

    it('should keep the call count', () => {
      consoleErrorMock.spy();
      console.error();
      expect(consoleErrorMock.callCount()).to.equal(1);
      consoleErrorMock.reset();
    });
  });
});
