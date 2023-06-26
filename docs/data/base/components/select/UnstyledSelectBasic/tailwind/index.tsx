import * as React from 'react';
import Select from '@mui/base/Select';
import BaseOption, { OptionProps, OptionOwnerState } from '@mui/base/Option';
import { useTheme } from '@mui/system';

const getOptionColorClasses = ({
  selected,
  highlighted,
  disabled,
}: Partial<OptionOwnerState<number>>) => {
  let classes = '';
  if (disabled) {
    classes += 'text-slate-400 dark:text-slate-700';
  } else {
    if (selected) {
      classes +=
        ' bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100';
    } else if (highlighted) {
      classes +=
        ' bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-300';
    }
    classes +=
      ' hover:dark:bg-slate-800 hover:bg-slate-100 hover:dark:text-slate-300 hover:text-slate-900';
  }
  return classes;
};

const Option = React.forwardRef<HTMLLIElement, OptionProps<number>>((props, ref) => {
  return (
    <BaseOption
      ref={ref}
      {...props}
      slotProps={{
        root: ({ selected, highlighted, disabled }) => ({
          className: `list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 ${getOptionColorClasses(
            { selected, highlighted, disabled },
          )}`,
        }),
      }}
    />
  );
});

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledSelectBasic() {
  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Select
        slotProps={{
          root: ({ focusVisible, open }) => ({
            className: `text-sm box-border h-12 w-80 p-3 rounded-xl text-left leading-normal bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 outline-0 ${
              focusVisible ? 'border-purple-400 shadow-outline-purple' : ''
            } ${
              open ? 'after:content-["▴"]' : 'after:content-["▾"]'
            } after:float-right`,
          }),
          listbox: {
            className: `text-sm box-border p-1.5 my-3 w-80 rounded-xl overflow-auto outline-0 bg-white dark:bg-slate-900 border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 shadow-md shadow-slate-200 dark:shadow-slate-900`,
          },
          popper: { className: `${isDarkMode ? 'dark' : ''} z-10` },
        }}
        defaultValue={10}
      >
        <Option value={10}>Ten</Option>
        <Option value={20}>Twenty</Option>
        <Option value={30}>Thirty</Option>
      </Select>
    </div>
  );
}
