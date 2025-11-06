import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Button, { buttonClasses as classes } from '@mui/joy/Button';
import { ThemeProvider } from '@mui/joy/styles';
import describeConformance from '../../test/describeConformance';

describe('Joy <Button />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Button startDecorator="icon" endDecorator="icon">
      Conformance?
    </Button>,
    () => ({
      render,
      classes,
      ThemeProvider,
      refInstanceof: window.HTMLButtonElement,
      muiName: 'JoyButton',
      testDeepOverrides: { slotName: 'startDecorator', slotClassName: classes.startDecorator },
      testVariantProps: { variant: 'solid', fullWidth: true },
      testCustomVariant: true,
      slots: {
        root: { expectedClassName: classes.root },
        startDecorator: { expectedClassName: classes.startDecorator },
        endDecorator: { expectedClassName: classes.endDecorator },
      },
      skip: ['propsSpread', 'componentsProp', 'classesRoot'],
    }),
  );

  it('by default, should render with the root, variantSolid, sizeMd and colorPrimary classes', () => {
    render(<Button>Hello World</Button>);
    const button = screen.getByRole('button');

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
    render(<Button variant="outlined">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.variantOutlined);
  });

  it('should render a light button', () => {
    render(<Button variant="soft">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.variantSoft);
  });

  it('should render a contained button', () => {
    render(<Button variant="solid">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.variantSolid);
  });

  it('should render a small button', () => {
    render(<Button size="sm">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.sizeSm);
  });

  it('should render a large button', () => {
    render(<Button size="lg">Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.sizeLg);
  });

  it('should render a fullWidth button', () => {
    render(<Button fullWidth>Hello World</Button>);
    const button = screen.getByRole('button');

    expect(button).to.have.class(classes.fullWidth);
  });

  it('should render a button with startDecorator', () => {
    render(<Button startDecorator={<span>icon</span>}>Hello World</Button>);
    const button = screen.getByRole('button');
    const startDecorator = button.querySelector(`.${classes.startDecorator}`);

    expect(button).to.have.class(classes.root);
    expect(startDecorator).not.to.have.class(classes.endDecorator);
  });

  it('should render a button with endDecorator', () => {
    render(<Button endDecorator={<span>icon</span>}>Hello World</Button>);
    const button = screen.getByRole('button');
    const endDecorator = button.querySelector(`.${classes.endDecorator}`);

    expect(button).to.have.class(classes.root);
    expect(endDecorator).not.to.have.class(classes.startDecorator);
  });

  describe('prop: loading', () => {
    it('disables the button', () => {
      render(<Button loading />);

      const button = screen.getByRole('button');
      expect(button).to.have.property('disabled', true);
    });

    it('should disable button when loading is true and disabled is false', () => {
      render(<Button loading disabled={false} />);

      const button = screen.getByRole('button');
      expect(button).to.have.property('disabled', true);
    });

    it('should disable button when loading is false and disabled is true', () => {
      render(<Button loading={false} disabled />);

      const button = screen.getByRole('button');
      expect(button).to.have.property('disabled', true);
    });

    it('renders a progressbar', () => {
      render(<Button loading>Submit</Button>);

      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeVisible();
    });
  });

  describe('prop:disabled', () => {
    it('should apply disabled styles when button is disabled', function test() {
      if (window.navigator.userAgent.includes('jsdom')) {
        this.skip();
      }
      render(<Button disabled />);

      expect(screen.getByRole('button')).toHaveComputedStyle({
        color: 'rgb(159, 166, 173)',
        backgroundColor: 'rgb(240, 244, 248)',
      });
    });

    it('should apply disabled styles when button is disabled and when component prop is provided', function test() {
      if (window.navigator.userAgent.includes('jsdom')) {
        this.skip();
      }
      render(<Button disabled component="a" />);

      expect(screen.getByRole('button')).toHaveComputedStyle({
        color: 'rgb(159, 166, 173)',
        backgroundColor: 'rgb(240, 244, 248)',
      });
    });
  });

  describe('prop: loadingIndicator', () => {
    it('is not rendered by default', () => {
      render(<Button loadingIndicator="loading">Test</Button>);

      expect(screen.getByRole('button')).to.have.text('Test');
    });

    it('is rendered properly when `loading` and children should not be visible', function test() {
      if (window.navigator.userAgent.includes('jsdom')) {
        this.skip();
      }
      const { container } = render(
        <Button loadingIndicator="loading.." loading>
          Test
        </Button>,
      );

      expect(container.querySelector(`.${classes.loadingIndicatorCenter}`)).to.have.text(
        'loading..',
      );
      expect(screen.getByRole('button')).toHaveComputedStyle({ color: 'rgba(0, 0, 0, 0)' });
    });
  });

  describe('prop: loadingPosition', () => {
    it('center is rendered by default', () => {
      render(<Button loading>Test</Button>);
      const loader = screen.getByRole('progressbar');

      expect(loader.parentElement).to.have.class(classes.loadingIndicatorCenter);
    });

    it('there should be only one loading indicator', () => {
      render(
        <Button loading startDecorator="🚀" endDecorator="👍">
          Test
        </Button>,
      );

      const loaders = screen.getAllByRole('progressbar');

      expect(loaders).to.have.length(1);
    });

    it('loading indicator with `position="start"` replaces the `startDecorator` content', () => {
      render(
        <Button
          loading
          startDecorator={<span>icon</span>}
          loadingPosition="start"
          loadingIndicator={<span role="progressbar">loading..</span>}
        >
          Test
        </Button>,
      );

      const loader = screen.getByRole('progressbar');
      const button = screen.getByRole('button');

      expect(loader).toBeVisible();
      expect(button).to.have.text('loading..Test');
    });

    it('loading indicator with `position="end"` replaces the `startDecorator` content', () => {
      render(
        <Button
          loading
          endDecorator={<span>icon</span>}
          loadingPosition="end"
          loadingIndicator={<span role="progressbar">loading..</span>}
        >
          Test
        </Button>,
      );

      const loader = screen.getByRole('progressbar');
      const button = screen.getByRole('button');

      expect(loader).toBeVisible();
      expect(button).to.have.text('Testloading..');
    });
  });
});
