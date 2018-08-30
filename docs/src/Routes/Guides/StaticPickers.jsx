import React from 'react';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';

const StaticPickers = () => (
  <div>
    <Typography variant="display2" gutterBottom> Static pickers </Typography>

    <Typography variant="body1" gutterBottom>
      Somewhere its required to use some internal control for calendar or some timeinput.
      Here you are! You can use directly any sub-control of the pickers.
    </Typography>

    <Typography variant="body1" gutterBottom>
      Also you can use our own HOC that is using for any picker
      which provide managing temporary chosen date and submitting state logic.
    </Typography>

    <SourcablePanel
      title="Static pickers examples"
      sourceFile="Guides/StaticPickers.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          The api for each component in much is same as for root component.
          But somewhere when needed you can check the api
          on the github or from component`s prop-types.
        </Typography>
      }
    />
  </div>
);

export default StaticPickers;

