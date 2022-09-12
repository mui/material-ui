import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled, screen } from 'test/utils';
import { expect } from 'chai';
import InputUnstyled, { inputUnstyledClasses } from '@mui/base/InputUnstyled';

describe('<InputUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<InputUnstyled />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiInput',
    slots: {
      root: {
        expectedClassName: inputUnstyledClasses.root,
      },
      input: {
        expectedClassName: inputUnstyledClasses.input,
        testWithElement: 'input',
      },
    },
  }));

  it('should render textarea without any console errors when multiline=true', () => {
    render(<InputUnstyled multiline />);

    expect(screen.getByRole('textbox')).to.have.tagName('textarea');
  });

  describe('prop: multiline', () => {
    it('should pass the rows prop to the underlying textarea when multiline=true', () => {
      const { getByRole } = render(<InputUnstyled multiline rows={5} />);
      expect(getByRole('textbox')).to.have.attribute('rows', '5');
    });

    it('should not pass the minRows or maxRows prop to the underlying textarea slot when default host component is used', () => {
      const { getByRole } = render(<InputUnstyled multiline minRows={5} maxRows={10} />);
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

      render(
        <InputUnstyled
          multiline
          minRows={5}
          maxRows={10}
          components={{ Textarea: CustomTextarea }}
        />,
      );
    });
  });
});
