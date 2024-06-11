import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import IconButton, { iconButtonClasses as classes } from '@mui/joy/IconButton';
import { ThemeProvider } from '@mui/joy/styles';
import describeConformance from '../../test/describeConformance';

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

  it('by default, should render with the root, variantPlain, sizeMd and colorNeutral classes', () => {
    const { getByRole } = render(<IconButton>Hello World</IconButton>);
    const button = getByRole('button');

    expect(button).to.have.class(classes.root);
    expect(button).to.have.class(classes.variantPlain);
    expect(button).to.have.class(classes.sizeMd);
    expect(button).to.have.class(classes.colorNeutral);

    // should not have other variant classes
    expect(button).not.to.have.class(classes.variantOutlined);
    expect(button).not.to.have.class(classes.variantSoft);
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

  describe('prop: loadingIndicator', () => {
    const content = 'Test';
    const loadingText = 'loading...';

    it('is not rendered by default', () => {
      const { queryByRole } = render(
        <IconButton loadingIndicator={<span role="progressbar">{loadingText}</span>}>
          {content}
        </IconButton>,
      );

      const button = queryByRole('button');
      const progressbar = queryByRole('progressbar');

      expect(progressbar).to.equal(null);
      expect(button).to.have.text(content);
    });

    it('is rendered properly when `loading` and children should not be visible', function test() {
      const { getByRole } = render(
        <IconButton loadingIndicator={<span role="progressbar">{loadingText}</span>} loading>
          {content}
        </IconButton>,
      );

      const button = getByRole('button');
      const progressbar = getByRole('progressbar');

      expect(progressbar).to.have.text(loadingText);
      expect(button).to.have.class(classes.disabled);
      expect(button).not.to.have.text(content);
    });
  });
});
