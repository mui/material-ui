/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {PlainStepConnector as StepConnector} from './StepConnector';
import getMuiTheme from '../styles/getMuiTheme';

describe('<StepConnector />', () => {
  const muiTheme = getMuiTheme();
  const themedShallow = (node) => {
    const context = {muiTheme, stepper: {orientation: 'horizontal'}};
    return shallow(node, {context});
  };

  describe('rendering', () => {
    const wrapper = themedShallow(
      <StepConnector />
    );

    it('renders a div containing a span', () => {
      assert.ok(wrapper.is('div'));
      const line = wrapper.find('span');
      assert.ok(line.length);
    });

    it('has a top border when horizontal', () => {
      const line = wrapper.find('span');
      assert.strictEqual(line.prop('style').borderTopWidth, 1);
      assert.notOk(line.prop('style').borderLeftWidth);
    });

    it('has a left border when vertical', () => {
      wrapper.setContext({muiTheme, stepper: {orientation: 'vertical'}});
      const line = wrapper.find('span');
      assert.strictEqual(line.prop('style').borderLeftWidth, 1);
      assert.notOk(line.prop('style').borderTopWidth);
    });
  });
});
