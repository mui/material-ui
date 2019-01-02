import React from 'react';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import atoms from '../atoms';

const { Avatar, Typography } = atoms;

const twitterList = [
  {
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    primary: 'Yeoman',
    secondary: '@whatsup yeo',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    primary: 'GGWP',
    secondary: '@goodgamewellplay',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    primary: 'Sawasdee',
    secondary: '@helloTH',
  },
];

function TrackWho() {
  return (
    <List subheader={<ListSubheader>Who to follow</ListSubheader>}>
      {twitterList.map(({ image, primary, secondary }) => (
        <React.Fragment key={primary}>
          <ListItem button>
            <Avatar link src={image} />
            <ListItemText primary={primary} secondary={secondary} />
            <Button variant="outlined" color="primary">
              Follow
            </Button>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      <ListItem button>
        <ListItemText>
          <Typography link>Show More</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
}

export default TrackWho;
