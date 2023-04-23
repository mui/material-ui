import * as React from 'react';
import TabUnstyled, { TabUnstyledRootSlotProps } from '@mui/base/TabUnstyled';
import { expectType } from '@mui/types';

function Root(props: TabUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-active={ownerState.active} {...other} />;
}

const styledTab = <TabUnstyled value={0} slots={{ root: Root }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <TabUnstyled value={0} invalidProp={0} />

      <TabUnstyled
        value={0}
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <TabUnstyled<typeof CustomComponent>
        value={0}
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <TabUnstyled<typeof CustomComponent>
        value={0}
        slots={{
          root: CustomComponent,
        }}
      />

      <TabUnstyled
        value={0}
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <TabUnstyled<'button'>
        value={0}
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
      />
    </div>
  );
};
