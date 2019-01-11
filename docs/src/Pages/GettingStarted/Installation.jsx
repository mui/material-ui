import React from 'react';
import Code from '_shared/Code';
import { Typography } from '@material-ui/core';

// eslint-disable-next-line
import muiPickerProviderCode from '!raw-loader!./MuiPickersProvider.example.jsx';

const installLibCode = `npm i @date-io/date-fns date-fns@2.0.0-alpha.25
// or
npm i @date-io/moment moment
// or
npm i -s @date-io/luxon luxon`;

const Installation = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Installation
    </Typography>
    <Typography variant="body1" gutterBottom>
      Available as{' '}
      <a className="link" href="https://www.npmjs.com/package/material-ui-pickers">
        npm package
      </a>
    </Typography>

    <Code withMargin text="npm i -s material-ui-pickers" />

    <Typography variant="h4" gutterBottom>
      Peer Library
    </Typography>
    <Typography variant="body1" gutterBottom>
      Material-ui-pickers was designed to use that date management library that you need.
    </Typography>

    <Typography variant="body1" gutterBottom>
      We are providing interfaces for{' '}
      <a className="link" href="https://momentjs.com/">
        moment
      </a>
      ,{' '}
      <a className="link" href="https://date-fns.org/">
        date-fns 2{' '}
      </a>
      and{' '}
      <a className="link" href="https://moment.github.io/luxon/">
        luxon
      </a>
      P.S. If you are not using moment in the project (or dont have it in the bundle already) we
      suggest using date-fns, because it is much more lightweight and will be correctly tree-shaken
      from the bundle.
    </Typography>

    <Typography variant="body1" gutterBottom>
      Note, that we support only 2.0.0-alpha versions of date-fns for now.
    </Typography>

    <Code withMargin language="markup" text={installLibCode} />
    <Typography variant="body1">
      Teach pickers how to use one of that library using
      <span className="inline-code">MuiPickersUtilsProvider</span>. This component takes an utils
      property, and makes it available down the React tree thanks to React context. It should
      preferably be used at the root of your component tree.
    </Typography>

    <Code withMargin text={muiPickerProviderCode} />
    <Typography variant="h4" gutterBottom>
      Font Icons
    </Typography>
    <Typography variant="body1">
      We are using material-ui-icons icon font to display icons. In order if you can override with a
      help of corresponding props. Just add this to your html
    </Typography>

    <Code
      withMargin
      language="html"
      text="<link rel=&quot;stylesheet&quot; href=&quot;https://fonts.googleapis.com/icon?family=Material+Icons&quot;>"
    />
  </div>
);

export default Installation;
