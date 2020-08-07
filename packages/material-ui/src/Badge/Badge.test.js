import * as React from 'react';
import * as PropTypes from 'prop-types';
import { expect } from 'chai';
import { stub } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { createClientRender } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import Badge from './Badge';

function findBadge(container) {
  return container.firstChild.querySelector('span');
}

describe('<Badge />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();
  const defaultProps = {
    children: (
      <div className="unique" data-testid="children">
        Hello World
      </div>
    ),
    badgeContent: 10,
  };

  before(() => {
    classes = getClasses(<Badge {...defaultProps} />);
  });

  describeConformance(
    <Badge>
      <div />
    </Badge>,
    () => ({
      classes,
      inheritComponent: 'span',
      mount,
      refInstanceof: window.HTMLSpanElement,
      testComponentPropWith: 'div',
    }),
  );

  it('renders children and badgeContent', () => {
    const children = <div id="child" data-testid="child" />;
    const badge = <div id="badge" data-testid="badge" />;
    const { container, getByTestId } = render(<Badge badgeContent={badge}>{children}</Badge>);
    expect(container.firstChild).to.contain(getByTestId('child'));
    expect(container.firstChild).to.contain(getByTestId('badge'));
  });

  it('renders children and overwrite badge class', () => {
    const badgeClassName = 'testBadgeClassName';
    const { container } = render(<Badge {...defaultProps} classes={{ badge: badgeClassName }} />);
    expect(findBadge(container)).to.have.class(badgeClassName);
  });

  it('renders children', () => {
    const { container, getByTestId } = render(
      <Badge className="testClassName" {...defaultProps} />,
    );
    expect(container.firstChild).to.contain(getByTestId('children'));
  });

  describe('prop: color', () => {
    it('should have the colorPrimary class when color="primary"', () => {
      const { container } = render(<Badge {...defaultProps} color="primary" />);
      expect(findBadge(container)).to.have.class(classes.colorPrimary);
    });

    it('should have the colorSecondary class when color="secondary"', () => {
      const { container } = render(<Badge {...defaultProps} color="secondary" />);
      expect(findBadge(container)).to.have.class(classes.colorSecondary);
    });

    it('should have the colorError class when color="error"', () => {
      const { container } = render(<Badge {...defaultProps} color="error" />);
      expect(findBadge(container)).to.have.class(classes.colorError);
    });
  });

  describe('prop: invisible', () => {
    it('should default to false', () => {
      const { container } = render(<Badge {...defaultProps} />);
      expect(findBadge(container)).to.not.have.class(classes.invisible);
    });

    it('should render without the invisible class when set to false', () => {
      const { container } = render(<Badge {...defaultProps} invisible={false} />);
      expect(findBadge(container)).to.not.have.class(classes.invisible);
    });

    it('should render with the invisible class when set to true', () => {
      const { container } = render(<Badge {...defaultProps} invisible />);
      expect(findBadge(container)).to.have.class(classes.invisible);
    });

    it('should render with the invisible class when empty and not dot', () => {
      let container;
      container = render(<Badge {...defaultProps} badgeContent={null} />).container;
      expect(findBadge(container)).to.have.class(classes.invisible);
      container = render(<Badge {...defaultProps} badgeContent={undefined} />).container;
      expect(findBadge(container)).to.have.class(classes.invisible);
      container = render(<Badge {...defaultProps} badgeContent={undefined} variant="dot" />)
        .container;
      expect(findBadge(container)).to.not.have.class(classes.invisible);
    });
  });

  describe('prop: showZero', () => {
    it('should default to false', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={0} />);
      expect(findBadge(container)).to.have.class(classes.invisible);
    });

    it('should render without the invisible class when false and badgeContent is not 0', () => {
      const { container } = render(<Badge {...defaultProps} showZero />);
      expect(findBadge(container)).to.not.have.class(classes.invisible);
    });

    it('should render without the invisible class when true and badgeContent is 0', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={0} showZero />);
      expect(findBadge(container)).to.not.have.class(classes.invisible);
    });

    it('should render with the invisible class when false and badgeContent is 0', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={0} showZero={false} />);
      expect(findBadge(container)).to.have.class(classes.invisible);
    });
  });

  describe('prop: variant', () => {
    it('should default to standard', () => {
      const { container } = render(<Badge {...defaultProps} />);
      expect(findBadge(container)).to.have.class(classes.badge);
      expect(findBadge(container)).to.not.have.class(classes.dot);
    });

    it('should render with the standard class when variant="standard"', () => {
      const { container } = render(<Badge {...defaultProps} variant="standard" />);
      expect(findBadge(container)).to.have.class(classes.badge);
      expect(findBadge(container)).to.not.have.class(classes.dot);
    });

    it('should not render badgeContent when variant="dot"', () => {
      const { container } = render(<Badge {...defaultProps} variant="dot" />);
      expect(findBadge(container)).to.have.class(classes.badge);
      expect(findBadge(container)).to.have.class(classes.dot);
      expect(findBadge(container)).to.have.text('');
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

  describe('v5 deprecations', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
      stub(console, 'error');
    });

    afterEach(() => {
      console.error.restore();
    });

    it('issues a warning for overlap="circle"', () => {
      PropTypes.checkPropTypes(
        Badge.Naked.propTypes,
        {
          overlap: 'circle',
        },
        'props',
        'Badge',
      );

      expect(console.error.callCount).to.equal(1);
      expect(console.error.firstCall.args[0]).to.equal(
        'Warning: Failed props type: Material-UI: `overlap="circle"` was deprecated. Use `overlap="circular"` instead.',
      );
    });

    it('issues a warning for overlap="rectangle"', () => {
      PropTypes.checkPropTypes(
        Badge.Naked.propTypes,
        {
          overlap: 'rectangle',
        },
        'props',
        'Badge',
      );

      expect(console.error.callCount).to.equal(1);
      expect(console.error.firstCall.args[0]).to.equal(
        'Warning: Failed props type: Material-UI: `overlap="rectangle"` was deprecated. Use `overlap="rectangular"` instead.',
      );
    });

    it('issues a warning for the `anchorOriginTopRightRectangle` class', () => {
      PropTypes.checkPropTypes(
        Badge.Naked.propTypes,
        {
          classes: { anchorOriginTopRightRectangle: 'mui-class my-class' },
        },
        'props',
        'Badge',
      );

      expect(console.error.callCount).to.equal(1);
      expect(console.error.firstCall.args[0]).to.equal(
        'Warning: Failed props type: Material-UI: The `anchorOriginTopRightRectangle` class was deprecated. Use `anchorOriginTopRightRectangular` instead.',
      );
    });

    it('issues a warning for the `anchorOriginBottomRightRectangle` class', () => {
      PropTypes.checkPropTypes(
        Badge.Naked.propTypes,
        {
          classes: { anchorOriginBottomRightRectangle: 'mui-class my-class' },
        },
        'props',
        'Badge',
      );

      expect(console.error.callCount).to.equal(1);
      expect(console.error.firstCall.args[0]).to.equal(
        'Warning: Failed props type: Material-UI: The `anchorOriginBottomRightRectangle` class was deprecated. Use `anchorOriginBottomRightRectangular` instead.',
      );
    });

    it('issues a warning for the `anchorOriginTopLeftRectangle` class', () => {
      PropTypes.checkPropTypes(
        Badge.Naked.propTypes,
        {
          classes: { anchorOriginTopLeftRectangle: 'mui-class my-class' },
        },
        'props',
        'Badge',
      );

      expect(console.error.callCount).to.equal(1);
      expect(console.error.firstCall.args[0]).to.equal(
        'Warning: Failed props type: Material-UI: The `anchorOriginTopLeftRectangle` class was deprecated. Use `anchorOriginTopLeftRectangular` instead.',
      );
    });

    it('issues a warning for the `anchorOriginBottomLeftRectangle` class', () => {
      PropTypes.checkPropTypes(
        Badge.Naked.propTypes,
        {
          classes: { anchorOriginBottomLeftRectangle: 'mui-class my-class' },
        },
        'props',
        'Badge',
      );

      expect(console.error.callCount).to.equal(1);
      expect(console.error.firstCall.args[0]).to.equal(
        'Warning: Failed props type: Material-UI: The `anchorOriginBottomLeftRectangle` class was deprecated. Use `anchorOriginBottomLeftRectangular` instead.',
      );
    });

    it('issues a warning for the `anchorOriginTopRightCircle` class', () => {
      PropTypes.checkPropTypes(
        Badge.Naked.propTypes,
        {
          classes: { anchorOriginTopRightCircle: 'mui-class my-class' },
        },
        'props',
        'Badge',
      );

      expect(console.error.callCount).to.equal(1);
      expect(console.error.firstCall.args[0]).to.equal(
        'Warning: Failed props type: Material-UI: The `anchorOriginTopRightCircle` class was deprecated. Use `anchorOriginTopRightCircular` instead.',
      );
    });

    it('issues a warning for the `anchorOriginBottomRightCircle` class', () => {
      PropTypes.checkPropTypes(
        Badge.Naked.propTypes,
        {
          classes: { anchorOriginBottomRightCircle: 'mui-class my-class' },
        },
        'props',
        'Badge',
      );

      expect(console.error.callCount).to.equal(1);
      expect(console.error.firstCall.args[0]).to.equal(
        'Warning: Failed props type: Material-UI: The `anchorOriginBottomRightCircle` class was deprecated. Use `anchorOriginBottomRightCircular` instead.',
      );
    });

    it('issues a warning for the `anchorOriginTopLeftCircle` class', () => {
      PropTypes.checkPropTypes(
        Badge.Naked.propTypes,
        {
          classes: { anchorOriginTopLeftCircle: 'mui-class my-class' },
        },
        'props',
        'Badge',
      );

      expect(console.error.callCount).to.equal(1);
      expect(console.error.firstCall.args[0]).to.equal(
        'Warning: Failed props type: Material-UI: The `anchorOriginTopLeftCircle` class was deprecated. Use `anchorOriginTopLeftCircular` instead.',
      );
    });
  });
});
