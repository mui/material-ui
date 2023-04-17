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
  return <ButtonUnstyled {...props} slots={{ root: CustomButtonRoot }} />;
}

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <ButtonUnstyled invalidProp={0} />

      <ButtonUnstyled slots={{ root: 'a' }} href="#" />

      <ButtonUnstyled<typeof CustomComponent>
        slots={{ root: CustomComponent }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <ButtonUnstyled<typeof CustomComponent> slots={{ root: CustomComponent }} />

      <ButtonUnstyled
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <ButtonUnstyled<'div'>
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
