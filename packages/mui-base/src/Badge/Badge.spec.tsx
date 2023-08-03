import * as React from 'react';
import { expectType } from '@mui/types';
import { Badge, BadgeBadgeSlotProps, BadgeRootSlotProps } from '@mui/base/Badge';

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

  const CustomRoot = function CustomRoot() {
    return <div />;
  };

  return (
    <div>
      {/* @ts-expect-error */}
      <Badge invalidProp={0} />

      <Badge<'a'>
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <Badge<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />

      {/* @ts-expect-error required props not specified */}
      <Badge<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <Badge
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Badge<'button'>
        slots={{
          root: 'button',
        }}
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onClick={(e) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
          e.currentTarget.checkValidity();
        }}
      />

      <Badge<'svg'> viewBox="" />
    </div>
  );
};
