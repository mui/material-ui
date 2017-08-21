// @flow
import * as React from 'react';
import { assert } from 'chai';
import { isMuiComponent } from './reactHelpers';
import { Input, ListItemAvatar, ListItemSecondaryAction, SvgIcon } from '../';

describe('utils/reactHelpers.js', () => {
  describe('isMuiComponent', () => {
    it('should match static muiName property', () => {
      const Component = () => null;
      Component.muiName = 'Component';

      assert.strictEqual(isMuiComponent(<Component />, 'Component'), true);
      assert.strictEqual(isMuiComponent(<div />, 'Input'), false);
      assert.strictEqual(isMuiComponent(null, 'SvgIcon'), false);
      assert.strictEqual(isMuiComponent('TextNode', 'SvgIcon'), false);
    });

    it('should be truthy for matching components', () => {
      [
        [Input, 'Input'],
        [ListItemAvatar, 'ListItemAvatar'],
        [ListItemSecondaryAction, 'ListItemSecondaryAction'],
        [SvgIcon, 'SvgIcon'],
      ].forEach(([Component, muiName]) => {
        assert.strictEqual(isMuiComponent(<Component />, muiName), true);
      });
    });
  });
});
