import * as React from 'react';
import { act, createMount, createRenderer, describeConformanceUnstyled, screen } from 'test/utils';
import { expect } from 'chai';
import InputUnstyled, {
  inputUnstyledClasses,
  InputUnstyledOwnerState,
} from '@mui/base/InputUnstyled';

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

  describe('componentsProps', () => {
    it('allows to pass in a callback function', () => {
      const componentProps = (ownerState: InputUnstyledOwnerState) => ({
        className: ownerState.focused ? 'test-focused' : '',
      });

      const { getByRole, container } = render(
        <InputUnstyled componentsProps={{ root: componentProps, input: componentProps }} />,
      );

      const input = getByRole('textbox');
      const wrapper = container.firstChild as HTMLElement;

      act(() => {
        input.focus();
      });

      expect(input).to.have.class('test-focused');
      expect(wrapper).to.have.class('test-focused');
    });
  });
});
