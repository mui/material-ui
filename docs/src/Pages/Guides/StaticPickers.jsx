import React from 'react';
import Code from '_shared/Code';
import { Typography } from '@material-ui/core';
// eslint-disable-next-line
import StaticPickersCode from 'Examples/CodeSnippets/StaticPickers';

const StaticPickers = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      {' '}
      Static pickers{' '}
    </Typography>

    <Typography variant="body1" gutterBottom>
      Somewhere its required to use some internal control for calendar or some
      timeinput. Here you are! You can use directly any sub-control of the
      pickers. Please note - if you want to use internal controls ALL your
      imports must be from the relative paths
    </Typography>

    <Typography variant="body1" gutterBottom>
      Also you can use our own HOC that is using for any picker which provide
      managing temporary chosen date and submitting state logic.
    </Typography>

    <Code text={StaticPickersCode} />
  </div>
);

export default StaticPickers;
