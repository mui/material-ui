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
});
