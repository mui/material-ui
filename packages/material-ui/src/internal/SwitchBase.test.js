import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createClientRender } from 'test/utils/createClientRender';
import SwitchBase from './SwitchBase';
import FormControl, { useFormControl } from '../FormControl';
import IconButton from '../IconButton';

const shouldSuccessOnce = (name) => (func) => () => {
  global.successOnce = global.successOnce || {};

  if (!global.successOnce[name]) {
    func();
    global.successOnce[name] = true;
  }
};

describe('<SwitchBase />', () => {
  const render = createClientRender();
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<SwitchBase icon="unchecked" checkedIcon="checked" type="checkbox" />);
  });

  describeConformance(
    <SwitchBase checkedIcon="checked" icon="unchecked" type="checkbox" />,
    () => ({
      classes,
      inheritComponent: IconButton,
      mount,
      refInstanceof: window.HTMLSpanElement,
      testComponentPropWith: 'div',
    }),
  );

  it('should render a span', () => {
    const { container } = render(
      <SwitchBase checkedIcon="checked" icon="unchecked" type="checkbox" />,
    );

    expect(container.firstChild).to.have.property('nodeName', 'SPAN');
  });

  it('should render an icon and input inside the button by default', () => {
    const { container, getByRole } = render(
      <SwitchBase checkedIcon="checked" icon="unchecked" type="checkbox" />,
    );
    const buttonInside = container.firstChild.firstChild;

    expect(buttonInside).to.have.property('nodeName', 'SPAN');
    expect(buttonInside.childNodes[0]).to.equal(getByRole('checkbox'));
    expect(buttonInside.childNodes[1]).to.have.text('unchecked');
  });

  it('should have a ripple by default', () => {
    const { getByTestId } = render(
      <SwitchBase
        checkedIcon="checked"
        icon="unchecked"
        type="checkbox"
        TouchRippleProps={{ 'data-testid': 'TouchRipple' }}
      />,
    );

    expect(getByTestId('TouchRipple')).not.to.equal(null);
  });

  it('can disable the ripple ', () => {
    const { queryByTestId } = render(
      <SwitchBase
        checkedIcon="checked"
        icon="unchecked"
        type="checkbox"
        disableRipple
        TouchRippleProps={{ 'data-testid': 'TouchRipple' }}
      />,
    );

    expect(queryByTestId('TouchRipple')).to.equal(null);
  });

  it('should pass tabIndex to the input so it can be taken out of focus rotation', () => {
    const { getByRole } = render(
      <SwitchBase icon="unchecked" checkedIcon="checked" type="checkbox" tabIndex={-1} />,
    );

    expect(getByRole('checkbox')).to.have.attribute('tabIndex', '-1');
  });

  it('should pass value, disabled, checked, and name to the input', () => {
    const { getByRole } = render(
      <SwitchBase
        icon="unchecked"
        checkedIcon="checked"
        type="checkbox"
        name="gender"
        disabled
        value="male"
      />,
    );
    const input = getByRole('checkbox');

    expect(input).to.have.attribute('name', 'gender');
    expect(input).to.have.attribute('disabled');
    expect(input).to.have.attribute('value', 'male');
  });

  it('can disable the components, and render the IconButton with the disabled className', () => {
    const { container } = render(
      <SwitchBase icon="unchecked" checkedIcon="checked" type="checkbox" disabled />,
    );

    // to.be.disabled
    expect(container.firstChild).to.have.attribute('aria-disabled', 'true');
    expect(container.firstChild).to.have.class(classes.disabled);
  });

  describe('controlled', () => {
    it('should check the checkbox', () => {
      const { container, getByRole, getByTestId, setProps } = render(
        <SwitchBase
          icon="unchecked"
          checkedIcon={<span data-testid="checked-icon" />}
          type="checkbox"
          checked={false}
        />,
      );
      setProps({ checked: true });

      expect(container.firstChild).to.have.class(classes.checked);
      expect(getByRole('checkbox')).to.have.property('checked', true);
      expect(getByTestId('checked-icon')).not.to.equal(null);
    });

    it('should uncheck the checkbox', () => {
      const { container, getByRole, getByTestId, setProps } = render(
        <SwitchBase
          icon={<span data-testid="unchecked-icon" />}
          checkedIcon="checked"
          type="checkbox"
          checked
        />,
      );
      setProps({ checked: false });

      expect(container.firstChild).not.to.have.class(classes.checked);
      expect(getByRole('checkbox')).to.have.property('checked', false);
      expect(getByTestId('unchecked-icon')).not.to.equal(null);
    });
  });

  it('can change checked state uncontrolled starting from defaultChecked', () => {
    const { container, getByRole, getByTestId } = render(
      <SwitchBase
        icon={<span data-testid="unchecked-icon" />}
        checkedIcon={<span data-testid="checked-icon" />}
        type="checkbox"
        defaultChecked
      />,
    );
    const checkbox = getByRole('checkbox');

    expect(container.firstChild).to.have.class(classes.checked);
    expect(checkbox).to.have.property('checked', true);
    expect(getByTestId('checked-icon')).not.to.equal(null);

    checkbox.click();

    expect(container.firstChild).not.to.have.class(classes.checked);
    expect(checkbox).to.have.property('checked', false);
    expect(getByTestId('unchecked-icon')).not.to.equal(null);

    checkbox.click();

    expect(container.firstChild).to.have.class(classes.checked);
    expect(checkbox).to.have.property('checked', true);
    expect(getByTestId('checked-icon')).not.to.equal(null);
  });

  describe('handleInputChange()', () => {
    it('should call onChange when uncontrolled', () => {
      const handleChange = spy((event) => event.target.checked);
      const { getByRole } = render(
        <SwitchBase
          icon="unchecked"
          checkedIcon="checked"
          type="checkbox"
          onChange={handleChange}
        />,
      );

      getByRole('checkbox').click();

      expect(handleChange.callCount).to.equal(1);
      // event.target.check is true
      expect(handleChange.firstCall.returnValue).to.equal(true);
    });

    it('should call onChange when controlled', () => {
      const checked = true;
      const handleChange = spy((event, newChecked) => newChecked);
      const { getByRole } = render(
        <SwitchBase
          icon="unchecked"
          checkedIcon="checked"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />,
      );

      getByRole('checkbox').click();

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.firstCall.returnValue).to.equal(!checked);
    });

    describe('prop: inputProps', () => {
      it('should be able to add aria', () => {
        const { getByLabelText } = render(
          <SwitchBase
            icon="unchecked"
            checkedIcon="checked"
            type="checkbox"
            inputProps={{ 'aria-label': 'foo' }}
          />,
        );

        expect(getByLabelText('foo')).to.have.property('type', 'checkbox');
      });
    });

    describe('prop: id', () => {
      it('should be able to add id to a checkbox input', () => {
        const { getByRole } = render(
          <SwitchBase icon="unchecked" checkedIcon="checked" type="checkbox" id="foo" />,
        );

        expect(getByRole('checkbox')).to.have.attribute('id', 'foo');
      });

      it('should be able to add id to a radio input', () => {
        const { getByRole } = render(
          <SwitchBase icon="unchecked" checkedIcon="checked" type="radio" id="foo" />,
        );

        expect(getByRole('radio')).to.have.attribute('id', 'foo');
      });
    });
  });

  describe('with FormControl', () => {
    describe('enabled', () => {
      it('should not have the disabled class', () => {
        const { getByRole, getByTestId } = render(
          <FormControl>
            <SwitchBase data-testid="root" icon="unchecked" checkedIcon="checked" type="checkbox" />
          </FormControl>,
        );

        expect(getByTestId('root')).not.to.have.class(classes.disabled);
        expect(getByRole('checkbox')).not.to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        const { getByRole, getByTestId } = render(
          <FormControl>
            <SwitchBase
              disabled
              data-testid="root"
              icon="unchecked"
              checkedIcon="checked"
              type="checkbox"
            />
          </FormControl>,
        );

        expect(getByTestId('root')).to.have.class(classes.disabled);
        expect(getByRole('checkbox')).to.have.attribute('disabled');
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        const { getByRole, getByTestId } = render(
          <FormControl disabled>
            <SwitchBase data-testid="root" icon="unchecked" checkedIcon="checked" type="checkbox" />
          </FormControl>,
        );

        expect(getByTestId('root')).to.have.class(classes.disabled);
        expect(getByRole('checkbox')).to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        const { getByRole, getByTestId } = render(
          <FormControl disabled>
            <SwitchBase
              disabled={false}
              data-testid="root"
              icon="unchecked"
              checkedIcon="checked"
              type="checkbox"
            />
          </FormControl>,
        );

        expect(getByTestId('root')).not.to.have.class(classes.disabled);
        expect(getByRole('checkbox')).not.to.have.attribute('disabled');
      });
    });
  });

  describe('focus/blur', () => {
    it('forwards focus/blur events and notifies the FormControl', () => {
      function FocusMonitor(props) {
        const { focused } = useFormControl();

        return <span {...props}>focused: {String(focused)}</span>;
      }
      const handleBlur = spy();
      const handleFocus = spy();
      const { getByRole, getByTestId } = render(
        <FormControl>
          <FocusMonitor data-testid="focus-monitor" />
          <SwitchBase
            onBlur={handleBlur}
            onFocus={handleFocus}
            icon="unchecked"
            checkedIcon="checked"
            type="checkbox"
          />
        </FormControl>,
      );
      const checkbox = getByRole('checkbox');

      checkbox.focus();

      expect(getByTestId('focus-monitor')).to.have.text('focused: true');
      expect(handleFocus.callCount).to.equal(1);

      checkbox.blur();

      expect(getByTestId('focus-monitor')).to.have.text('focused: false');
      expect(handleBlur.callCount).to.equal(1);
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
        const wrapper = render(
          <SwitchBase icon="unchecked" checkedIcon="checked" type="checkbox" />,
        );

        expect(consoleErrorMock.callCount()).to.equal(0);

        wrapper.setProps({ checked: true });
        expect(consoleErrorMock.callCount()).to.equal(2);
        expect(consoleErrorMock.messages()[0]).to.include(
          'Warning: A component is changing an uncontrolled input of type checkbox to be controlled.',
        );
        expect(consoleErrorMock.messages()[1]).to.include(
          'Material-UI: A component is changing the uncontrolled checked state of SwitchBase to be controlled.',
        );
      }),
    );

    it(
      'should error when controlled and changed to uncontrolled',
      shouldSuccessOnce('didWarnControlledToUncontrolled')(() => {
        const { setProps } = render(
          <SwitchBase icon="unchecked" checkedIcon="checked" type="checkbox" checked={false} />,
        );
        expect(consoleErrorMock.callCount()).to.equal(0);

        setProps({ checked: undefined });
        expect(consoleErrorMock.callCount()).to.equal(2);
        expect(consoleErrorMock.messages()[0]).to.include(
          'Warning: A component is changing a controlled input of type checkbox to be uncontrolled.',
        );
        expect(consoleErrorMock.messages()[1]).to.include(
          'Material-UI: A component is changing the controlled checked state of SwitchBase to be uncontrolled.',
        );
      }),
    );
  });
});
