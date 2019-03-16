/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { assert } from 'chai';
import getDisplayName, { getFunctionName } from './getDisplayName';

describe('utils/getDisplayName.js', () => {
  describe('getDisplayName', () => {
    it('gets the display name of a React component', () => {
      class SomeComponent extends React.Component {
        render() {
          return <div />;
        }
      }

      class SomeOtherComponent extends React.Component {
        static displayName = 'CustomDisplayName';

        render() {
          return <div />;
        }
      }

      function YetAnotherComponent() {
        return <div />;
      }

      const AndAnotherComponent = () => <div />;

      const AnonymousForwardRefComponent = React.forwardRef((props, ref) => (
        <div {...props} ref={ref} />
      ));

      const ForwardRefComponent = React.forwardRef(function Div(props, ref) {
        return <div {...props} ref={ref} />;
      });

      const NamedForwardRefComponent = React.forwardRef((props, ref) => (
        <div {...props} ref={ref} />
      ));
      NamedForwardRefComponent.displayName = 'Div';

      assert.strictEqual(getDisplayName(SomeComponent), 'SomeComponent');
      assert.strictEqual(getDisplayName(SomeOtherComponent), 'CustomDisplayName');
      assert.strictEqual(getDisplayName(YetAnotherComponent), 'YetAnotherComponent');
      assert.strictEqual(getDisplayName(AndAnotherComponent), 'AndAnotherComponent');
      assert.strictEqual(getDisplayName(() => <div />), 'Component');
      assert.strictEqual(getDisplayName('div'), 'div');
      assert.strictEqual(getDisplayName(AnonymousForwardRefComponent), 'ForwardRef');
      assert.strictEqual(getDisplayName(ForwardRefComponent), 'ForwardRef(Div)');
      assert.strictEqual(getDisplayName(NamedForwardRefComponent), 'Div');
      assert.strictEqual(getDisplayName(), undefined);
      assert.strictEqual(getDisplayName({}), undefined);
      assert.strictEqual(getDisplayName(false), undefined);
    });
  });

  describe('getFunctionName', () => {
    it('gets the name of a function', () => {
      function SomeFunction() {
        return <div />;
      }

      const SomeOtherFunction = () => <div />;

      assert.strictEqual(getFunctionName(SomeFunction), 'SomeFunction');
      assert.strictEqual(getFunctionName(SomeOtherFunction), 'SomeOtherFunction');
    });
  });
});
