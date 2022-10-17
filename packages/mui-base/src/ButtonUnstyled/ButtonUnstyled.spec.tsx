import * as React from 'react';
import clsx from 'clsx';
import ButtonUnstyled, {
  ButtonUnstyledProps,
  ButtonUnstyledRootSlotProps,
} from '@mui/base/ButtonUnstyled';
import { expectType } from '@mui/types';

const CustomButtonRoot = React.forwardRef(function CustomButtonRoot(
  props: ButtonUnstyledRootSlotProps,
) {
  const { ownerState, ...other } = props;
  const classes = clsx(
    other.className,
    ownerState.active && 'active',
    ownerState.focusVisible && 'focusVisible',
  );

  return <button type="button" {...other} className={classes} />;
});

function ButtonWithCustomRoot(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} components={{ Root: CustomButtonRoot }} />;
}

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <ButtonUnstyled invalidProp={0} />

      <ButtonUnstyled component="a" href="#" />

      <ButtonUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <ButtonUnstyled component={CustomComponent} />

      <ButtonUnstyled
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <ButtonUnstyled<'div'>
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
