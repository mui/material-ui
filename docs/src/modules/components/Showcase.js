import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tooltip from '@material-ui/core/Tooltip';
import TuneIcon from '@material-ui/icons/Tune';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import ShowcaseOption from './ShowcaseOption';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 950,
    height: 350,
  },
  header: {
    width: '100%',
    paddingRight: 4,
  },
  tabs: {
    paddingLeft: 16,
    paddingRight: 4,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  containerWrapper: {
    height: '100%',
    '& .MuiCheckbox-root, & .MuiRadio-root': {
      padding: 4,
    },
  },
  drawer: {
    height: 350,
    width: 0,
    transition: theme.transitions.create('width'),
  },
  drawerOpen: {
    width: 200,
  },
  drawerPaper: {
    position: 'static',
    overflow: 'hidden',
  },
  drawerHeader: {
    height: 49,
    padding: '4px 4px 4px 16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  drawerTitle: {
    flex: 1,
  },
  drawerContent: {
    width: 200,
    padding: 16,
    '& .MuiTypography-root': {
      fontSize: 14,
    },
    '& .MuiFormLabel-root': {
      paddingBottom: 10,
      fontSize: 14,
    },
  },
  tabWrapper: {
    flexDirection: 'row',
  },
}));

function Showcase(props) {
  const {
    children,
    onOptionChange,
    onVariantChange,
    options = [],
    selectedOptions = [],
    selectedVariant,
    variants = [],
  } = props;
  const classes = useStyles();

  const [drawerOpen, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleOptionChange = (value, oldValue) => {
    onOptionChange(opt => {
      let shallow = [...opt];

      if (oldValue) {
        shallow = shallow.filter(o => o !== oldValue);
      }

      if (shallow.indexOf(value) === -1) {
        return [...shallow, value];
      }
      return shallow.filter(o => o !== value);
    });
  };

  const showOptions = useMediaQuery(theme => theme.breakpoints.up('md'));

  return (
    <Paper className={classes.root}>
      <Grid container className={classes.containerWrapper} wrap="nowrap">
        <Grid item container direction="column" className={classes.container} wrap="nowrap">
          <Grid item container className={classes.header} wrap="nowrap">
            <Tabs
              value={selectedVariant}
              onChange={(e, value) => onVariantChange(value)}
              className={classes.tabs}
            >
              {variants.map(variant => {
                const deprecatedIcon = (
                  <React.Fragment>
                    &nbsp;&nbsp;
                    <Tooltip title="This variant is no longer documented in the Material Design Guidelines">
                      <WarningIcon size="small" />
                    </Tooltip>
                  </React.Fragment>
                );
                const label = (
                  <React.Fragment>
                    <Typography>{variant.name}</Typography>
                    {variant.deprecated && deprecatedIcon}
                  </React.Fragment>
                );
                return (
                  <Tab
                    classes={{ wrapper: classes.tabWrapper }}
                    key={variant.name}
                    label={label}
                    value={variant.name}
                  />
                );
              })}
            </Tabs>
            {showOptions && !drawerOpen && (
              <IconButton onClick={handleDrawer}>
                <TuneIcon />
              </IconButton>
            )}
          </Grid>
          <Divider />
          <Grid
            item
            container
            className={classes.content}
            justify="center"
            alignItems="center"
            wrap="nowrap"
          >
            {children}
          </Grid>
        </Grid>
        <Grid item>
          {showOptions && (
            <Drawer
              anchor="right"
              variant="permanent"
              open={drawerOpen}
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: drawerOpen,
              })}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
                <Typography className={classes.drawerTitle}>Configuration</Typography>
                <IconButton onClick={handleDrawer}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div className={classes.drawerContent}>
                {options.map(option => (
                  <ShowcaseOption
                    key={option.title}
                    title={option.title}
                    options={option.options}
                    handleOptionChange={handleOptionChange}
                    selectedOptions={selectedOptions}
                    exclusive={option.exclusive}
                    defaultValue={option.defaultValue}
                  />
                ))}
              </div>
            </Drawer>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

Showcase.propTypes = {
  children: PropTypes.node,
  onOptionChange: PropTypes.func,
  onVariantChange: PropTypes.func,
  options: PropTypes.array,
  selectedOptions: PropTypes.array,
  selectedVariant: PropTypes.string,
  variants: PropTypes.array,
};

export default Showcase;
