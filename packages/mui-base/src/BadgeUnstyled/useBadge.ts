import * as React from 'react';
import { usePreviousProps } from '@mui/utils';

export interface UseBadgeParameters {
  badgeContent?: React.ReactNode;
  invisible?: boolean;
  max?: number;
  showZero?: boolean;
}

export default function useBadge(parameters: UseBadgeParameters) {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false,
  } = parameters;

  const prevProps: Partial<UseBadgeParameters> = usePreviousProps({
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
