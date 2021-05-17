import * as React from 'react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@material-ui/utils';
import { arrayIncludes } from '../utils';
import { AllAvailableViews } from '../typings/Views';

type Orientation = 'portrait' | 'landscape';

function getOrientation(): Orientation {
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
}

export function useIsLandscape(
  views: readonly AllAvailableViews[],
  customOrientation: Orientation | undefined,
): boolean {
  const [orientation, setOrientation] = React.useState(getOrientation);

  useEnhancedEffect(() => {
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

export default useIsLandscape;
