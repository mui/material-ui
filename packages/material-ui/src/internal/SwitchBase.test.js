import React from 'react';
import PropTypes from 'prop-types';
import { assert } from 'chai';
import { spy } from 'sinon';
import {
  createMount,
  findOutermostIntrinsic,
  getClasses,
  unwrap,
} from '@material-ui/core/test-utils';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import SwitchBase from './SwitchBase';
import FormControlContext from '../FormControl/FormControlContext';
import Icon from '../Icon';
import ButtonBase from '../ButtonBase';

function assertIsChecked(wrapper) {
  const iconButton = wrapper.find('span').at(0);

  assert.strictEqual(
    iconButton.hasClass('test-class-checked'),
    true,
    'should have the checked class on the root node',
  );

  const input = wrapper.find('input');
  assert.strictEqual(input.instance().checked, true);

  const label = iconButton.childAt(0);
  const icon = label.childAt(0);
  assert.strictEqual(icon.name(), 'h2');
}

function assertIsNotChecked(wrapper) {
  const iconButton = wrapper.find('span').at(0);

  assert.strictEqual(
    iconButton.hasClass('test-class-checked'),
    false,
    'should not have the checked class on the root node',
  );

  const input = wrapper.find('input');
  assert.strictEqual(input.instance().checked, false);

  const label = iconButton.childAt(0);
  const icon = label.childAt(0);
  assert.strictEqual(icon.name(), 'h1');
}

const shouldSuccessOnce = name => func => () => {
  global.successOnce = global.successOnce || {};

  if (!global.successOnce[name]) {
    global.successOnce[name] = false;
  }

  try {
    func();
    global.successOnce[name] = true;
  } catch (err) {
    if (!global.successOnce[name]) {
      throw err;
    }
  }
};

