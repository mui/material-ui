import * as React from 'react';
import Tabs, { TabsRootSlotProps } from '@mui/base/Tabs';
import { expectType } from '@mui/types';

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

      <Tabs component="a" href="#" />

      <Tabs component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <Tabs component={CustomComponent} />

      <Tabs
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Tabs<'button'>
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
