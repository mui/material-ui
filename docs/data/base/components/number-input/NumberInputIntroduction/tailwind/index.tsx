import * as React from 'react';
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
  NumberInputOwnerState,
} from '@mui/base/Unstable_NumberInput';
import clsx from 'clsx';

export default function NumberInputIntroduction() {
  const [value, setValue] = React.useState<number | null>(null);
  return (
    <NumberInput
      aria-label="Demo number input"
      placeholder="Type a number…"
      value={value}
      onChange={(event, val) => setValue(val)}
    />
  );
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const NumberInput = React.forwardRef(function NumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <BaseNumberInput
      {...props}
      ref={ref}
      slotProps={{
        root: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'grid grid-cols-[1fr_8px] grid-rows-2 overflow-hidden font-sans rounded-lg text-slate-900 dark:text-slate-300 border border-solid  bg-white dark:bg-slate-900  hover:border-violet-400 dark:hover:border-violet-400 focus-visible:outline-0 p-1',
              ownerState.focused
                ? 'border-violet-400 dark:border-violet-400 shadow-lg shadow-outline-purple dark:shadow-outline-purple'
                : 'border-slate-300 dark:border-slate-600 shadow-md shadow-slate-100 dark:shadow-slate-900',
              resolvedSlotProps?.className,
            ),
          };
        },
        input: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.input,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'col-start-1 col-end-2 row-start-1 row-end-3 text-sm font-sans leading-normal text-slate-900 bg-inherit border-0 rounded-[inherit] dark:text-slate-300 px-3 py-2 outline-0 focus-visible:outline-0 focus-visible:outline-none',
              resolvedSlotProps?.className,
            ),
          };
        },
        incrementButton: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.incrementButton,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            children: '▴',
            className: clsx(
              'font-[system-ui] flex flex-row flex-nowrap justify-center items-center p-0 w-[19px] h-[19px] border border-solid outline-none text-sm box-border leading-[1.2] rounded-t-md border-slate-200 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-300 transition-all duration-[120ms] hover:cursor-pointer hover:bg-purple-500 hover:text-slate-50 dark:hover:bg-slate-800 dark:border-slate-600 col-start-3 col-end-3 row-start-1 row-end-2',
              resolvedSlotProps?.className,
            ),
          };
        },
        decrementButton: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.decrementButton,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            children: '▾',
            className: clsx(
              'font-[system-ui] flex flex-row flex-nowrap justify-center items-center p-0 w-[19px] h-[19px] border border-solid outline-none text-sm box-border leading-[1.2] rounded-b-md border-slate-200 border-t-0 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-300 transition-all duration-[120ms] hover:cursor-pointer hover:bg-purple-500 hover:text-slate-50 dark:hover:bg-slate-800 dark:border-slate-600 col-start-3 col-end-3 row-start-2 row-end-3',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});
