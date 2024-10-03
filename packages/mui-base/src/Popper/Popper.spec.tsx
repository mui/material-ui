import * as React from 'react';
import { expectType } from '@mui/types';
import { Popper, PopperRootSlotProps } from '@mui/base/Popper';

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

      <Popper<'a'> open slots={{ root: 'a' }} href="#" />

      <Popper<typeof CustomComponent>
        open
        slots={{ root: CustomComponent }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <Popper open component={CustomComponent} />

      <Popper<'button'>
        open
        slots={{ root: 'button' }}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          event.currentTarget.checkValidity()
        }
      />

      <Popper<'button'>
        open
        slots={{ root: 'button' }}
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onMouseDown={(event) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof event>(event);
          event.currentTarget.checkValidity();
        }}
      />
    </div>
  );
};
