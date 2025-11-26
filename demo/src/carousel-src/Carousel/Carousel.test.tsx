import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent, act } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Carousel from './Carousel';

describe('<Carousel />', () => {
  const { render, clock } = createRenderer({ clock: 'fake' });
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  const renderCarousel = (props: Partial<React.ComponentProps<typeof Carousel>> = {}) => {
    const theme = createTheme();
    const defaultChildren = [
      <div key="1">Slide 1</div>,
      <div key="2">Slide 2</div>,
      <div key="3">Slide 3</div>,
    ];

    return render(
      <ThemeProvider theme={theme}>
        <Carousel {...props}>{props.children ?? defaultChildren}</Carousel>
      </ThemeProvider>,
    );
  };

  describe('rendering', () => {
    it('should render with default props', () => {
      renderCarousel();

      expect(screen.getByRole('region')).to.not.equal(null);
      expect(screen.getByText('Slide 1')).to.not.equal(null);
    });

    it('should render all slides', () => {
      renderCarousel();

      expect(screen.getByText('Slide 1')).to.not.equal(null);
      expect(screen.getByText('Slide 2')).to.not.equal(null);
      expect(screen.getByText('Slide 3')).to.not.equal(null);
    });

    it('should render navigation by default', () => {
      renderCarousel();

      expect(screen.getByLabelText('Go to previous slide')).to.not.equal(null);
      expect(screen.getByLabelText('Go to next slide')).to.not.equal(null);
    });

    it('should render indicators by default', () => {
      renderCarousel();

      expect(screen.getByRole('tablist')).to.not.equal(null);
      expect(screen.getAllByRole('tab')).to.have.length(3);
    });
  });

  describe('ARIA attributes', () => {
    it('should have role="region"', () => {
      renderCarousel();

      const region = screen.getByRole('region');
      expect(region.getAttribute('aria-roledescription')).to.equal('carousel');
    });

    it('should have default aria-label', () => {
      renderCarousel();

      const region = screen.getByRole('region');
      expect(region.getAttribute('aria-label')).to.equal('Carousel');
    });

    it('should use custom aria-label', () => {
      renderCarousel({ 'aria-label': 'Product showcase' });

      const region = screen.getByRole('region');
      expect(region.getAttribute('aria-label')).to.equal('Product showcase');
    });

    it('should use aria-labelledby when provided', () => {
      renderCarousel({ 'aria-labelledby': 'carousel-title' });

      const region = screen.getByRole('region');
      expect(region.getAttribute('aria-labelledby')).to.equal('carousel-title');
      expect(region.getAttribute('aria-label')).to.equal(null);
    });

    it('should have aria-live="polite" when not auto-playing', () => {
      renderCarousel({ autoPlay: false });

      // The slides container should have aria-live
      const slidesContainer = document.querySelector('[aria-live]');
      expect(slidesContainer?.getAttribute('aria-live')).to.equal('polite');
    });
  });

  describe('hideNavigation prop', () => {
    it('should hide navigation when hideNavigation is true', () => {
      renderCarousel({ hideNavigation: true });

      expect(screen.queryByLabelText('Go to previous slide')).to.equal(null);
      expect(screen.queryByLabelText('Go to next slide')).to.equal(null);
    });
  });

  describe('hideIndicators prop', () => {
    it('should hide indicators when hideIndicators is true', () => {
      renderCarousel({ hideIndicators: true });

      expect(screen.queryByRole('tablist')).to.equal(null);
    });
  });

  describe('navigation', () => {
    it('should navigate to next slide on next button click', () => {
      const onChange = spy();
      renderCarousel({ onChange });

      fireEvent.click(screen.getByLabelText('Go to next slide'));

      expect(onChange.callCount).to.equal(1);
      expect(onChange.firstCall.args[1]).to.equal(1);
    });

    it('should navigate to previous slide on previous button click', () => {
      const onChange = spy();
      renderCarousel({ defaultActiveIndex: 1, onChange });

      fireEvent.click(screen.getByLabelText('Go to previous slide'));

      expect(onChange.callCount).to.equal(1);
      expect(onChange.firstCall.args[1]).to.equal(0);
    });

    it('should navigate to specific slide on indicator click', () => {
      const onChange = spy();
      renderCarousel({ onChange });

      const indicators = screen.getAllByRole('tab');
      fireEvent.click(indicators[2]);

      expect(onChange.callCount).to.equal(1);
      expect(onChange.firstCall.args[1]).to.equal(2);
    });
  });

  describe('controlled mode', () => {
    it('should use activeIndex prop', () => {
      renderCarousel({ activeIndex: 1 });

      const indicators = screen.getAllByRole('tab');
      expect(indicators[1].getAttribute('aria-selected')).to.equal('true');
    });

    it('should update when activeIndex prop changes', () => {
      const { rerender } = render(
        <ThemeProvider theme={createTheme()}>
          <Carousel activeIndex={0}>
            <div key="1">Slide 1</div>
            <div key="2">Slide 2</div>
          </Carousel>
        </ThemeProvider>,
      );

      let indicators = screen.getAllByRole('tab');
      expect(indicators[0].getAttribute('aria-selected')).to.equal('true');

      rerender(
        <ThemeProvider theme={createTheme()}>
          <Carousel activeIndex={1}>
            <div key="1">Slide 1</div>
            <div key="2">Slide 2</div>
          </Carousel>
        </ThemeProvider>,
      );

      indicators = screen.getAllByRole('tab');
      expect(indicators[1].getAttribute('aria-selected')).to.equal('true');
    });
  });

  describe('keyboard navigation', () => {
    it('should navigate with arrow keys', () => {
      const onChange = spy();
      renderCarousel({ onChange });

      const carousel = screen.getByRole('region');
      act(() => {
        carousel.focus();
      });

      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      expect(onChange.callCount).to.equal(1);
      expect(onChange.firstCall.args[1]).to.equal(1);
    });

    it('should not navigate when disableKeyboard is true', () => {
      const onChange = spy();
      renderCarousel({ onChange, disableKeyboard: true });

      const carousel = screen.getByRole('region');
      act(() => {
        carousel.focus();
      });

      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      expect(onChange.callCount).to.equal(0);
    });

    it('should have tabIndex 0 for keyboard focus', () => {
      renderCarousel();

      const carousel = screen.getByRole('region');
      expect(carousel.getAttribute('tabindex')).to.equal('0');
    });

    it('should have tabIndex -1 when disableKeyboard is true', () => {
      renderCarousel({ disableKeyboard: true });

      const carousel = screen.getByRole('region');
      expect(carousel.getAttribute('tabindex')).to.equal('-1');
    });
  });

  describe('auto-play', () => {
    it('should auto-advance when autoPlay is true', () => {
      const onChange = spy();
      renderCarousel({ autoPlay: true, autoPlayInterval: 3000, onChange, enableLoop: true });

      act(() => {
        clock.tick(3000);
      });

      expect(onChange.callCount).to.equal(1);
      expect(onChange.firstCall.args[1]).to.equal(1);
      expect(onChange.firstCall.args[2]).to.equal('auto');
    });

    it('should not auto-play when autoPlay is false', () => {
      const onChange = spy();
      renderCarousel({ autoPlay: false, onChange });

      act(() => {
        clock.tick(10000);
      });

      expect(onChange.callCount).to.equal(0);
    });
  });

  describe('loop mode', () => {
    it('should wrap from last to first with enableLoop', () => {
      const onChange = spy();
      renderCarousel({ defaultActiveIndex: 2, enableLoop: true, onChange });

      fireEvent.click(screen.getByLabelText('Go to next slide'));

      expect(onChange.callCount).to.equal(1);
      expect(onChange.firstCall.args[1]).to.equal(0);
    });

    it('should wrap from first to last with enableLoop', () => {
      const onChange = spy();
      renderCarousel({ defaultActiveIndex: 0, enableLoop: true, onChange });

      fireEvent.click(screen.getByLabelText('Go to previous slide'));

      expect(onChange.callCount).to.equal(1);
      expect(onChange.firstCall.args[1]).to.equal(2);
    });
  });

  describe('transition prop', () => {
    it('should support slide transition', () => {
      renderCarousel({ transition: 'slide' });
      expect(screen.getByRole('region')).to.not.equal(null);
    });

    it('should support fade transition', () => {
      renderCarousel({ transition: 'fade' });
      expect(screen.getByRole('region')).to.not.equal(null);
    });
  });

  describe('custom icons', () => {
    it('should render custom prevIcon', () => {
      renderCarousel({ prevIcon: <span data-testid="custom-prev">←</span> });
      expect(screen.getByTestId('custom-prev')).to.not.equal(null);
    });

    it('should render custom nextIcon', () => {
      renderCarousel({ nextIcon: <span data-testid="custom-next">→</span> });
      expect(screen.getByTestId('custom-next')).to.not.equal(null);
    });
  });

  describe('className and classes', () => {
    it('should apply custom className', () => {
      renderCarousel({ className: 'custom-carousel' });

      const carousel = screen.getByRole('region');
      expect(carousel.classList.contains('custom-carousel')).to.equal(true);
    });

    it('should apply root class', () => {
      renderCarousel();

      const carousel = screen.getByRole('region');
      expect(carousel.classList.contains('MuiCarousel-root')).to.equal(true);
    });
  });

  describe('ref forwarding', () => {
    it('should forward ref to root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ThemeProvider theme={createTheme()}>
          <Carousel ref={ref}>
            <div key="1">Slide 1</div>
          </Carousel>
        </ThemeProvider>,
      );

      expect(ref.current).to.not.equal(null);
      expect(ref.current?.getAttribute('role')).to.equal('region');
    });
  });

  describe('edge cases', () => {
    it('should handle single slide', () => {
      renderCarousel({
        children: [<div key="1">Only Slide</div>],
      });

      expect(screen.getByText('Only Slide')).to.not.equal(null);
      expect(screen.getAllByRole('tab')).to.have.length(1);
    });

    it('should handle empty children gracefully', () => {
      const { container } = render(
        <ThemeProvider theme={createTheme()}>
          <Carousel>{[]}</Carousel>
        </ThemeProvider>,
      );

      expect(container.querySelector('[role="region"]')).to.not.equal(null);
    });

    it('should filter out null/undefined children', () => {
      renderCarousel({
        children: [
          <div key="1">Slide 1</div>,
          null,
          <div key="2">Slide 2</div>,
          undefined,
        ],
      });

      expect(screen.getAllByRole('tab')).to.have.length(2);
    });
  });
});
