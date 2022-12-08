import * as React from 'react';
import BadgeUnstyled, {
  BadgeUnstyledBadgeSlotProps,
  BadgeUnstyledRootSlotProps,
} from '@mui/base/BadgeUnstyled';
import { expectType } from '@mui/types';

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

const PolymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <BadgeUnstyled invalidProp={0} />

      <BadgeUnstyled component="a" href="#" />

      <BadgeUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <BadgeUnstyled component={CustomComponent} />

      <BadgeUnstyled
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <BadgeUnstyled<'button'>
        component="button"
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onClick={(e) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
          e.currentTarget.checkValidity();
        }}
      />
    </div>
  );
};
