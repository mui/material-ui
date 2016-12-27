/* eslint-env mocha */

import React from 'react';
import {shallow, mount} from 'enzyme';
import {assert} from 'chai';
import withWidth, {MEDIUM, LARGE} from './withWidth';

describe('utils/withWidth', () => {
  const Dumb = () => <div />;
  const DumbWithWidth = withWidth()(Dumb);

  describe('server side rendering', () => {
    it('should not render the children as the width is unknown', () => {
      const wrapper = shallow(<DumbWithWidth />);
      assert.strictEqual(wrapper.type(), null, 'should render nothing');
    });
  });

  describe('prop: width', () => {
    it('should be able to override it', () => {
      const wrapper = mount(<DumbWithWidth width={MEDIUM} />);

      assert.strictEqual(wrapper.find(Dumb).props().width, MEDIUM);
    });
  });

  describe('browser', () => {
    it('should provide the right width to the child element', () => {
      const wrapper = mount(<DumbWithWidth />);

      assert.strictEqual(wrapper.find(Dumb).props().width, LARGE);
    });
  });
});
