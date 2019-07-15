import * as React from 'react';
import { useIsomorphicEffect } from './useKeyDown';
import { BasePickerProps } from '../../typings/BasePicker';

const getOrientation = () =>
  typeof window !== 'undefined' &&
  window.screen &&
  window.orientation &&
  Math.abs(window.screen.orientation.angle) === 90
    ? 'landscape'
    : 'portrait';

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
