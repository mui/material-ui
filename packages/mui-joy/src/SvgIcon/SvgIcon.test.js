import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import SvgIcon, { svgIconClasses as classes } from '@mui/joy/SvgIcon';
import { ThemeProvider } from '@mui/joy/styles';
import { unstable_capitalize as capitalize } from '@mui/utils';

describe('<SvgIcon />', () => {
  const { render } = createRenderer();

  let path;

  before(() => {
    path = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" data-testid="test-path" />;
  });

  describeConformance(
    <SvgIcon>
      <path />
    </SvgIcon>,
    () => ({
      classes,
      inheritComponent: 'svg',
      ThemeProvider,
      render,
      muiName: 'JoySvgIcon',
      refInstanceof: window.SVGSVGElement,
      testComponentPropWith: (props) => (
        <svg {...props}>
          <defs>
            <linearGradient id="gradient1">
              <stop offset="20%" stopColor="#39F" />
              <stop offset="90%" stopColor="#F3F" />
            </linearGradient>
          </defs>
          {props.children}
        </svg>
      ),
      slots: {
        root: {
          expectedClassName: classes.root,
          testWithComponent: ({ className }) => <svg className={className} data-testid="custom" />,
          testWithElement: null,
        },
      },
      skip: ['themeVariants', 'classesRoot', 'componentsProp'],
    }),
  );

  it('renders children by default', () => {
    const { container, queryByTestId } = render(<SvgIcon>{path}</SvgIcon>);

    expect(queryByTestId('test-path')).not.to.equal(null);
    expect(container.firstChild).to.have.attribute('aria-hidden', 'true');
  });

  describe('prop: titleAccess', () => {
    it('should be able to make an icon accessible', () => {
      const { container, queryByText } = render(
        <SvgIcon title="Go to link" titleAccess="Network">
          {path}
        </SvgIcon>,
      );

      expect(queryByText('Network')).not.to.equal(null);
      expect(container.firstChild).not.to.have.attribute('aria-hidden');
    });
  });

  describe('prop: color', () => {
    it('should render with the user and SvgIcon classes', () => {
      const { container } = render(<SvgIcon className="meow">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class('meow');
    });

    it('should render with `inherit` by default', () => {
      const { container } = render(<SvgIcon>{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorInherit);
    });

    ['inherit', 'primary', 'success', 'info', 'danger', 'neutral', 'warning'].forEach((color) => {
      it(`should render ${color}`, () => {
        const { container } = render(<SvgIcon color={color}>{path}</SvgIcon>);

        expect(container.firstChild).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });

  describe('prop: fontSize', function test() {
    before(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
    });

    it('should render with `xl` by default', () => {
      const { container } = render(<SvgIcon>{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.fontSizeXl);
    });

    ['inherit', 'xs', 'sm', 'md', 'lg', 'xl', 'xl2', 'xl3', 'xl4', 'xl5', 'xl6'].forEach(
      (fontSize) => {
        it(`should render ${fontSize}`, () => {
          const { container } = render(<SvgIcon fontSize={fontSize}>{path}</SvgIcon>);

          expect(container.firstChild).to.have.class(classes[`fontSize${capitalize(fontSize)}`]);
        });
      },
    );
  });

  describe('prop: inheritViewBox', () => {
    function CustomSvg(props) {
      return (
        <svg viewBox="-4 -4 24 24" {...props}>
          {path}
        </svg>
      );
    }

    it('should render with the default viewBox if neither inheritViewBox nor viewBox are provided', () => {
      const { container } = render(<SvgIcon component={CustomSvg} />);
      expect(container.firstChild).to.have.attribute('viewBox', '0 0 24 24');
    });

    it('should render with given viewBox if inheritViewBox is not provided', () => {
      const { container } = render(<SvgIcon component={CustomSvg} viewBox="0 0 30 30" />);
      expect(container.firstChild).to.have.attribute('viewBox', '0 0 30 30');
    });

    it("should use the custom component's viewBox if true", () => {
      const { container } = render(<SvgIcon component={CustomSvg} inheritViewBox />);
      expect(container.firstChild).to.have.attribute('viewBox', '-4 -4 24 24');
    });
  });

  it('should not override internal ownerState with the ownerState passed to the icon', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const { container } = render(<SvgIcon ownerState={{ fontSize: 'sm' }}>{path}</SvgIcon>);
    expect(container.firstChild).toHaveComputedStyle({ fontSize: '20px' }); // fontSize: xl -> 1.25rem = 20px
  });
});
