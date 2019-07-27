import * as React from 'react';
import { useIsomorphicEffect } from './useKeyDown';
import { BasePickerProps } from '../../typings/BasePicker';

const getOrientation = () => {
  if (typeof window === 'undefined') {
    return 'portrait';
  }

  if (window.screen && window.screen.orientation && window.screen.orientation.angle) {
    return Math.abs(window.screen.orientation.angle) === 90 ? 'landscape' : 'portrait';
  }

  // Support IOS safari
  if (window.orientation) {
    return Math.abs(Number(window.orientation)) === 90 ? 'landscape' : 'portrait';
  }

  return 'portrait';
};

export function useIsLandscape(customOrientation?: BasePickerProps['orientation']) {
  const [orientation, setOrientation] = React.useState<BasePickerProps['orientation']>(
    getOrientation()
  );

  const eventHandler = React.useCallback(() => setOrientation(getOrientation()), []);

  useIsomorphicEffect(() => {
    window.addEventListener('orientationchange', eventHandler);
    return () => window.removeEventListener('orientationchange', eventHandler);
  }, [eventHandler]);

  const orientationToUse = customOrientation || orientation;
  return orientationToUse === 'landscape';
}
