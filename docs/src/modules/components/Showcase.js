import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import TuneIcon from "@material-ui/icons/Tune";
import CloseIcon from "@material-ui/icons/Close";
import ShowcaseOption from "./ShowcaseOption";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 950,
    height: 350
  },
  header: {
    width: "100%",
    paddingRight: 4
  },
  tabs: {
    paddingLeft: 16,
    paddingRight: 4,
    flex: 1
  },
  content: {
    flex: 1
  },
  container: {
    flex: 1
  },
  containerWrapper: {
    height: "100%",
    "& .MuiCheckbox-root, & .MuiRadio-root": {
      padding: 4
    }
  },
  drawer: {
    height: 350,
    width: 0,
    transition: theme.transitions.create("width")
  },
  drawerOpen: {
    width: 200,
  },
  drawerPaper: {
    position: "static",
    overflow: "hidden"
  },
  drawerHeader: {
    height: 49,
    padding: "4px 4px 4px 16px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  drawerTitle: {
    flex: 1
  },
  drawerContent: {
    padding: 16,
    "& .MuiTypography-root": {
      fontSize: 14
    },
    "& .MuiFormLabel-root": {
      paddingBottom: 10,
      fontSize: 14
    }
  }
}));

export default function Showcase(props) {
  const {
    variants = [],
    variant,
    onVariantChange,
    children,
    options = [],
    selectedOptions = [],
    onOptionChange
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

  return (
    <Paper className={classes.root}>
      <Grid container className={classes.containerWrapper}>
        <Grid item container direction="column" className={classes.container}>
          <Grid item container className={classes.header}>
            <Tabs
              value={variant}
              onChange={(e, value) => onVariantChange(value)}
              className={classes.tabs}
            >
              {variants.map(variant => (
                <Tab key={variant} label={variant} value={variant} />
              ))}
            </Tabs>
            {!drawerOpen && (
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
          >
            {children}
          </Grid>
        </Grid>
        <Grid item>
          <Drawer
            anchor="right"
            variant="permanent"
            open={drawerOpen}
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: drawerOpen
            })}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <Typography className={classes.drawerTitle}>
                Configuration
              </Typography>
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
        </Grid>
      </Grid>
    </Paper>
  );
}
