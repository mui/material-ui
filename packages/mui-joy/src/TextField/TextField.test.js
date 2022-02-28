import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import TextField, { textFieldClasses as classes } from '@mui/joy/TextField';

describe('Joy <TextField />', () => {
  const { render } = createRenderer();

  describeConformance(<TextField />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    ThemeProvider,
    muiName: 'MuiTextField',
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<TextField />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<TextField className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
