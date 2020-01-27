import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';
import Link from 'docs/src/modules/components/Link';

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    minHeight: 160,
    marginTop: theme.spacing(8),
  },

  link: {
    marginTop: theme.spacing(1),
    display: 'block',
  },
  img: {
    maxWidth: 960,
    width: '100%',
    height: 'auto',
    marginTop: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(4, 0, 6),
  },
});

const PremiumThemesLink = React.forwardRef((props, ref) => {
  return (
    <Link
      data-ga-event-category="premium-themes"
      data-ga-event-action="click"
      data-ga-event-label="home-link"
      href="https://themes.material-ui.com/"
      naked
      ref={ref}
      {...props}
    />
  );
});

function HomeThemes(props) {
  const { classes } = props;
  const t = useSelector(state => state.options.t);
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <NoSsr>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            {t('themes')}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            {t('themesDescr')}
          </Typography>
          <Link
            href="https://themes.material-ui.com/"
            data-ga-event-category="premium-themes"
            data-ga-event-action="click"
            data-ga-event-label="home-image"
            className={classes.link}
          >
            <NoSsr>
              <img
                className={classes.img}
                alt={t('themesButton')}
                src={`/static/images/themes-${theme.palette.type}.jpg`}
                loading="eager"
                width={500}
                height={307}
              />
            </NoSsr>
          </Link>
          <Grid container justify="center">
            <Button variant="outlined" component={PremiumThemesLink} className={classes.button}>
              {t('themesButton')}
            </Button>
          </Grid>
        </Container>
      </NoSsr>
    </div>
  );
}

HomeThemes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeThemes);
