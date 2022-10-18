import * as React from 'react';
import TabUnstyled, { TabUnstyledRootSlotProps } from '@mui/base/TabUnstyled';
import { expectType } from '@mui/types';

function Root(props: TabUnstyledRootSlotProps) {
  const { ownerState, ...other } = props;
  return <div data-active={ownerState.active} {...other} />;
}

const styledTab = <TabUnstyled components={{ Root }} />;

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <TabUnstyled invalidProp={0} />

      <TabUnstyled component="a" href="#" />

      <TabUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <TabUnstyled component={CustomComponent} />

      <TabUnstyled
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <TabUnstyled<'button'>
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
