import * as React from 'react';
import {
  createMount,
  createRenderer,
  describeConformanceUnstyled,
  fireEvent,
  act,
} from '@mui-internal/test-utils';
import { expect } from 'chai';
import { spy } from 'sinon';
import { Textbox, textboxClasses } from '@mui/base/Textbox';

describe('<Textbox />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(
    <Textbox>
      <Textbox.Input />
    </Textbox>,
    () => ({
      inheritComponent: 'div',
      render,
      mount,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'div',
      slots: {
        root: {
          expectedClassName: textboxClasses.root,
        },
        input: {
          expectedClassName: textboxClasses.input,
          testWithElement: 'input',
        },
      },
      skip: ['componentProp'],
    }),
  );

  describe('event handlers', () => {
    it('should call event handlers passed to component', () => {
      const handleChange = spy();
      const handleFocus = spy();
      const handleBlur = spy();
      const handleKeyDown = spy();
      const handleKeyUp = spy();
      const { getByRole } = render(
        <Textbox
          onChange={handleChange}
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
  });

  describe('controlled', () => {
    it('should considered [] as controlled', () => {
      const { getByRole } = render(<Textbox value={[]} />);
      const input = getByRole('textbox');

      expect(input).to.have.property('value', '');
      fireEvent.change(input, { target: { value: 'do not work' } });
      expect(input).to.have.property('value', '');
    });
  });
});
