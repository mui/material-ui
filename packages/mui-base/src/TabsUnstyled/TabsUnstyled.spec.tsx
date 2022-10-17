import * as React from 'react';
import TabsUnstyled, { TabsUnstyledRootSlotProps } from '@mui/base/TabsUnstyled';
import { expectType } from '@mui/types';

function Root(props: TabsUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-orientation={ownerState.orientation} {...other} />;
}

const styledTabs = <TabsUnstyled components={{ Root }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <TabsUnstyled invalidProp={0} />

      <TabsUnstyled component="a" href="#" />

      <TabsUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <TabsUnstyled component={CustomComponent} />

      <TabsUnstyled
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <TabsUnstyled<'button'>
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
