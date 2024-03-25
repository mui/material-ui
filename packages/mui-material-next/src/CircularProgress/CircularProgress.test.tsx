import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui-internal/test-utils';
import CircularProgress, {
  circularProgressClasses as classes,
} from '@mui/material-next/CircularProgress';
import { CssVarsProvider, extendTheme } from '../styles';
import describeConformance from '../../test/describeConformance';

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
    ThemeProvider: CssVarsProvider,
    createTheme: extendTheme,
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

  it('should render with the tertiary color', () => {
    const { getByRole } = render(<CircularProgress color="tertiary" />);
    const circularProgress = getByRole('progressbar');
    expect(circularProgress).to.have.class(classes.colorTertiary);
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
    expect(circularProgress).to.have.class(classes.indeterminate);
    expect(circle).to.have.class(classes.circle);
  });

  it('should render with a different size', async function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // only run on browser, because getComputedStyle only works in browser
      this.skip();
    }
    const { container, getByRole } = render(<CircularProgress size={60} />);
    const circularProgress = getByRole('progressbar');
    const circularProgressStyle = window.getComputedStyle(circularProgress);
    expect(circularProgress).to.have.class(classes.root);
    expect(circularProgressStyle.width).to.equal('60px', 'should have width correctly set');
    expect(circularProgressStyle.height).to.equal('60px', 'should have height correctly set');
    const svg = container.querySelector<SVGElement>('svg');
    expect(svg).to.have.tagName('svg');
    const circle = container.querySelector<SVGCircleElement>('circle');
    expect(circle).to.have.tagName('circle');
    expect(circle).to.have.attribute('cx', '48');
    expect(circle).to.have.attribute('cy', '48');
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
      expect(circle).to.have.class(classes.circle);
    });

    it('should set strokeDasharray of circle', () => {
      const { container, getByRole } = render(
        <CircularProgress variant="determinate" value={70} />,
      );
      const circularProgress = getByRole('progressbar');
      expect(circularProgress).to.have.class(classes.root);
      const circle = container.querySelector<SVGCircleElement>('circle')!;
      expect(circle.style.strokeDasharray).to.match(
        /138\.230?(px)?/gm,
        'should have strokeDasharray set',
      );
      expect(circle.style.strokeDashoffset).to.equal(
        '41.469px',
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
      expect(circularProgress).not.to.have.class(classes.disableShrink);
      const circle = container.querySelector<SVGCircleElement>('circle');
      expect(circle).to.have.tagName('circle');
      expect(circle).to.have.class(classes.circle);
    });

    it('should render without disableShrink class when set to false', () => {
      const { container, getByRole } = render(
        <CircularProgress variant="indeterminate" disableShrink={false} />,
      );
      const circularProgress = getByRole('progressbar');
      expect(circularProgress).to.have.class(classes.root);
      expect(circularProgress).not.to.have.class(classes.disableShrink);
      const circle = container.querySelector<SVGCircleElement>('circle');
      expect(circle).to.have.tagName('circle');
      expect(circle).to.have.class(classes.circle);
    });

    it('should render with disableShrink class when set to true', () => {
      const { container, getByRole } = render(
        <CircularProgress variant="indeterminate" disableShrink />,
      );
      const circularProgress = getByRole('progressbar');
      expect(circularProgress).to.have.class(classes.root);
      expect(circularProgress).to.have.class(classes.disableShrink);
      const circle = container.querySelector<SVGCircleElement>('circle');
      expect(circle).to.have.tagName('circle');
      expect(circle).to.have.class(classes.circle);
    });
  });

  describe('prop: fourColor ', () => {
    it('should default to false', () => {
      const { container, getByRole } = render(<CircularProgress variant="indeterminate" />);
      const circularProgress = getByRole('progressbar');
      expect(circularProgress).to.have.class(classes.root);
      expect(circularProgress).not.to.have.class(classes.fourColor);
      const circle = container.querySelector<SVGCircleElement>('circle');
      expect(circle).to.have.tagName('circle');
      expect(circle).to.have.class(classes.circle);
    });

    it('should render without fourColor class when set to false', () => {
      const { container, getByRole } = render(
        <CircularProgress variant="indeterminate" fourColor={false} />,
      );
      const circularProgress = getByRole('progressbar');
      expect(circularProgress).to.have.class(classes.root);
      expect(circularProgress).not.to.have.class(classes.fourColor);
      const circle = container.querySelector<SVGCircleElement>('circle');
      expect(circle).to.have.tagName('circle');
      expect(circle).to.have.class(classes.circle);
    });

    it('should render with fourColor class when set to true', () => {
      const { container, getByRole } = render(
        <CircularProgress variant="indeterminate" fourColor />,
      );
      const circularProgress = getByRole('progressbar');
      expect(circularProgress).to.have.class(classes.root);
      expect(circularProgress).to.have.class(classes.fourColor);
      const circle = container.querySelector<SVGCircleElement>('circle');
      expect(circle).to.have.tagName('circle');
      expect(circle).to.have.class(classes.circle);
    });
  });
});
