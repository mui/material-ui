import * as React from 'react';
import Box from '@mui/joy/Box';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Search from '@mui/icons-material/Search';
import Person from '@mui/icons-material/Person';

export default function TabsBottomNavExample() {
  const [index, setIndex] = React.useState(0);
  const colors = ['primary', 'info', 'danger', 'success'];
  return (
    <Box
      sx={{
        flexGrow: 1,
        m: -3,
        p: 3,
        py: 5,
        borderRadius: 'sm',
        bgcolor: `${colors[index]}.600`,
      }}
    >
      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        value={index}
        onChange={(event, value) => setIndex(value)}
        sx={(theme) => ({
          borderRadius: 'xl',
          maxWidth: 400,
          mx: 'auto',
          boxShadow: theme.shadow.sm,
          '--joy-shadowChannel': theme.vars.palette[colors[index]].darkChannel,
          '--Tab-selectedLineColor': 'transparent',
          [`& .${tabClasses.root}`]: {
            whiteSpace: 'nowrap',
            transition: 'background 0.3s',
            fontWeight: 'lg',
            flex: 1,
            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.72,
            },
          },
        })}
      >
        <TabList
          variant="plain"
          sx={{
            '--ListItemDecorator-size': '28px',
            '--List-padding': '8px',
            '--List-radius': '20px',
            '--List-gap': '8px',
          }}
        >
          <Tab
            orientation="vertical"
            {...(index === 0 && { variant: 'soft', color: colors[0] })}
          >
            <ListItemDecorator>
              <HomeOutlined />
            </ListItemDecorator>
            Home
          </Tab>
          <Tab
            orientation="vertical"
            {...(index === 1 && { variant: 'soft', color: colors[1] })}
          >
            <ListItemDecorator>
              <FavoriteBorder />
            </ListItemDecorator>
            Likes
          </Tab>
          <Tab
            orientation="vertical"
            {...(index === 2 && { variant: 'soft', color: colors[2] })}
          >
            <ListItemDecorator>
              <Search />
            </ListItemDecorator>
            Search
          </Tab>
          <Tab
            orientation="vertical"
            {...(index === 3 && { variant: 'soft', color: colors[3] })}
          >
            <ListItemDecorator>
              <Person />
            </ListItemDecorator>
            Profile
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
