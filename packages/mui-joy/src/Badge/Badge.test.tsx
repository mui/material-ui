import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Badge, { BadgeClassKey, BadgeOrigin, badgeClasses as classes } from '@mui/joy/Badge';
import describeConformance from '../../test/describeConformance';

function findBadge(container: HTMLElement) {
  return (container?.firstChild as HTMLElement)?.querySelector('span') ?? null;
}

describe('<Badge />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: (
      <div className="unique" data-testid="children">
        Hello World
      </div>
    ),
    badgeContent: 10,
  };

  describeConformance(
    <Badge badgeContent="1">
      <button />
    </Badge>,
    () => ({
      classes,
      inheritComponent: 'span',
      render,
      ThemeProvider,
      refInstanceof: window.HTMLSpanElement,
      muiName: 'JoyBadge',
      testVariantProps: { color: 'neutral', variant: 'soft' },
      testCustomVariant: true,
      slots: {
        root: { expectedClassName: classes.root },
        badge: { expectedClassName: classes.badge },
      },
      skip: ['classesRoot', 'componentsProp'],
    }),
  );

  it('renders children and badgeContent', () => {
    const children = <div id="child" data-testid="child" />;
    const badge = <div id="badge" data-testid="badge" />;
    const { container, getByTestId } = render(<Badge badgeContent={badge}>{children}</Badge>);
    expect(container.firstChild).to.contain(getByTestId('child'));
    expect(container.firstChild).to.contain(getByTestId('badge'));
  });

  it('renders children', () => {
    const { container, getByTestId } = render(
      <Badge className="testClassName" {...defaultProps} />,
    );
    expect(container.firstChild).to.contain(getByTestId('children'));
  });

  describe('prop: invisible', () => {
    it('should default to false', () => {
      const { container } = render(<Badge {...defaultProps} />);
      expect(findBadge(container)).not.to.have.class(classes.invisible);
    });

    it('should render without the invisible class when set to false', () => {
      const { container } = render(<Badge {...defaultProps} invisible={false} />);
      expect(findBadge(container)).not.to.have.class(classes.invisible);
    });

    it('should render with the invisible class when set to true', () => {
      const { container } = render(<Badge {...defaultProps} invisible />);
      expect(findBadge(container)).to.have.class(classes.invisible);
    });

    it('should render with invisible class when invisible and showZero are set to false and content is 0', () => {
      const { container } = render(<Badge badgeContent={0} showZero={false} invisible={false} />);
      expect(findBadge(container)).to.have.class(classes.invisible);
      expect(findBadge(container)).to.have.text('');
    });

    it('should not render with invisible class when invisible and showZero are set to false and content is not 0', () => {
      const { container } = render(<Badge badgeContent={1} showZero={false} invisible={false} />);
      expect(findBadge(container)).not.to.have.class(classes.invisible);
      expect(findBadge(container)).to.have.text('1');
    });
  });

  describe('prop: showZero', () => {
    it('should default to false', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={0} />);
      expect(findBadge(container)).to.have.class(classes.invisible);
    });

    it('should render without the invisible class when false and badgeContent is not 0', () => {
      const { container } = render(<Badge {...defaultProps} showZero />);
      expect(findBadge(container)).not.to.have.class(classes.invisible);
    });

    it('should render without the invisible class when true and badgeContent is 0', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={0} showZero />);
      expect(findBadge(container)).not.to.have.class(classes.invisible);
    });

    it('should render with the invisible class when false and badgeContent is 0', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={0} showZero={false} />);
      expect(findBadge(container)).to.have.class(classes.invisible);
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { container } = render(<Badge {...defaultProps} />);
      expect(findBadge(container)).to.have.class(classes.colorPrimary);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        const { container } = render(<Badge color={color} {...defaultProps} />);

        expect(findBadge(container)).to.have.class(
          classes[`color${capitalize(color)}` as BadgeClassKey],
        );
      });
    });
  });

  describe('prop: size', () => {
    it('adds a sm class by default', () => {
      const { container } = render(<Badge {...defaultProps} />);
      expect(findBadge(container)).to.have.class(classes.sizeMd);
    });

    (['sm', 'md', 'lg'] as const).forEach((size) => {
      it(`should render ${size}`, () => {
        const { container } = render(<Badge size={size} {...defaultProps} />);

        expect(findBadge(container)).to.have.class(
          classes[`size${capitalize(size)}` as BadgeClassKey],
        );
      });
    });
  });

  describe('prop: variant', () => {
    it('adds a light class by default', () => {
      const { container } = render(<Badge {...defaultProps} />);
      expect(findBadge(container)).to.have.class(classes.variantSolid);
    });

    (['outlined', 'soft', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { container } = render(<Badge variant={variant} {...defaultProps} />);

        expect(findBadge(container)).to.have.class(
          classes[`variant${capitalize(variant)}` as BadgeClassKey],
        );
      });
    });
  });

  describe('prop: max', () => {
    it('should default to 99', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={100} />);
      expect(findBadge(container)).to.have.text('99+');
    });

    it('should cap badgeContent', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={1000} max={999} />);
      expect(findBadge(container)).to.have.text('999+');
    });

    it('should not cap if badgeContent and max are equal', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={1000} max={1000} />);
      expect(findBadge(container)).to.have.text('1000');
    });

    it('should not cap if badgeContent is lower than max', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={50} max={1000} />);
      expect(findBadge(container)).to.have.text('50');
    });
  });

  describe('prop: anchorOrigin', () => {
    it('topRight by default', () => {
      const { container } = render(
        <Badge {...defaultProps} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} />,
      );

      expect(findBadge(container)).to.have.class(classes.anchorOriginTopRight);
    });

    (
      [
        { horizontal: 'left', vertical: 'top' },
        { horizontal: 'left', vertical: 'bottom' },
        { horizontal: 'right', vertical: 'top' },
        { horizontal: 'right', vertical: 'bottom' },
      ] as BadgeOrigin[]
    ).forEach((anchorOrigin) => {
      it(`should render ${anchorOrigin}`, () => {
        const { container } = render(<Badge {...defaultProps} anchorOrigin={anchorOrigin} />);
        expect(findBadge(container)).to.have.class(
          classes[
            `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(
              anchorOrigin.horizontal,
            )}` as BadgeClassKey
          ],
        );
      });
    });
  });
});
