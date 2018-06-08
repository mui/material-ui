import React from 'react';
import Code from '_shared/Code';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';

// eslint-disable-next-line import/no-webpack-loader-syntax
import utilsInterfaceCode from '!raw-loader!material-ui-pickers/typings/utils.d.ts';

const FormatCustomization = () => (
  <div>
    <Typography variant="display2" gutterBottom> Format customization </Typography>

    <Typography variant="body1" gutterBottom>
      For localization purpose may be needed to change displaying values in the pickers modal,
      because default formats can be not idiomatic for some localizations. There utils can help you.
    </Typography>

    <Typography variant="body1" gutterBottom>
      It`s possible to override any of displaying date values by inheritance
      of utils passed to MuiPickersProvider.
    </Typography>

    <SourcablePanel
      title="Patched french picker"
      sourceFile="Guides/OverrideFormatPicker.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          You can use ES6 class syntax or override values with a help of .prototype property
        </Typography>
      }
    />

    <Typography variant="display1" gutterBottom>
      Utils interface
    </Typography>

    <Typography variant="body1" gutterBottom>
      Where TDate - date object passed from state (moment, native Date or Luxon`s DateTime)
    </Typography>

    <Code language="ts" text={utilsInterfaceCode} />
  </div>
);

export default FormatCustomization;

