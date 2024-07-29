'use client';
import * as React from 'react';
import { usePreviousProps } from '@mui/utils';
import { UseBadgeParameters, UseBadgeReturnValue } from './useBadge.types';

/**
 *
 * Demos:
 *
 * - [Badge](https://next.mui.com/base-ui/react-badge/#hook)
 *
 * API:
 *
 * - [useBadge API](https://next.mui.com/base-ui/react-badge/hooks-api/#use-badge)
 */
function useBadge(parameters: UseBadgeParameters): UseBadgeReturnValue {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false,
  } = parameters;

  const prevProps = usePreviousProps({
    badgeContent: badgeContentProp,
    max: maxProp,
  });

  let invisible = invisibleProp;

  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }

  const { badgeContent, max = maxProp } = invisible ? prevProps : parameters;

  const displayValue: React.ReactNode =
    badgeContent && Number(badgeContent) > max ? `${max}+` : badgeContent;

  return {
    badgeContent,
    invisible,
    max,
    displayValue,
  };
}

export default useBadge;
