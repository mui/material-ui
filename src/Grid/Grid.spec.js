// @flow

import React from 'react';
import { assert } from 'chai';
import forOwn from 'lodash/forOwn';
import { createShallow, getClasses } from '../test-utils';
import Hidden from '../Hidden';
import Grid from './Grid';

describe('<Grid />', () => {
  let shallow;
  let classes;

  before(() => {
    const shallowInner = createShallow({ dive: true });
    // Render deeper to bypass the GridWrapper.
    shallow = node => {
      return shallowInner(node)
        .find('Grid')
        .shallow({
          context: shallowInner.context,
        });
    };
    classes = getClasses(<Grid />);
  });

  it('should render', () => {
    const wrapper = shallow(<Grid className="woofGrid" />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass('woofGrid'), true, 'should have the user class');
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

  describe('prop: spacing', () => {
    it('should have a default spacing', () => {
      const wrapper = shallow(<Grid container />);
      assert.strictEqual(wrapper.hasClass(classes['spacing-xs-16']), true);
    });
  });

  describe('prop: grow', () => {
    it('should apply flex-grow class', () => {
      const wrapper = shallow(<Grid item grow={2} />);
      assert.strictEqual(wrapper.hasClass(classes['grow-xs-2']), true);
    });
  });

  describe('prop: shrink', () => {
    it('should apply flex-shrink class', () => {
      const wrapper = shallow(<Grid item shrink={2} />);
      assert.strictEqual(wrapper.hasClass(classes['shrink-xs-2']), true);
    });
  });

  describe('prop: basis', () => {
    it('should apply flex-basis class by given number', () => {
      const wrapper = shallow(<Grid item basis={2} />);
      assert.strictEqual(wrapper.hasClass(classes['basis-xs-2']), true);
    });

    it('should apply flex-basis class by given string', () => {
      const wrapper = shallow(<Grid item basis="fill" />);
      assert.strictEqual(wrapper.hasClass(classes['basis-xs-fill']), true);
    });
  });

  describe('prop: order', () => {
    it('should apply order class', () => {
      const wrapper = shallow(<Grid item order={1} />);
      assert.strictEqual(wrapper.hasClass(classes['order-xs-1']), true);
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
