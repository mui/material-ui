import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { act, createClientRender, fireEvent } from 'test/utils/createClientRender';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import FormControl, { useFormControl } from '../FormControl';
import InputAdornment from '../InputAdornment';
import TextareaAutosize from '../TextareaAutosize';
import InputBase from './InputBase';
import TextField from '../TextField';
import Select from '../Select';

describe('<InputBase />', () => {
  let classes;
  const mount = createMount();
  const render = createClientRender();

  before(() => {
    classes = getClasses(<InputBase />);
  });

  describeConformance(<InputBase />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render an <input /> inside the div', () => {
    const { container } = render(<InputBase />);
    const input = container.querySelector('input');
    expect(input).to.have.attribute('type', 'text');
    expect(input).to.have.class(classes.input);
    expect(input).not.to.have.attribute('required');
  });

  describe('multiline', () => {
    it('should render an <TextareaAutosize /> when passed the multiline prop', () => {
      const wrapper = mount(<InputBase multiline />);
      expect(wrapper.find(TextareaAutosize)).to.have.lengthOf(1);
    });

    it('should render an <textarea /> when passed the multiline and rows props', () => {
      const { container } = render(<InputBase multiline rows={4} />);
      expect(container.querySelectorAll('textarea')).to.have.lengthOf(1);
    });

    it('should forward the value to the TextareaAutosize', () => {
      const wrapper = mount(<InputBase multiline rowsMax={4} value="" />);
      expect(wrapper.find(TextareaAutosize).props()).to.have.property('value', '');
    });
  });

  describe('prop: disabled', () => {
    it('should render a disabled <input />', () => {
      const { container } = render(<InputBase disabled />);
      const input = container.querySelector('input');
      expect(input).to.have.class(classes.input);
      expect(input).to.have.class(classes.disabled);
    });

    it('should reset the focused state if getting disabled', () => {
      const handleBlur = spy();
      const handleFocus = spy();
      const { container, setProps } = render(
        <InputBase onBlur={handleBlur} onFocus={handleFocus} />,
      );

      act(() => {
        container.querySelector('input').focus();
      });
      expect(handleFocus.callCount).to.equal(1);

      setProps({ disabled: true });
      expect(handleBlur.callCount).to.equal(1);
      // check if focus not initiated again
      expect(handleFocus.callCount).to.equal(1);
    });

    // IE 11 bug
    it('should not respond the focus event when disabled', () => {
      const handleFocus = spy();
      // non-native input simulating how IE11 treats disabled inputs
      const { getByRole } = render(
        <div onFocus={handleFocus}>
          <InputBase
            disabled
            inputComponent="div"
            inputProps={{ role: 'textbox', tabIndex: -1 }}
            onFocus={handleFocus}
          />
        </div>,
      );

      act(() => {
        getByRole('textbox').focus();
      });
      expect(handleFocus.called).to.equal(false);
    });
  });

  it('should fire event callbacks', () => {
    const handleChange = spy();
    const handleFocus = spy();
    const handleBlur = spy();
    const handleKeyUp = spy();
    const handleKeyDown = spy();
    const { getByRole } = render(
      <InputBase
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      />,
    );
    const input = getByRole('textbox');

    // simulating user input: gain focus, key input (keydown, (input), change, keyup), blur

    act(() => {
      input.focus();
    });
    expect(handleFocus.callCount).to.equal(1);

    fireEvent.keyDown(input, { key: 'a' });
    expect(handleKeyDown.callCount).to.equal(1);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(handleChange.callCount).to.equal(1);

    fireEvent.keyUp(input, { key: 'a' });
    expect(handleKeyUp.callCount).to.equal(1);

    act(() => {
      input.blur();
    });
    expect(handleBlur.callCount).to.equal(1);
  });

  describe('controlled', () => {
    it('should considered [] as controlled', () => {
      const { getByRole } = render(<InputBase value={[]} />);
      const input = getByRole('textbox');

      expect(input).to.have.property('value', '');
      fireEvent.change(input, { target: { value: 'do not work' } });
      expect(input).to.have.property('value', '');
    });
  });

  describe('prop: inputComponent', () => {
    it('should accept any html component', () => {
      const { getByTestId } = render(
        <InputBase inputComponent="span" inputProps={{ 'data-testid': 'input-component' }} />,
      );
      expect(getByTestId('input-component')).to.have.property('nodeName', 'SPAN');
    });

    it('should inject onBlur and onFocus', () => {
      let injectedProps;
      function MyInputBase(props) {
        injectedProps = props;
        const { inputRef, ...other } = props;
        return <input ref={inputRef} {...other} />;
      }

      MyInputBase.propTypes = {
        inputRef: PropTypes.func.isRequired,
      };

      render(<InputBase inputComponent={MyInputBase} />);
      expect(typeof injectedProps.onBlur).to.equal('function');
      expect(typeof injectedProps.onFocus).to.equal('function');
    });

    describe('target mock implementations', () => {
      it('can just mock the value', () => {
        function MockedValue(props) {
          const { onChange } = props;

          const handleChange = (event) => {
            onChange({ target: { value: event.target.value } });
          };

          // TODO: required because of a bug in aria-query
          // remove `type` once https://github.com/A11yance/aria-query/pull/42 is merged
          return <input onChange={handleChange} type="text" />;
        }
        MockedValue.propTypes = { onChange: PropTypes.func.isRequired };

        function FilledState(props) {
          const { filled } = useFormControl();
          return <span {...props}>filled: {String(filled)}</span>;
        }

        const { getByRole, getByTestId } = render(
          <FormControl>
            <FilledState data-testid="filled" />
            <InputBase inputComponent={MockedValue} />
          </FormControl>,
        );
        expect(getByTestId('filled')).to.have.text('filled: false');

        fireEvent.change(getByRole('textbox'), { target: { value: 1 } });
        expect(getByTestId('filled')).to.have.text('filled: true');
      });

      it('can expose the full target with `inputRef`', () => {
        function FullTarget(props) {
          const { inputRef, ...other } = props;

          return <input ref={inputRef} {...other} />;
        }
        FullTarget.propTypes = {
          inputRef: PropTypes.any,
        };

        function FilledState(props) {
          const { filled } = useFormControl();
          return <span {...props}>filled: {String(filled)}</span>;
        }

        const { getByRole, getByTestId } = render(
          <FormControl>
            <FilledState data-testid="filled" />
            <InputBase inputComponent={FullTarget} />
          </FormControl>,
        );
        expect(getByTestId('filled')).to.have.text('filled: false');

        fireEvent.change(getByRole('textbox'), { target: { value: 1 } });
        expect(getByTestId('filled')).to.have.text('filled: true');
      });
    });

    describe('errors', () => {
      it('throws on change if the target isnt mocked', () => {
        /**
         * This component simulates a custom input component that hides the inner
         * input value for security reasons e.g. react-stripe-element.
         *
         * A ref is exposed to trigger a change event instead of using fireEvent.change
         */
        function BadInputComponent(props) {
          const { onChange, triggerChangeRef } = props;

          // simulates const handleChange = () => onChange({}) and passing that
          // handler to the onChange prop of `input`
          React.useImperativeHandle(triggerChangeRef, () => () => onChange({}));

          return <input />;
        }
        BadInputComponent.propTypes = {
          onChange: PropTypes.func.isRequired,
          triggerChangeRef: PropTypes.object,
        };

        const triggerChangeRef = React.createRef();
        render(<InputBase inputProps={{ triggerChangeRef }} inputComponent={BadInputComponent} />);

        // mocking fireEvent.change(getByRole('textbox'), { target: { value: 1 } });
        // using dispatchEvents prevents us from catching the error in the browser
        // in test:karma neither try-catch nor consoleErrorMock.spy catches the error
        let errorMessage = '';
        try {
          triggerChangeRef.current();
        } catch (error) {
          errorMessage = String(error);
        }

        expect(errorMessage).to.include('Material-UI: Expected valid input target');
      });
    });
  });

  describe('with FormControl', () => {
    it('should have the formControl class', () => {
      const { getByTestId } = render(
        <FormControl>
          <InputBase data-testid="root" />
        </FormControl>,
      );
      expect(getByTestId('root')).to.have.class(classes.formControl);
    });

    describe('callbacks', () => {
      it('should fire the onClick prop', () => {
        const handleClick = spy();
        const handleFocus = spy();
        const { getByTestId } = render(
          <FormControl>
            <InputBase data-testid="root" onClick={handleClick} onFocus={handleFocus} />
          </FormControl>,
        );

        fireEvent.click(getByTestId('root'));
        expect(handleClick.callCount).to.equal(1);
        expect(handleFocus.callCount).to.equal(1);
      });
    });

    describe('error', () => {
      it('should be overridden by props', () => {
        function InputBaseInErrorForm(props) {
          return (
            <FormControl error>
              <InputBase data-testid="root" {...props} />
            </FormControl>
          );
        }

        const { getByTestId, setProps } = render(<InputBaseInErrorForm />);
        expect(getByTestId('root')).to.have.class(classes.error);

        setProps({ error: false });
        expect(getByTestId('root')).not.to.have.class(classes.error);

        setProps({ error: true });
        expect(getByTestId('root')).to.have.class(classes.error);
      });
    });

    describe('margin', () => {
      it('should have the inputMarginDense class in a dense context', () => {
        const { container } = render(
          <FormControl margin="dense">
            <InputBase />
          </FormControl>,
        );
        expect(container.querySelector('input')).to.have.class(classes.inputMarginDense);
      });

      it('should be overridden by props', () => {
        function InputBaseInFormWithMargin(props) {
          return (
            <FormControl margin="none">
              <InputBase {...props} />
            </FormControl>
          );
        }
        const { container, setProps } = render(<InputBaseInFormWithMargin />);
        expect(container.querySelector('input')).not.to.have.class(classes.inputMarginDense);

        setProps({ margin: 'dense' });
        expect(container.querySelector('input')).to.have.class(classes.inputMarginDense);
      });

      it('has an inputHiddenLabel class to further reduce margin', () => {
        const { getByRole } = render(
          <FormControl hiddenLabel margin="dense">
            <InputBase />
          </FormControl>,
        );

        expect(getByRole('textbox')).to.have.class(classes.inputHiddenLabel);
      });
    });

    describe('required', () => {
      it('should have the aria-required prop with value true', () => {
        const { container } = render(
          <FormControl required>
            <InputBase />
          </FormControl>,
        );
        const input = container.querySelector('input');
        expect(input).to.have.property('required', true);
      });
    });

    describe('focused', () => {
      it('prioritizes context focus', () => {
        const FormController = React.forwardRef((props, ref) => {
          const { onBlur, onFocus } = useFormControl();

          React.useImperativeHandle(ref, () => ({ onBlur, onFocus }), [onBlur, onFocus]);

          return null;
        });
        const controlRef = React.createRef();
        const { getByRole, getByTestId } = render(
          <FormControl>
            <FormController ref={controlRef} />
            <InputBase data-testid="root" />
          </FormControl>,
        );

        act(() => {
          getByRole('textbox').focus();
        });
        expect(getByTestId('root')).to.have.class(classes.focused);

        controlRef.current.onBlur();
        expect(getByTestId('root')).not.to.have.class(classes.focused);

        controlRef.current.onFocus();
        expect(getByTestId('root')).to.have.class(classes.focused);
      });

      it('propagates focused state', () => {
        function FocusedStateLabel(props) {
          const { focused } = useFormControl();
          return <label {...props}>focused: {String(focused)}</label>;
        }
        const { getByRole, getByTestId } = render(
          <FormControl>
            <FocusedStateLabel data-testid="label" htmlFor="input" />
            <InputBase id="input" />
          </FormControl>,
        );
        expect(getByTestId('label')).to.have.text('focused: false');

        act(() => {
          getByRole('textbox').focus();
        });
        expect(getByTestId('label')).to.have.text('focused: true');

        act(() => {
          getByRole('textbox').blur();
        });
        expect(getByTestId('label')).to.have.text('focused: false');
      });
    });

    it('propagates filled state when uncontrolled', () => {
      function FilledStateLabel(props) {
        const { filled } = useFormControl();
        return <label {...props}>filled: {String(filled)}</label>;
      }
      const { getByRole, getByTestId } = render(
        <FormControl>
          <FilledStateLabel data-testid="label" />
          <InputBase />
        </FormControl>,
      );
      expect(getByTestId('label')).to.have.text('filled: false');
      const textbox = getByRole('textbox');

      fireEvent.change(textbox, { target: { value: 'material' } });
      expect(getByTestId('label')).to.have.text('filled: true');

      fireEvent.change(textbox, { target: { value: '0' } });
      expect(getByTestId('label')).to.have.text('filled: true');

      fireEvent.change(textbox, { target: { value: '' } });
      expect(getByTestId('label')).to.have.text('filled: false');
    });

    it('propagates filled state when controlled', () => {
      function FilledStateLabel(props) {
        const { filled } = useFormControl();
        return <label {...props}>filled: {String(filled)}</label>;
      }
      function ControlledInputBase(props) {
        return (
          <FormControl>
            <FilledStateLabel data-testid="label" />
            <InputBase {...props} />
          </FormControl>
        );
      }
      const { getByTestId, setProps } = render(<ControlledInputBase value="" />);
      expect(getByTestId('label')).to.have.text('filled: false');

      setProps({ value: 'material' });
      expect(getByTestId('label')).to.have.text('filled: true');

      setProps({ value: 0 });
      expect(getByTestId('label')).to.have.text('filled: true');

      setProps({ value: '' });
      expect(getByTestId('label')).to.have.text('filled: false');
    });

    describe('registering input', () => {
      beforeEach(() => {
        consoleErrorMock.spy();
      });

      afterEach(() => {
        consoleErrorMock.reset();
      });

      it("should warn if more than one input is rendered regarless how it's nested", () => {
        render(
          <FormControl>
            <InputBase />
            <div>
              {/* should work regarless how it's nested */}
              <InputBase />
            </div>
          </FormControl>,
        );

        expect(consoleErrorMock.callCount()).to.eq(1);
        expect(consoleErrorMock.messages()[0]).to.include(
          'Material-UI: There are multiple InputBase components inside a FormControl.',
        );
      });

      it('should not warn if only one input is rendered', () => {
        render(
          <FormControl>
            <InputBase />
          </FormControl>,
        );

        expect(consoleErrorMock.callCount()).to.eq(0);
      });

      it('should not warn when toggling between inputs', () => {
        // this will ensure that unregistering was called during unmount
        const ToggleFormInputs = () => {
          const [flag, setFlag] = React.useState(true);

          return (
            <FormControl>
              {flag ? (
                <InputBase />
              ) : (
                <Select native>
                  <option value="">empty</option>
                </Select>
              )}
              <button type="button" onClick={() => setFlag(!flag)}>
                toggle
              </button>
            </FormControl>
          );
        };

        const { getByText } = render(<ToggleFormInputs />);
        fireEvent.click(getByText('toggle'));

        expect(consoleErrorMock.callCount()).to.eq(0);
      });
    });
  });

  describe('prop: inputProps', () => {
    it('should apply the props on the input', () => {
      const { container } = render(<InputBase inputProps={{ className: 'foo', maxLength: 5 }} />);
      const input = container.querySelector('input');
      expect(input).to.have.class('foo');
      expect(input).to.have.class(classes.input);
      expect(input).to.have.property('maxLength', 5);
    });

    it('should be able to get a ref', () => {
      const inputRef = React.createRef();
      const { container } = render(<InputBase inputProps={{ ref: inputRef }} />);
      expect(inputRef.current).to.equal(container.querySelector('input'));
    });
  });

  describe('prop: inputComponent with prop: inputProps', () => {
    it('should call onChange inputProp callback with all params sent from custom inputComponent', () => {
      const INPUT_VALUE = 'material';
      const OUTPUT_VALUE = 'test';

      function MyInputBase(props) {
        const { inputRef, onChange, ...other } = props;

        const handleChange = (e) => {
          onChange(e.target.value, OUTPUT_VALUE);
        };

        return <input ref={inputRef} onChange={handleChange} {...other} />;
      }

      MyInputBase.propTypes = {
        inputRef: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
      };

      let outputArguments;
      function parentHandleChange(...args) {
        outputArguments = args;
      }

      const { getByRole } = render(
        <InputBase inputComponent={MyInputBase} inputProps={{ onChange: parentHandleChange }} />,
      );
      const textbox = getByRole('textbox');
      fireEvent.change(textbox, { target: { value: INPUT_VALUE } });

      expect(outputArguments.length).to.equal(2);
      expect(outputArguments[0]).to.equal(INPUT_VALUE);
      expect(outputArguments[1]).to.equal(OUTPUT_VALUE);
    });
  });

  describe('prop: startAdornment, prop: endAdornment', () => {
    it('should render adornment before input', () => {
      const { getByTestId } = render(
        <InputBase
          startAdornment={
            <InputAdornment data-testid="adornment" position="start">
              $
            </InputAdornment>
          }
        />,
      );

      expect(getByTestId('adornment')).not.to.equal(null);
    });

    it('should render adornment after input', () => {
      const { getByTestId } = render(
        <InputBase
          endAdornment={
            <InputAdornment data-testid="adornment" position="end">
              $
            </InputAdornment>
          }
        />,
      );

      expect(getByTestId('adornment')).not.to.equal(null);
    });

    it('should allow a Select as an adornment', () => {
      render(
        <TextField
          value=""
          name="text"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Select value="" name="suffix" />
              </InputAdornment>
            ),
          }}
        />,
      );
    });
  });

  describe('prop: inputRef', () => {
    it('should be able to access the native input', () => {
      const inputRef = React.createRef();
      const { container } = render(<InputBase inputRef={inputRef} />);
      expect(inputRef.current).to.equal(container.querySelector('input'));
    });

    it('should be able to access the native textarea', () => {
      const inputRef = React.createRef();
      const { container } = render(<InputBase multiline inputRef={inputRef} />);
      expect(inputRef.current).to.equal(container.querySelector('textarea'));
    });
  });
});
