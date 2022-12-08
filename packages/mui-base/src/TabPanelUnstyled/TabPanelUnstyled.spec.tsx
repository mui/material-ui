import * as React from 'react';
import { expectType } from '@mui/types';
import TabPanelUnstyled, { TabPanelUnstyledRootSlotProps } from '@mui/base/TabPanelUnstyled';

function Root(props: TabPanelUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-hidden={ownerState.hidden} {...other} />;
}

const styledTabPanel = <TabPanelUnstyled components={{ Root }} value={0} />;

const PolymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <TabPanelUnstyled value={1} invalidProp={0} />

      <TabPanelUnstyled value={1} component="a" href="#" />

      <TabPanelUnstyled value={1} component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <TabPanelUnstyled value={1} component={CustomComponent} />

      <TabPanelUnstyled
        value={1}
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <TabPanelUnstyled<'button'>
        value={1}
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
