import * as React from 'react';
import { useIsomorphicEffect } from './useKeyDown';
import { arrayIncludes } from '../../_helpers/utils';
import { DateTimePickerView } from '../../DateTimePicker';
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

export function useIsLandscape(
  views: DateTimePickerView[],
  customOrientation?: BasePickerProps['orientation']
): boolean {
  const [orientation, setOrientation] = React.useState<BasePickerProps['orientation']>(
    getOrientation()
  );

  useIsomorphicEffect(() => {
    const eventHandler = () => {
      setOrientation(getOrientation());
    };
    window.addEventListener('orientationchange', eventHandler);
    return () => {
      window.removeEventListener('orientationchange', eventHandler);
    };
  }, []);

  if (arrayIncludes(views, ['hours', 'minutes', 'seconds'])) {
    // could not display 13:34:44 in landscape mode
    return false;
  }

  const orientationToUse = customOrientation || orientation;
  return orientationToUse === 'landscape';
}
