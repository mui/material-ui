import * as React from 'react';
import PropTypes from 'prop-types';
import AppTableOfContentsBase from '@mui/docs/AppLayoutDocs/AppTableOfContents';
import featureToggle from 'docs/src/featureToggle';

function shouldShowJobAd() {
  const date = new Date();
  const timeZoneOffset = date.getTimezoneOffset();
  if (timeZoneOffset <= -5.5 * 60 || timeZoneOffset >= 8 * 60) {
    return false;
  }
  return true;
}

const showJobAd = featureToggle.enable_job_banner && shouldShowJobAd();

export default function AppTableOfContents(props) {
  return <AppTableOfContentsBase {...props} showJobAd={showJobAd} />;
}

AppTableOfContents.propTypes = {
  toc: PropTypes.array.isRequired,
};
