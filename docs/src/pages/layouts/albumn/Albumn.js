import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  appBarSpacer: {
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  heroUnit: {
    padding: `${theme.spacing.unit * 8}px 0`,
    backgroundColor: theme.palette.background.paper,
  },
  hero: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 32,
  },
  heroButtonBrimary: {
    marginRight: theme.spacing.unit * 2,
  },
  grid: {
    padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 12}px`,
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 8}px`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 6}px`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
    },
  },
  card: {},
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  footer: {
    width: '100%',
    height: 200,
    backgroundColor: theme.palette.background.paper,
    padding: `${theme.spacing.unit * 4}px`,
  },
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Albumn(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="title" color="inherit" noWrap>
            Albumn layout
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.hero}>
            <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
              Albumn layout
            </Typography>
            <Typography variant="title" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Button variant="contained" color="primary" className={classes.heroButtonBrimary}>
                Main call to action
              </Button>
              <Button variant="outlined" color="primary">
                Secondary action
              </Button>
            </div>
          </div>
        </div>
        {/* End hero unit */}

        <Grid container spacing={40} className={classes.grid}>
          {cards.map(card => (
            <Grid item key={card} lg={3} md={4} sm={6} xs={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                  title="Image title"
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>

      {/* Footer */}
      <div className={classes.footer}>
        <Typography variant="title" color="textPrimary" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subheading" color="textSecondary" paragraph>
          Something here to give the footer a purpose!
        </Typography>
      </div>
      {/* End footer */}
    </div>
  );
}

Albumn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Albumn);
