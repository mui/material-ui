/* eslint-disable no-console */

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
class ConsoleErrorMock {
  consoleErrorContainer;

  spy = () => {
    this.consoleErrorContainer = console.error;
    console.error = spy();
  };

  reset = () => {
    console.error = this.consoleErrorContainer;
    delete this.consoleErrorContainer;
  };

  callCount = () => {
    if (this.consoleErrorContainer) {
      return console.error.callCount;
    }

    throw new Error('Requested call count before spy() was called');
  };

  args = () => {
    if (this.consoleErrorContainer) {
      return console.error.args;
    }

    throw new Error('Requested call count before spy() was called');
  };
}

export default new ConsoleErrorMock();
