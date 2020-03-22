import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    '& a': {
      display: 'block',
      marginTop: theme.spacing(1),
    },
    '& img': {
      width: 125,
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

export default function DiamondSponsors() {
  const classes = useStyles();
  const t = useSelector((state) => state.options.t);

  return (
    <div className={classes.root}>
      <Typography variant="caption" color="textSecondary" display="block">
        {t('diamondSponsors')}
      </Typography>
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
