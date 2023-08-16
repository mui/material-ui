import * as React from 'react';
import { expectType } from '@mui/types';
import { TabPanel, TabPanelRootSlotProps } from '@mui/base/TabPanel';

function Root(props: TabPanelRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-hidden={ownerState.hidden} {...other} />;
}

const styledTabPanel = <TabPanel slots={{ root: Root }} value={0} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <TabPanel value={1} invalidProp={0} />

      <TabPanel<'a'> value={1} slots={{ root: 'a' }} href="#" />

      <TabPanel<typeof CustomComponent>
        value={1}
        slots={{ root: CustomComponent }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <TabPanel<typeof CustomComponent> value={1} slots={{ root: CustomComponent }} />

      <TabPanel<'button'>
        value={1}
        slots={{ root: 'button' }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <TabPanel<'button'>
        value={1}
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
