/* eslint-disable no-console */

import { spy } from 'sinon';

/**
 * One alternative to this module is to use something like:
 *
 * let warning;
 *
 * beforeEach(() => {
 *   warning = mock(console).expects('warn');
 * });
 *
 * afterEach(() => {
 *   warning.restore();
 * });
 */
class ConsoleWarnMock {
  consoleWarnContainer;

  spy = () => {
    this.consoleWarnContainer = console.warn;
    console.warn = spy();
  };

  reset = () => {
    console.warn = this.consoleWarnContainer;
    delete this.consoleWarnContainer;
  };

  callCount = () => {
    if (this.consoleWarnContainer) {
      return console.warn.callCount;
    }

    throw new Error('Requested call count before spy() was called');
  };

  args = () => {
    if (this.consoleWarnContainer) {
      return console.warn.args;
    }

    throw new Error('Requested call count before spy() was called');
  };
}

export default new ConsoleWarnMock();
