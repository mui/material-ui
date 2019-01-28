import React from 'react';
import Code from '_shared/Code';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';

const PersianCalendar = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Persian Calendar System
    </Typography>

    <Typography variant="body1" gutterBottom>
      Make sure you have read the{' '}
      <a href="https://material-ui-next.com/guides/right-to-left/">right to left section</a> of the
      material-ui documentation page before proceeding.
    </Typography>

    <Typography variant="body1" gutterBottom>
      You will also need to install the
      <code> @date-io/jalaali </code>
      package from npm.
    </Typography>

    <Code text="npm install @date-io/jalaali" />

    <SourcablePanel
      title="Samples"
      sourceFile="Localization/Persian/PersianCalendar.example.jsx"
      description={
        <div>
          <Typography variant="body1" gutterBottom>
            You can use the examples below. It is recommended that you change the font.
          </Typography>

          <Typography variant="body1" gutterBottom>
            Also, to make sure the example is fully functional, don&apos;t forget to change the
            direction of the page to Right to Left from the top right corner.
          </Typography>
        </div>
      }
    />
  </div>
);

export default PersianCalendar;