describe('<SwitchBase />', () => {
  let mount;
  let classes;
  let SwitchBaseNaked;
  const defaultProps = {
    type: 'checkbox',
    icon: <h1>h1</h1>,
    checkedIcon: <h2>h2</h2>,
  };

  before(() => {
    SwitchBaseNaked = unwrap(SwitchBase);
    // StrictModeViolation: uses ButtonBase
    mount = createMount({ strict: false });
    classes = getClasses(<SwitchBase {...defaultProps} />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a span', () => {
    const wrapper = mount(<SwitchBase {...defaultProps} />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).name(), 'span');
  });

  it('should render an icon and input inside the button by default', () => {
    const wrapper = mount(<SwitchBase {...defaultProps} />);
    assert.strictEqual(
      wrapper.containsMatchingElement(
        <span>
          {defaultProps.icon}
          <input type="checkbox" />
        </span>,
      ),
      true,
    );
  });

  it('should have a ripple by default', () => {
    const wrapper = mount(<SwitchBase {...defaultProps} />);
    assert.strictEqual(wrapper.find('TouchRipple').exists(), true);
  });

  it('can disable the ripple ', () => {
    const wrapper = mount(<SwitchBase {...defaultProps} disableRipple />);
    assert.strictEqual(wrapper.find('TouchRipple').exists(), false);
  });

  // className is put on the root node, this is a special case!
  it('should render with the user and root classes', () => {
    const wrapper = mount(<SwitchBase {...defaultProps} className="woofSwitchBase" />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass('woofSwitchBase'), true);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.root), true);
  });

  it('should spread custom props on the root node', () => {
    const wrapper = mount(<SwitchBase {...defaultProps} data-my-prop="woofSwitchBase" />);
    assert.strictEqual(
      findOutermostIntrinsic(wrapper).props()['data-my-prop'],
      'woofSwitchBase',
      'custom prop should be woofSwitchBase',
    );
  });

  it('should pass tabIndex to the input so it can be taken out of focus rotation', () => {
    const wrapper = mount(<SwitchBase {...defaultProps} tabIndex={-1} />);
    const input = wrapper.find('input');
    assert.strictEqual(input.props().tabIndex, -1);
  });

  it('should pass value, disabled, checked, and name to the input', () => {
    const props = { name: 'gender', disabled: true, value: 'male' };

    const wrapper = mount(<SwitchBase {...defaultProps} {...props} />);
    const input = wrapper.find('input');

    Object.keys(props).forEach(n => {
      assert.strictEqual(input.props()[n], props[n]);
    });
  });

  it('should disable the components, and render the IconButton with the disabled className', () => {
    const wrapper = mount(<SwitchBase {...defaultProps} disabled />);
    assert.strictEqual(wrapper.find(ButtonBase).props().disabled, true);
    assert.strictEqual(wrapper.find(ButtonBase).hasClass(classes.disabled), true);
  });

  it('should apply the custom disabled className when disabled', () => {
    const disabledClassName = 'foo';
    const wrapperA = mount(
      <SwitchBase {...defaultProps} disabled classes={{ disabled: disabledClassName }} />,
    );

    assert.strictEqual(
      findOutermostIntrinsic(wrapperA).hasClass(disabledClassName),
      true,
      'should have the custom disabled class',
    );

    wrapperA.setProps({ disabled: false });

    assert.strictEqual(
      wrapperA.hasClass(disabledClassName),
      false,
      'should not have the custom disabled class',
    );
  });

  describe('controlled', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <SwitchBaseNaked
          {...defaultProps}
          classes={{
            checked: 'test-class-checked',
          }}
          className="test-class"
          checked={false}
        />,
      );
    });

    it('should check the checkbox', () => {
      wrapper.setProps({ checked: true });
      assertIsChecked(wrapper);
    });

    it('should uncheck the checkbox', () => {
      wrapper.setProps({ checked: true });
      wrapper.setProps({ checked: false });
      assertIsNotChecked(wrapper);
    });
  });

  describe('prop: defaultChecked', () => {
    it('should work uncontrolled', () => {
      const wrapper = mount(<SwitchBaseNaked {...defaultProps} classes={{}} defaultChecked />);
      wrapper
        .find('input')
        .instance()
        .click();
      wrapper.update();
      assertIsNotChecked(wrapper);
    });
  });

  describe('uncontrolled', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <SwitchBaseNaked
          {...defaultProps}
          classes={{
            checked: 'test-class-checked',
          }}
          className="test-class"
        />,
      );
    });

    it('should check the checkbox', () => {
      wrapper
        .find('input')
        .instance()
        .click();
      wrapper.update();
      assertIsChecked(wrapper);
    });

    it('should uncheck the checkbox', () => {
      wrapper
        .find('input')
        .instance()
        .click();
      wrapper
        .find('input')
        .instance()
        .click();
      wrapper.update();
      assertIsNotChecked(wrapper);
    });
  });

  describe('prop: icon', () => {
    it('should render an Icon', () => {
      const wrapper = mount(<SwitchBase {...defaultProps} icon={<Icon>heart</Icon>} />);
      assert.strictEqual(wrapper.contains(Icon), true);
    });
  });

  describe('handleInputChange()', () => {
    const eventMock = 'something-to-match';
    const event = {
      target: {
        checked: false,
      },
      eventMock,
    };

    it('should call onChange exactly once with event', () => {
      const handleChange = spy();
      const wrapper = mount(
        <SwitchBaseNaked {...defaultProps} classes={{}} onChange={handleChange} />,
      );

      const input = wrapper.find('input');
      input.simulate('change', event);

      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(handleChange.calledWithMatch(event), true);

      handleChange.resetHistory();
    });

    describe('controlled', () => {
      it('should call onChange once', () => {
        const checked = true;
        const handleChange = spy();
        const wrapper = mount(
          <SwitchBaseNaked
            {...defaultProps}
            classes={{}}
            checked={checked}
            onChange={handleChange}
          />,
        );
        const input = wrapper.find('input');
        input.simulate('change', event);

        assert.strictEqual(handleChange.callCount, 1);
        assert.strictEqual(
          handleChange.calledWithMatch(event, !checked),
          true,
          'call onChange with event and !props.checked',
        );
      });
    });

    describe('not controlled no input', () => {
      let checkedMock;
      let wrapper;
      let handleChange;

      before(() => {
        handleChange = spy();
        wrapper = mount(<SwitchBaseNaked {...defaultProps} classes={{}} onChange={handleChange} />);
        checkedMock = true;
        const input = wrapper.find('input');
        input.simulate('change', { target: { checked: checkedMock }, eventMock });
        handleChange.resetHistory();
        input.simulate('change', event);
      });

      it('should call onChange exactly once', () => {
        assert.strictEqual(handleChange.callCount, 1);
      });

      it('should call onChange with right params', () => {
        assert.strictEqual(handleChange.calledWithMatch(event, !checkedMock), true);
      });

      it('should change state.checked !checkedMock', () => {
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.checked), !checkedMock);
      });
    });

    describe('prop: inputProps', () => {
      it('should be able to add aria', () => {
        const wrapper2 = mount(
          <SwitchBase {...defaultProps} inputProps={{ 'aria-label': 'foo' }} />,
        );
        assert.strictEqual(wrapper2.find('input').props()['aria-label'], 'foo');
      });
    });

    describe('prop: id', () => {
      it('should be able to add id to a checkbox input', () => {
        const wrapper2 = mount(<SwitchBase {...defaultProps} type="checkbox" id="foo" />);
        assert.strictEqual(wrapper2.find('input').props().id, 'foo');
      });

      it('should be able to add id to a radio input', () => {
        const wrapper2 = mount(<SwitchBase {...defaultProps} type="radio" id="foo" />);
        assert.strictEqual(wrapper2.find('input').props().id, 'foo');
      });
    });
  });

  describe('with muiFormControl context', () => {
    let wrapper;

    function setFormControlContext(muiFormControlContext) {
      wrapper.setProps({ context: muiFormControlContext });
    }

    beforeEach(() => {
      function Provider(props) {
        const { context, ...other } = props;
        return (
          <FormControlContext.Provider value={context}>
            <SwitchBase {...defaultProps} {...other} />
          </FormControlContext.Provider>
        );
      }
      Provider.propTypes = {
        context: PropTypes.object,
      };

      wrapper = mount(<Provider />);
    });

    describe('enabled', () => {
      beforeEach(() => {
        setFormControlContext({});
      });

      it('should not have the disabled class', () => {
        assert.strictEqual(wrapper.hasClass(classes.disabled), false);
      });

      it('should be overridden by props', () => {
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.disabled), false);
        wrapper.setProps({ disabled: true });
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.disabled), true);
      });
    });

    describe('disabled', () => {
      beforeEach(() => {
        setFormControlContext({ disabled: true });
      });

      it('should have the disabled class', () => {
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.disabled), true);
      });

      it('should honor props', () => {
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.disabled), true);
        wrapper.setProps({ disabled: false });
        assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.disabled), false);
      });
    });
  });

  describe('prop: onFocus', () => {
    it('should work', () => {
      const handleFocusProps = spy();
      const handleFocusContext = spy();
      const wrapper = mount(
        <FormControlContext.Provider value={{ onFocus: handleFocusContext }}>
          <SwitchBaseNaked {...defaultProps} classes={{}} onFocus={handleFocusProps} />
        </FormControlContext.Provider>,
      );
      wrapper.find('input').simulate('focus');
      assert.strictEqual(handleFocusProps.callCount, 1);
      assert.strictEqual(handleFocusContext.callCount, 1);
    });
  });

  describe('prop: onBlur', () => {
    it('should work', () => {
      const handleFocusProps = spy();
      const handleFocusContext = spy();
      const wrapper = mount(
        <FormControlContext.Provider value={{ onBlur: handleFocusContext }}>
          <SwitchBaseNaked {...defaultProps} classes={{}} onBlur={handleFocusProps} />
        </FormControlContext.Provider>,
      );
      wrapper.find('input').simulate('blur');
      assert.strictEqual(handleFocusProps.callCount, 1);
      assert.strictEqual(handleFocusContext.callCount, 1);
    });
  });

  describe('check transitioning between controlled states throws errors', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it(
      'should error when uncontrolled and changed to controlled',
      shouldSuccessOnce('didWarnUncontrolledToControlled')(() => {
        const wrapper = mount(<SwitchBase {...defaultProps} type="checkbox" />);
        wrapper.setProps({ checked: true });

        assert.strictEqual(consoleErrorMock.callCount(), 1);
        assert.include(
          consoleErrorMock.args()[0][0],
          'A component is changing an uncontrolled input of type %s to be controlled.',
        );
      }),
    );

    it(
      'should error when controlled and changed to uncontrolled',
      shouldSuccessOnce('didWarnControlledToUncontrolled')(() => {
        const wrapper = mount(<SwitchBase {...defaultProps} type="checkbox" checked={false} />);
        wrapper.setProps({ checked: undefined });

        assert.strictEqual(consoleErrorMock.callCount(), 1);
        assert.include(
          consoleErrorMock.args()[0][0],
          'A component is changing a controlled input of type %s to be uncontrolled.',
        );
      }),
    );
  });
});
