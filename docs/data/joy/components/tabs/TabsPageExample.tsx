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

export default function TabsBasic() {
  const [index, setIndex] = React.useState(0);
  return (
    <Box
      sx={{
        bgcolor: 'background.body',
        flexGrow: 1,
        m: -3,
        p: 3,
        overflowX: 'hidden',
        borderRadius: 'md',
      }}
    >
      <Tabs
        aria-label="Pipeline"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
        sx={{ '--Tabs-gap': '0px', maxWidth: 400, mx: 'auto' }}
      >
        <TabList
          variant="plain"
          sx={{
            alignSelf: 'flex-start',
            [`& .${tabClasses.root}`]: {
              bgcolor: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'transparent',
              },
              [`&.${tabClasses.selected}`]: {
                color: 'primary.plainColor',
                fontWeight: 'lg',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  zIndex: 1,
                  bottom: '-1px',
                  left: 'var(--List-item-paddingLeft)',
                  right: 'var(--List-item-paddingRight)',
                  height: '3px',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  bgcolor: 'primary.500',
                },
              },
            },
          }}
        >
          <Tab>
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
          <Tab>
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
          <Tab>Search library</Tab>
        </TabList>
        <Box
          sx={(theme) => ({
            '--bg': theme.vars.palette.background.level3,
            height: '1px',
            background: 'var(--bg)',
            boxShadow: '0 0 0 100vmax var(--bg)',
            clipPath: 'inset(0 -100vmax)',
          })}
        />
        <Box
          sx={(theme) => ({
            '--bg': theme.vars.palette.background.level1,
            background: 'var(--bg)',
            boxShadow: '0 0 0 100vmax var(--bg)',
            clipPath: 'inset(0 -100vmax)',
            px: 1.5,
            py: 2,
          })}
        >
          <TabPanel value={0}>
            <Typography
              level="h1"
              component="div"
              fontSize="xl2"
              mb={2}
              textColor="text.secondary"
            >
              Deals
            </Typography>
          </TabPanel>
          <TabPanel value={1}>
            <Typography
              level="h1"
              component="div"
              fontSize="xl2"
              mb={2}
              textColor="text.secondary"
            >
              Library
            </Typography>
          </TabPanel>
          <TabPanel value={2}>
            <Input
              placeholder="type a library..."
              startDecorator={<SearchRounded />}
              sx={{ bgcolor: 'background.body', mb: 0.75 }}
            />
          </TabPanel>
        </Box>
      </Tabs>
    </Box>
  );
}
