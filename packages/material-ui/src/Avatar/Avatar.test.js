import React from 'react';
import { assert } from 'chai';
import CancelIcon from '../internal/svg-icons/Cancel';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Avatar from './Avatar';

describe('<Avatar />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    shallow = createShallow({ dive: true });
    classes = getClasses(<Avatar />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Avatar />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));

  describe('image avatar', () => {
    it('should render a div containing an img', () => {
      const wrapper = shallow(
        <Avatar
          className="my-avatar"
          src="something.jpg"
          alt="Hello World!"
          data-my-prop="woofAvatar"
        />,
      );

      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.childAt(0).name(), 'img');
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-avatar'), true);
      assert.strictEqual(wrapper.props()['data-my-prop'], 'woofAvatar');
      assert.strictEqual(wrapper.hasClass(classes.colorDefault), false);
      const img = wrapper.childAt(0);
      assert.strictEqual(img.hasClass(classes.img), true);
      assert.strictEqual(img.props().alt, 'Hello World!');
      assert.strictEqual(img.props().src, 'something.jpg');
    });

    it('should be able to add more properties to the image', () => {
      const onError = () => {};
      const wrapper = shallow(<Avatar src="something.jpg" imgProps={{ onError }} />);
      assert.strictEqual(wrapper.childAt(0).props().onError, onError);
    });
  });

  describe('font icon avatar', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Avatar className="my-avatar" data-my-prop="woofAvatar" childrenClassName="my-children">
          <span className="my-icon-font">icon</span>
        </Avatar>,
      );
    });

    it('should render a div containing an font icon', () => {
      const icon = wrapper.childAt(0);
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(icon.name(), 'span');
      assert.strictEqual(icon.hasClass('my-icon-font'), true);
      assert.strictEqual(icon.text(), 'icon');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-avatar'), true);
      assert.strictEqual(wrapper.props()['data-my-prop'], 'woofAvatar');
    });

    it('should apply the colorDefault class', () => {
      assert.strictEqual(wrapper.hasClass(classes.colorDefault), true);
    });

    it('should apply the childrenClassName class', () => {
      assert.strictEqual(wrapper.childAt(0).hasClass('my-children'), true);
    });
  });

  describe('svg icon avatar', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Avatar className="my-avatar" data-my-prop="woofAvatar" childrenClassName="my-children">
          <CancelIcon />
        </Avatar>,
      );
    });

    it('should render a div containing an svg icon', () => {
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.childAt(0).type(), CancelIcon);
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-avatar'), true);
      assert.strictEqual(wrapper.props()['data-my-prop'], 'woofAvatar');
    });

    it('should apply the colorDefault class', () => {
      assert.strictEqual(wrapper.hasClass(classes.colorDefault), true);
    });

    it('should apply the childrenClassName class', () => {
      assert.strictEqual(wrapper.childAt(0).hasClass('my-children'), true);
    });
  });

  describe('text avatar', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          OT
        </Avatar>,
      );
    });

    it('should render a div containing a string', () => {
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.childAt(0).text(), 'OT');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-avatar'), true);
      assert.strictEqual(wrapper.props()['data-my-prop'], 'woofAvatar');
    });

    it('should apply the colorDefault class', () => {
      assert.strictEqual(wrapper.hasClass(classes.colorDefault), true);
    });
  });

  describe('falsey avatar', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Avatar className="my-avatar" data-my-prop="woofAvatar">
          {0}
        </Avatar>,
      );
    });

    it('should render with defaultColor class when supplied with a child with falsey value', () => {
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.text(), '0');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-avatar'), true);
      assert.strictEqual(wrapper.props()['data-my-prop'], 'woofAvatar');
    });

    it('should apply the colorDefault class', () => {
      assert.strictEqual(wrapper.hasClass(classes.colorDefault), true);
    });
  });
});
