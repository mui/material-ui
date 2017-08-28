// @flow

import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createShallow, createMount, getClasses } from '../test-utils';
import GridListTile from './GridListTile';

describe('<GridListTile />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({
      dive: true,
    });
    mount = createMount();
    classes = getClasses(<GridListTile />);
  });

  after(() => {
    mount.cleanUp();
  });

  const tileData = {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  };

  it('should render a li', () => {
    const children = <img src={tileData.img} alt="foo" />;
    const wrapper = shallow(<GridListTile>{children}</GridListTile>);
    assert.strictEqual(wrapper.name(), 'li');
  });

  it('should render a ul', () => {
    const children = <img src={tileData.img} alt="foo" />;
    const wrapper = shallow(<GridListTile component="li">{children}</GridListTile>);
    assert.strictEqual(wrapper.name(), 'li');
  });

  describe('prop: children', () => {
    it('should render children by default', () => {
      const children = <img src={tileData.img} alt="foo" />;
      const wrapper = shallow(<GridListTile>{children}</GridListTile>);

      assert.strictEqual(
        wrapper.containsMatchingElement(children),
        true,
        'should contain the children',
      );
    });

    it('should not change non image child', () => {
      const children = <div />;
      const wrapper = shallow(<GridListTile>{children}</GridListTile>);
      assert.strictEqual(wrapper.containsMatchingElement(children), true);
    });
  });

  describe('prop: className', () => {
    it('should renders className', () => {
      const children = <img src={tileData.img} alt="foo" />;
      const wrapper = shallow(<GridListTile className="foo">{children}</GridListTile>);

      assert.strictEqual(wrapper.hasClass('foo'), true, 'should contain the className');
    });
  });

  describe('mount', () => {
    let instance;
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <GridListTile.Naked
          classes={{
            imgFullWidth: 'imgFullWidth',
            imgFullHeight: 'imgFullHeight',
          }}
        >
          <img alt="test" />
        </GridListTile.Naked>,
      );
      instance = wrapper.instance();
    });

    it('should handle missing image', () => {
      // Test that it doesn't crash.
      instance.imgElement = null;
      instance.ensureImageCover();
      instance.fit();

      instance.imgElement = {
        complete: false,
      };
      instance.fit();
      assert.strictEqual(instance.imgElement instanceof HTMLElement, false);
      wrapper.setProps({
        children: <img alt="test2" />,
      });
      assert.strictEqual(instance.imgElement instanceof HTMLElement, true);
    });

    it('should fit the height', () => {
      instance.imgElement = {
        complete: true,
        width: 16,
        height: 9,
        parentNode: {
          offsetWidth: 4,
          offsetHeight: 3,
        },
        classList: {
          remove: spy(),
          add: spy(),
        },
        removeEventListener: () => {},
      };

      instance.ensureImageCover();
      assert.strictEqual(instance.imgElement.classList.remove.callCount, 1);
      assert.strictEqual(instance.imgElement.classList.remove.args[0][0], 'imgFullWidth');
      assert.strictEqual(instance.imgElement.classList.add.callCount, 1);
      assert.strictEqual(instance.imgElement.classList.add.args[0][0], 'imgFullHeight');
    });

    it('should fit the width', () => {
      instance.imgElement = {
        complete: true,
        width: 4,
        height: 3,
        parentNode: {
          offsetWidth: 16,
          offsetHeight: 9,
        },
        classList: {
          remove: spy(),
          add: spy(),
        },
        removeEventListener: () => {},
      };

      instance.ensureImageCover();
      assert.strictEqual(instance.imgElement.classList.remove.callCount, 1);
      assert.strictEqual(instance.imgElement.classList.remove.args[0][0], 'imgFullHeight');
      assert.strictEqual(instance.imgElement.classList.add.callCount, 1);
      assert.strictEqual(instance.imgElement.classList.add.args[0][0], 'imgFullWidth');
    });
  });

  describe('resize', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should handle the resize event', () => {
      const wrapper = shallow(<GridListTile />);
      const instance = wrapper.instance();
      instance.imgElement = {
        complete: true,
        width: 4,
        height: 3,
        parentNode: {
          offsetWidth: 16,
          offsetHeight: 9,
        },
        classList: {
          remove: spy(),
          add: spy(),
        },
        removeEventListener: () => {},
      };
      wrapper
        .find('EventListener')
        .at(0)
        .simulate('resize');
      assert.strictEqual(instance.imgElement.classList.remove.callCount, 0);
      clock.tick(166);
      assert.strictEqual(instance.imgElement.classList.remove.callCount, 1);
      assert.strictEqual(instance.imgElement.classList.remove.args[0][0], classes.imgFullHeight);
      assert.strictEqual(instance.imgElement.classList.add.callCount, 1);
      assert.strictEqual(instance.imgElement.classList.add.args[0][0], classes.imgFullWidth);
    });
  });
});
