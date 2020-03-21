import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from 'docs/src/modules/components/Link';
import appList from './appList';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    marginBottom: theme.spacing(4),
    minWidth: 120,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(1),
    maxWidth: 600,
  },
  description: {
    marginBottom: theme.spacing(6),
    maxWidth: 600,
  },
  cardMedia: {
    paddingTop: '75%', // 4:3
  },
});

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Returns a function that sorts reverse numerically by value of `key`
function sortFactory(key) {
  return function sortNumeric(a, b) {
    if (b[key] < a[key]) {
      return -1;
    }
    if (b[key] > a[key]) {
      return 1;
    }
    return 0;
  };
}

const sortFunctions = {
  dateAdded: sortFactory('dateAdded'),
  similarWebVisits: sortFactory('similarWebVisits'),
  stars: sortFactory('stars'),
};

function Showcase(props) {
  const { classes } = props;
  const [sortFunctionName, setSortFunctionName] = React.useState('dateAdded');
  const sortFunction = sortFunctions[sortFunctionName];
  const t = useSelector((state) => state.options.t);

  const handleChangeSort = (event) => {
    setSortFunctionName(event.target.value);
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="sort">Sort by</InputLabel>
        <Select value={sortFunctionName} onChange={handleChangeSort} inputProps={{ id: 'sort' }}>
          <MenuItem value="dateAdded">{t('newest')}</MenuItem>
          <MenuItem value="similarWebVisits">{t('traffic')}</MenuItem>
          <MenuItem value="stars">{t('stars')}</MenuItem>
        </Select>
      </FormControl>
      {stableSort(
        appList.filter((item) => item[sortFunctionName] !== undefined),
        sortFunction,
      ).map((app) => (
        <div key={app.title}>
          <Typography component="h2" variant="h4" gutterBottom className={classes.title}>
            <span>{app.title}</span>
            {app.source ? (
              <IconButton
                href={app.source}
                target="_blank"
                aria-label={`${app.title} ${t('sourceCode')}`}
              >
                <GitHubIcon />
              </IconButton>
            ) : null}
          </Typography>
          {app.image ? (
            <Card className={classes.card}>
              <CardMedia
                component="a"
                href={app.link}
                rel="noopener"
                target="_blank"
                className={classes.cardMedia}
                image={`/static/images/showcase/${app.image}`}
                title={app.title}
              />
            </Card>
          ) : (
            <Link
              variant="body2"
              target="_blank"
              rel="noopener nofollow"
              href={app.link}
              gutterBottom
            >
              {t('visit')}
            </Link>
          )}
          <Typography gutterBottom>{app.description}</Typography>
          <Typography
            variant="caption"
            display="block"
            color="textSecondary"
            className={classes.description}
          >
            {app.dateAdded}
          </Typography>
        </div>
      ))}
    </div>
  );
}

Showcase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Showcase);
