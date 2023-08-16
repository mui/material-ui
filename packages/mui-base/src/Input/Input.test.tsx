import * as React from 'react';
import {
  createMount,
  createRenderer,
  describeConformanceUnstyled,
  fireEvent,
  screen,
} from 'test/utils';
import { expect } from 'chai';
import { spy } from 'sinon';
import { Input, inputClasses } from '@mui/base/Input';

describe('<Input />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<Input />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiInput',
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

  it('should be able to attach input ref passed through props', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const { getByRole } = render(<Input slotProps={{ input: { ref: inputRef } }} />);

    expect(inputRef.current).to.deep.equal(getByRole('textbox'));
  });

  it('should call event handlers passed in slotProps', () => {
    const handleOnKeyDown = spy();
    const handleOnKeyUp = spy();
    const { getByRole } = render(
      <Input
        autoFocus
        slotProps={{ input: { onKeyDown: handleOnKeyDown, onKeyUp: handleOnKeyUp } }}
      />,
    );

    const input = getByRole('textbox');

    fireEvent.keyDown(input, { key: 'a' });
    fireEvent.keyUp(input, { key: 'a' });

    expect(handleOnKeyDown.callCount).to.equal(1);
    expect(handleOnKeyUp.callCount).to.equal(1);
  });

  it('should call event handlers passed to component', () => {
    const handleOnKeyDown = spy();
    const handleOnKeyUp = spy();
    const { getByRole } = render(
      <Input onKeyDown={handleOnKeyDown} onKeyUp={handleOnKeyUp} autoFocus />,
    );

    const input = getByRole('textbox');

    fireEvent.keyDown(input, { key: 'a' });
    fireEvent.keyUp(input, { key: 'a' });

    expect(handleOnKeyDown.callCount).to.equal(1);
    expect(handleOnKeyUp.callCount).to.equal(1);
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
  });
});
