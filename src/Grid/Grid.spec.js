// @flow

import React from 'react';
import { assert } from 'chai';
import forOwn from 'lodash/forOwn';
import { createShallow, getClasses } from '../test-utils';
import Hidden from '../Hidden';
import Grid, { styleSheet } from './Grid';

describe('<Grid />', () => {
  let shallow;
  let classes;

  before(() => {
    const shallowInner = createShallow({ dive: true });
    // Render deeper to bypass the GridWrapper.
    shallow = node => {
      return shallowInner(node).find('Grid').shallow({
        context: shallowInner.context,
      });
    };
    classes = getClasses(styleSheet);
  });

  it('should render', () => {
    const wrapper = shallow(<Grid className="woof" />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the user class');
  });

  describe('prop: container', () => {
    it('should apply the container class', () => {
      const wrapper = shallow(<Grid container />);
      assert.strictEqual(wrapper.hasClass(classes.typeContainer), true);
    });
  });

  describe('prop: item', () => {
    it('should apply the item class', () => {
      const wrapper = shallow(<Grid item />);
      assert.strictEqual(wrapper.hasClass(classes.typeItem), true);
    });
  });

  describe('prop: component', () => {
    it('should change the component', () => {
      const wrapper = shallow(<Grid component="span" />);
      assert.strictEqual(wrapper.name(), 'span');
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const wrapper = shallow(<Grid item xs />);
      assert.strictEqual(wrapper.hasClass(classes['grid-xs']), true);
    });

    it('should apply the flex size class', () => {
      const wrapper = shallow(<Grid item xs={3} />);
      assert.strictEqual(wrapper.hasClass(classes['grid-xs-3']), true);
    });
  });

  describe('prop: gutter', () => {
    it('should have a default gutter', () => {
      const wrapper = shallow(<Grid container />);
      assert.strictEqual(wrapper.hasClass(classes['gutter-xs-16']), true);
    });
  });

  describe('prop: other', () => {
    it('should spread the other properties to the root element', () => {
      const handleClick = () => {};
      const wrapper = shallow(<Grid component="span" onClick={handleClick} />);
      assert.strictEqual(wrapper.props().onClick, handleClick);
    });
  });

  describe('hidden', () => {
    const hiddenProps = {
      onlyHidden: 'xs',
      xsUpHidden: true,
      smUpHidden: true,
      mdUpHidden: true,
      lgUpHidden: true,
      xlUpHidden: true,
      xsDownHidden: true,
      smDownHidden: true,
      mdDownHidden: true,
      lgDownHidden: true,
      xlDownHidden: true,
    };

    forOwn(hiddenProps, (value, key) => {
      it(`should render ${key} with Hidden`, () => {
        const wrapper = shallow(<Grid hidden={{ [key]: value }} />);
        assert.strictEqual(wrapper.type(), Hidden);
      });
    });
  });
});
