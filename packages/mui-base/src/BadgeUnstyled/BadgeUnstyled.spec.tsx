import * as React from 'react';
import BadgeUnstyled, {
  BadgeUnstyledBadgeSlotProps,
  BadgeUnstyledRootSlotProps,
} from '@mui/base/BadgeUnstyled';

const Root = React.forwardRef(function Root(
  props: BadgeUnstyledRootSlotProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const { ownerState, ...other } = props;
  return <span data-showzero={ownerState.showZero} {...other} ref={ref} />;
});

const Badge = React.forwardRef(function Badge(
  props: BadgeUnstyledBadgeSlotProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const { ownerState, ...other } = props;
  return <span data-showzero={ownerState.showZero} {...other} ref={ref} />;
});

const styledBadge = <BadgeUnstyled components={{ Root, Badge }} />;
