/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { expect } from 'chai';
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

      const AnonymousMemoComponent = React.memo((props, ref) => <div {...props} ref={ref} />);

      const MemoComponent = React.memo(function Div(props, ref) {
        return <div {...props} ref={ref} />;
      });

      const NamedMemoComponent = React.memo((props, ref) => <div {...props} ref={ref} />);
      NamedMemoComponent.displayName = 'Div';

      expect(getDisplayName(SomeComponent)).to.equal('SomeComponent');
      expect(getDisplayName(SomeOtherComponent)).to.equal('CustomDisplayName');
      expect(getDisplayName(YetAnotherComponent)).to.equal('YetAnotherComponent');
      expect(getDisplayName(AndAnotherComponent)).to.equal('AndAnotherComponent');
      expect(getDisplayName(() => <div />)).to.equal('Component');
      expect(getDisplayName('div')).to.equal('div');
      expect(getDisplayName(AnonymousForwardRefComponent)).to.equal('ForwardRef');
      expect(getDisplayName(ForwardRefComponent)).to.equal('ForwardRef(Div)');
      expect(getDisplayName(NamedForwardRefComponent)).to.equal('Div');
      expect(getDisplayName(AnonymousMemoComponent)).to.equal('memo');
      expect(getDisplayName(MemoComponent)).to.equal('memo(Div)');
      expect(getDisplayName(NamedMemoComponent)).to.equal('Div');
      expect(getDisplayName()).to.equal(undefined);
      expect(getDisplayName({})).to.equal(undefined);
      expect(getDisplayName(false)).to.equal(undefined);
    });
  });

  describe('getFunctionName', () => {
    it('gets the name of a function', () => {
      function SomeFunction() {
        return <div />;
      }

      const SomeOtherFunction = () => <div />;

      expect(getFunctionName(SomeFunction)).to.equal('SomeFunction');
      expect(getFunctionName(SomeOtherFunction)).to.equal('SomeOtherFunction');
    });
  });
});
