import * as React from 'react';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';

export default function UnstyledTabsCustomized() {
  return (
    <Tabs defaultValue={1}>
      <TabsList className="mb-4 rounded-xl bg-purple-500 flex font-sans items-center justify-center content-between min-w-tabs-list shadow-lg">
        <Tab
          slotProps={{
            root: ({ selected, disabled }) => ({
              className: `font-sans ${
                selected
                  ? 'text-purple-500 bg-white'
                  : 'text-white bg-transparent focus:text-white hover:bg-purple-400'
              } ${
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
            }),
          }}
          value={1}
        >
          One
        </Tab>
        <Tab
          slotProps={{
            root: ({ selected, disabled }) => ({
              className: `font-sans ${
                selected
                  ? 'text-purple-500 bg-white'
                  : 'text-white bg-transparent focus:text-white hover:bg-purple-400'
              } ${
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
            }),
          }}
          value={2}
        >
          Two
        </Tab>
        <Tab
          slotProps={{
            root: ({ selected, disabled }) => ({
              className: `font-sans ${
                selected
                  ? 'text-purple-500 bg-white'
                  : 'text-white bg-transparent focus:text-white hover:bg-purple-400'
              } ${
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
            }),
          }}
          value={3}
        >
          Three
        </Tab>
      </TabsList>
      <TabPanel className="w-full font-sans text-sm" value={1}>
        First page
      </TabPanel>
      <TabPanel className="w-full font-sans text-sm" value={2}>
        Second page
      </TabPanel>
      <TabPanel className="w-full font-sans text-sm" value={3}>
        Third page
      </TabPanel>
    </Tabs>
  );
}
