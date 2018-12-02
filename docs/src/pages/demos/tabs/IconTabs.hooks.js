import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const styles = {
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
};

function IconTabs(props) {
  const { classes } = props;
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        fullWidth
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<PhoneIcon />} />
        <Tab icon={<FavoriteIcon />} />
        <Tab icon={<PersonPinIcon />} />
      </Tabs>
    </Paper>
  );
}

IconTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconTabs);
