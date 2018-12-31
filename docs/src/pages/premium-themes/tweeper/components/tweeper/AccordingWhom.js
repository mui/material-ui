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
    image: 'http://i.pravatar.cc/300?img=7',
    primary: 'Never stop thinking',
    secondary: '@never_stop',
  },
  {
    image: 'http://i.pravatar.cc/300?img=9',
    primary: 'React Geek',
    secondary: '@react',
  },
  {
    image: 'http://i.pravatar.cc/300?img=10',
    primary: 'Thailand',
    secondary: '@wonderful_th',
  },
];

const TrackWho = () => {
  return (
    <List subheader={<ListSubheader>According to whom</ListSubheader>}>
      {twitterList.map(({ image, primary, secondary }) => (
        <React.Fragment key={primary}>
          <ListItem key={primary} button>
            <Avatar link src={image} />
            <ListItemText primary={primary} secondary={secondary} />
            <Button variant={'outlined'} color={'primary'}>
              Follow
            </Button>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      <ListItem button>
        <ListItemText disableTypography>
          <Typography link>Show More</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default TrackWho;
