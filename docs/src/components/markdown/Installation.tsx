import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

const STORAGE_KEY = 'package-manager';

export default function Installation({
  dep,
  managers = ['yarn', 'npm'],
}: {
  dep: string;
  managers?: Array<string>;
}) {
  const [value, setValue] = React.useState(managers[0]);

  React.useEffect(() => {
    try {
      setValue((prev) => localStorage.getItem(STORAGE_KEY) || prev);
    } catch (error) {
      // ignore error
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    try {
      localStorage.setItem(STORAGE_KEY, newValue);
    } catch (error) {
      // ignore error
    }
  };
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {managers.map((item) => (
            <Tab key={item} label={item} value={item} />
          ))}
        </TabList>
      </Box>
      {managers.map((item) => (
        <TabPanel key={item} value={item} sx={{ p: 0 }}>
          <HighlightedCode
            language="bash"
            code={`${{ yarn: 'yarn add', npm: 'npm install', pnpm: 'pnpm add' }[item]} ${dep}`}
          />
        </TabPanel>
      ))}
    </TabContext>
  );
}
