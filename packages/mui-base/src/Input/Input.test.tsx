import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled, screen } from 'test/utils';
import { expect } from 'chai';
import Input, { inputClasses } from '@mui/base/Input';

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
