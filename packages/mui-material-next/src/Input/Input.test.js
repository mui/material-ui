import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformance, act, createRenderer, fireEvent, screen } from 'test/utils';
import Input, { inputClasses as classes } from '@mui/material-next/Input';

describe('<Input />', () => {
  const { render } = createRenderer();

  describeConformance(<Input />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiInput',
    testVariantProps: { size: 'small' },
    skip: ['componentProp'],
  }));

  it('should render an <input /> inside the div', () => {
    const { container } = render(<Input />);
    const input = container.querySelector('input');
    expect(input).to.have.attribute('type', 'text');
    expect(input).to.have.class(classes.input);
    expect(input).not.to.have.attribute('required');
  });

  it('should add the right class when size is small', () => {
    const { container } = render(<Input size="small" />);
    expect(container.firstChild).to.have.class(classes.sizeSmall);
  });

  describe('multiline', () => {
    it('should render a `textbox` with `aria-multiline`', () => {
      render(<Input multiline />);

      const textarea = screen.getByRole('textbox', { hidden: false });
      // implicit `aria-multiline`
      expect(textarea).to.have.tagName('textarea');
    });

    it('should render a `textbox` with `aria-multiline` if `rows` is specified', () => {
      render(<Input multiline rows={4} />);

      const textarea = screen.getByRole('textbox', { hidden: false });
      // implicit `aria-multiline`
      expect(textarea).to.have.tagName('textarea');
    });

    it('should forward the value to the textarea', () => {
      render(<Input multiline maxRows={4} value="Hello" />);

      const textarea = screen.getByRole('textbox', { hidden: false });
      expect(textarea).to.have.value('Hello');
    });

    it('should preserve state when changing rows', () => {
      const { setProps } = render(<Input multiline />);
      const textarea = screen.getByRole('textbox', { hidden: false });
      act(() => {
        textarea.focus();
      });

      setProps({ rows: 4 });

      expect(textarea).toHaveFocus();
    });
  });

  describe('prop: disabled', () => {
    it('should render a disabled <input />', () => {
      const { container } = render(<Input disabled />);
      const input = container.querySelector('input');
      expect(input).to.have.class(classes.input);
      expect(input).to.have.class(classes.disabled);
    });

    it('should reset the focused state if getting disabled', () => {
      const handleBlur = spy();
      const handleFocus = spy();
      const { container, setProps } = render(<Input onBlur={handleBlur} onFocus={handleFocus} />);

      act(() => {
        container.querySelector('input').focus();
      });
      expect(handleFocus.callCount).to.equal(1);

      setProps({ disabled: true });
      expect(handleBlur.callCount).to.equal(1);
      // check if focus not initiated again
      expect(handleFocus.callCount).to.equal(1);
    });
  });

  it('should fire event callbacks', () => {
    const handleChange = spy();
    const handleFocus = spy();
    const handleBlur = spy();
    const handleKeyUp = spy();
    const handleKeyDown = spy();
    const { getByRole } = render(
      <Input
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
      const { getByRole } = render(<Input value={[]} />);
      const input = getByRole('textbox');

      expect(input).to.have.property('value', '');
      fireEvent.change(input, { target: { value: 'do not work' } });
      expect(input).to.have.property('value', '');
    });
  });

  describe('prop: component', () => {
    it('should accept any html component', () => {
      const { getByTestId } = render(<Input component="span" data-testid="input-component" />);
      expect(getByTestId('input-component')).to.have.property('nodeName', 'SPAN');
    });

    it('should inject onBlur and onFocus', () => {
      let injectedProps;
      const MyInput = React.forwardRef(function MyInput(props, ref) {
        injectedProps = props;
        const { ownerState, ...other } = props;
        return <input ref={ref} {...other} />;
      });

      render(<Input slots={{ input: MyInput }} />);

      expect(typeof injectedProps.onBlur).to.equal('function');
      expect(typeof injectedProps.onFocus).to.equal('function');
    });

    describe('errors', () => {
      it("throws on change if the target isn't mocked", () => {
        /**
         * This component simulates a custom input component that hides the inner
         * input value for security reasons e.g. react-stripe-element.
         *
         * A ref is exposed to trigger a change event instead of using fireEvent.change
         */
        const BadInputComponent = React.forwardRef(function BadInputComponent(props, ref) {
          const { onChange } = props;

          // simulates const handleChange = () => onChange({}) and passing that
          // handler to the onChange prop of `input`
          React.useImperativeHandle(ref, () => () => onChange({}));

          return <input />;
        });

        BadInputComponent.propTypes = {
          onChange: PropTypes.func.isRequired,
        };

        const triggerChangeRef = React.createRef();

        const inputProps = {
          slotProps: {
            input: {
              ref: triggerChangeRef,
            },
          },
        };

        /* render(<Input {...inputProps} slots={{ input: BadInputComponent }} />);
        expect(true).to.equal(true); */

        expect(() => {
          render(<Input {...inputProps} slots={{ input: BadInputComponent }} />);
        }).toErrorDev([
          'MUI: You have provided a `slots.input` to the input component\nthat does not correctly handle the `ref` prop.\nMake sure the `ref` prop is called with a HTMLInputElement.',
          // React 18 Strict Effects run mount effects twice
          React.version.startsWith('18') &&
            'MUI: You have provided a `slots.input` to the input component\nthat does not correctly handle the `ref` prop.\nMake sure the `ref` prop is called with a HTMLInputElement.',
        ]);
      });
    });
  });

  describe('prop: slotProps', () => {
    it('should apply the props on the input', () => {
      const inputProps = {
        slotProps: {
          input: {
            className: 'foo',
            maxLength: 5,
          },
        },
      };
      const { container } = render(<Input {...inputProps} />);
      const input = container.querySelector('input');
      expect(input).to.have.class('foo');
      expect(input).to.have.class(classes.input);
      expect(input).to.have.property('maxLength', 5);
    });

    it('should be able to get a ref', () => {
      const inputRef = React.createRef();
      const inputProps = {
        slotProps: {
          input: {
            ref: inputRef,
          },
        },
      };

      const { container } = render(<Input {...inputProps} />);
      expect(inputRef.current).to.equal(container.querySelector('input'));
    });
  });

  describe('prop: slots and slotProps', () => {
    it('should call onChange inputProp callback with all params sent from custom input slot', () => {
      const INPUT_VALUE = 'material';
      const OUTPUT_VALUE = 'test';

      const MyInput = React.forwardRef(function MyInput(props, ref) {
        const { onChange, ownerState, ...other } = props;

        const handleChange = (e) => {
          onChange(e.target.value, OUTPUT_VALUE);
        };

        return <input ref={ref} onChange={handleChange} {...other} />;
      });

      MyInput.propTypes = {
        onChange: PropTypes.func.isRequired,
      };

      let outputArguments;
      function parentHandleChange(...args) {
        outputArguments = args;
      }

      const inputProps = {
        slotProps: {
          input: {
            onChange: parentHandleChange,
          },
        },
      };

      const { getByRole } = render(<Input slots={{ input: MyInput }} {...inputProps} />);
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
        <Input startAdornment={<span data-testid="adornment">$</span>} />,
      );

      expect(getByTestId('adornment')).not.to.equal(null);
    });

    it('should render adornment after input', () => {
      const { getByTestId } = render(
        <Input endAdornment={<span data-testid="adornment">$</span>} />,
      );

      expect(getByTestId('adornment')).not.to.equal(null);
    });
  });

  describe('prop: inputRef', () => {
    it('should be able to access the native input', () => {
      const inputRef = React.createRef();
      const inputProps = {
        slotProps: {
          input: {
            ref: inputRef,
          },
        },
      };
      const { container } = render(<Input {...inputProps} />);
      expect(inputRef.current).to.equal(container.querySelector('input'));
    });

    it('should be able to access the native textarea', () => {
      const inputRef = React.createRef();
      const inputProps = {
        slotProps: {
          input: {
            ref: inputRef,
          },
        },
      };
      const { container } = render(<Input multiline {...inputProps} />);
      expect(inputRef.current).to.equal(container.querySelector('textarea'));
    });
  });
});
