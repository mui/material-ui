import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, act, fireEvent } from '@mui/internal-test-utils';
import Input, { inputClasses as classes } from '@mui/joy/Input';
import { ThemeProvider, extendTheme } from '@mui/joy/styles';
import FormControl from '@mui/joy/FormControl';
import describeConformance from '../../test/describeConformance';

describe('Joy <Input />', () => {
  const { render } = createRenderer();

  describeConformance(<Input startDecorator="1" endDecorator="2" />, () => ({
    render,
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLDivElement,
    muiName: 'JoyInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'solid', fullWidth: true },
    testCustomVariant: true,
    slots: {
      root: { expectedClassName: classes.root },
      input: { expectedClassName: classes.input },
      startDecorator: { expectedClassName: classes.startDecorator },
      endDecorator: { expectedClassName: classes.endDecorator },
    },
    skip: ['propsSpread', 'componentsProp', 'classesRoot'],
  }));

  it('should have placeholder', () => {
    render(<Input placeholder="Placeholder" />);
    expect(screen.getByPlaceholderText('Placeholder')).toBeVisible();
  });

  it('should have error classes', () => {
    const { container } = render(<Input error />);
    expect(container.firstChild).to.have.class(classes.error);
  });

  it('should have fullWidth classes', () => {
    const { container } = render(<Input fullWidth />);
    expect(container.firstChild).to.have.class(classes.fullWidth);
  });

  it('should have startDecorator', () => {
    render(<Input startDecorator={<span data-testid="start">start</span>} />);
    expect(screen.getByTestId('start')).toBeVisible();
  });

  it('should have endDecorator', () => {
    render(<Input endDecorator={<span data-testid="end">end</span>} />);
    expect(screen.getByTestId('end')).toBeVisible();
  });

  describe('prop: required', () => {
    it('should pass to `input` element', () => {
      render(<Input required />);
      expect(screen.getByRole('textbox')).to.have.attribute('required');
    });
  });

  describe('prop: disabled', () => {
    it('should have disabled classes', () => {
      const { container } = render(<Input disabled />);
      expect(screen.getByRole('textbox')).to.have.attribute('disabled');
      expect(container.firstChild).to.have.class(classes.disabled);
    });

    it('should reset the focused state if getting disabled', () => {
      const handleBlur = spy();
      const handleFocus = spy();
      const { setProps } = render(<Input onBlur={handleBlur} onFocus={handleFocus} />);

      act(() => {
        screen.getByRole('textbox').focus();
      });
      expect(handleFocus.callCount).to.equal(1);

      setProps({ disabled: true });
      expect(handleBlur.callCount).to.equal(1);
      // check if focus not initiated again
      expect(handleFocus.callCount).to.equal(1);
    });

    it('disabled prop from FormControl should take precedence over disabled prop from theme', () => {
      render(
        <ThemeProvider
          theme={extendTheme({
            components: {
              JoyInput: {
                defaultProps: {
                  disabled: false,
                },
              },
            },
          })}
        >
          <FormControl disabled>
            <Input />
          </FormControl>
        </ThemeProvider>,
      );

      expect(screen.getByRole('textbox')).to.have.attribute('disabled');
    });
  });

  describe('slotProps: input', () => {
    it('`onKeyDown` and `onKeyUp` should work', () => {
      const handleKeyDown = spy();
      const handleKeyUp = spy();

      render(<Input slotProps={{ input: { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp } }} />);

      act(() => {
        screen.getByRole('textbox').focus();
      });
      fireEvent.keyDown(screen.getByRole('textbox'));
      fireEvent.keyUp(screen.getByRole('textbox'));

      expect(handleKeyDown.callCount).to.equal(1);
      expect(handleKeyUp.callCount).to.equal(1);
    });

    it('should call focus and blur', () => {
      const handleBlur = spy();
      const handleFocus = spy();

      render(<Input slotProps={{ input: { onFocus: handleFocus, onBlur: handleBlur } }} />);

      act(() => {
        screen.getByRole('textbox').focus();
      });
      expect(handleFocus.callCount).to.equal(1);
      act(() => {
        screen.getByRole('textbox').blur();
      });
      expect(handleFocus.callCount).to.equal(1);
    });

    it('should override outer handlers', () => {
      const handleFocus = spy();
      const handleSlotFocus = spy();

      render(<Input onFocus={handleFocus} slotProps={{ input: { onFocus: handleSlotFocus } }} />);

      act(() => {
        screen.getByRole('textbox').focus();
      });
      expect(handleFocus.callCount).to.equal(0);
      expect(handleSlotFocus.callCount).to.equal(1);
    });
  });
});
