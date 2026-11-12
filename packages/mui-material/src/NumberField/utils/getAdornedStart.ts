import type * as React from 'react';
import type { NumberFieldOwnerState } from '../NumberField.types';

interface GetAdornedStartOptions extends Pick<
  NumberFieldOwnerState,
  'controlsPosition' | 'scrubAreaPosition'
> {
  startAdornment?: React.ReactNode;
}

/**
 * Shares the start-adornment decision between SSR label setup and input rendering.
 */
export default function getAdornedStart({
  controlsPosition,
  scrubAreaPosition,
  startAdornment,
}: GetAdornedStartOptions): boolean {
  return controlsPosition === 'split' || scrubAreaPosition === 'start' || Boolean(startAdornment);
}
