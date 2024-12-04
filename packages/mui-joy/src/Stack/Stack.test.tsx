import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import Stack, { stackClasses as classes } from '@mui/joy/Stack';
import describeConformance from '../../test/describeConformance';

describe('Joy <Stack />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: <div />,
  };

  describeConformance(<Stack {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    refInstanceof: window.HTMLElement,
    muiName: 'JoyStack',
    skip: ['componentsProp', 'rootClass'],
    testVariantProps: { direction: 'row' },
  }));

  it('className should be prefixed with Mui', () => {
    const { container } = render(<Stack />);
    expect(container.firstChild).to.have.class('MuiStack-root');
  });
});
