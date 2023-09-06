import * as React from 'react';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import ButtonGroup from '@mui/joy/ButtonGroup';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

function Demo(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton>
              <ListItemDecorator>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemDecorator>
              <ListItemContent>{text}</ListItemContent>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <ButtonGroup variant="outlined">
        {['left', 'right', 'top', 'bottom'].map((anchor) => (
          <Button key={anchor} onClick={toggleDrawer(anchor, true)}>
            {anchor}
          </Button>
        ))}
      </ButtonGroup>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <Drawer
          key={anchor}
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          invertedColors
          {...props}
        >
          {list(anchor)}
        </Drawer>
      ))}
    </React.Fragment>
  );
}

export default function DrawerUsage() {
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
          propName: 'size',
          knob: 'radio',
          defaultValue: 'md',
          options: ['sm', 'md', 'lg'],
        },
        {
          propName: 'invertedColors',
          defaultValue: true,
        },
      ]}
      renderDemo={(props) => <Demo {...props} />}
    />
  );
}
