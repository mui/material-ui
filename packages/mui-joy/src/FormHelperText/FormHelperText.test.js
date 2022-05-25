import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import FormHelperText, { formHelperTextClasses as classes } from '@mui/joy/FormHelperText';

describe('Joy <FormHelperText />', () => {
  const { render } = createRenderer();

  describeConformance(<FormHelperText />, () => ({
    classes,
    inheritComponent: 'p',
    render,
    ThemeProvider,
    muiName: 'JoyFormHelperText',
    refInstanceof: window.HTMLParagraphElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
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
