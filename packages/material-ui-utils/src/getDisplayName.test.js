/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-multi-comp */
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

      assert.strictEqual(getDisplayName(SomeComponent), 'SomeComponent');
      assert.strictEqual(getDisplayName(SomeOtherComponent), 'CustomDisplayName');
      assert.strictEqual(getDisplayName(YetAnotherComponent), 'YetAnotherComponent');
      assert.strictEqual(getDisplayName(AndAnotherComponent), 'AndAnotherComponent');
      assert.strictEqual(getDisplayName(() => <div />), 'Component');
      assert.strictEqual(getDisplayName('div'), 'div');
      assert.strictEqual(getDisplayName(), undefined);
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
