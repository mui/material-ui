import * as React from 'react';
import PopperUnstyled, { PopperUnstyledRootSlotProps } from '@mui/base/PopperUnstyled';
import { expectType } from '@mui/types';

function Root(props: PopperUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-open={ownerState.open} {...other} />;
}

const styledPopper = <PopperUnstyled components={{ Root }} open />;

const PolymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      <PopperUnstyled open>
        {(props) => {
          return <div>{props.placement}</div>;
        }}
      </PopperUnstyled>

      {/* @ts-expect-error */}
      <PopperUnstyled invalidProp={0} open />

      <PopperUnstyled open component="a" href="#" />

      <PopperUnstyled open component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <PopperUnstyled open component={CustomComponent} />

      <PopperUnstyled
        open
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <PopperUnstyled<'button'>
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
