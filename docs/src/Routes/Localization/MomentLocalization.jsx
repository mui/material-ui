import React from 'react';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';

// eslint-disable-next-line

const MomentLocalization = () => (
  <div>
    <Typography variant="display2" gutterBottom> Localization moment </Typography>
    <Typography variant="body1" gutterBottom>
      Moment localization relying on the global moment object used.
    </Typography>
    <Typography variant="body1" gutterBottom>
      It is possible to pass configured global moment with selected locale, default timezone, etc.
      Also pass selected locale as string to the provider
      to make pickers rerenders automatically on locale change.
    </Typography>
    <SourcablePanel
      title="Localized example"
      sourceFile="Localization/MomentLocalizationExample.jsx"
      description={(
        <Typography variant="body1" gutterBottom>
          Note that pickers would be rerender automatically on locale change
        </Typography>
      )}
    />

  </div>
);

export default MomentLocalization;

