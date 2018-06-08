import React from 'react';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';

const StaticPickers = () => (
  <div>
    <Typography variant="display2" gutterBottom> Static pickers </Typography>

    <Typography variant="body1" gutterBottom>
      Somewhere its required to use some internal control for calendar or some timeinput, but
      such usage can be such pain, because you will need to manage state by yorself.
    </Typography>

    <Typography variant="body1" gutterBottom>
      There you can use our own HOC that uses for any picker,
      which will manage the state on his side.
      And use any internal component with pure and simmilar to any other picker api.
    </Typography>

    <SourcablePanel
      title="Static pickers examples"
      sourceFile="Guides/StaticPickers.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          The api for each component in much is same as for root component.
          But somewhere when needed you can check it on the github or from component prop-types.
        </Typography>
      }
    />
  </div>
);

export default StaticPickers;

