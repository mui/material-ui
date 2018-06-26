import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/lab/Backdrop/Backdrop';
import Back from '@material-ui/lab/Backdrop/BackLayer';
import BackSection from '@material-ui/lab/Backdrop/BackLayerSection';
import Front from '@material-ui/lab/Backdrop/FrontLayer';
import Subheader from '@material-ui/lab/Backdrop/FrontLayerSubheader';
import FrontContent from '@material-ui/lab/Backdrop/FrontLayerContent';
import FadeSwitch from '@material-ui/lab/Backdrop/FadeSwitch';
import MenuItem from '@material-ui/lab/Backdrop/BackdropMenuItem';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FilterIcon from '@material-ui/icons/FilterList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Chip from '@material-ui/core/Chip';
import SimpleMediaCard from '../../demos/cards/SimpleMediaCard';

let tags = [
  'chameleon',
  'green anole',
  'wing',
  'gecko',
  'water dragon',
  'bearded dragon',
  'uromastyx',
  'skink',
  'horned',
  'rainbow',
  'leopard gecko',
  'basilisk',
  'tegu',
  'brown anole',
  'geico',
  'frilled',
  'camouflage',
  'lego',
  'rainforest',
  'tropical rainforest',
  'blue',
  'red',
  'black',
  'purple',
  'yellow',
  'small',
  'godzilla',
  'giant',
  'monster',
  'dwarf',
  'cool',
];

const styles = theme => {
  let transition = theme.transitions.create('backgroundColor', {
    duration: theme.transitions.duration.shortest,
  });
  return {
    root: {
      width: 360,
      height: 616,
      position: 'relative',
    },
    flex: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 48,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    chip: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.primary[300],
      color: theme.palette.primary.contrastText,
    },
  };
};

class MultiSectionBackdrop extends React.Component {
  state = {
    expanded: false,
  };
  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    const Title = ({ className, ...props }) => (
      <Typography
        variant="title"
        color="inherit"
        className={classNames(classes.flex, className)}
        {...props}
      />
    );

    return (
      <div className={classes.root}>
        <Backdrop>
          <Back>
            <BackSection expanded>
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={() => this.setState({ expanded: expanded ? false : 'nav' })}
                >
                  <MenuIcon />
                </IconButton>
                <FadeSwitch
                  selected={this.state.expanded}
                  options={{
                    false: <Title>Luxurious Lizards</Title>,
                    nav: (
                      <Title>
                        Nature's Nobility
                        <IconButton
                          color="inherit"
                          aria-label="Filters"
                          className={classes.filter}
                          onClick={() => this.setState({ expanded: 'filters' })}
                        >
                          <FilterIcon />
                        </IconButton>
                      </Title>
                    ),
                    filters: <Title> Filter by tags </Title>,
                  }}
                />
              </Toolbar>
            </BackSection>
            <BackSection expanded={this.state.expanded === 'nav'}>
              <List>
                <MenuItem selected={true}>Luxurious Lizards</MenuItem>
                <MenuItem>Glorious Geese</MenuItem>
                <MenuItem>Ecstatic Eggs</MenuItem>
              </List>
            </BackSection>
            <BackSection expanded={this.state.expanded === 'filters'}>
              {tags.map(label => <Chip key={label} label={label} className={classes.chip} />)}
            </BackSection>
          </Back>
          <Front disabled={Boolean(this.state.expanded)}>
            <Subheader divider>
              <Typography variant="subheading">Incredible Iguanas</Typography>
            </Subheader>
            <FrontContent>
              <List>
                <ListItem>
                  <SimpleMediaCard />
                </ListItem>
                <ListItem>
                  <SimpleMediaCard />
                </ListItem>
                <ListItem>
                  <SimpleMediaCard />
                </ListItem>
                <ListItem>
                  <SimpleMediaCard />
                </ListItem>
                <ListItem>
                  <SimpleMediaCard />
                </ListItem>
              </List>
            </FrontContent>
          </Front>
        </Backdrop>
      </div>
    );
  }
}

MultiSectionBackdrop.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultiSectionBackdrop);
