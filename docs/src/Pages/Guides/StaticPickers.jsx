import React from 'react';
import { Typography } from '@material-ui/core';
import SourcablePanel from '_shared/SourcablePanel';

const StaticPickers = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Static pickers
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

    <SourcablePanel
      title="Static components"
      sourceFile="Guides/StaticPickers.example.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          Please make sure that your imports are consistent
        </Typography>
      }
    />
  </div>
);

export default StaticPickers;
