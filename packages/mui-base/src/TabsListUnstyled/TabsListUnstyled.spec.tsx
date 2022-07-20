import * as React from 'react';
import { expectType } from '@mui/types';
import TabsListUnstyled, { TabsListUnstyledRootSlotProps } from '@mui/base/TabsListUnstyled';

function Root(props: TabsListUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-orientation={ownerState.orientation} {...other} />;
}

const styledTabsList = <TabsListUnstyled components={{ Root }} />;

const PolymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <TabsListUnstyled invalidProp={0} />

      <TabsListUnstyled component="a" href="#" />

      <TabsListUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <TabsListUnstyled component={CustomComponent} />

      <TabsListUnstyled
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <TabsListUnstyled<'button'>
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
