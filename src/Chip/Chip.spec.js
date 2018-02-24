import React from 'react';
import keycode from 'keycode';
import { assert } from 'chai';
import { spy } from 'sinon';
import CheckBox from '../internal/svg-icons/CheckBox';
import CancelIcon from '../internal/svg-icons/Cancel';
import { createShallow, createMount, getClasses, unwrap } from '../test-utils';
import Avatar from '../Avatar';
import Chip from './Chip';

describe('<Chip />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Chip />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
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
        // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        <Chip onClick={() => {}} tabIndex={5}>
          {'Text Chip'}
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
          onDelete={() => {}}
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
      assert.strictEqual(wrapper.props()['data-my-prop'], 'woofChip');
    });

    it('should merge user classes & spread custom props to the Avatar node', () => {
      assert.strictEqual(wrapper.childAt(0).hasClass(classes.avatar), true);
      assert.strictEqual(wrapper.childAt(0).hasClass('my-Avatar'), true);
      assert.strictEqual(wrapper.childAt(0).props()['data-my-prop'], 'woofChip');
    });

    it('should have a tabIndex prop', () => {
      assert.strictEqual(wrapper.props().tabIndex, 0);
    });

    it('should fire the function given in onDeleteRequest', () => {
      const onDeleteSpy = spy();
      wrapper.setProps({ onDelete: onDeleteSpy });

      wrapper.find('pure(Cancel)').simulate('click', { stopPropagation: () => {} });
      assert.strictEqual(onDeleteSpy.callCount, 1, 'should have called the onDelete handler');
    });

    it('should stop propagation in onDeleteRequest', () => {
      const onDeleteSpy = spy();
      const stopPropagationSpy = spy();
      wrapper.setProps({ onDelete: onDeleteSpy });

      wrapper.find('pure(Cancel)').simulate('click', { stopPropagation: stopPropagationSpy });
      assert.strictEqual(
        stopPropagationSpy.callCount,
        1,
        'should have called the stopPropagation handler',
      );
    });
  });

  describe('prop: deleteIcon', () => {
    it('should fire the function given in onDeleteRequest', () => {
      const wrapper = shallow(
        <Chip label="Custom delete icon Chip" onDelete={() => {}} deleteIcon={<CheckBox />} />,
      );
      const onDeleteSpy = spy();
      wrapper.setProps({ onDelete: onDeleteSpy });

      wrapper.find(CheckBox).simulate('click', { stopPropagation: () => {} });
      assert.strictEqual(onDeleteSpy.callCount, 1, 'should have called the onDelete handler');
    });

    it('should render a default icon', () => {
      const wrapper = mount(<Chip label="Custom delete icon Chip" onDelete={() => {}} />);
      assert.strictEqual(wrapper.find(CancelIcon).length, 1);
    });
  });

  describe('reacts to keyboard chip', () => {
    const ChipNaked = unwrap(Chip);
    let wrapper;

    describe('onKeyDown is defined', () => {
      it('should call onKeyDown when a key is pressed', () => {
        const anyKeydownEvent = { keycode: keycode('p') };
        const onKeyDownSpy = spy();
        wrapper = mount(
          <Chip classes={{}} onKeyDown={onKeyDownSpy}>
            Text Chip
          </Chip>,
        );
        wrapper.find('div').simulate('keydown', anyKeydownEvent);
        assert.strictEqual(onKeyDownSpy.callCount, 1, 'should have called onKeyDown');
        assert.strictEqual(
          onKeyDownSpy.args[0][0].keyCode,
          anyKeydownEvent.keyCode,
          'should have same keyCode',
        );
      });
    });

    describe('escape', () => {
      it('should unfocus when a esc key is pressed', () => {
        const wrapper2 = mount(<ChipNaked classes={{}}>Text Chip</ChipNaked>);
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
        wrapper = mount(
          <ChipNaked classes={{}} onClick={onClickSpy}>
            Text Chip
          </ChipNaked>,
        );
      });

      afterEach(() => {
        onClickSpy.resetHistory();
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
        assert.strictEqual(onClickSpy.args[0][0].keyCode, spaceKeydownEvent.keyCode);
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
        assert.strictEqual(onClickSpy.args[0][0].keyCode, enterKeydownEvent.keyCode);
      });
    });

    describe('onDelete is defined and `backspace` is pressed', () => {
      it('should call onDelete', () => {
        const onDeleteSpy = spy();
        const wrapper2 = mount(
          <ChipNaked classes={{}} onDelete={onDeleteSpy}>
            Text Chip
          </ChipNaked>,
        );

        const preventDefaultSpy = spy();
        const backspaceKeydownEvent = {
          preventDefault: preventDefaultSpy,
          keyCode: keycode('backspace'),
        };
        wrapper2.find('div').simulate('keydown', backspaceKeydownEvent);

        assert.strictEqual(preventDefaultSpy.callCount, 1, 'should have stopped event propagation');
        assert.strictEqual(onDeleteSpy.callCount, 1, 'should have called onClick');
        assert.strictEqual(onDeleteSpy.args[0][0].keyCode, backspaceKeydownEvent.keyCode);
      });
    });

    describe('has children that generate events', () => {
      let onClickSpy;
      let onDeleteSpy;
      let onKeyDownSpy;

      before(() => {
        onClickSpy = spy();
        onDeleteSpy = spy();
        onKeyDownSpy = spy();

        wrapper = mount(
          <Chip
            classes={{}}
            onClick={onClickSpy}
            onDelete={onDeleteSpy}
            onKeyDown={onKeyDownSpy}
            label={<input className="child-input" />}
          />,
        );
      });

      afterEach(() => {
        onClickSpy.resetHistory();
        onDeleteSpy.resetHistory();
      });

      it('should not call onDelete for child event', () => {
        wrapper.find('.child-input').simulate('keydown', { keyCode: keycode('backspace') });
        assert.strictEqual(onDeleteSpy.notCalled, true);
      });

      it('should not call onClick for child event when `space` is pressed', () => {
        wrapper.find('.child-input').simulate('keydown', { keyCode: keycode('space') });
        assert.strictEqual(onClickSpy.notCalled, true);
      });

      it('should not call onClick for child event when `enter` is pressed', () => {
        wrapper.find('.child-input').simulate('keydown', { keyCode: keycode('enter') });
        assert.strictEqual(onClickSpy.notCalled, true);
      });

      it('should not call onKeyDown for child event', () => {
        wrapper.find('.child-input').simulate('keydown', { keyCode: keycode('p') });
        assert.strictEqual(onKeyDownSpy.notCalled, true);
      });
    });
  });
});
