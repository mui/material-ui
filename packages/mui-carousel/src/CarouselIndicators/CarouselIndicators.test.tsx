import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CarouselIndicators from './CarouselIndicators';
import { CarouselProvider } from '../CarouselContext';
import { CarouselContextValue } from '../types';

describe('<CarouselIndicators />', () => {
  const { render } = createRenderer();

  const createMockContext = (
    overrides: Partial<CarouselContextValue> = {},
  ): CarouselContextValue => ({
    activeIndex: 0,
    slideCount: 3,
    goToSlide: spy(),
    goToNext: spy(),
    goToPrevious: spy(),
    enableLoop: false,
    direction: 'forward',
    isAutoPlaying: false,
    pauseAutoPlay: spy(),
    resumeAutoPlay: spy(),
    transition: 'slide',
    transitionDuration: 450,
    ...overrides,
  });

  const renderWithContext = (
    ui: React.ReactElement,
    contextValue: CarouselContextValue,
  ) => {
    const theme = createTheme();
    return render(
      <ThemeProvider theme={theme}>
        <CarouselProvider value={contextValue}>{ui}</CarouselProvider>
      </ThemeProvider>,
    );
  };

  it('should render the correct number of indicators', () => {
    const context = createMockContext({ slideCount: 5 });
    renderWithContext(<CarouselIndicators />, context);

    const indicators = screen.getAllByRole('tab');
    expect(indicators).to.have.length(5);
  });

  it('should have role="tablist" on the container', () => {
    const context = createMockContext();
    renderWithContext(<CarouselIndicators />, context);

    expect(screen.getByRole('tablist')).to.not.equal(null);
  });

  it('should mark active indicator with aria-selected', () => {
    const context = createMockContext({ activeIndex: 1, slideCount: 3 });
    renderWithContext(<CarouselIndicators />, context);

    const indicators = screen.getAllByRole('tab');
    expect(indicators[0].getAttribute('aria-selected')).to.equal('false');
    expect(indicators[1].getAttribute('aria-selected')).to.equal('true');
    expect(indicators[2].getAttribute('aria-selected')).to.equal('false');
  });

  it('should have aria-label on each indicator', () => {
    const context = createMockContext({ slideCount: 3 });
    renderWithContext(<CarouselIndicators />, context);

    const indicators = screen.getAllByRole('tab');
    expect(indicators[0].getAttribute('aria-label')).to.equal('Go to slide 1');
    expect(indicators[1].getAttribute('aria-label')).to.equal('Go to slide 2');
    expect(indicators[2].getAttribute('aria-label')).to.equal('Go to slide 3');
  });

  it('should call goToSlide with correct index on click', () => {
    const goToSlide = spy();
    const context = createMockContext({ goToSlide, slideCount: 3 });
    renderWithContext(<CarouselIndicators />, context);

    const indicators = screen.getAllByRole('tab');
    fireEvent.click(indicators[2]);

    expect(goToSlide.callCount).to.equal(1);
    expect(goToSlide.firstCall.args[0]).to.equal(2);
    expect(goToSlide.firstCall.args[1]).to.equal('indicator');
  });

  it('should apply custom className', () => {
    const context = createMockContext();
    renderWithContext(<CarouselIndicators className="custom-class" />, context);

    const tablist = screen.getByRole('tablist');
    expect(tablist.classList.contains('custom-class')).to.equal(true);
  });

  it('should forward ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const context = createMockContext();
    renderWithContext(<CarouselIndicators ref={ref} />, context);

    expect(ref.current).to.not.equal(null);
    expect(ref.current?.getAttribute('role')).to.equal('tablist');
  });

  it('should render no indicators when slideCount is 0', () => {
    const context = createMockContext({ slideCount: 0 });
    renderWithContext(<CarouselIndicators />, context);

    const indicators = screen.queryAllByRole('tab');
    expect(indicators).to.have.length(0);
  });
});
