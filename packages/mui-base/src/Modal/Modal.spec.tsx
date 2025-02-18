import * as React from 'react';
import { expectType } from '@mui/types';
import { Modal, ModalBackdropSlotProps, ModalRootSlotProps } from '@mui/base/Modal';

function Root(props: ModalRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-keepmounted={ownerState.keepMounted} {...other} />;
}

function Backdrop(props: ModalBackdropSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-keepmounted={ownerState.keepMounted} {...other} />;
}

const styledModal = (
  <Modal open slots={{ root: Root, backdrop: Backdrop }}>
    <div />
  </Modal>
);

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <Modal invalidProp={0} />

      <Modal<'a'>
        slots={{
          root: 'a',
        }}
        href="#"
        open
      >
        <div />
      </Modal>

      <Modal<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
        open
      >
        <div />
      </Modal>

      {/* @ts-expect-error */}
      <Modal<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        open
      >
        <div />
      </Modal>

      <Modal<'button'>
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
        open
      >
        <div />
      </Modal>

      <Modal<'button'>
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
      </Modal>
    </div>
  );
};
