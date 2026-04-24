import { expect } from 'chai';
import {
  createRenderer,
  strictModeDoubleLoggingSuppressed,
  screen,
} from '@mui/internal-test-utils';
import CircularProgress, {
  circularProgressClasses as classes,
} from '@mui/material/CircularProgress';
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
    skip: ['componentProp'],
  }));

  it('should render with the primary color by default', () => {
    const { container } = render(<CircularProgress />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.colorPrimary);
  });

  it('should render with the primary color', () => {
    const { container } = render(<CircularProgress color="primary" />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.colorPrimary);
  });

  it('should render with the secondary color', () => {
    const { container } = render(<CircularProgress color="secondary" />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.colorSecondary);
  });

  it('should contain an SVG with the svg class, and a circle with the circle class', () => {
    const { container } = render(<CircularProgress />);
    const circularProgress = container.firstChild;
    const svg = circularProgress.firstChild;
    expect(svg).to.have.tagName('svg');
    expect(circularProgress).to.have.class(classes.indeterminate);
    expect(svg.firstChild).to.have.tagName('circle');
    expect(svg.firstChild).to.have.class(classes.circle, 'should have the circle class');
  });

  it('should render indeterminate variant by default', () => {
    const { container } = render(<CircularProgress />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.root);
    const svg = circularProgress.firstChild;
    expect(circularProgress).to.have.class(
      classes.indeterminate,
      'should have the indeterminate class',
    );
    expect(svg.firstChild).to.have.class(classes.circle, 'should have the circle class');
  });

  it('should render with a different size', () => {
    const { container } = render(<CircularProgress size={60} />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.root);
    expect(circularProgress.style.width).to.equal('60px', 'should have width correctly set');
    expect(circularProgress.style.height).to.equal('60px', 'should have height correctly set');
    const svg = circularProgress.firstChild;
    expect(svg).to.have.tagName('svg');
    const circle = svg.firstChild;
    expect(circle).to.have.tagName('circle');
    expect(circle).to.have.attribute('cx', '44');
    expect(circle).to.have.attribute('cy', '44');
  });

  describe('prop: variant="determinate"', () => {
    it('should render with determinate classes', () => {
      const { container } = render(<CircularProgress variant="determinate" />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      expect(svg).to.have.tagName('svg');
      expect(svg).not.to.have.class(
        classes.svgIndeterminate,
        'should not have the svgIndeterminate class',
      );
    });

    it('should set strokeDasharray of circle', () => {
      const { container } = render(<CircularProgress variant="determinate" value={70} />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
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

  describe('prop: disableShrink', () => {
    it('should default to false', () => {
      const { container } = render(<CircularProgress variant="indeterminate" />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
      expect(circle).to.have.tagName('circle');
      expect(circle).not.to.have.class(classes.circleDisableShrink);
    });

    it('should render without disableShrink class when set to false', () => {
      const { container } = render(
        <CircularProgress variant="indeterminate" disableShrink={false} />,
      );
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
      expect(circle).to.have.tagName('circle');
      expect(circle).not.to.have.class(classes.circleDisableShrink);
    });

    it('should render with disableShrink class when set to true', () => {
      const { container } = render(<CircularProgress variant="indeterminate" disableShrink />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
      expect(circle).to.have.tagName('circle');
      expect(circle).to.have.class(classes.circleDisableShrink);
    });
  });

  describe('prop: enableTrackSlot', () => {
    it('does not render track by default', () => {
      const { container } = render(<CircularProgress />);
      const circles = container.querySelectorAll('svg circle');
      expect(circles.length).to.equal(1);
    });

    it('renders track when enableTrackSlot is true', () => {
      const { container } = render(<CircularProgress enableTrackSlot />);
      const circles = container.querySelectorAll('svg circle');
      expect(circles.length).to.equal(2);
      expect(circles[0]).to.have.class(classes.track);
      expect(circles[0]).to.have.attribute('aria-hidden', 'true');
    });

    it('track and circle share geometry (r, strokeWidth)', () => {
      const thickness = 5;
      const { container } = render(<CircularProgress enableTrackSlot thickness={thickness} />);
      const [trackEl, circleEl] = container.querySelectorAll('svg circle');
      expect(trackEl.getAttribute('r')).to.equal(circleEl.getAttribute('r'));
      expect(trackEl.getAttribute('stroke-width')).to.equal(String(thickness));
    });

    it('track has no dash styles in determinate', () => {
      const { container } = render(
        <CircularProgress enableTrackSlot variant="determinate" value={70} />,
      );
      const [trackEl] = container.querySelectorAll('svg circle');
      expect(trackEl.style.strokeDasharray).to.equal('');
      expect(trackEl.style.strokeDashoffset).to.equal('');
    });
  });

  describe('prop: min & max', () => {
    it('should be able to use custom min and max values', () => {
      render(<CircularProgress variant="determinate" value={5} min={0} max={10} />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar).to.have.attribute('aria-valuenow', '5');
      expect(progressbar).to.have.attribute('aria-valuemin', '0');
      expect(progressbar).to.have.attribute('aria-valuemax', '10');
    });

    it('min and max values should be used to calculate the circumference of the circle', () => {
      const { container } = render(
        <CircularProgress variant="determinate" value={15} min={10} max={30} />,
      );
      const [circle] = container.querySelectorAll('svg circle');
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar).to.have.nested.property('style.transform', 'rotate(-90deg)');
      expect(circle.style.strokeDasharray).to.match(/126\.920?(px)?/gm);
      expect(circle.style.strokeDashoffset).to.match(/95\.190?(px)?/gm);
    });

    it('should fallback value to min if min is passed', () => {
      render(<CircularProgress variant="determinate" min={10} max={20} />);

      expect(screen.getByRole('progressbar')).to.have.attribute('aria-valuenow', '10');
    });

    it('should be able to use decimal min, max and value props', () => {
      render(<CircularProgress variant="determinate" value={5.5} min={2.5} max={10.3} />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar).to.have.attribute('aria-valuenow', '5.5');
      expect(progressbar).to.have.attribute('aria-valuemin', '2.5');
      expect(progressbar).to.have.attribute('aria-valuemax', '10.3');
    });

    it('should fallback to a full circumference strokeDashoffset (empty state) if max is less than min', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { container } = render(
        <CircularProgress variant="determinate" value={5} min={10} max={0} />,
      );
      const [circle] = container.querySelectorAll('svg circle');
      expect(circle.style.strokeDashoffset).to.match(/126\.920?(px)?/gm);

      errorSpy.mockRestore();
    });

    it('should error if min, max, and value props are invalid', () => {
      expect(() => {
        render(<CircularProgress variant="determinate" value={5} min={10} max={0} />);
      }).toErrorDev([
        'MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=10, max=0, value=5.',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=10, max=0, value=5.',
      ]);
      expect(() => {
        render(<CircularProgress variant="determinate" value={15} min={10} max={10} />);
      }).toErrorDev([
        'MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=10, max=10, value=15.',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=10, max=10, value=15.',
      ]);
      expect(() => {
        render(<CircularProgress variant="determinate" value={5} min={10} max={20} />);
      }).toErrorDev([
        'MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=10, max=20, value=5.',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=10, max=20, value=5.',
      ]);
      expect(() => {
        render(<CircularProgress variant="determinate" value={25} min={10} max={20} />);
      }).toErrorDev([
        'MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=10, max=20, value=25.',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=10, max=20, value=25.',
      ]);
    });

    it('should warn if min and max props are provided with an indeterminate variant', () => {
      expect(() => {
        render(<CircularProgress variant="indeterminate" min={0} max={10} />);
      }).toWarnDev([
        "MUI: You have provided the `min` or `max` props with an 'indeterminate' variant. These props will have no effect.",
        !strictModeDoubleLoggingSuppressed &&
          "MUI: You have provided the `min` or `max` props with an 'indeterminate' variant. These props will have no effect.",
      ]);
    });
  });
});
