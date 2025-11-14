import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`keyboard-tabpanel-${index}`}
      aria-labelledby={`keyboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `keyboard-tab-${index}`,
    'aria-controls': `keyboard-tabpanel-${index}`,
  };
}

export default function KeyboardNavigationDemo() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ mb: 2, p: 2, bgcolor: 'background.level1' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          <strong>Keyboard Navigation Tips:</strong>
        </Typography>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>Use <kbd>Tab</kbd> to focus on tabs</li>
          <li>Use <kbd>←</kbd> or <kbd>→</kbd> arrow keys to navigate between tabs</li>
          <li>Use <kbd>Home</kbd> or <kbd>End</kbd> to jump to first/last tab</li>
          <li>Press <kbd>Enter</kbd> or <kbd>Space</kbd> to activate a tab</li>
        </ul>
      </Paper>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="keyboard navigation example"
        role="tablist"
      >
        <Tab
          label="Tab One"
          {...a11yProps(0)}
          aria-selected={value === 0}
        />
        <Tab
          label="Tab Two"
          {...a11yProps(1)}
          aria-selected={value === 1}
        />
        <Tab
          label="Tab Three"
          {...a11yProps(2)}
          aria-selected={value === 2}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Typography variant="body1">
          First tab content. Navigate using arrow keys for full keyboard support.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="body1">
          Second tab content. Screen readers announce tab context via aria-controls and aria-labelledby.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="body1">
          Third tab content. Each tab panel has aria-labelledby pointing to its tab.
        </Typography>
      </TabPanel>
    </Box>
  );
}
