import * as React from 'react';
import useAutocomplete from '@mui/base/useAutocomplete';
import clsx from 'clsx';

const options = ['Firefox', 'Google Chrome', 'Microsoft Edge', 'Safari', 'Opera'];

export default function ControlledStates() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    id: 'controlled-state-demo',
    options,
    value,
    onChange: (event, newValue) => setValue(newValue),
    inputValue,
    onInputChange: (event, newInputValue) => setInputValue(newInputValue),
  });

  return (
    <div className="flex flex-col flex-nowrap">
      <pre className="my-2 mx-0">
        value:{' '}
        <code className="py-0.5 px-1 rounded-[3px] text-black dark:text-white bg-[#ebebef] dark:bg-[#25252d]">
          {value ?? ' '}
        </code>
      </pre>
      <pre className="my-2 mx-0">
        inputValue:{' '}
        <code className="py-0.5 px-1 rounded-[3px] text-black dark:text-white bg-[#ebebef] dark:bg-[#25252d]">
          {inputValue ?? ' '}
        </code>
      </pre>
      <div className="relative my-6 mx-0 w-80">
        <div
          {...getRootProps()}
          className={clsx(
            'flex gap-[5px] pr-[5px] overflow-hidden w-full rounded-lg bg-white dark:bg-slate-800 border border-solid border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-400 focus-visible:outline-0',
            !focused &&
              'shadow-[0_2px_2px_transparent] shadow-slate-50 dark:shadow-slate-900',
            focused &&
              'border-purple-400 dark:border-purple-400 shadow-outline-purple',
          )}
        >
          <input
            {...getInputProps()}
            className="text-sm leading-[1.5] text-slate-900 dark:text-slate-300 bg-inherit border-0 rounded-[inherit] px-3 py-2 outline-0 grow shrink-0 basis-auto"
          />
        </div>
        {groupedOptions.length > 0 && (
          <ul
            {...getListboxProps()}
            className="text-sm box-border p-1.5 my-3 mx-0 w-full rounded-xl overflow-auto outline-0 max-h-[300px] z-[1] absolute inset-x-0 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 shadow shadow-slate-200 dark:shadow-slate-900"
          >
            {groupedOptions.map((option, index) => (
              <li
                {...getOptionProps({ option, index })}
                className="list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 hover:cursor-pointer aria-selected:bg-purple-100 dark:aria-selected:bg-purple-900 aria-selected:text-purple-900 dark:aria-selected:text-purple-100 ui-focused:bg-slate-100 dark:ui-focused:bg-slate-700 ui-focus-visible:bg-slate-100 dark:ui-focus-visible:bg-slate-800 ui-focused:text-slate-900 dark:ui-focused:text-slate-300 ui-focus-visible:text-slate-900 dark:ui-focus-visible:text-slate-300 ui-focus-visible:shadow-[0_0_0_3px_transparent] ui-focus-visible:shadow-purple-200 dark:ui-focus-visible:shadow-purple-500 ui-focused:aria-selected:bg-purple-100 dark:ui-focused:aria-selected:bg-purple-900 ui-focus-visible:aria-selected:bg-purple-100 dark:ui-focus-visible:aria-selected:bg-purple-900 ui-focused:aria-selected:text-purple-900 dark:ui-focused:aria-selected:text-purple-100 ui-focus-visible:aria-selected:text-purple-900 dark:ui-focus-visible:aria-selected:text-purple-100"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
