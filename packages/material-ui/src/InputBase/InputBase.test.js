import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '../test-utils/describeConformance';
import { act, cleanup, createClientRender, fireEvent } from 'test/utils/createClientRender';
import FormControl, { useFormControl } from '../FormControl';
import InputAdornment from '../InputAdornment';
import TextareaAutosize from '../TextareaAutosize';
import InputBase from './InputBase';
import TextField from '../TextField';
import Select from '../Select';

describe('<InputBase />', () => {
  let classes;
  let mount;
  const render = createClientRender({ strict: true });

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<InputBase />);
  });

  afterEach(() => {
    cleanup();
  });

  after(() => {
    mount.cleanUp();
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
      const { container } = render(<InputBase multiline rows="4" />);
      expect(container.querySelectorAll('textarea')).to.have.lengthOf(1);
    });

    it('should forward the value to the TextareaAutosize', () => {
      const wrapper = mount(<InputBase multiline rowsMax="4" value="" />);
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
      expect(handleFocus.called).to.be.false;
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

    fireEvent.keyDown(document.activeElement, { key: 'a' });
    expect(handleKeyDown.callCount).to.equal(1);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(handleChange.callCount).to.equal(1);

    fireEvent.keyUp(document.activeElement, { key: 'a' });
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

    ['', 0].forEach(value => {
      describe(`${typeof value} value`, () => {
        let wrapper;
        let handleFilled;
        let handleEmpty;

        before(() => {
          handleEmpty = spy();
          handleFilled = spy();
          wrapper = render(
            <InputBase value={value} onFilled={handleFilled} onEmpty={handleEmpty} />,
          );
        });

        // don't test number because zero is a empty state, whereas '' is not
        if (typeof value !== 'number') {
          it('should have called the handleEmpty callback', () => {
            expect(handleEmpty.callCount).to.equal(1);
          });

          it('should fire the onFilled callback when dirtied', () => {
            expect(handleFilled.callCount).to.equal(0);
            wrapper.setProps({ value: typeof value === 'number' ? 2 : 'hello' });
            expect(handleFilled.callCount).to.equal(1);
          });

          it('should fire the onEmpty callback when dirtied', () => {
            expect(handleEmpty.callCount).to.equal(1);
            wrapper.setProps({ value });
            expect(handleEmpty.callCount).to.equal(2);
          });
        }
      });
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
  });

  // Note the initial callback when
  // uncontrolled only fires for a full mount
  describe('uncontrolled', () => {
    it('should fire the onFilled callback when dirtied', () => {
      const handleFilled = spy();
      const { container } = render(<InputBase onFilled={handleFilled} defaultValue="hell" />);
      expect(handleFilled.callCount, 1);

      fireEvent.change(container.querySelector('input'), { target: { value: 'heaven' } });
      expect(handleFilled.callCount, 2);
    });

    it('should fire the onEmpty callback when cleaned', () => {
      const handleEmpty = spy();
      const { container } = render(<InputBase onEmpty={handleEmpty} defaultValue="hell" />);
      expect(handleEmpty.callCount, 0);

      fireEvent.change(container.querySelector('input'), { target: { value: '' } });
      expect(handleEmpty.callCount, 1);
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
      it('should fire the onFilled props callback when dirtied', () => {
        const handleFilled = spy();
        const { container } = render(<InputBase onFilled={handleFilled} />);

        fireEvent.change(container.querySelector('input'), { target: { value: 'hello' } });
        expect(handleFilled.callCount).to.equal(1);
      });

      it('should fire the and props callback when cleaned', () => {
        const handleEmpty = spy();
        const { container } = render(<InputBase onEmpty={handleEmpty} />);

        // Set value to be cleared
        fireEvent.change(container.querySelector('input'), { target: { value: 'test' } });
        expect(handleEmpty.callCount, 0);

        // Clear value
        fireEvent.change(container.querySelector('input'), { target: { value: '' } });
        expect(handleEmpty.callCount).to.equal(2);
      });

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

      fireEvent.change(getByRole('textbox'), { target: { value: 'material' } });
      expect(getByTestId('label')).to.have.text('filled: true');

      fireEvent.change(getByRole('textbox'), { target: { value: '0' } });
      expect(getByTestId('label')).to.have.text('filled: true');

      fireEvent.change(getByRole('textbox'), { target: { value: '' } });
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

      expect(getByTestId('adornment')).to.be.ok;
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

      expect(getByTestId('adornment')).to.be.ok;
    });

    it('should allow a Select as an adornment', () => {
      render(
        <TextField
          value=""
          name="text"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Select value="a" name="suffix" />
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
