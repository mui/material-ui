import * as React from 'react';
import clsx from 'clsx';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList, TabsListProps } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel, TabPanelProps } from '@mui/base/TabPanel';
import { Tab as BaseTab, TabProps } from '@mui/base/Tab';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledTabsIntroduction() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab value={0}>My account</Tab>
          <Tab value={1}>Profile</Tab>
          <Tab value={2}>Language</Tab>
        </TabsList>
        <TabPanel value={0}>My account page</TabPanel>
        <TabPanel value={1}>Profile page</TabPanel>
        <TabPanel value={2}>Language page</TabPanel>
      </Tabs>
    </div>
  );
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseTabsList
      ref={ref}
      className={clsx(
        'min-w-tabs-list mb-4 flex content-between items-center justify-center rounded-xl bg-purple-500 font-sans shadow-lg',
        className,
      )}
      {...other}
    />
  );
});

const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  return (
    <BaseTab
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `font-sans ${
                ownerState.selected
                  ? 'text-purple-500 bg-white'
                  : 'text-white bg-transparent focus:text-white hover:bg-purple-400'
              } ${
                ownerState.disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              } text-sm leading-[1.3] font-semibold w-full py-2.5 px-3 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseTabPanel
      ref={ref}
      className={clsx(
        'w-full rounded-xl border border-solid border-slate-200 bg-white px-3 py-5 font-sans text-sm opacity-60 dark:border-slate-700 dark:bg-slate-900',
        className,
      )}
      {...other}
    />
  );
});
