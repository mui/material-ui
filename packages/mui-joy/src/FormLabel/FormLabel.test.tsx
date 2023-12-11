import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from '@mui-internal/test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import FormLabel, { formLabelClasses as classes } from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';

describe('Joy <FormLabel />', () => {
  const { render } = createRenderer();

  describeConformance(<FormLabel required />, () => ({
    classes,
    inheritComponent: 'label',
    render,
    ThemeProvider,
    muiName: 'JoyFormLabel',
    refInstanceof: window.HTMLLabelElement,
    slots: {
      root: { expectedClassName: classes.root },
      asterisk: { expectedClassName: classes.asterisk },
    },
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

  it('should accept htmlFor', () => {
    const { container } = render(<FormLabel htmlFor="input" className="foo-bar" />);
    expect(container.firstChild).to.have.attribute('for', 'input');
  });

  it('should have htmlFor if htmlFor is undefined', () => {
    const { container } = render(
      <FormControl>
        <FormLabel htmlFor={undefined} />
      </FormControl>,
    );
    expect(container.firstChild.firstChild).to.have.attribute('for');
  });

  it('should have id if id is undefined', () => {
    const { container } = render(
      <FormControl>
        <FormLabel id={undefined} />
      </FormControl>,
    );
    expect(container.firstChild.firstChild).to.have.attribute('id');
  });
});
