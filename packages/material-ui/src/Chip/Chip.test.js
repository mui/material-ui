import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import CheckBox from '../internal/svg-icons/CheckBox';
import {
  createMount,
  describeConformance,
  findOutermostIntrinsic,
  getClasses,
} from '@material-ui/core/test-utils';
import Avatar from '../Avatar';
import Chip from './Chip';

describe('<Chip />', () => {
  let classes;
  let mount;

  before(() => {
    classes = getClasses(<Chip />);
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<Chip />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));

  describe('text only', () => {
    it('should render a div containing a label', () => {
      const wrapper = mount(<Chip label="My text Chip" />);
      const chip = wrapper.find(`.${classes.root}`).hostNodes();
      const label = chip.find(`.${classes.label}`).hostNodes();

      assert.strictEqual(chip.type(), 'div');
      assert.strictEqual(label.type(), 'span');
      assert.strictEqual(label.text(), 'My text Chip');
      assert.strictEqual(chip.hasClass(classes.root), true);
      assert.strictEqual(chip.props().tabIndex, undefined);

      assert.strictEqual(chip.hasClass(classes.root), true);
      assert.strictEqual(chip.hasClass(classes.colorPrimary), false);
      assert.strictEqual(chip.hasClass(classes.colorSecondary), false);
      assert.strictEqual(chip.hasClass(classes.clickable), false);
      assert.strictEqual(chip.hasClass(classes.clickableColorPrimary), false);
      assert.strictEqual(chip.hasClass(classes.clickableColorSecondary), false);
      assert.strictEqual(chip.hasClass(classes.deletable), false);
      assert.strictEqual(chip.hasClass(classes.deletableColorPrimary), false);
      assert.strictEqual(chip.hasClass(classes.deletableColorSecondary), false);
    });

    it('should render with the root and the primary class', () => {
      const wrapper = mount(<Chip className="my-Chip" color="primary" />);
      const chip = wrapper.find(`.${classes.root}`).hostNodes();

      assert.strictEqual(chip.hasClass(classes.root), true);
      assert.strictEqual(chip.hasClass(classes.colorPrimary), true);
    });

    it('should render with the root and the secondary class', () => {
      const wrapper = mount(<Chip className="my-Chip" color="secondary" />);
      const chip = wrapper.find(`.${classes.root}`);

      assert.strictEqual(chip.exists(), true);
      assert.strictEqual(chip.hasClass(classes.colorSecondary), true);
    });
  });

  describe('clickable text chip', () => {
    let chip;
    let wrapper;
    let handleClick;

    before(() => {
      handleClick = () => {};
      wrapper = mount(<Chip label="My Chip" onClick={handleClick} />);
      chip = wrapper.find(`.${classes.root}`).hostNodes();
    });

    it('should render a div containing a label', () => {
      assert.strictEqual(chip.type(), 'div');

      const label = chip.find(`.${classes.label}`).hostNodes();
      assert.strictEqual(label.exists(), true);
      assert.strictEqual(label.type(), 'span');
      assert.strictEqual(label.text(), 'My Chip');
    });

    it('should have a tabIndex prop', () => {
      assert.strictEqual(chip.props().tabIndex, 0);
    });

    it('should apply user value of tabIndex', () => {
      const tabIndexWrapper = mount(
        // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        <Chip onClick={() => {}} tabIndex={5} />,
      );
      const tabIndexChip = tabIndexWrapper.find(`.${classes.root}`).hostNodes();
      assert.strictEqual(tabIndexChip.props().tabIndex, 5);
    });

    it('should render with the root and clickable class', () => {
      assert.strictEqual(chip.hasClass(classes.root), true);
      assert.strictEqual(chip.hasClass(classes.clickable), true);
    });

    it('should render with the root and clickable primary class', () => {
      const primaryWrapper = mount(
        <Chip className="my-Chip" data-my-prop="woofChip" onClick={handleClick} color="primary" />,
      );
      const primaryChip = primaryWrapper.find('.my-Chip').hostNodes();

      assert.strictEqual(primaryChip.hasClass(classes.root), true);
      assert.strictEqual(primaryChip.hasClass(classes.colorPrimary), true);
      assert.strictEqual(primaryChip.hasClass(classes.clickable), true);
      assert.strictEqual(primaryChip.hasClass(classes.clickableColorPrimary), true);
    });

    it('should render with the root and outlined clickable primary class', () => {
      const outlinedWrapper = mount(
        <Chip
          className="my-Chip"
          data-my-prop="woofChip"
          onClick={handleClick}
          color="primary"
          variant="outlined"
        />,
      );
      const outlinedChip = outlinedWrapper.find('.my-Chip').hostNodes();

      assert.strictEqual(outlinedChip.hasClass(classes.root), true);
      assert.strictEqual(outlinedChip.hasClass(classes.colorPrimary), true);
      assert.strictEqual(outlinedChip.hasClass(classes.clickable), true);
      assert.strictEqual(outlinedChip.hasClass(classes.clickableColorPrimary), true);
      assert.strictEqual(outlinedChip.hasClass(classes.outlined), true);
      assert.strictEqual(outlinedChip.hasClass(classes.outlinedPrimary), true);
    });

    it('should render with the root and clickable secondary class', () => {
      const secondaryWrapper = mount(
        <Chip
          className="my-Chip"
          data-my-prop="woofChip"
          onClick={handleClick}
          color="secondary"
        />,
      );
      const secondaryChip = secondaryWrapper.find('.my-Chip').hostNodes();

      assert.strictEqual(secondaryChip.hasClass(classes.root), true);
      assert.strictEqual(secondaryChip.hasClass(classes.colorSecondary), true);
      assert.strictEqual(secondaryChip.hasClass(classes.clickable), true);
      assert.strictEqual(secondaryChip.hasClass(classes.clickableColorSecondary), true);
    });
  });

  describe('deletable Avatar chip', () => {
    let chip;
    let wrapper;

    before(() => {
      wrapper = mount(
        <Chip
          avatar={
            <Avatar className="my-Avatar" data-my-prop="woofChip">
              MB
            </Avatar>
          }
          id="chip-test"
          label="Text Avatar Chip"
          onDelete={() => {}}
          className="my-Chip"
          data-my-prop="woofChip"
        />,
      );
      chip = wrapper.find('#chip-test').hostNodes();
    });

    it('should render a div containing an Avatar, span and svg', () => {
      assert.strictEqual(chip.type(), 'div');
      assert.strictEqual(chip.childAt(0).type(), Avatar);
      assert.strictEqual(chip.childAt(1).name(), 'span');
      assert.strictEqual(findOutermostIntrinsic(chip.childAt(2)).type(), 'svg');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(chip.hasClass(classes.root), true);
      assert.strictEqual(chip.hasClass('my-Chip'), true);
      assert.strictEqual(chip.props()['data-my-prop'], 'woofChip');
    });

    it('should merge user classes & spread custom props to the Avatar node', () => {
      const avatar = chip.find('.my-Avatar').hostNodes();
      assert.strictEqual(avatar.exists(), true);
      assert.strictEqual(avatar.hasClass(classes.avatar), true);
      assert.strictEqual(avatar.props()['data-my-prop'], 'woofChip');
    });

    it('should have a tabIndex prop', () => {
      assert.strictEqual(chip.props().tabIndex, 0);
    });

    it('should fire the function given in onDeleteRequest', () => {
      const onDeleteSpy = spy();
      wrapper.setProps({ onDelete: onDeleteSpy });

      // simulate seems to not work on memo components
      wrapper
        .find('svg[data-mui-test="CancelIcon"]')
        .props()
        .onClick({ stopPropagation: () => {} });
      assert.strictEqual(onDeleteSpy.callCount, 1);
    });

    it('should stop propagation in onDeleteRequest', () => {
      const onDeleteSpy = spy();
      const stopPropagationSpy = spy();
      wrapper.setProps({ onDelete: onDeleteSpy });

      wrapper
        .find('svg[data-mui-test="CancelIcon"]')
        .props()
        .onClick({ stopPropagation: stopPropagationSpy });
      assert.strictEqual(stopPropagationSpy.callCount, 1);
    });

    it('should render with the root, deletable classes', () => {
      assert.strictEqual(chip.hasClass(classes.root), true);
      assert.strictEqual(chip.hasClass(classes.deletable), true);

      const avatarWrapper = wrapper.find(`.${classes.avatar}`);

      assert.strictEqual(avatarWrapper.exists(), true);
    });

    it('should render with the root, deletable and avatar primary classes', () => {
      wrapper = mount(
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
      chip = wrapper.find(`.${classes.root}`);

      assert.strictEqual(chip.exists(), true);
      assert.strictEqual(chip.hasClass(classes.colorPrimary), true);
      assert.strictEqual(chip.hasClass(classes.deletable), true);
      assert.strictEqual(chip.hasClass(classes.deletableColorPrimary), true);

      const avatarWrapper = wrapper.find(`.${classes.avatar}`).first();

      assert.strictEqual(avatarWrapper.exists(), true);
      assert.strictEqual(avatarWrapper.hasClass(classes.avatarColorPrimary), true);
    });

    it('should render with the root, deletable and avatar secondary classes', () => {
      wrapper = mount(
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
      chip = wrapper.find(`.${classes.root}`);

      assert.strictEqual(chip.exists(), true);
      assert.strictEqual(chip.hasClass(classes.colorSecondary), true);
      assert.strictEqual(chip.hasClass(classes.deletable), true);
      assert.strictEqual(chip.hasClass(classes.deletableColorSecondary), true);

      const avatarWrapper = wrapper.find(`.${classes.avatar}`).first();

      assert.strictEqual(avatarWrapper.exists(), true);
      assert.strictEqual(avatarWrapper.hasClass(classes.avatarColorSecondary), true);
    });
  });

  describe('prop: deleteIcon', () => {
    it('should fire the function given in onDeleteRequest', () => {
      const onDeleteSpy = spy();
      const wrapper = mount(
        <Chip label="Custom delete icon Chip" onDelete={onDeleteSpy} deleteIcon={<CheckBox />} />,
      );

      wrapper
        .find('svg[data-mui-test="CheckBoxIcon"]')
        .props()
        .onClick({ stopPropagation: () => {} });
      assert.strictEqual(onDeleteSpy.callCount, 1, 'should have called the onDelete handler');
    });

    it('should render a default icon', () => {
      const wrapper = mount(<Chip label="Custom delete icon Chip" onDelete={() => {}} />);
      assert.strictEqual(wrapper.find('svg[data-mui-test="CancelIcon"]').length, 1);
    });

    it(
      'should render a default icon with the root, deletable, deleteIcon' +
        ' and deleteIconOutlinedColorSecondary classes',
      () => {
        const wrapper = mount(
          <Chip
            label="Custom delete icon Chip"
            onDelete={() => {}}
            variant="outlined"
            color="secondary"
          />,
        );
        const chip = wrapper.find(`.${classes.root}`);

        assert.strictEqual(chip.exists(), true);
        assert.strictEqual(chip.hasClass(classes.deletable), true);

        const iconWrapper = wrapper.find('svg[data-mui-test="CancelIcon"]');
        assert.strictEqual(iconWrapper.hasClass(classes.deleteIcon), true);
        assert.strictEqual(iconWrapper.hasClass(classes.deleteIconOutlinedColorSecondary), true);
      },
    );

    it('should render a default icon with the root, deletable and deleteIcon classes', () => {
      const wrapper = mount(<Chip label="Custom delete icon Chip" onDelete={() => {}} />);
      const chip = wrapper.find(`.${classes.root}`);

      assert.strictEqual(chip.exists(), true);
      assert.strictEqual(chip.hasClass(classes.deletable), true);

      const iconWrapper = wrapper.find('svg[data-mui-test="CancelIcon"]');
      assert.strictEqual(iconWrapper.hasClass(classes.deleteIcon), true);
    });

    it('should render default icon with the root, deletable and deleteIcon primary class', () => {
      const wrapper = mount(
        <Chip label="Custom delete icon Chip" onDelete={() => {}} color="primary" />,
      );
      const chip = wrapper.find(`.${classes.root}`);

      assert.strictEqual(chip.exists(), true);
      assert.strictEqual(chip.hasClass(classes.colorPrimary), true);
      assert.strictEqual(chip.hasClass(classes.deletable), true);
      assert.strictEqual(chip.hasClass(classes.deletableColorPrimary), true);

      const iconWrapper = wrapper.find('svg[data-mui-test="CancelIcon"]');
      assert.strictEqual(iconWrapper.hasClass(classes.deleteIcon), true);
      assert.strictEqual(iconWrapper.hasClass(classes.deleteIconColorPrimary), true);
    });

    it('should render a default icon with the root, deletable, deleteIcon secondary class', () => {
      const wrapper = mount(
        <Chip label="Custom delete icon Chip" onDelete={() => {}} color="secondary" />,
      );
      const chip = wrapper.find(`.${classes.root}`);
      assert.strictEqual(chip.exists(), true);
      assert.strictEqual(chip.hasClass(classes.colorSecondary), true);
      assert.strictEqual(chip.hasClass(classes.deletable), true);
      assert.strictEqual(chip.hasClass(classes.deletableColorSecondary), true);

      const iconWrapper = wrapper.find('svg[data-mui-test="CancelIcon"]');
      assert.strictEqual(iconWrapper.hasClass(classes.deleteIcon), true);
      assert.strictEqual(iconWrapper.hasClass(classes.deleteIconColorSecondary), true);
    });
  });

  describe('reacts to keyboard chip', () => {
    describe('onKeyDown is defined', () => {
      it('should call onKeyDown when a key is pressed', () => {
        const anyKeydownEvent = { key: 'p' };
        const onKeyDownSpy = spy();
        const wrapper = mount(<Chip onKeyDown={onKeyDownSpy} />);
        wrapper.find('div').simulate('keyDown', anyKeydownEvent);
        assert.strictEqual(onKeyDownSpy.callCount, 1);
        assert.strictEqual(onKeyDownSpy.args[0][0].keyCode, anyKeydownEvent.keyCode);
      });
    });

    describe('escape', () => {
      it('should unfocus when a esc key is pressed', () => {
        const ref = React.createRef();
        const wrapper = mount(<Chip innerRef={ref} />);
        const handleBlur = spy();
        ref.current.blur = handleBlur;
        wrapper.find('div').simulate('keyUp', {
          preventDefault: () => {},
          key: 'Escape',
        });
        assert.strictEqual(handleBlur.callCount, 1);
      });
    });

    describe('onClick is defined', () => {
      let onClickSpy;
      let wrapper;

      before(() => {
        onClickSpy = spy();
        wrapper = mount(<Chip onClick={onClickSpy} />);
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

    describe('prop: onDelete', () => {
      it('should call onDelete `backspace` is pressed', () => {
        const preventDefaultSpy = spy();
        const onDeleteSpy = spy();
        const wrapper = mount(<Chip onDelete={onDeleteSpy} />);

        const backspaceKeyDown = {
          preventDefault: preventDefaultSpy,
          key: 'Backspace',
        };
        wrapper.find('div').simulate('keyDown', backspaceKeyDown);
        assert.strictEqual(preventDefaultSpy.callCount, 1);
        assert.strictEqual(onDeleteSpy.callCount, 0);

        const backspaceKeyUp = {
          key: 'Backspace',
        };
        wrapper.find('div').simulate('keyUp', backspaceKeyUp);
        assert.strictEqual(onDeleteSpy.callCount, 1);
        assert.strictEqual(onDeleteSpy.args[0][0].keyCode, backspaceKeyUp.keyCode);
      });

      it('should call onDelete `delete` is pressed', () => {
        const preventDefaultSpy = spy();
        const onDeleteSpy = spy();
        const wrapper = mount(<Chip onDelete={onDeleteSpy} />);

        const backspaceKeyDown = {
          preventDefault: preventDefaultSpy,
          key: 'Delete',
        };
        wrapper.find('div').simulate('keyDown', backspaceKeyDown);
        assert.strictEqual(preventDefaultSpy.callCount, 1);
        assert.strictEqual(onDeleteSpy.callCount, 0);

        const backspaceKeyUp = {
          key: 'Delete',
        };
        wrapper.find('div').simulate('keyUp', backspaceKeyUp);
        assert.strictEqual(onDeleteSpy.callCount, 1);
        assert.strictEqual(onDeleteSpy.args[0][0].keyCode, backspaceKeyUp.keyCode);
      });
    });

    describe('has children that generate events', () => {
      let onClickSpy;
      let onDeleteSpy;
      let onKeyDownSpy;
      let onKeyUpSpy;
      let wrapper;

      before(() => {
        onClickSpy = spy();
        onDeleteSpy = spy();
        onKeyDownSpy = spy();
        onKeyUpSpy = spy();

        wrapper = mount(
          <Chip
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
      const wrapper = mount(<Chip icon={<span id="test-icon" />} />);
      assert.strictEqual(wrapper.find('span#test-icon').hasClass(classes.icon), true);
    });
  });
});
