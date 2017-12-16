import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    background: 'inherit',
  },
});

function PinnedSubheaderList(props) {
  const { classes } = props;

  return (
    <List className={classes.root} subheader={<div />}>
      {[0, 1, 2, 3, 4].map(sectionId => (
        <div key={`section-${sectionId}`} className={classes.listSection}>
          <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
          {[0, 1, 2].map(item => (
            <ListItem button key={`item-${sectionId}-${item}`}>
              <ListItemText primary={`Item ${item}`} />
            </ListItem>
          ))}
        </div>
      ))}
    </List>
  );
}

PinnedSubheaderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PinnedSubheaderList);
