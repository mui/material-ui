import * as React from 'react';
import AppFrameBannerBase from '@mui/docs/AppLayoutDocs/AppFrameBanner';
import FEATURE_TOGGLE from 'docs/src/featureToggle';

export default function AppFrameBanner() {
  return <AppFrameBannerBase enableBanner={FEATURE_TOGGLE.enable_docsnav_banner} />;
}
