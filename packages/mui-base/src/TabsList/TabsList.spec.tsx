import * as React from 'react';
import { expectType } from '@mui/types';
import TabsList, { TabsListRootSlotProps } from '@mui/base/TabsList';

function Root(props: TabsListRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-orientation={ownerState.orientation} {...other} />;
}

const styledTabsList = <TabsList slots={{ root: Root }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <TabsList invalidProp={0} />

      <TabsList component="a" href="#" />

      <TabsList component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <TabsList component={CustomComponent} />

      <TabsList
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <TabsList<'button'>
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
