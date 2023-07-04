import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import SearchRounded from '@mui/icons-material/SearchRounded';

export default function TabsPageExample() {
  const [index, setIndex] = React.useState(0);
  return (
    <Box
      sx={{
        flexGrow: 1,
        m: -3,
        overflowX: 'hidden',
        borderRadius: 'md',
      }}
    >
      <Tabs
        aria-label="Pipeline"
        value={index}
        onChange={(event, value) => setIndex(value)}
      >
        <TabList
          sx={{
            pt: 2,
            justifyContent: 'center',
            [`&& .${tabClasses.root}`]: {
              flex: 'initial',
              bgcolor: 'transparent',
              '&:hover': {
                bgcolor: 'transparent',
              },
              [`&.${tabClasses.selected}`]: {
                color: 'primary.plainColor',
                '&::after': {
                  height: '3px',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  bgcolor: 'primary.500',
                },
              },
            },
          }}
        >
          <Tab indicatorInset>
            Deals{' '}
            <Chip
              size="sm"
              variant="soft"
              color={index === 0 ? 'primary' : 'neutral'}
              sx={{ ml: 1 }}
            >
              14
            </Chip>
          </Tab>
          <Tab indicatorInset>
            Library{' '}
            <Chip
              size="sm"
              variant="soft"
              color={index === 1 ? 'primary' : 'neutral'}
              sx={{ ml: 1 }}
            >
              24
            </Chip>
          </Tab>
          <Tab indicatorInset>Search library</Tab>
        </TabList>
        <Box
          sx={(theme) => ({
            '--bg': theme.vars.palette.background.surface,
            background: 'var(--bg)',
            boxShadow: '0 0 0 100vmax var(--bg)',
            clipPath: 'inset(0 -100vmax)',
          })}
        >
          <TabPanel value={0}>
            <Typography
              level="h2"
              component="div"
              fontSize="lg"
              textColor="text.primary"
            >
              Deals panel
            </Typography>
          </TabPanel>
          <TabPanel value={1}>
            <Typography
              level="h2"
              component="div"
              fontSize="lg"
              textColor="text.primary"
            >
              Library panel
            </Typography>
          </TabPanel>
          <TabPanel value={2}>
            <Input
              autoFocus
              placeholder="Type in third panel..."
              startDecorator={<SearchRounded />}
            />
          </TabPanel>
        </Box>
      </Tabs>
    </Box>
  );
}
