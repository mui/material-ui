import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useNumberInput as useNumberInput } from '@mui/base/unstable_useNumberInput';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import clsx from 'clsx';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

const CompactNumberInput = React.forwardRef(function CompactNumberInput(props, ref) {
  const { className, ...rest } = props;
  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput(rest);

  const inputProps = getInputProps();

  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'grid grid-cols-[2rem] grid-rows-[2rem_2rem] gap-y-px font-sans rounded-lg border border-solid overflow-auto text-slate-900 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 border-slate-200 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-500',
        className,
      )}
    >
      <button
        type="button"
        className="rounded-b-[0.35rem] row-start-2 row-end-3 flex flex-nowrap justify-center items-center text-sm box-border border-0 text-inherit bg-slate-50 dark:bg-slate-900 hover:cursor-pointer hover:bg-violet-500 dark:hover:bg-violet-500 hover:text-slate-50 dark:hover:text-slate-50 focus-visible:outline-0 focus-visible:bg-violet-500 focus-visible:dark:bg-violet-500"
        {...getDecrementButtonProps()}
      >
        <ArrowDropDownRoundedIcon />
      </button>
      <button
        type="button"
        className="rounded-t-[0.35rem] row-start-1 row-end-2 flex flex-nowrap justify-center items-center text-sm box-border border-0 text-inherit bg-slate-50 dark:bg-slate-900 hover:cursor-pointer hover:bg-violet-500 dark:hover:bg-violet-500 hover:text-slate-50 dark:hover:text-slate-50 focus-visible:outline-0 focus-visible:bg-violet-500 focus-visible:dark:bg-violet-500"
        {...getIncrementButtonProps()}
      >
        <ArrowDropUpRoundedIcon />
      </button>
      <input className="invisible absolute" {...inputProps} />
    </div>
  );
});

CompactNumberInput.propTypes = {
  className: PropTypes.string,
};

export default function UseNumberInputCompact() {
  const [value, setValue] = React.useState();

  return (
    <div className="flex flex-row flex-nowrap items-center gap-x-4">
      <CompactNumberInput
        aria-label="Compact number input"
        placeholder="Type a number…"
        readOnly
        value={value}
        onChange={(event, val) => setValue(val)}
      />
      <pre>Current value: {value ?? ' '}</pre>
    </div>
  );
}
