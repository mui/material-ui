import * as Mocha from 'mocha';
import { expect } from 'chai';
import * as React from 'react';
import { stub } from 'sinon';
import { createMochaHooks } from './mochaHooks';
import { createRenderer, act } from './createRenderer';
import describeSkipIf from './describeSkipIf';

describeSkipIf(process.env.VITEST)('mochaHooks', () => {
  // one block per hook.
  describe('afterEach', () => {
    describe('on unexpected console.(warn|error) in afterEach', function suite() {
      const mochaHooks = createMochaHooks(Mocha);

      beforeEach(function beforeEachHook() {
        mochaHooks.beforeAll.forEach((beforeAllMochaHook) => {
          beforeAllMochaHook.call(this);
        });
        mochaHooks.beforeEach.forEach((beforeEachMochaHook) => {
          beforeEachMochaHook.call(this);
        });
      });

      it('throws an error', () => {
        console.warn('unexpected warning');
        console.error('unexpected error');
      });

      afterEach(function afterEachHook() {
        const errorStub = stub(this.test, 'error');
        mochaHooks.afterEach.forEach((afterEachMochaHook) => {
          afterEachMochaHook.call(this);
        });
        mochaHooks.afterAll.forEach((afterAllMochaHook) => {
          afterAllMochaHook.call(this);
        });

        expect(errorStub.callCount).to.equal(2);
        expect(String(errorStub.firstCall.args[0])).to.include(
          'console.warn message #1:\n  unexpected warning\n\nStack:',
        );
        expect(String(errorStub.secondCall.args[0])).to.include(
          'console.error message #1:\n  unexpected error\n\nStack:',
        );
      });
    });

    // TODO: May not be relevant in React 18
    describe('when having missing act() warnings by component', () => {
      const mochaHooks = createMochaHooks(Mocha);
      // missing act warnings only happen in StrictMode
      const { render } = createRenderer({ strict: true });

      beforeEach(function beforeEachHook() {
        mochaHooks.beforeAll.forEach((beforeAllMochaHook) => {
          beforeAllMochaHook.call(this);
        });
        mochaHooks.beforeEach.forEach((beforeEachMochaHook) => {
          beforeEachMochaHook.call(this);
        });
      });

      it('dedupes them', () => {
        const Child = React.forwardRef(function Child() {
          React.useEffect(() => {});
          React.useEffect(() => {});
          return null;
        });

        let unsafeSetState;
        function Parent() {
          const [state, setState] = React.useState(0);
          // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- unsafeSetState is required outside the component
          unsafeSetState = setState;

          React.useEffect(() => {});
          React.useEffect(() => {});

          return <Child rerender={state} />;
        }

        render(<Parent />);

        // not wrapped in act()
        unsafeSetState(1);
        // make sure effects are flushed
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {});
      });

      afterEach(function afterEachHook() {
        const errorStub = stub(this.test, 'error');
        mochaHooks.afterEach.forEach((afterEachMochaHook) => {
          afterEachMochaHook.call(this);
        });
        mochaHooks.afterAll.forEach((afterAllMochaHook) => {
          afterAllMochaHook.call(this);
        });

        expect(errorStub.callCount).to.equal(1);
        const error = String(errorStub.firstCall.args[0]);
        expect(
          error.match(/An update to Parent inside a test was not wrapped in act/g),
        ).to.have.lengthOf(1);
        expect(
          error.match(/An update to Parent ran an effect, but was not wrapped in act/g) ?? [],
        ).to.have.lengthOf(React.startTransition !== undefined ? 0 : 1);
        expect(
          error.match(
            /An update to ForwardRef\(Child\) ran an effect, but was not wrapped in act/g,
          ) ?? [],
        ).to.have.lengthOf(React.startTransition !== undefined ? 0 : 1);
      });
    });
  });
});
