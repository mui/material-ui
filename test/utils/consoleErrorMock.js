// @flow weak
/* eslint-disable no-console */

import { spy } from 'sinon';

class ConsoleErrorMock {
  consoleErrorContainer;

  spy = () => {
    this.consoleErrorContainer = console.error;
    // $FlowFixMe
    console.error = spy();
  };

  reset = () => {
    // $FlowFixMe
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
