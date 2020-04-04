/* eslint-disable no-console */
import utilFormat from 'format-util';
import { spy } from 'sinon';

/**
 * One alternative to this module is to use something like:
 *
 * let warning;
 *
 * beforeEach(() => {
 *   warning = mock(console).expects('error');
 * });
 *
 * afterEach(() => {
 *   warning.restore();
 * });
 */
export class ConsoleMock {
  consoleErrorContainer;

  constructor(methodName) {
    this.methodName = methodName;
  }

  spy = () => {
    this.consoleErrorContainer = console[this.methodName];
    console[this.methodName] = spy();
  };

  reset = () => {
    console[this.methodName] = this.consoleErrorContainer;
    delete this.consoleErrorContainer;
  };

  callCount = () => {
    if (this.consoleErrorContainer) {
      return console[this.methodName].callCount;
    }

    throw new Error('Requested call count before spy() was called');
  };

  args = () => {
    throw new TypeError(
      'args() was removed in favor of messages(). ' +
        'Use messages() to match against the actual error message that will be displayed in the console.',
    );
  };

  /**
   * returns the formatted message for each call
   *
   * you could call console[this.methodName]("type %s", "foo") which would log
   * "type foo". If you  want to assert on the actual message use messages() instead
   */
  messages = () => {
    if (!this.consoleErrorContainer) {
      throw new Error('Requested call count before spy() was called');
    }

    /**
     * @type {import('sinon').SinonSpy}
     */
    const consoleSpy = console[this.methodName];
    return consoleSpy.args.map((loggerArgs) => {
      return utilFormat(...loggerArgs);
    });
  };
}

export const consoleWarnMock = new ConsoleMock('warn');

export default new ConsoleMock('error');
