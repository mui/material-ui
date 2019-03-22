import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, findOutermostIntrinsic, testRef } from '@material-ui/core/test-utils';
import FormGroup from '../FormGroup';
import Radio from '../Radio';
import RadioGroup from './RadioGroup';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { act } from 'react-dom/test-utils';

describe('<RadioGroup />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  function findRadio(wrapper, value) {
    return wrapper.find(`input[value="${value}"]`).first();
  }

  it('does forward refs', () => {
    testRef(<RadioGroup />, mount);
  });

  it('should render a FormGroup with the radiogroup role', () => {
    const wrapper = mount(<RadioGroup value="" />);
    assert.strictEqual(wrapper.childAt(0).type(), FormGroup);
    assert.strictEqual(findOutermostIntrinsic(wrapper).props().role, 'radiogroup');
  });

  it('should fire the onBlur callback', () => {
    const handleBlur = spy();
    const wrapper = mount(<RadioGroup value="" onBlur={handleBlur} />);

    const eventMock = 'something-to-match';
    wrapper.simulate('blur', { eventMock });
    assert.strictEqual(handleBlur.callCount, 1);
    assert.strictEqual(handleBlur.calledWithMatch({ eventMock }), true);
  });

  it('should fire the onKeyDown callback', () => {
    const handleKeyDown = spy();
    const wrapper = mount(<RadioGroup value="" onKeyDown={handleKeyDown} />);

    const eventMock = 'something-to-match';
    wrapper.simulate('keyDown', { eventMock });
    assert.strictEqual(handleKeyDown.callCount, 1);
    assert.strictEqual(handleKeyDown.calledWithMatch({ eventMock }), true);
  });

  it('should support uncontrolled mode', () => {
    const wrapper = mount(
      <RadioGroup name="group">
        <Radio value="one" />
      </RadioGroup>,
    );

    findRadio(wrapper, 'one').simulate('change');
    assert.strictEqual(findRadio(wrapper, 'one').props().checked, true);
  });

  it('should support default value in uncontrolled mode', () => {
    const wrapper = mount(
      <RadioGroup name="group" defaultValue="zero">
        <Radio value="zero" />
        <Radio value="one" />
      </RadioGroup>,
    );

    assert.strictEqual(findRadio(wrapper, 'zero').props().checked, true);
    findRadio(wrapper, 'one').simulate('change');
    assert.strictEqual(findRadio(wrapper, 'one').props().checked, true);
  });

  describe('imperative focus()', () => {
    it('should focus the first non-disabled radio', () => {
      const actionsRef = React.createRef();
      const oneRadioOnFocus = spy();

      mount(
        <RadioGroup actions={actionsRef} value="">
          <Radio value="zero" disabled />
          <Radio value="one" onFocus={oneRadioOnFocus} />
          <Radio value="two" />
        </RadioGroup>,
      );

      actionsRef.current.focus();
      assert.strictEqual(oneRadioOnFocus.callCount, 1);
    });

    it('should not focus any radios if all are disabled', () => {
      const actionsRef = React.createRef();
      const zeroRadioOnFocus = spy();
      const oneRadioOnFocus = spy();
      const twoRadioOnFocus = spy();

      mount(
        <RadioGroup actions={actionsRef} value="">
          <Radio value="zero" disabled onFocus={zeroRadioOnFocus} />
          <Radio value="one" disabled onFocus={oneRadioOnFocus} />
          <Radio value="two" disabled onFocus={twoRadioOnFocus} />
        </RadioGroup>,
      );

      actionsRef.current.focus();

      assert.strictEqual(zeroRadioOnFocus.callCount, 0);
      assert.strictEqual(oneRadioOnFocus.callCount, 0);
      assert.strictEqual(twoRadioOnFocus.callCount, 0);
    });

    it('should focus the selected radio', () => {
      const actionsRef = React.createRef();
      const zeroRadioOnFocus = spy();
      const oneRadioOnFocus = spy();
      const twoRadioOnFocus = spy();
      const threeRadioOnFocus = spy();

      mount(
        <RadioGroup actions={actionsRef} value="two">
          <Radio value="zero" disabled onFocus={zeroRadioOnFocus} />
          <Radio value="one" onFocus={oneRadioOnFocus} />
          <Radio value="two" onFocus={twoRadioOnFocus} />
          <Radio value="three" onFocus={threeRadioOnFocus} />
        </RadioGroup>,
      );

      actionsRef.current.focus();

      assert.strictEqual(zeroRadioOnFocus.callCount, 0);
      assert.strictEqual(oneRadioOnFocus.callCount, 0);
      assert.strictEqual(twoRadioOnFocus.callCount, 1);
      assert.strictEqual(threeRadioOnFocus.callCount, 0);
    });

    it('should focus the non-disabled radio rather than the disabled selected radio', () => {
      const actionsRef = React.createRef();
      const zeroRadioOnFocus = spy();
      const oneRadioOnFocus = spy();
      const twoRadioOnFocus = spy();
      const threeRadioOnFocus = spy();

      mount(
        <RadioGroup actions={actionsRef} value="two">
          <Radio value="zero" disabled onFocus={zeroRadioOnFocus} />
          <Radio value="one" disabled onFocus={oneRadioOnFocus} />
          <Radio value="two" disabled onFocus={twoRadioOnFocus} />
          <Radio value="three" onFocus={threeRadioOnFocus} />
        </RadioGroup>,
      );

      actionsRef.current.focus();

      assert.strictEqual(zeroRadioOnFocus.callCount, 0);
      assert.strictEqual(oneRadioOnFocus.callCount, 0);
      assert.strictEqual(twoRadioOnFocus.callCount, 0);
      assert.strictEqual(threeRadioOnFocus.callCount, 1);
    });

    it('should be able to focus with no radios', () => {
      const actionsRef = React.createRef();
      mount(<RadioGroup actions={actionsRef} value="" />);

      actionsRef.current.focus();
    });
  });

  it('should accept invalid child', () => {
    mount(
      <RadioGroup value="">
        <Radio />
        {null}
      </RadioGroup>,
    );
  });

  describe('prop: onChange', () => {
    it('should fire onChange', () => {
      const handleChange = spy();
      const wrapper = mount(
        <RadioGroup value="" onChange={handleChange}>
          <Radio value="woofRadioGroup" />
          <Radio />
        </RadioGroup>,
      );

      const eventMock = 'something-to-match';
      findRadio(wrapper, 'woofRadioGroup').simulate('change', { eventMock });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(handleChange.calledWithMatch({ eventMock }), true);
    });

    it('should chain the onChange property', () => {
      const handleChange1 = spy();
      const handleChange2 = spy();
      const wrapper = mount(
        <RadioGroup value="" onChange={handleChange1}>
          <Radio value="woofRadioGroup" onChange={handleChange2} />
          <Radio />
        </RadioGroup>,
      );

      findRadio(wrapper, 'woofRadioGroup').simulate('change');
      assert.strictEqual(handleChange1.callCount, 1);
      assert.strictEqual(handleChange2.callCount, 1);
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn when switching from controlled to uncontrolled', () => {
      const wrapper = mount(
        <RadioGroup value="foo">
          <Radio value="foo" />
        </RadioGroup>,
      );

      act(() => {
        wrapper.setProps({ value: undefined });
      });

      assert.include(
        consoleErrorMock.args()[0][0],
        'A component is changing a controlled RadioGroup to be uncontrolled.',
      );
    });

    it('should warn when switching between uncontrolled to controlled', () => {
      const wrapper = mount(
        <RadioGroup>
          <Radio value="foo" />
        </RadioGroup>,
      );

      act(() => {
        wrapper.setProps({ value: 'foo' });
      });

      assert.include(
        consoleErrorMock.args()[0][0],
        'A component is changing an uncontrolled RadioGroup to be controlled.',
      );
    });
  });
});
