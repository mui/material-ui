import * as React from 'react';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

function Shortcut({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {children}
    </Typography>
  );
}

export default function ComposedMenu2() {
  const [bold, setBold] = React.useState(true);
  const [italic, setItalic] = React.useState(false);
  const [alignment, setAlignment] = React.useState('left');

  return (
    <Menu2
      trigger={<Button>Format</Button>}
      slotProps={{ paper: { sx: { width: 260 } } }}
    >
      <Menu2CheckboxItem
        checked={bold}
        onChange={(event, checked) => setBold(checked)}
      >
        <ListItemText>Bold</ListItemText>
        <Shortcut>⌘B</Shortcut>
      </Menu2CheckboxItem>
      <Menu2CheckboxItem
        checked={italic}
        onChange={(event, checked) => setItalic(checked)}
      >
        <ListItemText>Italic</ListItemText>
        <Shortcut>⌘I</Shortcut>
      </Menu2CheckboxItem>
      <Menu2Separator />
      <Menu2Submenu
        trigger={
          <Menu2SubmenuTrigger>
            <ListItemIcon>
              <FormatAlignLeftIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Align</ListItemText>
          </Menu2SubmenuTrigger>
        }
      >
        <Menu2RadioGroup
          value={alignment}
          onChange={(event, value) => setAlignment(value)}
        >
          <Menu2RadioItem value="left">Left</Menu2RadioItem>
          <Menu2RadioItem value="center">Center</Menu2RadioItem>
          <Menu2RadioItem value="right">Right</Menu2RadioItem>
          <Menu2RadioItem value="justify">Justify</Menu2RadioItem>
        </Menu2RadioGroup>
      </Menu2Submenu>
      <Menu2Separator />
      <Menu2Item>
        <ListItemIcon>
          <FormatClearIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Clear formatting</ListItemText>
        <Shortcut>⌘\</Shortcut>
      </Menu2Item>
      <Menu2Item disabled>
        <ListItemIcon>
          <FormatPaintIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Paste format</ListItemText>
      </Menu2Item>
    </Menu2>
  );
}
