import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsWrappedLabel() {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="New Arrivals in the Longest Text of Nonfiction" wrapped />
          <Tab value="two" label="Item Two" />
          <Tab value="three" label="Item Three" />
        </Tabs>
      </AppBar>
      {value === 'one' && <TabContainer>Item One</TabContainer>}
      {value === 'two' && <TabContainer>Item Two</TabContainer>}
      {value === 'three' && <TabContainer>Item Three</TabContainer>}
    </div>
  );
}
