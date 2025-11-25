'use client';
import * as React from 'react';
import { CarouselContextValue } from '../types';

/**
 * Context for carousel sub-component communication.
 * Provides access to carousel state and navigation methods.
 */
const CarouselContext = React.createContext<CarouselContextValue | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  CarouselContext.displayName = 'CarouselContext';
}

export interface CarouselProviderProps {
  children: React.ReactNode;
  value: CarouselContextValue;
}

/**
 * Provider component for CarouselContext.
 * Wraps carousel content to provide state access to sub-components.
 */
export function CarouselProvider(props: CarouselProviderProps): React.JSX.Element {
  const { children, value } = props;
  return <CarouselContext.Provider value={value}>{children}</CarouselContext.Provider>;
}

/**
 * Hook to access carousel context.
 * Must be used within a CarouselProvider.
 *
 * @throws Error if used outside of CarouselProvider
 * @returns CarouselContextValue with carousel state and methods
 *
 * @example
 * ```tsx
 * function CarouselNavButton() {
 *   const { goToNext, canGoNext } = useCarouselContext();
 *   return (
 *     <button onClick={() => goToNext('navigation')} disabled={!canGoNext}>
 *       Next
 *     </button>
 *   );
 * }
 * ```
 */
export function useCarouselContext(): CarouselContextValue {
  const context = React.useContext(CarouselContext);

  if (context === undefined) {
    throw new Error(
      'MUI: useCarouselContext must be used within a CarouselProvider. ' +
        'Ensure your component is wrapped with the Carousel component.',
    );
  }

  return context;
}

/**
 * Hook to optionally access carousel context.
 * Returns undefined if used outside of CarouselProvider (no error thrown).
 * Useful for components that can work both inside and outside a carousel.
 */
export function useOptionalCarouselContext(): CarouselContextValue | undefined {
  return React.useContext(CarouselContext);
}

export { CarouselContext };
export default CarouselContext;
