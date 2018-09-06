import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 12,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  searchContainer: {
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '& $inputInput': {
      transition: theme.transitions.create('width'),
      width: 120,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      '&:focus': {
        width: 200,
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
  },
});

class SearchAppBar extends Component {
  state = {
    searchInput: '',
  };

  handleChange = event => {
    this.setState({ searchInput: event.target.value });
  };

  render() {
    const { searchInput } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="title" color="inherit" noWrap>
              Material-UI
            </Typography>
            <div className={classes.grow} />
            <section className={classes.searchContainer}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                id="search-input"
                placeholder="Search…"
                value={searchInput}
                onChange={this.handleChange}
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </section>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);
