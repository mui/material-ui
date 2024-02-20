import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { ClassNames } from '@emotion/react';
import { act, createRenderer, fireEvent } from '@mui-internal/test-utils';
import FormControl, { formControlClasses as classes } from '@mui/material-next/FormControl';
import FilledInput from '@mui/material-next/FilledInput';
import InputBase from '@mui/material-next/InputBase';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';
// TODO v6: replace with material-next/Select
import Select from '@mui/material/Select';
import useFormControl from './useFormControl';
import describeConformance from '../../test/describeConformance';

type TestFormControlledComponent = {
  onFilled: () => {};
  onEmpty: () => {};
  onFocus: () => {};
  onBlur: () => {};
};

describe('<FormControl />', () => {
  const { render } = createRenderer();

  interface TestComponentProps {
    contextCallback: (context: ReturnType<typeof useFormControl>) => void;
  }

  function TestComponent(props: TestComponentProps) {
    const context = useFormControl();
    React.useEffect(() => {
      props.contextCallback(context);
    });
    return null;
  }

  describeConformance(<FormControl />, () => ({
    classes,
    inheritComponent: 'div',
    ThemeProvider: CssVarsProvider,
    createTheme: extendTheme,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiFormControl',
    slots: {
      root: {
        expectedClassName: classes.root,
        testWithElement: 'fieldset',
      },
    },
    testRootOverrides: { slotName: 'root', slotClassName: classes.root },
    testComponentPropWith: 'fieldset',
    testVariantProps: { margin: 'dense' },
    skip: ['componentsProp'],
  }));

  describe('initial state', () => {
    it('should have no margin', () => {
      const { container } = render(<FormControl />);
      const root = container.firstChild;

      expect(root).not.to.have.class(classes.marginNormal);
    });

    it('can have the margin normal class', () => {
      const { container } = render(<FormControl margin="normal" />);
      const root = container.firstChild;

      expect(root).to.have.class(classes.marginNormal);
    });

    it('can have the margin dense class', () => {
      const { container } = render(<FormControl margin="dense" />);
      const root = container.firstChild;

      expect(root).to.have.class(classes.marginDense);
      expect(root).not.to.have.class(classes.marginNormal);
    });

    it('should not be filled initially', () => {
      const readContext = spy();
      render(
        <FormControl>
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('filled', false);
    });

    it('should not be focused initially', () => {
      const readContext = spy();
      render(
        <FormControl>
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('focused', false);
    });
  });

  describe('prop: required', () => {
    it('should not apply it to the DOM', () => {
      const { container } = render(<FormControl required />);
      expect(container.firstChild).not.to.have.attribute('required');
    });
  });

  describe('prop: disabled', () => {
    it('will be unfocused if it gets disabled', () => {
      const readContext = spy();
      const { container, setProps } = render(
        <FormControl>
          <InputBase />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('focused', false);

      act(() => {
        container.querySelector('input')?.focus();
      });
      expect(readContext.lastCall.args[0]).to.have.property('focused', true);

      setProps({ disabled: true });
      expect(readContext.lastCall.args[0]).to.have.property('focused', false);
    });
  });

  describe('prop: focused', () => {
    it('should display input in focused state', () => {
      const readContext = spy();
      const { container } = render(
        <FormControl focused>
          <InputBase />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );

      expect(readContext.args[0][0]).to.have.property('focused', true);
      container.querySelector('input')?.blur();
      expect(readContext.args[0][0]).to.have.property('focused', true);
    });

    it('ignores focused when disabled', () => {
      const readContext = spy();
      render(
        <FormControl focused disabled>
          <InputBase />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.include({ disabled: true, focused: false });
    });
  });

  describe('registering input', () => {
    it("should warn if more than one input is rendered regardless how it's nested", () => {
      expect(() => {
        render(
          <FormControl>
            <InputBase />
            <div>
              {/* should work regardless how it's nested */}
              <InputBase />
            </div>
          </FormControl>,
        );
      }).toErrorDev([
        'MUI: There are multiple `InputBase` components inside a FormControl.\nThis creates visual inconsistencies, only use one `InputBase`.',
        // React 18 Strict Effects run mount effects twice
        React.version.startsWith('18') &&
          'MUI: There are multiple `InputBase` components inside a FormControl.\nThis creates visual inconsistencies, only use one `InputBase`.',
      ]);
    });

    it('should not warn if only one input is rendered', () => {
      expect(() => {
        render(
          <FormControl>
            <InputBase />
          </FormControl>,
        );
      }).not.toErrorDev();
    });

    it('should not warn when toggling between inputs', () => {
      // this will ensure that deregistering was called during unmount
      function ToggleFormInputs() {
        const [flag, setFlag] = React.useState(true);

        return (
          <FormControl>
            {flag ? (
              <InputBase />
            ) : (
              // TODO v6: use material-next/Select
              <Select native>
                <option value="">empty</option>
              </Select>
            )}
            <button type="button" onClick={() => setFlag(!flag)}>
              toggle
            </button>
          </FormControl>
        );
      }

      const { getByText } = render(<ToggleFormInputs />);
      expect(() => {
        fireEvent.click(getByText('toggle'));
      }).not.toErrorDev();
    });
  });

  describe('input', () => {
    it('should be filled when a value is set', () => {
      const readContext = spy();
      render(
        <FormControl>
          <FilledInput value="bar" />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('filled', true);
    });

    it('should be filled when a value is set through slotProps.input', () => {
      const readContext = spy();
      render(
        <FormControl>
          <FilledInput slotProps={{ input: { value: 'bar' } }} />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('filled', true);
    });

    it('should be filled when a defaultValue is set', () => {
      const readContext = spy();
      render(
        <FormControl>
          <FilledInput defaultValue="bar" />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('filled', true);
    });

    it('should not be adornedStart with an endAdornment', () => {
      const readContext = spy();
      render(
        <FormControl>
          <FilledInput endAdornment={<div />} />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('adornedStart', false);
    });

    it('should be adornedStart with a startAdornment', () => {
      const readContext = spy();
      render(
        <FormControl>
          <FilledInput startAdornment={<div />} />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('adornedStart', true);
    });
  });

  // TODO v6: needs material-next/Select + FormControl integrated
  // eslint-disable-next-line mocha/no-skipped-tests
  describe.skip('select', () => {
    it('should not be adorned without a startAdornment', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Select value="" />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0]).to.have.property('adornedStart', false);
    });

    it('should be adorned with a startAdornment', () => {
      const readContext = spy();
      render(
        <FormControl>
          <Select value="" input={<InputBase startAdornment={<div />} />} />
          <TestComponent contextCallback={readContext} />
        </FormControl>,
      );
      expect(readContext.args[0][0].adornedStart, 'true');
    });
  });

  describe('useFormControl', () => {
    const FormController = React.forwardRef((_, ref) => {
      const formControl = useFormControl();
      React.useImperativeHandle(ref, () => formControl, [formControl]);
      return null;
    });

    const FormControlled = React.forwardRef(function FormControlled(props, ref) {
      return (
        <FormControl {...props}>
          <FormController ref={ref} />
        </FormControl>
      );
    });

    describe('from props', () => {
      it('should have the required prop from the instance', () => {
        const formControlRef = React.createRef<TestFormControlledComponent>();
        const { setProps } = render(<FormControlled ref={formControlRef} />);

        expect(formControlRef.current).to.have.property('required', false);

        setProps({ required: true });
        expect(formControlRef.current).to.have.property('required', true);
      });

      it('should have the error prop from the instance', () => {
        const formControlRef = React.createRef<TestFormControlledComponent>();
        const { setProps } = render(<FormControlled ref={formControlRef} />);

        expect(formControlRef.current).to.have.property('error', false);

        setProps({ error: true });
        expect(formControlRef.current).to.have.property('error', true);
      });

      it('should have the margin prop from the instance', () => {
        const formControlRef = React.createRef<TestFormControlledComponent>();
        const { setProps } = render(<FormControlled ref={formControlRef} />);

        expect(formControlRef.current).to.have.property('size', 'medium');

        setProps({ size: 'small' });
        expect(formControlRef.current).to.have.property('size', 'small');
      });

      it('should have the fullWidth prop from the instance', () => {
        const formControlRef = React.createRef<TestFormControlledComponent>();
        const { setProps } = render(<FormControlled ref={formControlRef} />);

        expect(formControlRef.current).to.have.property('fullWidth', false);

        setProps({ fullWidth: true });
        expect(formControlRef.current).to.have.property('fullWidth', true);
      });
    });

    describe('callbacks', () => {
      describe('onFilled', () => {
        it('should set the filled state', () => {
          const formControlRef = React.createRef<TestFormControlledComponent>();
          render(<FormControlled ref={formControlRef} />);

          expect(formControlRef.current).to.have.property('filled', false);

          act(() => {
            formControlRef.current?.onFilled();
          });

          expect(formControlRef.current).to.have.property('filled', true);

          act(() => {
            formControlRef.current?.onFilled();
          });

          expect(formControlRef.current).to.have.property('filled', true);
        });
      });

      describe('onEmpty', () => {
        it('should clean the filled state', () => {
          const formControlRef = React.createRef<TestFormControlledComponent>();
          render(<FormControlled ref={formControlRef} />);

          act(() => {
            formControlRef.current?.onFilled();
          });

          expect(formControlRef.current).to.have.property('filled', true);

          act(() => {
            formControlRef.current?.onEmpty();
          });

          expect(formControlRef.current).to.have.property('filled', false);

          act(() => {
            formControlRef.current?.onEmpty();
          });

          expect(formControlRef.current).to.have.property('filled', false);
        });
      });

      describe('handleFocus', () => {
        it('should set the focused state', () => {
          const formControlRef = React.createRef<TestFormControlledComponent>();
          render(<FormControlled ref={formControlRef} />);
          expect(formControlRef.current).to.have.property('focused', false);

          act(() => {
            formControlRef.current?.onFocus();
          });

          expect(formControlRef.current).to.have.property('focused', true);

          act(() => {
            formControlRef.current?.onFocus();
          });

          expect(formControlRef.current).to.have.property('focused', true);
        });
      });

      describe('handleBlur', () => {
        it('should clear the focused state', () => {
          const formControlRef = React.createRef<TestFormControlledComponent>();
          render(<FormControlled ref={formControlRef} />);
          expect(formControlRef.current).to.have.property('focused', false);

          act(() => {
            formControlRef.current?.onFocus();
          });

          expect(formControlRef.current).to.have.property('focused', true);

          act(() => {
            formControlRef.current?.onBlur();
          });

          expect(formControlRef.current).to.have.property('focused', false);

          act(() => {
            formControlRef.current?.onBlur();
          });

          expect(formControlRef.current).to.have.property('focused', false);
        });
      });
    });
  });

  describe('Emotion compatibility', () => {
    it('classes.root should overwrite built-in styles.', () => {
      const { getByTestId } = render(
        <ClassNames>
          {({ css }) => (
            <FormControl data-testid="root" classes={{ root: css({ display: 'inline' }) }} />
          )}
        </ClassNames>,
      );
      const root = getByTestId('root');

      expect(getComputedStyle(root).display).to.equal('inline');
    });

    it('className should overwrite classes.root and built-in styles.', () => {
      const { getByTestId } = render(
        <ClassNames>
          {({ css }) => (
            <FormControl
              data-testid="root"
              className={css({ display: 'inline-block' })}
              classes={{ root: css({ display: 'inline' }) }}
            />
          )}
        </ClassNames>,
      );
      const root = getByTestId('root');

      expect(getComputedStyle(root).display).to.equal('inline-block');
    });
  });
});
