// @flow

import * as React from 'react';
import keycode from 'keycode';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount, getClasses } from '../test-utils';
import Avatar from '../Avatar';
import Chip from './Chip';

describe('<Chip />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Chip />);
  });

  describe('text only', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Chip className="my-Chip" data-my-prop="woofChip">
          Text Chip
        </Chip>,
      );
    });

    it('should render a div containing a span', () => {
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.childAt(0).is('span'), true, 'should be a span');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-Chip'), true);
      assert.strictEqual(wrapper.prop('data-my-prop'), 'woofChip');
    });

    it('should have a tabIndex prop with value -1', () => {
      assert.strictEqual(wrapper.props().tabIndex, -1);
    });
  });

  describe('clickable text chip', () => {
    let wrapper;
    let handleClick;

    before(() => {
      handleClick = () => {};
      wrapper = shallow(
        <Chip className="my-Chip" data-my-prop="woofChip" onClick={handleClick}>
          Text Chip
        </Chip>,
      );
    });

    it('should render a div containing a span', () => {
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.childAt(0).is('span'), true, 'should be a span');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-Chip'), true);
      assert.strictEqual(wrapper.prop('data-my-prop'), 'woofChip');
      assert.strictEqual(wrapper.props().onClick, handleClick);
    });

    it('should have a tabIndex prop', () => {
      assert.strictEqual(wrapper.props().tabIndex, 0);
    });

    it('should apply user value of tabIndex', () => {
      wrapper = shallow(
        <Chip
          onClick={() => {}}
          tabIndex={5} // eslint-disable-line jsx-a11y/tabindex-no-positive
        >
          Text Chip
        </Chip>,
      );
      assert.strictEqual(wrapper.props().tabIndex, 5);
    });
  });

  describe('deletable Avatar chip', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Chip
          avatar={
            <Avatar className="my-Avatar" data-my-prop="woofChip">
              MB
            </Avatar>
          }
          label="Text Avatar Chip"
          onRequestDelete={() => {}}
          className="my-Chip"
          data-my-prop="woofChip"
        />,
      );
    });

    it('should render a div containing an Avatar, span and svg', () => {
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.childAt(0).is(Avatar), true, 'should have an Avatar');
      assert.strictEqual(wrapper.childAt(1).is('span'), true, 'should have a span');
      assert.strictEqual(wrapper.childAt(2).is('pure(Cancel)'), true, 'should be an svg icon');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-Chip'), true);
      assert.strictEqual(wrapper.prop('data-my-prop'), 'woofChip');
    });

    it('should merge user classes & spread custom props to the Avatar node', () => {
      assert.strictEqual(wrapper.childAt(0).hasClass(classes.avatar), true);
      assert.strictEqual(wrapper.childAt(0).hasClass('my-Avatar'), true);
      assert.strictEqual(wrapper.childAt(0).prop('data-my-prop'), 'woofChip');
    });

    it('should have a tabIndex prop', () => {
      assert.strictEqual(wrapper.props().tabIndex, 0);
    });

    it('should fire the function given in onDeleteRequest', () => {
      const onRequestDeleteSpy = spy();
      wrapper.setProps({ onRequestDelete: onRequestDeleteSpy });

      wrapper.find('pure(Cancel)').simulate('click', { stopPropagation: () => {} });
      assert.strictEqual(
        onRequestDeleteSpy.callCount,
        1,
        'should have called the onRequestDelete handler',
      );
    });

    it('should stop propagation in onDeleteRequest', () => {
      const onRequestDeleteSpy = spy();
      const stopPropagationSpy = spy();
      wrapper.setProps({ onRequestDelete: onRequestDeleteSpy });

      wrapper.find('pure(Cancel)').simulate('click', { stopPropagation: stopPropagationSpy });
      assert.strictEqual(
        stopPropagationSpy.callCount,
        1,
        'should have called the stopPropagation handler',
      );
    });
  });

  describe('reacts to keyboard chip', () => {
    let wrapper;
    let onKeyDownSpy;

    before(() => {
      wrapper = shallow(
        <Chip className="my-Chip" data-my-prop="woofChip">
          Text Chip
        </Chip>,
      );

      onKeyDownSpy = spy();
      wrapper.setProps({ onKeyDown: onKeyDownSpy });
    });

    it('should call onKeyDown when a key is pressed', () => {
      const anyKeydownEvent = {
        keyCode: keycode('p'),
      };
      wrapper.find('div').simulate('keydown', anyKeydownEvent);
      assert.strictEqual(onKeyDownSpy.callCount, 1, 'should have called onKeyDown');
      assert(onKeyDownSpy.calledWith(anyKeydownEvent));
    });

    describe('escape', () => {
      let mount;

      before(() => {
        mount = createMount();
      });

      after(() => {
        mount.cleanUp();
      });

      it('should unfocus when a esc key is pressed', () => {
        const wrapper2 = mount(<Chip.Naked classes={{}}>Text Chip</Chip.Naked>);
        const handleBlur = spy();
        wrapper2.instance().chipRef.blur = handleBlur;
        wrapper2.find('div').simulate('keydown', {
          preventDefault: () => {},
          keyCode: keycode('esc'),
        });
        assert.strictEqual(handleBlur.callCount, 1);
      });
    });

    describe('onClick is defined', () => {
      let onClickSpy;
      before(() => {
        onClickSpy = spy();
        wrapper.setProps({ onClick: onClickSpy });
      });

      afterEach(() => {
        onClickSpy.reset();
      });

      it('should call onClick when `space` is pressed ', () => {
        const preventDefaultSpy = spy();
        const spaceKeydownEvent = {
          preventDefault: preventDefaultSpy,
          keyCode: keycode('space'),
        };
        wrapper.find('div').simulate('keydown', spaceKeydownEvent);
        assert.strictEqual(preventDefaultSpy.callCount, 1, 'should have stopped event propagation');
        assert.strictEqual(onClickSpy.callCount, 1, 'should have called onClick');
        assert(onClickSpy.calledWith(spaceKeydownEvent));
      });

      it('should call onClick when `enter` is pressed ', () => {
        const preventDefaultSpy = spy();
        const enterKeydownEvent = {
          preventDefault: preventDefaultSpy,
          keyCode: keycode('enter'),
        };
        wrapper.find('div').simulate('keydown', enterKeydownEvent);
        assert.strictEqual(preventDefaultSpy.callCount, 1, 'should have stopped event propagation');
        assert.strictEqual(onClickSpy.callCount, 1, 'should have called onClick');
        assert(onClickSpy.calledWith(enterKeydownEvent));
      });
    });

    describe('onRequestDelete is defined and `backspace` is pressed', () => {
      it('should call onRequestDelete', () => {
        const onRequestDeleteSpy = spy();
        wrapper.setProps({ onRequestDelete: onRequestDeleteSpy });

        const preventDefaultSpy = spy();
        const backspaceKeydownEvent = {
          preventDefault: preventDefaultSpy,
          keyCode: keycode('backspace'),
        };
        wrapper.find('div').simulate('keydown', backspaceKeydownEvent);

        assert.strictEqual(preventDefaultSpy.callCount, 1, 'should have stopped event propagation');
        assert.strictEqual(onRequestDeleteSpy.callCount, 1, 'should have called onClick');
        assert(onRequestDeleteSpy.calledWith(backspaceKeydownEvent));
      });
    });
  });
});
