import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformance, createRenderer, screen, act } from 'test/utils';
import Textarea, { textareaClasses as classes } from '@mui/joy/Textarea';
import { ThemeProvider } from '@mui/joy/styles';

describe('Joy <Textarea />', () => {
  const { render } = createRenderer();

  describeConformance(<Textarea />, () => ({
    render,
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLDivElement,
    muiName: 'JoyTextarea',
    testDeepOverrides: { slotName: 'textarea', slotClassName: classes.textarea },
    testCustomVariant: true,
    testVariantProps: { variant: 'solid' },
    skip: ['propsSpread', 'componentsProp', 'classesRoot'],
  }));

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
});
