import * as React from 'react';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import clsx from 'clsx';

const CustomNumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <NumberInput
      slotProps={{
        root: (ownerState) => ({
          className: clsx(
            'grid grid-cols-[1fr_19px] grid-rows-2 overflow-hidden font-sans rounded-lg text-slate-900 dark:text-slate-300 border border-solid  bg-white dark:bg-slate-900  hover:border-violet-400 dark:hover:border-violet-400 focus-visible:outline-0 ',
            ownerState.focused
              ? 'border-violet-400 dark:border-violet-400 shadow-lg shadow-outline-purple dark:shadow-outline-purple'
              : 'border-slate-300 dark:border-slate-600 shadow-md shadow-slate-100 dark:shadow-slate-900',
          ),
        }),
        input: {
          className:
            'col-start-1 col-end-2 row-start-1 row-end-3 text-sm font-sans leading-normal text-slate-900 bg-inherit border-0 rounded-[inherit] dark:text-slate-300 px-3 py-2 outline-0 focus-visible:outline-0 focus-visible:outline-none',
        },
        incrementButton: {
          children: '▴',
          className:
            'font-[system-ui] flex flex-row flex-nowrap justify-center items-center appearance-none p-0 w-[19px] h-[19px] text-sm box-border leading-[1.2] border-0 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 transition-all duration-[120ms] hover:cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-600 col-start-2 col-end-3 row-start-1 row-end-2',
        },
        decrementButton: {
          children: '▾',
          className:
            'font-[system-ui] flex flex-row flex-nowrap justify-center items-center appearance-none p-0 w-[19px] h-[19px] text-sm box-border leading-[1.2] border-0 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 transition-all duration-[120ms] hover:cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-600 col-start-2 col-end-3 row-start-2 row-end-3',
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function NumberInputBasic() {
  const [value, setValue] = React.useState();
  return (
    <CustomNumberInput
      aria-label="Demo number input"
      placeholder="Type a number…"
      value={value}
      onChange={(event, val) => setValue(val)}
    />
  );
}
