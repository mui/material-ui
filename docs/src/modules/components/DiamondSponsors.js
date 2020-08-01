import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    '& a': {
      display: 'block',
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

// Persisted for the whole session.
// The state is used to avoid layout jumps during the session (navigation between different pages).
const randomSession = Math.random();

export default function DiamondSponsors(props) {
  const classes = useStyles();
  const { spot } = props;
  const theme = useTheme();
  const t = useSelector((state) => state.options.t);
  const [randomSencha, setRandomSencha] = React.useState(1);

  React.useEffect(() => {
    setRandomSencha(randomSession);
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
        {t('diamondSponsors')}
      </Typography>
      {randomSencha < 0.001 ? (
        <a
          data-ga-event-category="sponsor"
          data-ga-event-action={spot}
          data-ga-event-label="sencha"
          href="https://www.sencha.com/products/extreact/extreact-for-material-ui/?utm_source=materialui&utm_medium=referral&utm_content=product-200429-extreactmaterialui"
          rel="noopener noreferrer sponsored"
          target="_blank"
          style={{ marginLeft: 8, width: 125, height: 35 }}
        >
          <img
            width="125"
            height="35"
            src={`/static/in-house/sencha-125x35-${theme.palette.type}.svg`}
            alt="sencha"
            title="UI Components for Productive Dev Teams"
            loading="lazy"
          />
        </a>
      ) : null}
      <a
        style={{ marginTop: 8 }}
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
