import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Cloud from '@mui/icons-material/Cloud';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';

function Shortcut({ children }) {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {children}
    </Typography>
  );
}

Shortcut.propTypes = {
  children: PropTypes.node,
};

export default function IconMenu2() {
  return (
    <Menu2
      trigger={<Button>Edit</Button>}
      slotProps={{ paper: { sx: { width: 320 } } }}
    >
      <Menu2Item>
        <ListItemIcon>
          <ContentCut fontSize="small" />
        </ListItemIcon>
        <ListItemText>Cut</ListItemText>
        <Shortcut>⌘X</Shortcut>
      </Menu2Item>
      <Menu2Item>
        <ListItemIcon>
          <ContentCopy fontSize="small" />
        </ListItemIcon>
        <ListItemText>Copy</ListItemText>
        <Shortcut>⌘C</Shortcut>
      </Menu2Item>
      <Menu2Item>
        <ListItemIcon>
          <ContentPaste fontSize="small" />
        </ListItemIcon>
        <ListItemText>Paste</ListItemText>
        <Shortcut>⌘V</Shortcut>
      </Menu2Item>
      <Menu2Separator />
      <Menu2Item>
        <ListItemIcon>
          <Cloud fontSize="small" />
        </ListItemIcon>
        <ListItemText>Web clipboard</ListItemText>
      </Menu2Item>
    </Menu2>
  );
}
