import React from 'react';
import Code from '_shared/Code';
import { Typography } from '@material-ui/core';

// eslint-disable-next-line
import momentLocalizationCode from '!raw-loader!Examples/Localization/MomentLocalizationExample';

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
    <Code withMargin text={momentLocalizationCode} />
  </div>
);

export default MomentLocalization;

