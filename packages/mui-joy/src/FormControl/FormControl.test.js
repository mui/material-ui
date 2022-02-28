import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import FormControl, { formControlClasses as classes } from '@mui/joy/FormControl';

describe('Joy <FormControl />', () => {
  const { render } = createRenderer();

  describeConformance(<FormControl />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    ThemeProvider,
    muiName: 'MuiFormControl',
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<FormControl />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<FormControl className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
