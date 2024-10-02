import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, act, fireEvent } from '@mui/internal-test-utils';
import Textarea, { textareaClasses as classes } from '@mui/joy/Textarea';
import { ThemeProvider } from '@mui/joy/styles';
import describeConformance from '../../test/describeConformance';

describe('Joy <Textarea />', () => {
  const { render } = createRenderer();

  describeConformance(<Textarea startDecorator="1" endDecorator="2" />, () => ({
    render,
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLDivElement,
    muiName: 'JoyTextarea',
    testDeepOverrides: { slotName: 'textarea', slotClassName: classes.textarea },
    testCustomVariant: true,
    testVariantProps: { variant: 'solid' },
    slots: {
      root: { expectedClassName: classes.root },
      textarea: { expectedClassName: classes.textarea },
      startDecorator: { expectedClassName: classes.startDecorator },
      endDecorator: { expectedClassName: classes.endDecorator },
    },
    skip: ['propsSpread', 'componentsProp', 'classesRoot'],
  }));

  it('should have placeholder', () => {
    const { getByPlaceholderText } = render(<Textarea placeholder="Placeholder" />);
    expect(getByPlaceholderText('Placeholder')).toBeVisible();
  });

  it('should have error classes', () => {
    const { container } = render(<Textarea error />);
    expect(container.firstChild).to.have.class(classes.error);
  });

  it('should have startDecorator', () => {
    render(<Textarea startDecorator={<span data-testid="start">start</span>} />);
    expect(screen.getByTestId('start')).toBeVisible();
  });

  it('should have endDecorator', () => {
    render(<Textarea endDecorator={<span data-testid="end">end</span>} />);
    expect(screen.getByTestId('end')).toBeVisible();
  });

  it('should pass props to Textarea', () => {
    const { container } = render(
      <Textarea
        slotProps={{
          textarea: {
            maxLength: 5,
          },
        }}
      />,
    );

    const textarea = container.querySelector('textarea')!;
    expect(textarea).to.have.attr('maxlength', '5');
  });

  describe('prop: disabled', () => {
    it('should have disabled classes', () => {
      const { container } = render(<Textarea disabled />);
      expect(container.firstChild).to.have.class(classes.disabled);
    });

    it('should reset the focused state if getting disabled', () => {
      const handleBlur = spy();
      const handleFocus = spy();
      const { container, setProps } = render(
        <Textarea onBlur={handleBlur} onFocus={handleFocus} />,
      );

      act(() => {
        container.querySelector('textarea')?.focus();
      });
      expect(handleFocus.callCount).to.equal(1);

      setProps({ disabled: true });
      expect(handleBlur.callCount).to.equal(1);
      // check if focus not initiated again
      expect(handleFocus.callCount).to.equal(1);
    });
  });

  describe('slotProps: input', () => {
    it('`onKeyDown` and `onKeyUp` should work', () => {
      const handleKeyDown = spy();
      const handleKeyUp = spy();
      const { container } = render(
        <Textarea slotProps={{ textarea: { onKeyDown: handleKeyDown, onKeyUp: handleKeyUp } }} />,
      );

      act(() => {
        container.querySelector('textarea')!.focus();
      });
      fireEvent.keyDown(container.querySelector('textarea')!);
      fireEvent.keyUp(container.querySelector('textarea')!);

      expect(handleKeyDown.callCount).to.equal(1);
      expect(handleKeyUp.callCount).to.equal(1);
    });

    it('should call focus and blur', () => {
      const handleBlur = spy();
      const handleFocus = spy();
      const { container } = render(
        <Textarea slotProps={{ textarea: { onFocus: handleFocus, onBlur: handleBlur } }} />,
      );

      act(() => {
        container.querySelector('textarea')!.focus();
      });
      expect(handleFocus.callCount).to.equal(1);
      act(() => {
        container.querySelector('textarea')!.blur();
      });
      expect(handleFocus.callCount).to.equal(1);
    });

    it('should override outer handlers', () => {
      const handleFocus = spy();
      const handleSlotFocus = spy();
      const { container } = render(
        <Textarea onFocus={handleFocus} slotProps={{ textarea: { onFocus: handleSlotFocus } }} />,
      );

      act(() => {
        container.querySelector('textarea')!.focus();
      });
      expect(handleFocus.callCount).to.equal(0);
      expect(handleSlotFocus.callCount).to.equal(1);
    });
  });
});
