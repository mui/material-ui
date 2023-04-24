import * as React from 'react';
import clsx from 'clsx';
import Button, { ButtonProps, ButtonRootSlotProps } from '@mui/base/Button';
import { expectType } from '@mui/types';

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

  return (
    <div>
      {/* @ts-expect-error */}
      <Button invalidProp={0} />

      <Button component="a" href="#" />

      <Button component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <Button component={CustomComponent} />

      <Button
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Button<'div'>
        component="div"
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
