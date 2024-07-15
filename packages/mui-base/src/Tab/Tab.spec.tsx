import * as React from 'react';
import { expectType } from '@mui/types';
import { Tab, TabRootSlotProps } from '@mui/base/Tab';

function Root(props: TabRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-active={ownerState.active} {...other} />;
}

const styledTab = <Tab value={0} slots={{ root: Root }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <Tab value={0} invalidProp={0} />

      <Tab value={0} slots={{ root: 'a' }} href="#" />

      <Tab<typeof CustomComponent>
        value={0}
        slots={{ root: CustomComponent }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <Tab value={0} slots={{ root: { CustomComponent } }} />

      <Tab
        value={0}
        slots={{ root: 'button' }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Tab<'button'>
        value={0}
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
