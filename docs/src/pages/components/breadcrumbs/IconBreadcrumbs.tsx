import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      marginRight: theme.spacing(0.5),
    },
  }),
);

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function IconBreadcrumbs() {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
        <HomeIcon fontSize="inherit" className={classes.icon} />
        Material-UI
      </Link>
      <Link
        color="inherit"
        href="/getting-started/installation/"
        onClick={handleClick}
        className={classes.link}
      >
        <WhatshotIcon fontSize="inherit" className={classes.icon} />
        Core
      </Link>
      <Typography color="textPrimary" className={classes.link}>
        <GrainIcon fontSize="inherit" className={classes.icon} />
        Breadcrumb
      </Typography>
    </Breadcrumbs>
  );
}
