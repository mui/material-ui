import * as React from 'react';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function DrawerUsage() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (value) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(value);
  };
  return (
    <JoyUsageDemo
      componentName="Drawer"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'plain',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'anchor',
          knob: 'radio',
          defaultValue: 'left',
          options: ['left', 'top', 'right', 'bottom'],
        },
        {
          propName: 'size',
          knob: 'radio',
          defaultValue: 'md',
          options: ['sm', 'md', 'lg'],
        },
        {
          propName: 'invertedColors',
          knob: 'switch',
        },
        {
          propName: 'children',
          defaultValue: '{/* Drawer content */}',
        },
      ]}
      renderDemo={(props) => (
        <React.Fragment>
          <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
            Open drawer
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)} {...props}>
            <Box
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem key={text}>
                    <ListItemButton>
                      <ListItemDecorator>
                        {index === 0 && <InboxIcon />}
                      </ListItemDecorator>
                      <ListItemContent>{text}</ListItemContent>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem key={text}>
                    <ListItemButton>
                      <ListItemDecorator>
                        {index === 0 && <MailIcon />}
                      </ListItemDecorator>
                      <ListItemContent>{text}</ListItemContent>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </React.Fragment>
      )}
    />
  );
}
