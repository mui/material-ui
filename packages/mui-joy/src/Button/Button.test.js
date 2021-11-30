import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import Button, { buttonClasses as classes } from '@mui/joy/Button';
import { ThemeProvider } from '@mui/joy/styles';

describe('Joy <Button />', () => {
  const { render } = createRenderer();

  describeConformance(<Button>Conformance?</Button>, () => ({
    render,
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiButton',
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    skip: ['propsSpread', 'componentsProp', 'classesRoot'],
  }));

  it('by default, should render with the root, variantContained, and colorPrimary classes', () => {
    const { getByRole } = render(<Button>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.variantContained);
    expect(button).to.have.class(classes.colorPrimary);

    // should not have other variant classes
    expect(button).not.to.have.class(classes.variantOutlined);
    expect(button).not.to.have.class(classes.variantText);
    expect(button).not.to.have.class(classes.variantLight);
  });

  it('should render an outlined button', () => {
    const { getByRole } = render(<Button variant="outlined">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantOutlined);
  });

  it('should render a light button', () => {
    const { getByRole } = render(<Button variant="light">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantLight);
  });

  it('should render a contained button', () => {
    const { getByRole } = render(<Button variant="contained">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantContained);
  });

  it('should render a small button', () => {
    const { getByRole } = render(<Button size="small">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.sizeSmall);
  });

  it('should render a large button', () => {
    const { getByRole } = render(<Button size="large">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.sizeLarge);
  });

  it('should render a fullWidth button', () => {
    const { getByRole } = render(<Button fullWidth>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.fullWidth);
  });
});
