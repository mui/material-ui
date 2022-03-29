import * as React from 'react';
import { usePreviousProps } from '@mui/utils';
import BadgeUnstyledProps from './BadgeUnstyledProps';

export interface UseBadgeProps {
  badgeContent: BadgeUnstyledProps['badgeContent'];
  invisible: BadgeUnstyledProps['invisible'];
  max: BadgeUnstyledProps['max'];
  showZero: BadgeUnstyledProps['showZero'];
}

export default function useBadge(props: UseBadgeProps) {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false,
  } = props;

  const prevProps: Partial<BadgeUnstyledProps> = usePreviousProps({
    badgeContent: badgeContentProp,
    max: maxProp,
  });

  let invisible = invisibleProp;

  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }

  const { badgeContent, max = maxProp } = invisible ? prevProps : props;

  const displayValue: React.ReactNode =
    badgeContent && Number(badgeContent) > max ? `${max}+` : badgeContent;

  return {
    badgeContent,
    invisible,
    max,
    displayValue,
  };
}
