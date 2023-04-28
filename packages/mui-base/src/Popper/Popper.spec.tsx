import * as React from 'react';
import Popper, { PopperRootSlotProps } from '@mui/base/Popper';
import { expectType } from '@mui/types';

function Root(props: PopperRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-open={ownerState.open} {...other} />;
}

const styledPopper = <Popper slots={{ root: Root }} open />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      <Popper open>
        {(props) => {
          return <div>{props.placement}</div>;
        }}
      </Popper>

      {/* @ts-expect-error */}
      <Popper invalidProp={0} open />

      <Popper open component="a" href="#" />

      <Popper open component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <Popper open component={CustomComponent} />

      <Popper
        open
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Popper<'button'>
        open
        component="button"
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onMouseDown={(e) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
          e.currentTarget.checkValidity();
        }}
      />
    </div>
  );
};
