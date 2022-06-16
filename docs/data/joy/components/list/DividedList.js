import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function DividedList() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      {[undefined, 'gutter', 'startDecorator', 'startContent'].map((inset) => (
        <Box key={inset || 'default'}>
          <Typography level="body3" mb={2}>
            <code>{inset ? `inset="${inset}"` : '(default)'}</code>
          </Typography>
          <Sheet variant="outlined" sx={{ borderRadius: 'sm' }}>
            <List
              sx={{
                paddingBlock: 1,
                minWidth: 240,
                '--List-decorator-width': '48px',
                '--List-item-paddingLeft': '1.5rem',
                '--List-item-paddingRight': '1rem',
              }}
            >
              <ListItem>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Avatar size="sm" src="/static/images/avatar/1.jpg" />
                </ListItemDecorator>
                Mabel Boyle
              </ListItem>
              <ListDivider inset={inset} />
              <ListItem>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Avatar size="sm" src="/static/images/avatar/2.jpg" />
                </ListItemDecorator>
                Boyd Burt
              </ListItem>
            </List>
          </Sheet>
        </Box>
      ))}
    </Box>
  );
}
