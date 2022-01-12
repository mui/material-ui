import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import SvgIcon, { svgIconClasses as classes } from '@mui/joy/SvgIcon';
import { ThemeProvider } from '@mui/joy/styles';
import defaultTheme from '../styles/defaultTheme';

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
      muiName: 'MuiSvgIcon',
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

    it('should render with the primary color', () => {
      const { container } = render(<SvgIcon color="primary">{path}</SvgIcon>);
      expect(container.firstChild).to.have.class(classes.colorPrimary);
    });

    it('should render with the info color', () => {
      const { container } = render(<SvgIcon color="info">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorInfo);
    });

    it('should render with the danger color', () => {
      const { container } = render(<SvgIcon color="danger">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorDanger);
    });

    it('should render with the warning color', () => {
      const { container } = render(<SvgIcon color="warning">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorWarning);
    });

    it('should render with the success color', () => {
      const { container } = render(<SvgIcon color="success">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorSuccess);
    });

    it('should render with the neutral color', () => {
      const { container } = render(<SvgIcon color="neutral">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorNeutral);
    });
  });

  describe('prop: fontSize', () => {
    it('should render with `medium` by default', () => {
      const { container } = render(<SvgIcon fontSize="medium">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.fontSizeMedium);
      expect(container.firstChild).toHaveComputedStyle({
        fontSize: defaultTheme.vars.fontSize.md,
      });
    });

    it('should render with `extraSmall` size', () => {
      const { container } = render(<SvgIcon fontSize="extraSmall">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.fontSizeExtraSmall);
      expect(container.firstChild).toHaveComputedStyle({
        fontSize: defaultTheme.vars.fontSize.xs,
      });
    });

    it('should render with `small` size', () => {
      const { container } = render(<SvgIcon fontSize="small">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.fontSizeSmall);
      expect(container.firstChild).toHaveComputedStyle({
        fontSize: defaultTheme.vars.fontSize.sm,
      });
    });

    it('should render with `large` size', () => {
      const { container } = render(<SvgIcon fontSize="large">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.fontSizeLarge);
      expect(container.firstChild).toHaveComputedStyle({
        fontSize: defaultTheme.vars.fontSize.lg,
      });
    });

    it('should render with `extraLarge` size', () => {
      const { container } = render(<SvgIcon fontSize="extraLarge">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.fontSizeExtraLarge);
      expect(container.firstChild).toHaveComputedStyle({
        fontSize: defaultTheme.vars.fontSize.xl,
      });
    });
  });

  describe('prop: inheritViewBox', () => {
    const CustomSvg = (props) => (
      <svg viewBox="-4 -4 24 24" {...props}>
        {path}
      </svg>
    );

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
});
