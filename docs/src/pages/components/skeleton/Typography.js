import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

function TypographyDemo(props) {
  const { loading = false } = props;

  const variants = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
  ];

  return (
    <div>
      {variants.map(variant => {
        return (
          <Typography key={variant} variant={variant}>
            {loading ? <Skeleton /> : variant}
          </Typography>
        );
      })}
    </div>
  );
}

TypographyDemo.propTypes = {
  loading: PropTypes.bool,
};

export default function SkeletonTypography() {
  return (
    <Grid container spacing={8}>
      <Grid item xs>
        <TypographyDemo loading />
      </Grid>
      <Grid item xs>
        <TypographyDemo />
      </Grid>
    </Grid>
  );
}
