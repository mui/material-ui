import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import IconButton, { iconButtonClasses as classes } from '@mui/joy/IconButton';
import { ThemeProvider } from '@mui/joy/styles';

describe('Joy <IconButton />', () => {
  const { render } = createRenderer();

  describeConformance(<IconButton>Conformance?</IconButton>, () => ({
    render,
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiIconButton',
    testVariantProps: { variant: 'contained', color: 'success' },
    skip: ['propsSpread', 'componentsProp', 'classesRoot'],
  }));

  it('by default, should render with the root, variantContained, sizeMd and colorPrimary classes', () => {
    const { getByRole } = render(<IconButton>Hello World</IconButton>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.variantLight);
    expect(button).to.have.class(classes.sizeMd);
    expect(button).to.have.class(classes.colorPrimary);

    // should not have other variant classes
    expect(button).not.to.have.class(classes.variantOutlined);
    expect(button).not.to.have.class(classes.variantText);
    expect(button).not.to.have.class(classes.variantContained);
  });

  it('should render an outlined button', () => {
    const { getByRole } = render(<IconButton variant="outlined">Hello World</IconButton>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantOutlined);
  });

  it('should render a text button', () => {
    const { getByRole } = render(<IconButton variant="text">Hello World</IconButton>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantText);
  });

  it('should render a contained button', () => {
    const { getByRole } = render(<IconButton variant="contained">Hello World</IconButton>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantContained);
  });

  it('should render a small button', () => {
    const { getByRole } = render(<IconButton size="sm">Hello World</IconButton>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.sizeSm);
  });

  it('should render a large button', () => {
    const { getByRole } = render(<IconButton size="lg">Hello World</IconButton>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.sizeLg);
  });

  it('should disable the component', () => {
    const { getByRole } = render(<IconButton disabled>book</IconButton>);
    const button = getByRole('button');

    expect(button).to.have.property('disabled', true);
    expect(button).to.have.class(classes.disabled);
  });
});
