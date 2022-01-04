import * as React from 'react';
import { usePreviousProps } from '@mui/utils';
import BadgeUnstyledProps from './BadgeUnstyledProps';

export interface UseBadgeProps {
  anchorOrigin: BadgeUnstyledProps['anchorOrigin'];
  badgeContent: BadgeUnstyledProps['badgeContent'];
  invisible: BadgeUnstyledProps['invisible'];
  max: BadgeUnstyledProps['max'];
  showZero: BadgeUnstyledProps['showZero'];
  variant: BadgeUnstyledProps['variant'];
}

export default function useBadge(props: UseBadgeProps) {
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: 'top',
      horizontal: 'right',
    },
    badgeContent: badgeContentProp,
    invisible: invisibleProp,
    max: maxProp = 99,
    showZero = false,
    variant: variantProp = 'standard',
  } = props;

  const prevProps: Partial<BadgeUnstyledProps> = usePreviousProps({
    anchorOrigin: anchorOriginProp,
    badgeContent: badgeContentProp,
    max: maxProp,
    variant: variantProp,
  });

  let invisible = invisibleProp;

  if (
    invisibleProp == null &&
    ((badgeContentProp === 0 && !showZero) || (badgeContentProp == null && variantProp !== 'dot'))
  ) {
    invisible = true;
  }

  const {
    anchorOrigin = anchorOriginProp,
    badgeContent,
    max = maxProp,
    variant = variantProp,
  } = invisible ? prevProps : props;

  let displayValue: React.ReactNode = '';

  if (variant !== 'dot') {
    displayValue = badgeContent && Number(badgeContent) > max ? `${max}+` : badgeContent;
  }

  return {
    anchorOrigin,
    badgeContent,
    invisible,
    max,
    variant,
    displayValue,
  };
}
