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
import { Input, inputClasses } from '@mui/base/Input';

describe('<Input />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(
    <Input>
      <Input.Input />
    </Input>,
    () => ({
      inheritComponent: 'div',
      render,
      mount,
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
        <Input
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
      const { getByRole } = render(<Input value={[]} />);
      const input = getByRole('textbox');

      expect(input).to.have.property('value', '');
      fireEvent.change(input, { target: { value: 'do not work' } });
      expect(input).to.have.property('value', '');
    });
  });
});
