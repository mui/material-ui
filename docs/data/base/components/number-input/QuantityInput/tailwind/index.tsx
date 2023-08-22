import * as React from 'react';
import {
  Unstable_NumberInput as NumberInput,
  NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CustomNumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <NumberInput
      slotProps={{
        root: {
          className:
            'leading-snug font-sans text-slate-900 dark:text-slate-300 flex flex-row flex-nowrap justify-center items-center',
        },
        input: {
          className:
            'leading-snug font-sans text-sm text-inherit bg-white dark:bg-slate-900 border border-solid border-slate-300 dark:border-slate-600 rounded-[4px] my-0 mx-1 py-2.5 px-3 outline-0 min-w-0 w-16 text-center focus-visible:outline-0 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus-visible:outline-none',
        },
        incrementButton: {
          children: <AddIcon />,
          className:
            'order-1 text-sm font-sans box-border leading-normal border-0 rounded-full bg-transparent w-10 h-10 flex flex-row flex-nowrap justify-center items-center transition-all duration-[120ms] focus-visible:outline-0 hover:cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-800',
        },
        decrementButton: {
          children: <RemoveIcon />,
          className:
            'text-sm font-sans box-border leading-normal border-0 rounded-full bg-transparent w-10 h-10 flex flex-row flex-nowrap justify-center items-center transition-all duration-[120ms] focus-visible:outline-0 hover:cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-800',
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function QuantityInput() {
  return <CustomNumberInput aria-label="Quantity Input" min={1} max={99} />;
}
