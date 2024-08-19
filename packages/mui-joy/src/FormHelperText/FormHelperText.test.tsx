import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import FormHelperText, { formHelperTextClasses as classes } from '@mui/joy/FormHelperText';
import describeConformance from '../../test/describeConformance';

describe('Joy <FormHelperText />', () => {
  const { render } = createRenderer();

  describeConformance(<FormHelperText />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyFormHelperText',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('should have root className', () => {
    const { container } = render(<FormHelperText />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<FormHelperText className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
