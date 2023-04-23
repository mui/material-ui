import * as React from 'react';
import { expectType } from '@mui/types';
import TabsListUnstyled, { TabsListUnstyledRootSlotProps } from '@mui/base/TabsListUnstyled';

function Root(props: TabsListUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-orientation={ownerState.orientation} {...other} />;
}

const styledTabsList = <TabsListUnstyled slots={{ root: Root }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <TabsListUnstyled invalidProp={0} />

      <TabsListUnstyled
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <TabsListUnstyled<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <TabsListUnstyled<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <TabsListUnstyled
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <TabsListUnstyled<'button'>
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
