import * as React from 'react';
import ModalUnstyled, {
  ModalUnstyledBackdropSlotProps,
  ModalUnstyledRootSlotProps,
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
  <ModalUnstyled open slots={{ root: Root, backdrop: Backdrop }}>
    <div />
  </ModalUnstyled>
);

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <ModalUnstyled invalidProp={0} />

      <ModalUnstyled
        slots={{
          root: 'a',
        }}
        href="#"
        open
      >
        <div />
      </ModalUnstyled>

      <ModalUnstyled<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
        open
      >
        <div />
      </ModalUnstyled>

      {/* @ts-expect-error */}
      <ModalUnstyled<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        open
      >
        <div />
      </ModalUnstyled>

      <ModalUnstyled
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
        open
      >
        <div />
      </ModalUnstyled>

      <ModalUnstyled<'button'>
        slots={{
          root: 'button',
        }}
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
