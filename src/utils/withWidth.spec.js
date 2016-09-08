/* eslint-env mocha */

import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import withWidth, {MEDIUM, LARGE} from './withWidth';

describe('utils/withWidth', () => {
  const Dumb = () => <div />;
  const DumbWithWidth = withWidth()(Dumb);

  describe('prop: width', () => {
    it('should be able to override it', () => {
      const wrapper = shallow(<DumbWithWidth width={MEDIUM} />);

      assert.strictEqual(wrapper.find(Dumb).props().width, MEDIUM);
    });
  });

  describe('browser', () => {
    it('should provide the right width to the child element', () => {
      const wrapper = shallow(<DumbWithWidth />);

      assert.strictEqual(wrapper.find(Dumb).props().width, LARGE);
    });
  });
});
