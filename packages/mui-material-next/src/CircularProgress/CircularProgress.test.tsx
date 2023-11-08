import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import CircularProgress, {
  circularProgressClasses as classes,
} from '@mui/material-next/CircularProgress';

describe('<CircularProgress />', () => {
  const { render } = createRenderer();

  describeConformance(<CircularProgress />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiCircularProgress',
    testDeepOverrides: { slotName: 'circle', slotClassName: classes.circle },
    testVariantProps: { variant: 'determinate' },
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render with the primary color by default', () => {
    const { getByRole } = render(<CircularProgress />);
    const circularProgress = getByRole('progressbar');
    expect(circularProgress).to.have.class(classes.colorPrimary);
  });

  it('should render with the primary color', () => {
    const { getByRole } = render(<CircularProgress color="primary" />);
    const circularProgress = getByRole('progressbar');
    expect(circularProgress).to.have.class(classes.colorPrimary);
  });

  it('should render with the secondary color', () => {
    const { getByRole } = render(<CircularProgress color="secondary" />);
    const circularProgress = getByRole('progressbar');
    expect(circularProgress).to.have.class(classes.colorSecondary);
  });

  it('should contain an SVG with the svg class, and a circle with the circle class', () => {
    const { container, getByRole } = render(<CircularProgress />);
    const circularProgress = getByRole('progressbar');
    const svg = container.querySelector<SVGElement>('svg');
    const circle = container.querySelector<SVGCircleElement>('circle');
    expect(svg).to.have.tagName('svg');
    expect(circularProgress).to.have.class(classes.indeterminate);
    expect(circle).to.have.tagName('circle');
    expect(circle).to.have.class(classes.circle);
  });

  it('should render indeterminate variant by default', () => {
    const { container, getByRole } = render(<CircularProgress />);
    const circularProgress = getByRole('progressbar');
    const circle = container.querySelector<SVGCircleElement>('circle');
    expect(circularProgress).to.have.class(classes.root);
    expect(circle).to.have.class(classes.circleIndeterminate);
  });

  it('should render with a different size', () => {
    const { container, getByRole } = render(<CircularProgress size={60} />);
    const circularProgress = getByRole('progressbar');
    expect(circularProgress).to.have.class(classes.root);
    expect(circularProgress.style.width).to.equal('60px', 'should have width correctly set');
    expect(circularProgress.style.height).to.equal('60px', 'should have height correctly set');
    const svg = container.querySelector<SVGElement>('svg');
    expect(svg).to.have.tagName('svg');
    const circle = container.querySelector<SVGCircleElement>('circle');
    expect(circle).to.have.tagName('circle');
    expect(circle).to.have.attribute('cx', '44');
    expect(circle).to.have.attribute('cy', '44');
  });

  describe('prop: variant="determinate"', () => {
    it('should render with determinate classes', () => {
      const { container, getByRole } = render(<CircularProgress variant="determinate" />);
      const circularProgress = getByRole('progressbar');
      expect(circularProgress).to.have.class(classes.root);
      expect(circularProgress).not.to.have.class(classes.indeterminate);
      const svg = container.querySelector<SVGElement>('svg');
      expect(svg).to.have.tagName('svg');
      const circle = container.querySelector<SVGCircleElement>('circle');
      expect(circle).not.to.have.class(classes.circleIndeterminate);
    });

    it('should set strokeDasharray of circle', () => {
      const { container, getByRole } = render(
        <CircularProgress variant="determinate" value={70} />,
      );
      const circularProgress = getByRole('progressbar');
      expect(circularProgress).to.have.class(classes.root);
      const circle = container.querySelector<SVGCircleElement>('circle')!;
      expect(circle.style.strokeDasharray).to.match(
        /126\.920?(px)?/gm,
        'should have strokeDasharray set',
      );
      expect(circle.style.strokeDashoffset).to.equal(
        '38.076px',
        'should have strokeDashoffset set',
      );
      expect(circularProgress).to.have.attribute('aria-valuenow', '70');
    });
  });

  describe('prop: disableShrink ', () => {
    it('should default to false', () => {
      const { container, getByRole } = render(<CircularProgress variant="indeterminate" />);
      const circularProgress = getByRole('progressbar');
      expect(circularProgress).to.have.class(classes.root);
      const circle = container.querySelector<SVGCircleElement>('circle');
      expect(circle).to.have.tagName('circle');
      expect(circle).not.to.have.class(classes.circleDisableShrink);
    });

    it('should render without disableShrink class when set to false', () => {
      const { container, getByRole } = render(
        <CircularProgress variant="indeterminate" disableShrink={false} />,
      );
      const circularProgress = getByRole('progressbar');
      expect(circularProgress).to.have.class(classes.root);
      const circle = container.querySelector<SVGCircleElement>('circle');
      expect(circle).to.have.tagName('circle');
      expect(circle).not.to.have.class(classes.circleDisableShrink);
    });

    it('should render with disableShrink class when set to true', () => {
      const { container, getByRole } = render(
        <CircularProgress variant="indeterminate" disableShrink />,
      );
      const circularProgress = getByRole('progressbar');
      expect(circularProgress).to.have.class(classes.root);
      const circle = container.querySelector<SVGCircleElement>('circle');
      expect(circle).to.have.tagName('circle');
      expect(circle).to.have.class(classes.circleDisableShrink);
    });
  });
});
