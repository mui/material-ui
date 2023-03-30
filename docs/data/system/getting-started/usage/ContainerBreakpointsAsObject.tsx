import * as React from 'react';
import {
  Avatar,
  Box, IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ListWithContainerBreakpoints = () => <List>
  {[{ name: 'Peter Pan', value: '$100,000' },
    { name: 'Frida Kahlo', value: '$200,000' }].map((entry, index) => (
    <ListItem key={index}>
      <ListItemAvatar><Avatar/></ListItemAvatar>
      <Box sx={{
        display: 'flex',
        width: '100%',
        flexDirection: {
          cqxs: 'column',
          cqsm: 'row'
        }
      }}>
        <ListItemText>
          {entry.name}
        </ListItemText>
        <ListItemText sx={{ display: 'flex', justifyContent: { cqsm: 'flex-end' } }}>
          {entry.value}
        </ListItemText>
      </Box>
      <IconButton><ChevronRightIcon/></IconButton>
    </ListItem>
  ))}
</List>;

export default function ContainerBreakpointsAsObject() {
  return (
    <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column', width: '100%' }}>
      <Paper sx={{
        width: '50%',
        containerType: 'inline-size',
      }}>
        <ListWithContainerBreakpoints/>
      </Paper>
      <Paper sx={{
        width: '100%',
        containerType: 'inline-size',
      }}>
        <ListWithContainerBreakpoints/>
      </Paper>
    </Box>
  );
}
