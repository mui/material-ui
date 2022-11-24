'use client';

import * as React from 'react';
import DocsBrandingProvider from 'docs/src/BrandingProvider';

export default function BrandingProvider(props) {
  return <DocsBrandingProvider {...props} />;
}
