import * as React from 'react';
import { createMount, createRenderer, fireEvent, act } from '@mui-internal/test-utils';
import { expect } from 'chai';
import { spy } from 'sinon';
import { Textarea, textareaClasses as classes } from '@mui/base/Textarea';
import { FormControl } from '@mui/base/FormControl';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

describe('<Textarea />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<Textarea />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLTextAreaElement,
    testComponentPropWith: 'textarea',
    slots: {
      textarea: {
        expectedClassName: classes.textarea,
        testWithElement: 'textarea',
      },
    },
    skip: ['componentProp', 'slotsProp', 'slotPropsProp', 'slotPropsCallbacks'],
  }));

  it('renders', () => {
    const { getByTestId } = render(<Textarea data-testid="textarea" />);

    expect(getByTestId('textarea')).to.have.tagName('textarea');
  });

  it('can attach a ref', () => {
    const textareaRef = React.createRef<HTMLTextAreaElement>();
    const { getByTestId } = render(<Textarea ref={textareaRef} data-testid="textarea" />);

    expect(textareaRef.current).to.deep.equal(getByTestId('textarea'));
  });

  describe('event handlers', () => {
    it('should call event handlers passed to component', () => {
      const handleChange = spy();
      const handleFocus = spy();
      const handleBlur = spy();
      const handleKeyDown = spy();
      const handleKeyUp = spy();
      const { getByTestId } = render(
        <Textarea
          data-testid="textarea"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />,
      );

      const textarea = getByTestId('textarea');

      // simulating user input: gain focus, key input (keydown, (input), change, keyup), blur
      act(() => {
        textarea.focus();
      });
      expect(handleFocus.callCount).to.equal(1);

      fireEvent.keyDown(textarea, { key: 'a' });
      expect(handleKeyDown.callCount).to.equal(1);

      fireEvent.change(textarea, { target: { value: 'a' } });
      expect(handleChange.callCount).to.equal(1);

      fireEvent.keyUp(textarea, { key: 'a' });
      expect(handleKeyUp.callCount).to.equal(1);

      act(() => {
        textarea.blur();
      });
      expect(handleBlur.callCount).to.equal(1);
    });
  });

  describe('prop: rows/minRows/maxRows', () => {
    it('should pass the rows prop to the underlying textarea', () => {
      const { getByTestId } = render(<Textarea data-testid="textarea" rows={5} />);
      expect(getByTestId('textarea')).to.have.attribute('rows', '5');
    });

    it('should not pass the minRows or maxRows props to the textarea in the dom', () => {
      const { getByTestId } = render(<Textarea data-testid="textarea" minRows={5} maxRows={10} />);
      expect(getByTestId('textarea')).not.to.have.attribute('minRows');
      expect(getByTestId('textarea')).not.to.have.attribute('maxRows');
    });

    it('should preserve state when changing rows', () => {
      const { getByTestId, setProps } = render(
        <Textarea data-testid="textarea" defaultValue="Welcome" />,
      );
      const textarea = getByTestId('textarea');
      act(() => {
        textarea.focus();
      });

      setProps({ rows: 4 });

      expect(textarea).toHaveFocus();
    });
  });

  describe('prop: disabled', () => {
    it('should render a disabled <textarea />', () => {
      const { getByTestId } = render(<Textarea data-testid="textarea" disabled />);
      const textarea = getByTestId('textarea');
      expect(textarea).to.have.attribute('disabled');
    });

    it('should reset the focused state if the component becomes disabled', () => {
      const handleBlur = spy();
      const handleFocus = spy();

      const { getByTestId, setProps } = render(
        <Textarea data-testid="textarea" onBlur={handleBlur} onFocus={handleFocus} />,
      );

      act(() => {
        getByTestId('textarea').focus();
      });
      expect(handleFocus.callCount).to.equal(1);

      setProps({ disabled: true });

      expect(handleBlur.callCount).to.equal(1);
      // check if focus not initiated again
      expect(handleFocus.callCount).to.equal(1);
    });
  });

  describe('prop: readonly', () => {
    it('should render a readonly <textarea />', () => {
      const { getByTestId } = render(<Textarea data-testid="textarea" readOnly />);
      const textarea = getByTestId('textarea');
      expect(textarea).to.have.attribute('readOnly');
      expect(textarea).to.have.property('readOnly');
    });
  });

  describe('controlled', () => {
    it('should forward the value to the textarea', () => {
      const { getByTestId } = render(<Textarea data-testid="textarea" maxRows={4} value="Hello" />);

      const textarea = getByTestId('textarea');
      expect(textarea).to.have.value('Hello');
    });
  });

  describe('with FormControl', () => {
    it('should have the formControl class', () => {
      const { getByTestId } = render(
        <FormControl defaultValue="multiline field">
          <Textarea data-testid="textarea" />
        </FormControl>,
      );
      const textarea = getByTestId('textarea');
      expect(textarea).to.have.class(classes.formControl);
    });
  });
});
