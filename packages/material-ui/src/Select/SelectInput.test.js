import React from 'react';
import { assert } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import SelectInput from './SelectInput';

describe('<SelectInput />', () => {
  let shallow;
  let mount;
  const defaultProps = {
    classes: { select: 'select' },
    autoWidth: false,
    value: 10,
    multiple: false,
    displayEmpty: false,
    IconComponent: 'div',
    children: [
      <MenuItem key={1} value={10}>
        Ten
      </MenuItem>,
      <MenuItem key={2} value={20}>
        Twenty
      </MenuItem>,
      <MenuItem key={3} value={30}>
        Thirty
      </MenuItem>,
    ],
  };

  before(() => {
    shallow = createShallow();
    // StrictModeViolation: test uses MenuItem
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a correct top element', () => {
    const wrapper = shallow(<SelectInput {...defaultProps} />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(
      wrapper
        .find(MenuItem)
        .at(0)
        .props()['data-value'],
      10,
    );
  });

  it('should accept invalid child', () => {
    shallow(
      <SelectInput {...defaultProps}>
        {null}
        <MenuItem />
      </SelectInput>,
    );
  });

  describe('prop: value', () => {
    it('should select the option based on the number value', () => {
      const wrapper = shallow(<SelectInput {...defaultProps} value={20} />);
      assert.deepEqual(wrapper.find(MenuItem).map(m => m.props().selected), [false, true, false]);
    });

    it('should select the option based on the string value', () => {
      const wrapper = shallow(<SelectInput {...defaultProps} value="20" />);
      assert.deepEqual(wrapper.find(MenuItem).map(m => m.props().selected), [false, true, false]);
    });

    it('should select only the option that matches the object', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };

      const wrapper = shallow(
        <SelectInput {...defaultProps} value={obj1}>
          <MenuItem key={1} value={obj1}>
            1
          </MenuItem>
          <MenuItem key={2} value={obj2}>
            2
          </MenuItem>
        </SelectInput>,
      );

      assert.deepEqual(wrapper.find(MenuItem).map(wrapper2 => wrapper2.props().selected), [
        true,
        false,
      ]);
    });
  });

  describe('prop: readOnly', () => {
    it('should not trigger any event with readOnly', () => {
      const wrapper = mount(<SelectInput {...defaultProps} readOnly />);
      wrapper.find(`.${defaultProps.classes.select}`).simulate('keyDown', { key: 'ArrowDown' });
      assert.strictEqual(wrapper.find(MenuItem).exists(), false);
    });
  });

  describe('prop: MenuProps', () => {
    it('should apply additional properties to the Menu component', () => {
      const wrapper = shallow(
        <SelectInput {...defaultProps} MenuProps={{ transitionDuration: 100 }} />,
      );
      assert.strictEqual(wrapper.find(Menu).props().transitionDuration, 100);
    });

    it('should be able to override PaperProps minWidth', () => {
      const wrapper = shallow(
        <SelectInput {...defaultProps} MenuProps={{ PaperProps: { style: { minWidth: 12 } } }} />,
      );
      assert.strictEqual(wrapper.find(Menu).props().PaperProps.style.minWidth, 12);
    });
  });

  describe('prop: SelectDisplayProps', () => {
    it('should apply additional properties to the clickable div element', () => {
      const wrapper = shallow(
        <SelectInput {...defaultProps} SelectDisplayProps={{ 'data-test': 'SelectDisplay' }} />,
      );

      const selectDisplay = wrapper.find('[data-mui-test="SelectDisplay"]');
      assert.strictEqual(selectDisplay.props()['data-test'], 'SelectDisplay');
    });
  });

  describe('prop: type', () => {
    it('should be hidden by default', () => {
      const wrapper = shallow(<SelectInput {...defaultProps} />);
      assert.strictEqual(wrapper.find('input').props().type, 'hidden');
    });

    it('should be able to override it', () => {
      const wrapper = shallow(<SelectInput {...defaultProps} type="text" />);
      assert.strictEqual(wrapper.find('input').props().type, 'text');
    });
  });

  describe('prop: displayEmpty', () => {
    it('should display the selected item even if its value is empty', () => {
      const wrapper = shallow(
        <SelectInput {...defaultProps} value="" displayEmpty>
          <MenuItem value="">Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </SelectInput>,
      );
      assert.strictEqual(wrapper.find(`.${defaultProps.classes.select}`).text(), 'Ten');
    });
  });

  describe('prop: renderValue', () => {
    it('should use the property to render the value', () => {
      const renderValue = x => String(-x);
      const wrapper = shallow(<SelectInput {...defaultProps} renderValue={renderValue} />);
      assert.strictEqual(wrapper.find(`.${defaultProps.classes.select}`).text(), '-10');
    });
  });

  describe('prop: onChange', () => {
    let wrapper;
    let handleChange;
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    beforeEach(() => {
      handleChange = spy();
      wrapper = mount(
        <SelectInput
          {...defaultProps}
          onChange={handleChange}
          MenuProps={{ transitionDuration: 0 }}
        />,
      );
    });

    it('should call onChange when clicking an item', () => {
      wrapper.find(`.${defaultProps.classes.select}`).simulate('click');
      assert.strictEqual(wrapper.find(MenuItem).exists(), true);
      wrapper
        .find('li')
        .at(1)
        .simulate('click');
      clock.tick(0);
      wrapper.update();
      assert.strictEqual(wrapper.find(MenuItem).exists(), false);
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(handleChange.args[0][0].target.value, 20);
    });

    it('should ignore onBlur the first time the menu is open', () => {
      const handleBlur = spy();
      wrapper.setProps({ onBlur: handleBlur });

      wrapper.find(`.${defaultProps.classes.select}`).simulate('click');
      assert.strictEqual(wrapper.find(MenuItem).exists(), true);
      wrapper.find(`.${defaultProps.classes.select}`).simulate('blur');
      assert.strictEqual(handleBlur.callCount, 0);
      wrapper.find(`.${defaultProps.classes.select}`).simulate('blur');
      assert.strictEqual(handleBlur.callCount, 1);
    });

    it('should pass "name" as part of the event.target for onBlur', () => {
      const handleBlur = spy();
      wrapper.setProps({ onBlur: handleBlur, name: 'blur-testing' });

      wrapper.find(`.${defaultProps.classes.select}`).simulate('click');
      assert.strictEqual(wrapper.find(MenuItem).exists(), true);
      wrapper.find(`.${defaultProps.classes.select}`).simulate('blur');
      assert.strictEqual(handleBlur.callCount, 0);
      wrapper.find(`.${defaultProps.classes.select}`).simulate('blur');
      assert.strictEqual(handleBlur.callCount, 1);
      assert.strictEqual(handleBlur.args[0][0].target.name, 'blur-testing');
    });

    [' ', 'ArrowUp', 'ArrowDown', 'Enter'].forEach(key => {
      it(`'should open menu when pressed ${key} key on select`, () => {
        wrapper.find(`.${defaultProps.classes.select}`).simulate('keyDown', { key });
        assert.strictEqual(wrapper.find(MenuItem).exists(), true);
      });
    });

    it('should call handleClose', () => {
      wrapper.find(`.${defaultProps.classes.select}`).simulate('click');
      assert.strictEqual(wrapper.find(MenuItem).exists(), true);

      const backdrop = wrapper.find('[data-mui-test="Backdrop"]');
      backdrop.simulate('click');
      clock.tick(0);
      wrapper.update();
      assert.strictEqual(wrapper.find(MenuItem).exists(), false);
    });
  });

  describe('prop: open (controlled)', () => {
    class ControlledWrapper extends React.Component {
      state = {
        open: false,
      };

      render() {
        return (
          <SelectInput
            {...defaultProps}
            open={this.state.open}
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
          >
            <MenuItem onClick={() => this.setState({ open: false })}>close</MenuItem>
          </SelectInput>
        );
      }
    }

    it('should allow to control closing by passing onClose props', () => {
      const wrapper = mount(<ControlledWrapper />);
      wrapper.find(`.${defaultProps.classes.select}`).simulate('click');
      assert.strictEqual(wrapper.find('ControlledWrapper').state().open, true);
      wrapper.find(MenuItem).simulate('click');
      assert.strictEqual(wrapper.find('ControlledWrapper').state().open, false);
    });

    it('should work when open is initially true', () => {
      const element = (
        <SelectInput {...defaultProps} open>
          <MenuItem>Hello</MenuItem>
        </SelectInput>
      );

      const wrapper1 = shallow(element, { disableLifecycleMethods: true });
      assert.strictEqual(wrapper1.find(Menu).props().open, false);
      const wrapper2 = mount(element);
      assert.strictEqual(wrapper2.find(Menu).props().open, true);
    });
  });

  describe('prop: autoWidth', () => {
    it('should take the anchor width into account', () => {
      const wrapper = mount(<SelectInput {...defaultProps} />);
      const selectDisplay = wrapper.find('[data-mui-test="SelectDisplay"]').instance();
      stub(selectDisplay, 'clientWidth').get(() => 14);
      wrapper.find(`.${defaultProps.classes.select}`).simulate('click');
      assert.strictEqual(wrapper.find(Menu).props().PaperProps.style.minWidth, 14);
    });

    it('should not take the anchor width into account', () => {
      const wrapper = mount(<SelectInput {...defaultProps} autoWidth />);
      const selectDisplay = wrapper.find('[data-mui-test="SelectDisplay"]').instance();
      stub(selectDisplay, 'clientWidth').get(() => 14);
      wrapper.find(`.${defaultProps.classes.select}`).simulate('click');
      assert.strictEqual(wrapper.find(Menu).props().PaperProps.style.minWidth, null);
    });
  });

  describe('prop: multiple', () => {
    it('should take precedence', () => {
      const wrapper = shallow(<SelectInput {...defaultProps} disabled tabIndex={0} />);
      assert.strictEqual(wrapper.find('[data-mui-test="SelectDisplay"]').props().tabIndex, 0);
    });

    it('should serialize multiple select value', () => {
      const wrapper = shallow(<SelectInput {...defaultProps} value={[10, 30]} multiple />);
      assert.strictEqual(wrapper.find('input').props().value, '10,30');
      assert.deepEqual(wrapper.find(MenuItem).map(wrapper2 => wrapper2.props().selected), [
        true,
        false,
        true,
      ]);
    });

    describe('when the value matches an option but they are different types', () => {
      it('should select the options based on the value', () => {
        const wrapper = shallow(<SelectInput {...defaultProps} value={['10', '20']} multiple />);
        assert.deepEqual(wrapper.find(MenuItem).map(wrapper2 => wrapper2.props().selected), [
          true,
          true,
          false,
        ]);
      });
    });

    describe('when the value is an object', () => {
      it('should select only the options that match', () => {
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };
        const obj3 = { id: 3 };

        const wrapper = shallow(
          <SelectInput {...defaultProps} value={[obj1, obj3]} multiple>
            <MenuItem key={1} value={obj1}>
              1
            </MenuItem>
            <MenuItem key={2} value={obj2}>
              2
            </MenuItem>
            <MenuItem key={3} value={obj3}>
              3
            </MenuItem>
          </SelectInput>,
        );

        assert.deepEqual(wrapper.find(MenuItem).map(wrapper2 => wrapper2.props().selected), [
          true,
          false,
          true,
        ]);
      });
    });

    it('should throw if non array', () => {
      assert.throw(() => {
        shallow(<SelectInput {...defaultProps} multiple />);
      }, /the `value` property must be an array/);
    });

    describe('prop: onChange', () => {
      let wrapper;
      let handleChange;

      beforeEach(() => {
        handleChange = spy();
        wrapper = mount(
          <SelectInput
            {...defaultProps}
            multiple
            value={[20, 30]}
            name="age"
            onChange={handleChange}
            MenuProps={{ transitionDuration: 0 }}
          />,
        );
      });

      it('should call onChange when clicking an item', () => {
        wrapper.find(`.${defaultProps.classes.select}`).simulate('click');
        assert.strictEqual(wrapper.find(MenuItem).exists(), true);
        const portalLayer = document.querySelector('[data-mui-test="Modal"]');

        portalLayer.querySelectorAll('li')[1].click();
        assert.strictEqual(wrapper.find(MenuItem).exists(), true);
        assert.strictEqual(handleChange.callCount, 1);
        assert.deepEqual(handleChange.args[0][0].target.value, [30]);
        assert.deepEqual(handleChange.args[0][0].target.name, 'age');
        wrapper.setProps({ value: [30] });

        portalLayer.querySelectorAll('li')[0].click();
        assert.strictEqual(wrapper.find(MenuItem).exists(), true);
        assert.strictEqual(handleChange.callCount, 2);
        assert.deepEqual(handleChange.args[1][0].target.value, [30, 10]);
      });
    });

    describe('no selection', () => {
      it('should focus list if no selection', () => {
        const wrapper = mount(<SelectInput {...defaultProps} value="" autoFocus />);
        wrapper.find(`.${defaultProps.classes.select}`).simulate('click');
        assert.strictEqual(wrapper.find(MenuItem).exists(), true);
        const portalLayer = document.querySelector('[data-mui-test="Modal"]');
        assert.strictEqual(document.activeElement, portalLayer.querySelectorAll('ul')[0]);
      });
    });

    describe('prop: autoFocus', () => {
      it('should focus select after SelectInput did mount', () => {
        mount(<SelectInput {...defaultProps} autoFocus />);
        assert.strictEqual(document.activeElement.className, `${defaultProps.classes.select}`);
      });
    });
  });

  describe('prop: inputRef', () => {
    it('should be able to return the input node via a ref object', () => {
      const ref = React.createRef();
      mount(<SelectInput {...defaultProps} inputRef={ref} />);
      assert.strictEqual(ref.current.node.tagName, 'INPUT');
    });

    it('should be able to return the input focus proxy function', () => {
      const ref = React.createRef();
      mount(<SelectInput {...defaultProps} inputRef={ref} />);
      assert.strictEqual(typeof ref.current.focus, 'function');
    });

    it('should be able to hit proxy function', () => {
      const ref = React.createRef();
      const onFocus = spy();
      mount(<SelectInput {...defaultProps} inputRef={ref} onFocus={onFocus} />);
      ref.current.focus();
      assert.strictEqual(onFocus.called, true);
    });
  });

  describe('prop: name', () => {
    it('should have no id when name is not provided', () => {
      const wrapper = shallow(<SelectInput {...defaultProps} />);
      assert.strictEqual(wrapper.find('.select').props().id, undefined);
    });

    it('should have select-`name` id when name is provided', () => {
      const wrapper = shallow(<SelectInput {...defaultProps} name="foo" />);
      assert.strictEqual(wrapper.find('.select').props().id, 'select-foo');
    });
  });
});
