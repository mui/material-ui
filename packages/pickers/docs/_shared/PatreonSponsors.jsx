import React from 'react';
import patrons from '../patrons.json';
import { makeStyles, Avatar, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles({
  aboutMeDescription: {
    maxWidth: 250,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  spinner: {
    margin: '0 auto',
  },
  patronList: {
    maxWidth: 500,
    margin: '0 auto',
  },
  link: {
    textDecoration: 'none',
    color: 'unset',
  },
  avatar: {
    marginRight: 8,
  },
});

export default function PatreonSponsors() {
  const classes = useStyles();
  if (patrons.length === 0) {
    return <React.Fragment>There is no sponsors yet 😢</React.Fragment>;
  }

  function getPatronSecondaryText(patron) {
    if (patron.twitter) {
      return <a href={`https://twitter.com/${patron.twitter}`}>@{patron.twitter}</a>;
    }
    if (patron.about) {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: patron.about,
          }}
        />
      );
    }

    return patron.email;
  }

  return (
    <List className={classes.patronList}>
      {patrons.map((patron, key) => (
        <a className={classes.link} key={key} href={patron.url} rel="noopenner noreferrer">
          <ListItem button>
            <Avatar className={classes.avatar} alt={patron.full_name} src={patron.image_url} />
            <ListItemText
              classes={{
                secondary: classes.aboutMeDescription,
              }}
              primary={patron.full_name}
              secondary={getPatronSecondaryText(patron)}
            />
          </ListItem>
        </a>
      ))}
    </List>
  );
}
