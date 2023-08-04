import * as React from 'react';
import clsx from 'clsx';
import { expectType } from '@mui/types';
import { Button, ButtonProps, ButtonRootSlotProps } from '@mui/base/Button';

const CustomButtonRoot = React.forwardRef(function CustomButtonRoot(props: ButtonRootSlotProps) {
  const { ownerState, ...other } = props;
  const classes = clsx(
    other.className,
    ownerState.active && 'active',
    ownerState.focusVisible && 'focusVisible',
  );

  return <button type="button" {...other} className={classes} />;
});

function ButtonWithCustomRoot(props: ButtonProps) {
  return <Button {...props} slots={{ root: CustomButtonRoot }} />;
}

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  const Root = function Root() {
    return <div />;
  };

  return (
    <div>
      {/* @ts-expect-error */}
      <Button invalidProp={0} />

      <Button slots={{ root: 'a' }} href="#" />

      <Button
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onClick={(e) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
        }}
        type="submit"
      />

      <Button<typeof CustomComponent>
        slots={{ root: CustomComponent }}
        stringProp="test"
        numberProp={0}
      />

      {/* @ts-expect-error onClick must be specified in the custom root component */}
      <Button<typeof Root> slots={{ root: Root }} onClick={() => {}} />

      {/* @ts-expect-error required props not specified */}
      <Button<typeof CustomComponent> slots={{ root: CustomComponent }} />

      <Button<'svg'> viewBox="" />

      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Button<'div'>
        slotProps={{ root: 'div' }}
        ref={(elem) => {
          expectType<HTMLDivElement | null, typeof elem>(elem);
        }}
        onClick={(e) => {
          expectType<React.MouseEvent<HTMLDivElement, MouseEvent>, typeof e>(e);
        }}
      />
    </div>
  );
};
