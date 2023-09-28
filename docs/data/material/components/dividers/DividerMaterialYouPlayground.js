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

export default function DividerMaterialYouPlayground() {
  const [showLabel, setShowLabel] = React.useState(false);
  const [orientation, setOrientation] = React.useState('horizontal');

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
          onChange: (e) => setOrientation(e.target.value),
        },
        {
          propName: 'showLabel',
          knob: 'switch',
          defaultValue: false,
          onChange: () => {
            setShowLabel((prev) => !prev);
          },
        },
        ...(showLabel && orientation === 'horizontal'
          ? [
              {
                propName: 'textAlign',
                knob: 'select',
                options: ['center', 'left', 'right'],
                defaultValue: 'center',
              },
            ]
          : []),
      ]}
      renderDemo={(props) => {
        const label = props.showLabel && 'label';

        const content = (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id
            dignissim justo. Nulla ut facilisis ligula.
          </div>
        );

        return props.orientation === 'horizontal' ? (
          <List sx={{ width: 300 }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
            <Divider {...props}>{label}</Divider>
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
            <Divider {...props} sx={{ mx: 4 }} flexItem>
              {label}
            </Divider>
            <Grid item xs>
              {content}
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
