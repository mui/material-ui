import React from 'react';
import { assert } from 'chai';
import { isMuiComponent, isMuiElement } from './reactHelpers';
import { Input, ListItemAvatar, ListItemSecondaryAction, SvgIcon } from '../';

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

  describe('isMuiComponent', () => {
    it('should match static muiName property', () => {
      [
        [Input, 'Input'],
        [ListItemAvatar, 'ListItemAvatar'],
        [ListItemSecondaryAction, 'ListItemSecondaryAction'],
        [SvgIcon, 'SvgIcon'],
      ].forEach(([Component, muiName]) => {
        assert.strictEqual(isMuiComponent(Component, [muiName]), true);
      });
    });
  });
});
