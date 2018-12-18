import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Profile from 'docs/src/pages/premium-themes/instagram/Profile';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';
import jssPreset from '@material-ui/core/styles/jssPreset';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
});
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});

function Page() {
  return (
    <AppTheme title="Paperbase theme - Material-UI" description="A page that mimics Firebase.">
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <Profile />
      </JssProvider>
    </AppTheme>
  );
}

export default withRoot(Page);
