import * as Mocha from 'mocha';
import { expect } from 'chai';
import { stub } from 'sinon';
import { createMochaHooks } from './mochaHooks';

describe('mochaHooks', () => {
  // one block per hook.
  describe('afterEach', () => {
    describe('throws on unexpected console.(warn|error) in afterEach', function suite() {
      const mochaHooks = createMochaHooks(Mocha);

      beforeEach(function beforeEachHook() {
        mochaHooks.beforeAll.forEach((beforeAllMochaHook) => {
          beforeAllMochaHook.call(this);
        });
        mochaHooks.beforeEach.forEach((beforeEachMochaHook) => {
          beforeEachMochaHook.call(this);
        });
      });

      it('', () => {
        console.warn('unexpected warning');
        console.error('unexpected error');
      });

      afterEach(function afterEachHook() {
        const errorStub = stub(this.test, 'error');
        mochaHooks.afterEach.forEach((afterEachMochaHook) => {
          afterEachMochaHook.call(this);
        });

        expect(errorStub.callCount).to.equal(2);
        expect(String(errorStub.firstCall.args[0])).to.include(
          'console.warn message:\n  unexpected warning\n\nStack:',
        );
        expect(String(errorStub.secondCall.args[0])).to.include(
          'console.error message:\n  unexpected error\n\nStack:',
        );

        mochaHooks.afterAll.forEach((afterAllMochaHook) => {
          afterAllMochaHook.call(this);
        });
      });
    });
  });
});
