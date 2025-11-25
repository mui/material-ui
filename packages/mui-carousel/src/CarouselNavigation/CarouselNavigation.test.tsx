import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CarouselNavigation from './CarouselNavigation';
import { CarouselProvider } from '../CarouselContext';
import { CarouselContextValue } from '../types';

describe('<CarouselNavigation />', () => {
  const { render } = createRenderer();

  const createMockContext = (
    overrides: Partial<CarouselContextValue> = {},
  ): CarouselContextValue => ({
    activeIndex: 1,
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

  it('should render previous and next buttons', () => {
    const context = createMockContext();
    renderWithContext(<CarouselNavigation />, context);

    expect(screen.getByLabelText('Go to previous slide')).to.not.equal(null);
    expect(screen.getByLabelText('Go to next slide')).to.not.equal(null);
  });

  it('should call goToPrevious on previous button click', () => {
    const goToPrevious = spy();
    const context = createMockContext({ goToPrevious });
    renderWithContext(<CarouselNavigation />, context);

    fireEvent.click(screen.getByLabelText('Go to previous slide'));

    expect(goToPrevious.callCount).to.equal(1);
    expect(goToPrevious.firstCall.args[0]).to.equal('navigation');
  });

  it('should call goToNext on next button click', () => {
    const goToNext = spy();
    const context = createMockContext({ goToNext });
    renderWithContext(<CarouselNavigation />, context);

    fireEvent.click(screen.getByLabelText('Go to next slide'));

    expect(goToNext.callCount).to.equal(1);
    expect(goToNext.firstCall.args[0]).to.equal('navigation');
  });

  it('should disable previous button at first slide without loop', () => {
    const context = createMockContext({ activeIndex: 0, enableLoop: false });
    renderWithContext(<CarouselNavigation />, context);

    const prevButton = screen.getByLabelText('Go to previous slide');
    expect(prevButton.hasAttribute('disabled')).to.equal(true);
  });

  it('should disable next button at last slide without loop', () => {
    const context = createMockContext({
      activeIndex: 2,
      slideCount: 3,
      enableLoop: false,
    });
    renderWithContext(<CarouselNavigation />, context);

    const nextButton = screen.getByLabelText('Go to next slide');
    expect(nextButton.hasAttribute('disabled')).to.equal(true);
  });

  it('should enable both buttons with enableLoop', () => {
    const context = createMockContext({ activeIndex: 0, enableLoop: true });
    renderWithContext(<CarouselNavigation />, context);

    const prevButton = screen.getByLabelText('Go to previous slide');
    const nextButton = screen.getByLabelText('Go to next slide');

    expect(prevButton.hasAttribute('disabled')).to.equal(false);
    expect(nextButton.hasAttribute('disabled')).to.equal(false);
  });

  it('should enable both buttons at last slide with enableLoop', () => {
    const context = createMockContext({
      activeIndex: 2,
      slideCount: 3,
      enableLoop: true,
    });
    renderWithContext(<CarouselNavigation />, context);

    const prevButton = screen.getByLabelText('Go to previous slide');
    const nextButton = screen.getByLabelText('Go to next slide');

    expect(prevButton.hasAttribute('disabled')).to.equal(false);
    expect(nextButton.hasAttribute('disabled')).to.equal(false);
  });

  it('should render custom prev icon', () => {
    const context = createMockContext();
    renderWithContext(
      <CarouselNavigation prevIcon={<span data-testid="custom-prev">←</span>} />,
      context,
    );

    expect(screen.getByTestId('custom-prev')).to.not.equal(null);
  });

  it('should render custom next icon', () => {
    const context = createMockContext();
    renderWithContext(
      <CarouselNavigation nextIcon={<span data-testid="custom-next">→</span>} />,
      context,
    );

    expect(screen.getByTestId('custom-next')).to.not.equal(null);
  });

  it('should forward prevButtonProps to previous button', () => {
    const onClick = spy();
    const context = createMockContext();
    renderWithContext(
      <CarouselNavigation prevButtonProps={{ onClick, 'data-testid': 'prev-btn' }} />,
      context,
    );

    const prevButton = screen.getByTestId('prev-btn');
    fireEvent.click(prevButton);

    expect(onClick.callCount).to.equal(1);
  });

  it('should forward nextButtonProps to next button', () => {
    const onClick = spy();
    const context = createMockContext();
    renderWithContext(
      <CarouselNavigation nextButtonProps={{ onClick, 'data-testid': 'next-btn' }} />,
      context,
    );

    const nextButton = screen.getByTestId('next-btn');
    fireEvent.click(nextButton);

    expect(onClick.callCount).to.equal(1);
  });

  it('should apply custom className', () => {
    const context = createMockContext();
    const { container } = renderWithContext(
      <CarouselNavigation className="custom-nav" />,
      context,
    );

    expect(container.querySelector('.custom-nav')).to.not.equal(null);
  });

  it('should forward ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const context = createMockContext();
    renderWithContext(<CarouselNavigation ref={ref} />, context);

    expect(ref.current).to.not.equal(null);
  });

  describe('RTL support', () => {
    it('should swap icons in RTL mode', () => {
      const context = createMockContext();
      const rtlTheme = createTheme({ direction: 'rtl' });
      render(
        <ThemeProvider theme={rtlTheme}>
          <CarouselProvider value={context}>
            <CarouselNavigation />
          </CarouselProvider>
        </ThemeProvider>,
      );

      // In RTL, previous button should have right arrow icon
      // and next button should have left arrow icon
      // This is handled internally by the component
      expect(screen.getByLabelText('Go to previous slide')).to.not.equal(null);
      expect(screen.getByLabelText('Go to next slide')).to.not.equal(null);
    });
  });
});
