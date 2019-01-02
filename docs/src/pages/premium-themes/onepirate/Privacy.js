import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import Markdown from './modules/components/Markdown';
import Typography from './modules/components/Typography';
import LayoutBody from './modules/components/LayoutBody';
import AppAppBar from './modules/views/AppAppBar';
import privacy from './modules/views/privacy.md';
import AppFooter from './modules/views/AppFooter';

function Privacy() {
  return (
    <React.Fragment>
      <AppAppBar />
      <LayoutBody margin marginBottom>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Privacy
        </Typography>
        <Markdown>{privacy}</Markdown>
      </LayoutBody>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Privacy);
