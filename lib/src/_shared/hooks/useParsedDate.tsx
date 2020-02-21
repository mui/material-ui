import * as React from 'react';
import { useUtils } from './useUtils';

export function useParsedDate(possiblyUnparsedValue: any) {
  const utils = useUtils();
  return React.useMemo(
    () =>
      typeof possiblyUnparsedValue === 'undefined' ? undefined : utils.date(possiblyUnparsedValue)!,
    [possiblyUnparsedValue, utils]
  );
}
