import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import Markdown from './modules/components/Markdown';
import Typography from './modules/components/Typography';
import LayoutBody from './modules/components/LayoutBody';
import AppAppBar from './modules/views/AppAppBar';
import terms from './modules/views/terms.md';
import AppFooter from './modules/views/AppFooter';

function Terms() {
  return (
    <React.Fragment>
      <AppAppBar />
      <LayoutBody margin marginBottom>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Terms
        </Typography>
        <Markdown>{terms}</Markdown>
      </LayoutBody>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Terms);
