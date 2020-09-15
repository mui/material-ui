import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    '& a': {
      display: 'block',
      marginBottom: theme.spacing(1),
    },
    '& img': {
      display: 'inline-block',
    },
  },
  placeholder: {
    width: 125,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.divider,
    border: `1px dashed ${theme.palette.divider}`,
    transition: theme.transitions.create(['color', 'border-color']),
    '&&': {
      display: 'flex',
    },
    '&:hover': {
      borderColor: 'currentColor',
      color: theme.palette.text.secondary,
    },
  },
}));

export default function DiamondSponsors(props) {
  const classes = useStyles();
  const { spot } = props;
  const theme = useTheme();
  const t = useSelector((state) => state.options.t);

  return (
    <div className={classes.root}>
      <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
        {t('diamondSponsors')}
      </Typography>
      <a
        data-ga-event-category="sponsor"
        data-ga-event-action={spot}
        data-ga-event-label="octopus"
        href="https://octopus.com/?utm_source=materialui&utm_medium=referral"
        rel="noopener noreferrer sponsored"
        target="_blank"
        style={{ width: 125, height: 35 }}
      >
        <img
          width="125"
          height="35"
          src={`/static/in-house/octopus-${theme.palette.type}.png`}
          alt="octopus"
          title="Repeatable, reliable deployments"
          loading="lazy"
        />
      </a>
      <a
        data-ga-event-category="sponsor"
        data-ga-event-action={spot}
        data-ga-event-label="doit"
        href="https://www.doit-intl.com/?utm_source=materialui&utm_medium=referral"
        rel="noopener noreferrer sponsored"
        target="_blank"
        style={{ width: 125, height: 35 }}
      >
        <img
          width="125"
          height="35"
          src={`/static/in-house/doit-intl.png`}
          alt="doit-intl"
          title="Management Platform for Google Cloud and AWS"
          loading="lazy"
        />
      </a>
      <a
        aria-label={t('diamondSponsors')}
        className={classes.placeholder}
        rel="noopener noreferrer"
        target="_blank"
        href="/discover-more/backers/#diamond"
      >
        <AddIcon />
      </a>
    </div>
  );
}

DiamondSponsors.propTypes = {
  spot: PropTypes.string.isRequired,
};
