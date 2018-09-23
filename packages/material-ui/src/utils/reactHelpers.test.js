import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { isMuiElement, setRef } from './reactHelpers';
import { Input, ListItemAvatar, ListItemSecondaryAction, SvgIcon } from '..';

describe('utils/reactHelpers.js', () => {
  describe('isMuiElement', () => {
    it('should match static muiName property', () => {
      const Component = () => null;
      Component.muiName = 'Component';

      assert.strictEqual(isMuiElement(<Component />, ['Component']), true);
      assert.strictEqual(isMuiElement(<div />, ['Input']), false);
      assert.strictEqual(isMuiElement(null, ['SvgIcon']), false);
      assert.strictEqual(isMuiElement('TextNode', ['SvgIcon']), false);
    });

    it('should be truthy for matching components', () => {
      [
        [Input, 'Input'],
        [ListItemAvatar, 'ListItemAvatar'],
        [ListItemSecondaryAction, 'ListItemSecondaryAction'],
        [SvgIcon, 'SvgIcon'],
      ].forEach(([Component, muiName]) => {
        assert.strictEqual(isMuiElement(<Component />, [muiName]), true);
      });
    });
  });

  describe('setRef', () => {
    it('can handle callback refs', () => {
      const ref = spy();
      const instance = 'proxy';

      setRef(ref, instance);

      assert.isTrue(ref.called);
      assert.strictEqual(ref.firstCall.args[0], instance);
    });

    it('can handle ref objects', () => {
      const ref = React.createRef();
      const instance = 'proxy';

      setRef(ref, instance);

      assert.strictEqual(ref.current, instance);
    });

    it('ignores falsy refs without errors', () => {
      const instance = 'proxy';

      // all no-ops
      setRef(undefined, instance);
      setRef(null, instance);
    });

    it('throws on legacy string refs', () => {
      assert.throws(() => setRef('stringRef1', 'proxy'));
    });
  });
});
