import * as React from 'react';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CustomNumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <NumberInput
      slotProps={{
        root: {
          className:
            'leading-snug font-sans text-slate-900 dark:text-slate-300 flex flex-row flex-nowrap justify-center items-center',
        },
        input: {
          className:
            'leading-snug font-sans text-sm text-inherit bg-white dark:bg-slate-900 border border-solid border-slate-300 dark:border-slate-600 rounded-md my-0 mx-2 py-2.5 px-3 outline-0 min-w-0 w-16 text-center focus-visible:outline-0 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus-visible:outline-none shadow-sm',
        },
        incrementButton: {
          children: <AddIcon />,
          className:
            'order-1 text-sm font-sans box-border leading-normal border border-solid outline-none border-slate-200 rounded-full bg-slate-50 w-8 h-8 flex flex-row flex-nowrap justify-center items-center transition-all duration-[120ms] focus-visible:outline-0 hover:cursor-pointer hover:bg-purple-500 hover:text-white dark:hover:bg-purple-800',
        },
        decrementButton: {
          children: <RemoveIcon />,
          className:
            'text-sm font-sans box-border leading-normal border border-solid outline-none border-slate-200 rounded-full bg-slate-50 w-8 h-8 flex flex-row flex-nowrap justify-center items-center transition-all duration-[120ms] focus-visible:outline-0 hover:cursor-pointer hover:bg-purple-500 hover:text-white dark:hover:bg-purple-800',
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
