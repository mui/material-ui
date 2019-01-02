import React from 'react';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import atoms from '../atoms';

const { Typography, Icon } = atoms;

const twitterList2 = [
  {
    primary: '#FromMateToMate',
    secondary: 'Huawei Mate 20 Series',
    tertiary: 'PR by Huawei Mobile TH',
  },
  {
    primary: '#xx_mino_finance',
    secondary: '24.1K Tweet',
  },
  {
    primary: '# MMA 2018',
    secondary: '357K Tweet',
  },
  {
    primary: 'George HW Bush',
    secondary: '328K Tweet',
  },
];

function PopularNow() {
  return (
    <List subheader={<ListSubheader>Popular Now</ListSubheader>}>
      {twitterList2.map(({ primary, secondary, tertiary }) => (
        <React.Fragment key={primary}>
          <ListItem button>
            <ListItemText>
              <Typography primary>{primary}</Typography>
              <Typography secondary light={!tertiary}>
                {secondary}
              </Typography>
              {tertiary && (
                <Typography tertiary light>
                  <Icon>call_made</Icon> {tertiary}
                </Typography>
              )}
            </ListItemText>
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

export default PopularNow;
