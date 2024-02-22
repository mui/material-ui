import * as React from 'react';
import { createMount, createRenderer, fireEvent, screen, act } from '@mui-internal/test-utils';
import { expect } from 'chai';
import { spy } from 'sinon';
import { Textarea, textareaClasses, TextareaOwnerState } from '@mui/base/Textarea';

describe('<Textarea />', () => {
  const mount = createMount();
  const { render } = createRenderer();

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
  });
});
