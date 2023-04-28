import * as React from 'react';
import Badge, { BadgeBadgeSlotProps, BadgeRootSlotProps } from '@mui/base/Badge';
import { expectType } from '@mui/types';

const Root = React.forwardRef(function Root(
  props: BadgeRootSlotProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const { ownerState, ...other } = props;
  return <span data-showzero={ownerState.showZero} {...other} ref={ref} />;
});

const CustomBadge = React.forwardRef(function CustomBadge(
  props: BadgeBadgeSlotProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const { ownerState, ...other } = props;
  return <span data-showzero={ownerState.showZero} {...other} ref={ref} />;
});

const styledBadge = <Badge slots={{ root: Root, badge: Badge }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <Badge invalidProp={0} />

      <Badge component="a" href="#" />

      <Badge component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <Badge component={CustomComponent} />

      <Badge
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Badge<'button'>
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
