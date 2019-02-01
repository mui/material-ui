import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import CheckBox from '../internal/svg-icons/CheckBox';
import CancelIcon from '../internal/svg-icons/Cancel';
import { createShallow, createMount, getClasses, unwrap } from '@material-ui/core/test-utils';
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
    it('should render a div containing a span', () => {
      const wrapper = shallow(<Chip className="my-Chip" data-my-prop="woofChip" />);
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.childAt(0).name(), 'span');
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-Chip'), true);
      assert.strictEqual(wrapper.props()['data-my-prop'], 'woofChip');
      assert.strictEqual(wrapper.props().tabIndex, undefined);

      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.colorPrimary), false);
      assert.strictEqual(wrapper.hasClass(classes.colorSecondary), false);
      assert.strictEqual(wrapper.hasClass(classes.clickable), false);
      assert.strictEqual(wrapper.hasClass(classes.clickableColorPrimary), false);
      assert.strictEqual(wrapper.hasClass(classes.clickableColorSecondary), false);
      assert.strictEqual(wrapper.hasClass(classes.deletable), false);
      assert.strictEqual(wrapper.hasClass(classes.deletableColorPrimary), false);
      assert.strictEqual(wrapper.hasClass(classes.deletableColorSecondary), false);
    });

    it('should render with the root and the primary class', () => {
      const wrapper = shallow(<Chip className="my-Chip" data-my-prop="woofChip" color="primary" />);

      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
    });

    it('should render with the root and the secondary class', () => {
      const wrapper = shallow(
        <Chip className="my-Chip" data-my-prop="woofChip" color="secondary" />,
      );

      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
    });
  });

  describe('clickable text chip', () => {
    let wrapper;
    let handleClick;

    before(() => {
      handleClick = () => {};
      wrapper = shallow(<Chip className="my-Chip" data-my-prop="woofChip" onClick={handleClick} />);
    });

    it('should render a div containing a span', () => {
      assert.strictEqual(wrapper.name(), 'div');
      assert.strictEqual(wrapper.childAt(0).name(), 'span');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-Chip'), true);
      assert.strictEqual(wrapper.props()['data-my-prop'], 'woofChip');
      assert.strictEqual(wrapper.props().onClick, handleClick);
    });

    it('should have a tabIndex prop', () => {
      assert.strictEqual(wrapper.props().tabIndex, 0);
    });

    it('should apply user value of tabIndex', () => {
      wrapper = shallow(
        // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        <Chip onClick={() => {}} tabIndex={5} />,
      );
      assert.strictEqual(wrapper.props().tabIndex, 5);
    });

    it('should render with the root and clickable class', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.clickable), true);
    });

    it('should render with the root and clickable primary class', () => {
      wrapper = shallow(
        <Chip className="my-Chip" data-my-prop="woofChip" onClick={handleClick} color="primary" />,
      );

      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
      assert.strictEqual(wrapper.hasClass(classes.clickable), true);
      assert.strictEqual(wrapper.hasClass(classes.clickableColorPrimary), true);
    });

    it('should render with the root and outlined clickable primary class', () => {
      wrapper = shallow(
        <Chip
          className="my-Chip"
          data-my-prop="woofChip"
          onClick={handleClick}
          color="primary"
          variant="outlined"
        />,
      );

      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
      assert.strictEqual(wrapper.hasClass(classes.clickable), true);
      assert.strictEqual(wrapper.hasClass(classes.clickableColorPrimary), true);
      assert.strictEqual(wrapper.hasClass(classes.outlined), true);
      assert.strictEqual(wrapper.hasClass(classes.outlinedPrimary), true);
    });

    it('should render with the root and clickable secondary class', () => {
      wrapper = shallow(
        <Chip
          className="my-Chip"
          data-my-prop="woofChip"
          onClick={handleClick}
          color="secondary"
        />,
      );

      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
      assert.strictEqual(wrapper.hasClass(classes.clickable), true);
      assert.strictEqual(wrapper.hasClass(classes.clickableColorSecondary), true);
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
      assert.strictEqual(wrapper.childAt(0).type(), Avatar);
      assert.strictEqual(wrapper.childAt(1).name(), 'span');
      assert.strictEqual(wrapper.childAt(2).name(), 'pure(Cancel)');
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
      assert.strictEqual(onDeleteSpy.callCount, 1);
    });

    it('should stop propagation in onDeleteRequest', () => {
      const onDeleteSpy = spy();
      const stopPropagationSpy = spy();
      wrapper.setProps({ onDelete: onDeleteSpy });

      wrapper.find('pure(Cancel)').simulate('click', { stopPropagation: stopPropagationSpy });
      assert.strictEqual(stopPropagationSpy.callCount, 1);
    });

    it('should render with the root, deletable classes', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.deletable), true);

      const avatarWrapper = wrapper.childAt(0);

      assert.strictEqual(avatarWrapper.hasClass(classes.avatar), true);
    });

    it('should render with the root, deletable and avatar primary classes', () => {
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
          color="primary"
        />,
      );
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
      assert.strictEqual(wrapper.hasClass(classes.deletable), true);
      assert.strictEqual(wrapper.hasClass(classes.deletableColorPrimary), true);

      const avatarWrapper = wrapper.childAt(0);

      assert.strictEqual(avatarWrapper.hasClass(classes.avatar), true);
      assert.strictEqual(avatarWrapper.hasClass(classes.avatarColorPrimary), true);
    });

    it('should render with the root, deletable and avatar secondary classes', () => {
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
          color="secondary"
        />,
      );
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
      assert.strictEqual(wrapper.hasClass(classes.deletable), true);
      assert.strictEqual(wrapper.hasClass(classes.deletableColorSecondary), true);

      const avatarWrapper = wrapper.childAt(0);

      assert.strictEqual(avatarWrapper.hasClass(classes.avatar), true);
      assert.strictEqual(avatarWrapper.hasClass(classes.avatarColorSecondary), true);
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

    it(
      'should render a default icon with the root, deletable, deleteIcon' +
        ' and deleteIconOutlinedColorSecondary classes',
      () => {
        const wrapper = shallow(
          <Chip
            label="Custom delete icon Chip"
            onDelete={() => {}}
            variant="outlined"
            color="secondary"
          />,
        );
        assert.strictEqual(wrapper.hasClass(classes.root), true);
        assert.strictEqual(wrapper.hasClass(classes.deletable), true);

        const iconWrapper = wrapper.find(CancelIcon);
        assert.strictEqual(iconWrapper.hasClass(classes.deleteIcon), true);
        assert.strictEqual(iconWrapper.hasClass(classes.deleteIconOutlinedColorSecondary), true);
      },
    );

    it('should render a default icon with the root, deletable and deleteIcon classes', () => {
      const wrapper = shallow(<Chip label="Custom delete icon Chip" onDelete={() => {}} />);
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.deletable), true);

      const iconWrapper = wrapper.find(CancelIcon);
      assert.strictEqual(iconWrapper.hasClass(classes.deleteIcon), true);
    });

    it('should render default icon with the root, deletable and deleteIcon primary class', () => {
      const wrapper = shallow(
        <Chip label="Custom delete icon Chip" onDelete={() => {}} color="primary" />,
      );
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.colorPrimary), true);
      assert.strictEqual(wrapper.hasClass(classes.deletable), true);
      assert.strictEqual(wrapper.hasClass(classes.deletableColorPrimary), true);

      const iconWrapper = wrapper.find(CancelIcon);
      assert.strictEqual(iconWrapper.hasClass(classes.deleteIcon), true);
      assert.strictEqual(iconWrapper.hasClass(classes.deleteIconColorPrimary), true);
    });

    it('should render a default icon with the root, deletable, deleteIcon secondary class', () => {
      const wrapper = shallow(
        <Chip label="Custom delete icon Chip" onDelete={() => {}} color="secondary" />,
      );
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass(classes.colorSecondary), true);
      assert.strictEqual(wrapper.hasClass(classes.deletable), true);
      assert.strictEqual(wrapper.hasClass(classes.deletableColorSecondary), true);

      const iconWrapper = wrapper.find(CancelIcon);
      assert.strictEqual(iconWrapper.hasClass(classes.deleteIcon), true);
      assert.strictEqual(iconWrapper.hasClass(classes.deleteIconColorSecondary), true);
    });
  });

  describe('reacts to keyboard chip', () => {
    const ChipNaked = unwrap(Chip);
    let wrapper;

    describe('onKeyDown is defined', () => {
      it('should call onKeyDown when a key is pressed', () => {
        const anyKeydownEvent = { key: 'p' };
        const onKeyDownSpy = spy();
        wrapper = mount(<Chip classes={{}} onKeyDown={onKeyDownSpy} />);
        wrapper.find('div').simulate('keyDown', anyKeydownEvent);
        assert.strictEqual(onKeyDownSpy.callCount, 1);
        assert.strictEqual(onKeyDownSpy.args[0][0].keyCode, anyKeydownEvent.keyCode);
      });
    });

    describe('escape', () => {
      it('should unfocus when a esc key is pressed', () => {
        const wrapper2 = mount(<ChipNaked classes={{}} />);
        const handleBlur = spy();
        wrapper2.instance().chipRef.blur = handleBlur;
        wrapper2.find('div').simulate('keyUp', {
          preventDefault: () => {},
          key: 'Escape',
        });
        assert.strictEqual(handleBlur.callCount, 1);
      });
    });

    describe('onClick is defined', () => {
      let onClickSpy;
      before(() => {
        onClickSpy = spy();
        wrapper = mount(<ChipNaked classes={{}} onClick={onClickSpy} />);
      });

      afterEach(() => {
        onClickSpy.resetHistory();
      });

      it('should call onClick when `space` is pressed ', () => {
        const preventDefaultSpy = spy();
        const spaceKeyDown = {
          preventDefault: preventDefaultSpy,
          key: ' ',
        };
        wrapper.find('div').simulate('keyDown', spaceKeyDown);
        assert.strictEqual(preventDefaultSpy.callCount, 1);
        assert.strictEqual(onClickSpy.callCount, 0);

        const spaceKeyUp = {
          key: ' ',
        };
        wrapper.find('div').simulate('keyUp', spaceKeyUp);
        assert.strictEqual(onClickSpy.callCount, 1);
        assert.strictEqual(onClickSpy.args[0][0].keyCode, spaceKeyUp.keyCode);
      });

      it('should call onClick when `enter` is pressed ', () => {
        const preventDefaultSpy = spy();
        const enterKeyDown = {
          preventDefault: preventDefaultSpy,
          key: 'Enter',
        };
        wrapper.find('div').simulate('keyDown', enterKeyDown);
        assert.strictEqual(preventDefaultSpy.callCount, 1);
        assert.strictEqual(onClickSpy.callCount, 0);

        const enterKeyUp = {
          key: 'Enter',
        };
        wrapper.find('div').simulate('keyUp', enterKeyUp);
        assert.strictEqual(onClickSpy.callCount, 1);
        assert.strictEqual(onClickSpy.args[0][0].keyCode, enterKeyUp.keyCode);
      });
    });

    describe('onDelete is defined and `backspace` is pressed', () => {
      it('should call onDelete', () => {
        const preventDefaultSpy = spy();
        const onDeleteSpy = spy();
        const wrapper2 = mount(<ChipNaked classes={{}} onDelete={onDeleteSpy} />);

        const backspaceKeyDown = {
          preventDefault: preventDefaultSpy,
          key: 'Backspace',
        };
        wrapper2.find('div').simulate('keyDown', backspaceKeyDown);
        assert.strictEqual(preventDefaultSpy.callCount, 1);
        assert.strictEqual(onDeleteSpy.callCount, 0);

        const backspaceKeyUp = {
          key: 'Backspace',
        };
        wrapper2.find('div').simulate('keyUp', backspaceKeyUp);
        assert.strictEqual(onDeleteSpy.callCount, 1);
        assert.strictEqual(onDeleteSpy.args[0][0].keyCode, backspaceKeyUp.keyCode);
      });
    });

    describe('has children that generate events', () => {
      let onClickSpy;
      let onDeleteSpy;
      let onKeyDownSpy;
      let onKeyUpSpy;

      before(() => {
        onClickSpy = spy();
        onDeleteSpy = spy();
        onKeyDownSpy = spy();
        onKeyUpSpy = spy();

        wrapper = mount(
          <Chip
            classes={{}}
            onClick={onClickSpy}
            onDelete={onDeleteSpy}
            onKeyDown={onKeyDownSpy}
            onKeyUp={onKeyUpSpy}
            label={<input className="child-input" />}
          />,
        );
      });

      afterEach(() => {
        onClickSpy.resetHistory();
        onDeleteSpy.resetHistory();
      });

      it('should not call onDelete for child event', () => {
        wrapper.find('.child-input').simulate('keyDown', { key: 'Backspace' });
        assert.strictEqual(onDeleteSpy.callCount, 0);
      });

      it('should not call onClick for child event when `space` is pressed', () => {
        wrapper.find('.child-input').simulate('keyDown', { key: ' ' });
        assert.strictEqual(onClickSpy.callCount, 0);
      });

      it('should not call onClick for child event when `enter` is pressed', () => {
        wrapper.find('.child-input').simulate('keyDown', { key: 'Enter' });
        assert.strictEqual(onClickSpy.callCount, 0);
      });

      it('should call handlers for child event', () => {
        onKeyDownSpy.resetHistory();
        wrapper.find('.child-input').simulate('keyDown', { key: 'p' });
        assert.strictEqual(onKeyDownSpy.callCount, 1);

        onKeyUpSpy.resetHistory();
        wrapper.find('.child-input').simulate('keyUp', { key: 'p' });
        assert.strictEqual(onKeyUpSpy.callCount, 1);
      });
    });
  });

  describe('prop: icon', () => {
    it('should render the icon', () => {
      const wrapper = shallow(<Chip icon={<span />} />);
      assert.strictEqual(
        wrapper
          .find('span')
          .first()
          .hasClass(classes.icon),
        true,
      );
    });
  });
});
