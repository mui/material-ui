import React from 'react';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';

const Formik = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Integration to form
    </Typography>

    <Typography variant="body1" gutterBottom>
      Pickers are quite complex controls, where date can be submitted 
      from different places, so we can't provide event as argument in
      onChange callback. Also we are providing date validation out of 
      the box, so it may be tricky to integrate pickers to the form. 
      Here are some examples!
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
