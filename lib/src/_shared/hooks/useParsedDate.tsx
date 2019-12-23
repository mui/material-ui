import * as React from 'react';
import { useUtils } from './useUtils';

export function useParsedDate(possiblyUnparsedValue: any) {
  const utils = useUtils();
  return React.useMemo(() => utils.date(possiblyUnparsedValue)!, [possiblyUnparsedValue, utils]);
}
