import * as React from 'react';
import ModalUnstyled, {
  ModalUnstyledRootSlotProps,
  ModalUnstyledBackdropSlotProps,
} from '@mui/base/ModalUnstyled';
import { expectType } from '@mui/types';

function Root(props: ModalUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-keepmounted={ownerState.keepMounted} {...other} />;
}

function Backdrop(props: ModalUnstyledBackdropSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-keepmounted={ownerState.keepMounted} {...other} />;
}

const styledModal = (
  <ModalUnstyled open components={{ Root, Backdrop }}>
    <div />
  </ModalUnstyled>
);

const PolymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <ModalUnstyled invalidProp={0} />

      <ModalUnstyled component="a" href="#" open>
        <div />
      </ModalUnstyled>

      <ModalUnstyled component={CustomComponent} stringProp="test" numberProp={0} open>
        <div />
      </ModalUnstyled>

      {/* @ts-expect-error */}
      <ModalUnstyled component={CustomComponent} open>
        <div />
      </ModalUnstyled>

      <ModalUnstyled
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
        open
      >
        <div />
      </ModalUnstyled>

      <ModalUnstyled<'button'>
        component="button"
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onMouseDown={(e) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
          e.currentTarget.checkValidity();
        }}
        open
      >
        <div />
      </ModalUnstyled>
    </div>
  );
};
