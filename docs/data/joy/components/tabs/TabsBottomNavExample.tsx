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

export default function TabsBasic() {
  const [index, setIndex] = React.useState(0);
  const colors = ['primary', 'info', 'danger', 'success'] as const;
  return (
    <Box
      sx={{
        flexGrow: 1,
        m: -3,
        p: 3,
        py: 5,
        borderRadius: 'sm',
        bgcolor: `${colors[index]}.400`,
      }}
    >
      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        value={index}
        onChange={(event, value) => setIndex(value as number)}
        sx={(theme) => ({
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem',
          maxWidth: 400,
          mx: 'auto',
          boxShadow: theme.shadow.md,
          '--Tabs-gap': '8px',
          '--joy-shadowChannel': theme.vars.palette[colors[index]].darkChannel,
          [`& .${tabClasses.root}`]: {
            boxShadow: 'none',
            borderRadius: 'lg',
            whiteSpace: 'nowrap',
            transition: '0.3s',
            fontWeight: 'lg',
            flex: 1,
            flexDirection: 'column',
            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.72,
            },
          },
        })}
      >
        <TabList variant="plain" sx={{ '--List-decorator-width': '24px' }}>
          <Tab {...(index === 0 && { variant: 'soft', color: colors[0] })}>
            <ListItemDecorator sx={{ mb: 0.5 }}>
              <HomeOutlined />
            </ListItemDecorator>
            Home
          </Tab>
          <Tab {...(index === 1 && { variant: 'soft', color: colors[1] })}>
            <ListItemDecorator sx={{ mb: 0.5 }}>
              <FavoriteBorder />
            </ListItemDecorator>
            Likes
          </Tab>
          <Tab {...(index === 2 && { variant: 'soft', color: colors[2] })}>
            <ListItemDecorator sx={{ mb: 0.5 }}>
              <Search />
            </ListItemDecorator>
            Search
          </Tab>
          <Tab {...(index === 3 && { variant: 'soft', color: colors[3] })}>
            <ListItemDecorator sx={{ mb: 0.5 }}>
              <Person />
            </ListItemDecorator>
            Profile
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
