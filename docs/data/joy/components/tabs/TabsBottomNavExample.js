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
  const colors = ['primary', 'danger', 'success', 'warning'];
  return (
    <Box
      sx={{
        flexGrow: 1,
        m: -3,
        p: 3,
        py: 5,
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        bgcolor: `${colors[index]}.500`,
      }}
    >
      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        value={index}
        onChange={(event, value) => setIndex(value)}
        sx={(theme) => ({
          p: 1,
          borderRadius: '24px',
          maxWidth: 400,
          mx: 'auto',
          boxShadow: theme.shadow.sm,
          '--joy-shadowChannel': theme.vars.palette[colors[index]].darkChannel,
          [`& .${tabClasses.root}`]: {
            whiteSpace: 'nowrap',
            transition: '0.3s',
            fontWeight: 'md',
            flex: 1,
            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.72,
            },
          },
        })}
      >
        <TabList variant="plain" disableUnderline sx={{ borderRadius: 'xl', p: 0 }}>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 0 && { color: colors[0] })}
          >
            <ListItemDecorator>
              <HomeOutlined />
            </ListItemDecorator>
            Home
          </Tab>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 1 && { color: colors[1] })}
          >
            <ListItemDecorator>
              <FavoriteBorder />
            </ListItemDecorator>
            Likes
          </Tab>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 2 && { color: colors[2] })}
          >
            <ListItemDecorator>
              <Search />
            </ListItemDecorator>
            Search
          </Tab>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 3 && { color: colors[3] })}
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
