import React from 'react';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';

const Formik = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Integration to form
    </Typography>

    <Typography variant="body1" gutterBottom>
      We are providing inbound validating dates and triggering date's on accept.
      And also there are quite a lot ways to submit the date, so we cannot
      provide the event for onChange handler.
    </Typography>

    <SourcablePanel
      title="Formik integration"
      sourceFile="Guides/Formik.example.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          Here is example of how to use material-ui-pickers with formik
        </Typography>
      }
    />
  </div>
);

export default Formik;
