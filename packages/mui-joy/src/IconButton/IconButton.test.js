import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, describeJoyColorInversion } from 'test/utils';
import IconButton, { iconButtonClasses as classes } from '@mui/joy/IconButton';
import { ThemeProvider } from '@mui/joy/styles';

describe('Joy <IconButton />', () => {
  const { render } = createRenderer();

  describeConformance(<IconButton>Conformance?</IconButton>, () => ({
    render,
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLButtonElement,
    muiName: 'JoyIconButton',
    testVariantProps: { variant: 'solid', color: 'success' },
    testCustomVariant: true,
    slots: {
      root: { expectedClassName: classes.root },
    },
    skip: ['propsSpread', 'componentsProp', 'classesRoot'],
  }));

  describeJoyColorInversion(<IconButton />, { muiName: 'JoyIconButton', classes });

  it('by default, should render with the root, variantSolid, sizeMd and colorPrimary classes', () => {
    const { getByRole } = render(<IconButton>Hello World</IconButton>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.variantSoft);
    expect(button).to.have.class(classes.sizeMd);
    expect(button).to.have.class(classes.colorPrimary);

    // should not have other variant classes
    expect(button).not.to.have.class(classes.variantOutlined);
    expect(button).not.to.have.class(classes.variantPlain);
    expect(button).not.to.have.class(classes.variantSolid);
  });

  it('should render an outlined button', () => {
    const { getByRole } = render(<IconButton variant="outlined">Hello World</IconButton>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantOutlined);
  });

  it('should render a text button', () => {
    const { getByRole } = render(<IconButton variant="plain">Hello World</IconButton>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantPlain);
  });

  it('should render a contained button', () => {
    const { getByRole } = render(<IconButton variant="solid">Hello World</IconButton>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.variantSolid);
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
