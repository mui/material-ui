import * as React from 'react';
import Divider from '@mui/material-next/Divider';
import MaterialYouUsageDemo from 'docs/src/modules/components/MaterialYouUsageDemo';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';

const listStyle = {
  p: 0,
  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'backgroun.paoer',
};

export default function DividerMaterialYouPlayground() {
  return (
    <MaterialYouUsageDemo
      componentName="Divider"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          options: ['fullWidth', 'inset', 'middle'],
          defaultValue: 'fullWidth',
        },
        {
          propName: 'orientation',
          knob: 'select',
          options: ['horizontal', 'vertical'],
          defaultValue: 'horizontal',
        },
      ]}
      renderDemo={(props) => {
        const content = (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id
            dignissim justo. Nulla ut facilisis ligula.
          </p>
        );

        return props.orientation === 'horizontal' ? (
          <List sx={listStyle}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
            <Divider {...props} />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
          </List>
        ) : (
          <Grid container>
            <Grid item xs>
              {content}
            </Grid>
            <Divider {...props} sx={{ mx: 4 }} flexItem />
            <Grid item xs>
              {content}
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
