import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Home from '@mui/icons-material/Home';
import Apps from '@mui/icons-material/Apps';
import MoreVert from '@mui/icons-material/MoreVert';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function ListVariables() {
  return (
    <JoyVariablesDemo
      componentName="List"
      childrenAccepted
      data={[
        { var: '--List-padding', defaultValue: '0px' },
        { var: '--List-radius', defaultValue: '0px' },
        { var: '--List-gap', defaultValue: '0px' },
        { var: '--ListItem-minHeight', defaultValue: '40px' },
        { var: '--ListItem-paddingY', defaultValue: '6px' },
        { var: '--ListItem-paddingX', defaultValue: '12px' },
        { var: '--ListItemDecorator-size', defaultValue: '40px' },
        { var: '--ListDivider-gap', defaultValue: '6px' },
      ]}
      renderDemo={(sx) => (
        <List
          sx={(theme) => ({
            ...sx,
            width: 300,
            ...theme.variants.outlined.neutral,
          })}
        >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Home />
              </ListItemDecorator>
              Home
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Apps />
              </ListItemDecorator>
              Products
            </ListItemButton>
          </ListItem>
          <ListDivider />
          <ListItem nested>
            <ListItem>
              <Typography
                level="body-sm"
                startDecorator={
                  <Sheet
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: 'success.500',
                      borderRadius: '50%',
                    }}
                  />
                }
                sx={{ fontWeight: 'md' }}
              >
                Online people
              </Typography>
            </ListItem>
            <List>
              <ListItem
                endAction={
                  <IconButton variant="plain" color="neutral" size="sm">
                    <MoreVert />
                  </IconButton>
                }
              >
                <ListItemButton>
                  <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                    <Avatar size="sm" src="/static/images/avatar/1.jpg" />
                  </ListItemDecorator>
                  Mabel Boyle
                </ListItemButton>
              </ListItem>
              <ListDivider inset="startContent" />
              <ListItem
                endAction={
                  <IconButton variant="plain" color="neutral" size="sm">
                    <MoreVert />
                  </IconButton>
                }
              >
                <ListItemButton>
                  <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                    <Avatar size="sm" src="/static/images/avatar/2.jpg" />
                  </ListItemDecorator>
                  Boyd Burt
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      )}
    />
  );
}
