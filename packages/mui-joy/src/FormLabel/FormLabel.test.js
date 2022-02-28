import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import FormLabel, { formLabelClasses as classes } from '@mui/joy/FormLabel';

describe('Joy <FormLabel />', () => {
  const { render } = createRenderer();

  describeConformance(<FormLabel />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    ThemeProvider,
    muiName: 'MuiFormLabel',
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<FormLabel />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<FormLabel className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
