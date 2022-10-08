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

  describe('prop: loading', () => {
    it('disables the button', () => {
      const { getByRole } = render(<Button loading />);

      const button = getByRole('button');
      expect(button).to.have.property('disabled', true);
    });

    it('renders a progressbar', () => {
      const { getByRole } = render(<Button loading>Submit</Button>);

      const progressbar = getByRole('progressbar');
      expect(progressbar).toBeVisible();
    });
  });

  describe('prop: loadingIndicator', () => {
    it('is not rendered by default', () => {
      const { getByRole } = render(<Button loadingIndicator="loading">Test</Button>);

      expect(getByRole('button')).to.have.text('Test');
    });

    it('is rendered properly when `loading` and children should not be visible', () => {
      const { container, getByRole } = render(
        <Button loadingIndicator="loading.." loading>
          Test
        </Button>,
      );

      expect(container.querySelector(`.${classes.loadingIndicator}`)).to.have.text('loading..');
      expect(getByRole('button')).to.have.style('color', 'transparent');
    });
  });

  describe('prop: loadingPosition', () => {
    it('center is rendered by default', () => {
      const { getByRole } = render(<Button loading>Test</Button>);
      const loader = getByRole('progressbar');

      expect(loader.parentElement).to.have.class(classes.loadingIndicatorCenter);
    });

    it('is rendered before the children when `loadingPosition=start` and startDecorator is not visible', () => {
      const { getByRole } = render(
        <Button
          loading
          startDecorator={<span>icon</span>}
          loadingPosition="start"
          loadingIndicator={<span role="progressbar">loading..</span>}
        >
          Test
        </Button>,
      );
      const loader = getByRole('progressbar');
      const button = getByRole('button');

      expect(loader.parentElement).to.have.class(classes.loadingIndicatorStart);
      expect(button.querySelector(`.${classes.startDecorator}`)).to.have.style('opacity', '0');
      expect(button).to.have.text('iconloading..Test');
    });

    it('is rendered after the children when `loadingPosition=end` and endDecorator is not visible', () => {
      const { getByRole } = render(
        <Button
          loading
          endDecorator={<span>icon</span>}
          loadingPosition="end"
          loadingIndicator={<span role="progressbar">loading..</span>}
        >
          Test
        </Button>,
      );
      const loader = getByRole('progressbar');
      const button = getByRole('button');

      expect(loader.parentElement).to.have.class(classes.loadingIndicatorEnd);
      expect(button.querySelector(`.${classes.endDecorator}`)).to.have.style('opacity', '0');
      expect(button).to.have.text('Testloading..icon');
    });
  });
});
