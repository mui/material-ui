import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import Button, { buttonClasses as classes } from '@mui/joy/Button';
import { ThemeProvider } from '@mui/joy/styles';

describe('Joy <Button />', () => {
  const { render } = createRenderer();

  describeConformance(<Button startDecorator="icon">Conformance?</Button>, () => ({
    render,
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'JoyButton',
    testDeepOverrides: { slotName: 'startDecorator', slotClassName: classes.startDecorator },
    testVariantProps: { variant: 'solid', fullWidth: true },
    testCustomVariant: true,
    skip: ['propsSpread', 'componentsProp', 'classesRoot'],
  }));

  it('by default, should render with the root, variantSolid, sizeMd and colorPrimary classes', () => {
    const { getByRole } = render(<Button>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.variantSolid);
    expect(button).to.have.class(classes.sizeMd);
    expect(button).to.have.class(classes.colorPrimary);

    // should not have other variant classes
    expect(button).not.to.have.class(classes.variantOutlined);
    expect(button).not.to.have.class(classes.variantPlain);
    expect(button).not.to.have.class(classes.variantSoft);
  });

  it('should render an outlined button', () => {
    const { getByRole } = render(<Button variant="outlined">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantOutlined);
  });

  it('should render a light button', () => {
    const { getByRole } = render(<Button variant="soft">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantSoft);
  });

  it('should render a contained button', () => {
    const { getByRole } = render(<Button variant="solid">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantSolid);
  });

  it('should render a small button', () => {
    const { getByRole } = render(<Button size="sm">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.sizeSm);
  });

  it('should render a large button', () => {
    const { getByRole } = render(<Button size="lg">Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.sizeLg);
  });

  it('should render a fullWidth button', () => {
    const { getByRole } = render(<Button fullWidth>Hello World</Button>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.fullWidth);
  });

  it('should render a button with startDecorator', () => {
    const { getByRole } = render(<Button startDecorator={<span>icon</span>}>Hello World</Button>);
    const button = getByRole('button');
    const startDecorator = button.querySelector(`.${classes.startDecorator}`);

    expect(button).to.have.class(classes.root);
    expect(startDecorator).not.to.have.class(classes.endDecorator);
  });

  it('should render a button with endDecorator', () => {
    const { getByRole } = render(<Button endDecorator={<span>icon</span>}>Hello World</Button>);
    const button = getByRole('button');
    const endDecorator = button.querySelector(`.${classes.endDecorator}`);

    expect(button).to.have.class(classes.root);
    expect(endDecorator).not.to.have.class(classes.startDecorator);
  });
});
