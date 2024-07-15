import * as React from 'react';
import { expectType } from '@mui/types';
import { Tabs, TabsRootSlotProps } from '@mui/base/Tabs';

function Root(props: TabsRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-orientation={ownerState.orientation} {...other} />;
}

const styledTabs = <Tabs slots={{ root: Root }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <Tabs invalidProp={0} />

      <Tabs<'a'> slots={{ root: 'a' }} href="#" />

      <Tabs<typeof CustomComponent>
        slots={{ root: CustomComponent }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error required props not specified */}
      <Tabs<typeof CustomComponent> slots={{ root: CustomComponent }} />

      <Tabs<'button'>
        slots={{ root: 'button' }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Tabs<'button'>
        slots={{ root: 'button' }}
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
