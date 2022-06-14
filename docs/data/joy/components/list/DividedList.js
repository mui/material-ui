import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';

export default function DividedList() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {[undefined, 'gutter', 'startDecorator', 'startContent'].map((inset) => (
        <Box key={inset || 'default'}>
          <Typography level="body2" mb={1}>
            {inset ? `inset="${inset}"` : '(default)'}
          </Typography>
          <List
            key={inset || 'none'}
            sx={{
              paddingBlock: 1,
              bgcolor: 'background.body',
              borderRadius: 'sm',
              border: '1px solid',
              borderColor: 'neutral.outlinedBorder',
              overflow: 'auto',
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
        </Box>
      ))}
    </Box>
  );
}
