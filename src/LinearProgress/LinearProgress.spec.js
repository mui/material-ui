/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import LinearProgress from './LinearProgress';
import getMuiTheme from '../styles/getMuiTheme';

describe('<LinearProgress />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('props: min', () => {
    it('should work when min equal zero', () => {
      const wrapper = shallowWithContext(
        <LinearProgress
          mode="determinate"
          value={50}
          min={0}
          max={100}
        />
      );

      assert.strictEqual(wrapper.children().props().style.width, '50%',
        'should compute the width correctly');
    });

    it('should work when min is different to zero', () => {
      const wrapper = shallowWithContext(
        <LinearProgress
          mode="determinate"
          value={75}
          min={50}
          max={100}
        />
      );

      assert.strictEqual(wrapper.children().props().style.width, '50%',
        'should compute the width correctly');
    });

    it('should work when value equal min', () => {
      const wrapper = shallowWithContext(
        <LinearProgress
          mode="determinate"
          value={50}
          min={50}
          max={100}
        />
      );

      assert.strictEqual(wrapper.children().props().style.width, '0%',
        'should compute the width correctly');
    });
  });
});
