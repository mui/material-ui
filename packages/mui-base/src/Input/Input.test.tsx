import * as React from 'react';
import PropTypes from 'prop-types';
import { createRenderer, fireEvent, screen, act } from '@mui/internal-test-utils';
import { expect } from 'chai';
import { spy } from 'sinon';
import { Input, inputClasses, InputOwnerState } from '@mui/base/Input';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

describe('<Input />', () => {
  const { render } = createRenderer();

  describeConformanceUnstyled(<Input />, () => ({
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    slots: {
      root: {
        expectedClassName: inputClasses.root,
      },
      input: {
        expectedClassName: inputClasses.input,
        testWithElement: 'input',
      },
    },
    skip: ['componentProp'],
  }));

  it('should render textarea without any console errors when multiline=true', () => {
    render(<Input multiline />);

    expect(screen.getByRole('textbox')).to.have.tagName('textarea');
  });

  describe('prop: inputRef', () => {
    it('should be able to attach input ref passed through slotProps', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const { getByRole } = render(<Input slotProps={{ input: { ref: inputRef } }} />);

      expect(inputRef.current).to.deep.equal(getByRole('textbox'));
    });

    it('should be able to access the native textarea of a multiline input', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const { container } = render(<Input multiline slotProps={{ input: { ref: inputRef } }} />);
      expect(inputRef.current).to.equal(container.querySelector('textarea'));
    });
  });

  describe('event handlers', () => {
    it('should call event handlers passed in slotProps', () => {
      const handleChange = spy();
      const handleFocus = spy();
      const handleBlur = spy();
      const handleKeyDown = spy();
      const handleKeyUp = spy();
      const { getByRole } = render(
        <Input
          slotProps={{
            input: {
              onChange: handleChange,
              onFocus: handleFocus,
              onBlur: handleBlur,
              onKeyDown: handleKeyDown,
              onKeyUp: handleKeyUp,
            },
          }}
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

    it('should call event handlers passed to component', () => {
      const handleChange = spy();
      const handleFocus = spy();
      const handleBlur = spy();
      const handleKeyDown = spy();
      const handleKeyUp = spy();
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

    it('should call slotProps.input.onChange callback with all params sent from custom Input component', () => {
      const INPUT_VALUE = 'base';
      const OUTPUT_VALUE = 'test';
      /**
       * This component simulates the integration of react-select with Input
       * react-select has a custom onChange that is essentially "(string, string) => void"
       * https://github.com/mui/material-ui/issues/18130
       */
      const CustomInput = React.forwardRef(function CustomInput(
        props: {
          onChange: (...args: string[]) => void;
          ownerState: InputOwnerState;
        },
        ref: React.ForwardedRef<HTMLInputElement>,
      ) {
        const { onChange, ownerState, ...other } = props;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value, OUTPUT_VALUE);
        };

        return <input ref={ref} onChange={handleChange} {...other} />;
      });

      CustomInput.propTypes = {
        onChange: PropTypes.func.isRequired,
      };

      let outputArguments: string[] = [];
      function parentHandleChange(...args: string[]) {
        outputArguments = args;
      }

      const { getByRole } = render(
        <Input
          slots={{
            input: CustomInput,
          }}
          slotProps={{
            input: {
              onChange: parentHandleChange as unknown as React.ChangeEventHandler<HTMLInputElement>,
            },
          }}
        />,
      );
      const textbox = getByRole('textbox');
      fireEvent.change(textbox, { target: { value: INPUT_VALUE } });

      expect(outputArguments.length).to.equal(2);
      expect(outputArguments[0]).to.equal(INPUT_VALUE);
      expect(outputArguments[1]).to.equal(OUTPUT_VALUE);
    });
  });

  describe('prop: multiline', () => {
    it('should pass the rows prop to the underlying textarea when multiline=true', () => {
      const { getByRole } = render(<Input multiline rows={5} />);
      expect(getByRole('textbox')).to.have.attribute('rows', '5');
    });

    it('should not pass the minRows or maxRows prop to the underlying textarea slot when default host component is used', () => {
      const { getByRole } = render(<Input multiline minRows={5} maxRows={10} />);
      expect(getByRole('textbox')).not.to.have.attribute('minRows');
      expect(getByRole('textbox')).not.to.have.attribute('maxRows');
    });

    it('should pass the minRows or maxRows prop to the underlying textarea slot if a custom component is used', () => {
      const CustomTextarea = React.forwardRef(
        ({ minRows, maxRows, ownerState, ...other }: any, ref) => {
          expect(minRows).to.equal(5);
          expect(maxRows).to.equal(10);
          return <textarea {...other} ref={ref} />;
        },
      );

      render(<Input multiline minRows={5} maxRows={10} slots={{ textarea: CustomTextarea }} />);
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

  describe('controlled', () => {
    it('should considered [] as controlled', () => {
      const { getByRole } = render(<Input value={[]} />);
      const input = getByRole('textbox');

      expect(input).to.have.property('value', '');
      fireEvent.change(input, { target: { value: 'do not work' } });
      expect(input).to.have.property('value', '');
    });
  });

  describe('errors', () => {
    it("throws on change if the target isn't mocked", () => {
      /**
       * This component simulates a custom input component that hides the inner
       * input value for security reasons e.g. react-stripe-element.
       *
       * A ref is exposed to trigger a change event instead of using fireEvent.change
       */
      const BadInputComponent = React.forwardRef(function BadInputComponent(
        props: {
          onChange: (arg: Record<string, unknown>) => void;
        },
        ref,
      ) {
        const { onChange } = props;

        // simulates const handleChange = () => onChange({}) and passing that
        // handler to the onChange prop of `input`
        React.useImperativeHandle(ref, () => () => onChange({}));

        return <input />;
      });

      BadInputComponent.propTypes = {
        onChange: PropTypes.func.isRequired,
      };

      const triggerChangeRef = React.createRef<HTMLInputElement>();

      expect(() => {
        render(
          <Input
            slots={{ input: BadInputComponent }}
            slotProps={{
              input: {
                ref: triggerChangeRef,
              },
            }}
          />,
        );
      }).toErrorDev([
        'MUI: You have provided a `slots.input` to the input component\nthat does not correctly handle the `ref` prop.\nMake sure the `ref` prop is called with a HTMLInputElement.',
        // React 18 Strict Effects run mount effects twice
        React.version.startsWith('18') &&
          'MUI: You have provided a `slots.input` to the input component\nthat does not correctly handle the `ref` prop.\nMake sure the `ref` prop is called with a HTMLInputElement.',
      ]);
    });
  });
});
